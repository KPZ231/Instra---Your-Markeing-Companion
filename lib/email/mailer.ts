import nodemailer from 'nodemailer'

/**
 * Singleton nodemailer transporter configured for Google SMTP.
 * Requires SMTP_USER and SMTP_APP_PASSWORD environment variables.
 * Generate an App Password at: https://myaccount.google.com/apppasswords
 */
export const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_APP_PASSWORD,
  },
})

export interface SendMailOptions {
  to: string
  subject: string
  html: string
  text?: string
}

/**
 * Sends an email via the configured SMTP transporter.
 * @param options - Recipient, subject, and HTML/text body
 */
export async function sendMail(options: SendMailOptions): Promise<void> {
  await transporter.sendMail({
    from: `"Instra" <${process.env.SMTP_USER}>`,
    to: options.to,
    subject: options.subject,
    html: options.html,
    text: options.text,
  })
}
