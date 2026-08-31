import { createError, defineEventHandler, readBody } from 'h3';

interface AcademiaFormPayload {
  name: string;
  phone: string;
  email: string;
  message: string;
  consent: boolean;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\d+$/;

const isValidPayload = (body: unknown): body is AcademiaFormPayload => {
  if (!body || typeof body !== 'object') return false;
  const payload = body as Record<string, unknown>;
  return (
    typeof payload.name === 'string'
    && payload.name.trim().length > 0
    && typeof payload.phone === 'string'
    && PHONE_REGEX.test(payload.phone.trim())
    && typeof payload.email === 'string'
    && EMAIL_REGEX.test(payload.email.trim())
    && typeof payload.message === 'string'
    && payload.message.trim().length > 0
    && payload.consent === true
  );
};

export default defineEventHandler(async event => {
  const body = await readBody(event);

  if (!isValidPayload(body)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Faltan campos obligatorios en el formulario.'
    });
  }

  const { googleAppsScriptUrl } = useRuntimeConfig();

  if (!googleAppsScriptUrl) {
    throw createError({
      statusCode: 500,
      statusMessage: 'El formulario no está configurado correctamente.'
    });
  }

  try {
    await $fetch(googleAppsScriptUrl, {
      method: 'POST',
      body: {
        name: body.name.trim(),
        phone: body.phone.trim(),
        email: body.email.trim(),
        message: body.message.trim(),
        consent: body.consent,
        submittedAt: new Date().toISOString()
      }
    });
  } catch {
    throw createError({
      statusCode: 502,
      statusMessage:
        'No se ha podido registrar el formulario. Inténtalo de nuevo.'
    });
  }

  return { ok: true };
});
