export interface ResetPasswordEmailOptions {
  resetUrl: string
  expiryMinutes?: number
}

/**
 * Generates the HTML body for the password reset email.
 * Styled to match the Executive Precision design system (dark, mono, minimal).
 * @param options - Reset URL and optional expiry duration
 * @returns HTML string for the email body
 */
export function buildResetPasswordEmail({ resetUrl, expiryMinutes = 15 }: ResetPasswordEmailOptions): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Reset your Instra password</title>
</head>
<body style="margin:0;padding:0;background-color:#0d0f0b;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0d0f0b;padding:48px 16px;">
    <tr>
      <td align="center">
        <table width="520" cellpadding="0" cellspacing="0" style="background-color:#121410;border:1px solid rgba(255,255,255,0.08);border-radius:8px;overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="padding:32px 40px 24px;border-bottom:1px solid rgba(255,255,255,0.06);">
              <span style="font-size:20px;font-weight:700;color:#ffffff;letter-spacing:-0.03em;">Instra</span>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 40px 32px;">
              <p style="margin:0 0 8px;font-size:22px;font-weight:600;color:#ffffff;letter-spacing:-0.025em;line-height:1.2;">
                Reset your password
              </p>
              <p style="margin:0 0 28px;font-size:14px;color:#8e9192;line-height:1.6;">
                We received a request to reset the password for your Instra account.
                Click the button below to choose a new one.
              </p>

              <!-- CTA button -->
              <table cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                <tr>
                  <td style="border-radius:4px;background-color:#ffffff;">
                    <a
                      href="${resetUrl}"
                      target="_blank"
                      style="display:inline-block;padding:13px 28px;font-size:14px;font-weight:600;color:#111111;text-decoration:none;letter-spacing:-0.01em;border-radius:4px;"
                    >
                      Reset password
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Fallback URL -->
              <p style="margin:0 0 6px;font-size:12px;color:#8e9192;line-height:1.5;">
                Or copy and paste this link into your browser:
              </p>
              <p style="margin:0 0 28px;font-size:11px;font-family:'Courier New',Courier,monospace;color:#c4c7c8;word-break:break-all;line-height:1.5;">
                ${resetUrl}
              </p>

              <!-- Security notice -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);border-radius:6px;">
                <tr>
                  <td style="padding:16px 20px;">
                    <p style="margin:0 0 4px;font-size:11px;font-family:'Courier New',Courier,monospace;font-weight:600;color:#8e9192;text-transform:uppercase;letter-spacing:0.06em;">
                      Security notice
                    </p>
                    <p style="margin:0;font-size:13px;color:#8e9192;line-height:1.5;">
                      This link expires in <strong style="color:#c4c7c8;">${expiryMinutes} minutes</strong> and can only be used once.
                      If you did not request a password reset, you can safely ignore this email.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 40px;border-top:1px solid rgba(255,255,255,0.06);">
              <p style="margin:0;font-size:12px;color:#444748;line-height:1.5;">
                Instra · Your Marketing Companion<br />
                You're receiving this email because a password reset was requested for your account.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

export function buildResetPasswordText(resetUrl: string): string {
  return `Reset your Instra password\n\nClick the link below to reset your password:\n${resetUrl}\n\nThis link expires in 15 minutes and can only be used once.\n\nIf you did not request this, ignore this email.`
}
