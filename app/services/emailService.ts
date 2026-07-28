// app/services/emailService.ts

/**
 * Robust mock email service supporting standard client-side & server-side logs and UI feedback.
 */

export interface EmailPayload {
  to: string;
  subject: string;
  body: string;
  templateId?: string;
}

export async function sendEmailNotification(payload: EmailPayload): Promise<boolean> {
  console.log(`[Email Service] Notification successfully queued/sent:
  To: ${payload.to}
  Subject: ${payload.subject}
  Body: ${payload.body}
  Template ID: ${payload.templateId || 'None'}`);
  return true;
}
