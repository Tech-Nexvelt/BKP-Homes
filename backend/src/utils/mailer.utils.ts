import { transporter, mailerConfig } from '../config/mailer.config';
import { logger } from './logger';

interface SendMailOptions {
  to: string;
  subject: string;
  html: string;
}

export const sendMail = async (options: SendMailOptions): Promise<void> => {
  try {
    await transporter.sendMail({
      from: mailerConfig.from,
      to: options.to,
      subject: options.subject,
      html: options.html,
    });
    logger.info(`Email sent to ${options.to}: ${options.subject}`);
  } catch (error) {
    logger.error(`Failed to send email to ${options.to}:`, error);
    // Don't throw — email failure should not break the flow
  }
};

export const sendOTPEmail = async (to: string, otp: string, name: string): Promise<void> => {
  await sendMail({
    to,
    subject: 'Archana — Verify your email',
    html: `
      <!DOCTYPE html>
      <html>
        <body style="background:#0d0d0d;font-family:Inter,sans-serif;padding:40px;color:#f0ece4;">
          <div style="max-width:480px;margin:0 auto;background:#141414;border:0.5px solid #222;border-radius:6px;padding:40px;">
            <div style="text-align:center;margin-bottom:32px;">
              <span style="font-family:Georgia,serif;font-size:24px;letter-spacing:0.2em;color:#4a7c59;">Archana</span>
            </div>
            <h2 style="font-family:Georgia,serif;font-size:20px;font-weight:400;color:#f0ece4;margin-bottom:8px;">
              Hello, ${name}
            </h2>
            <p style="color:#aaa;font-size:14px;line-height:1.8;margin-bottom:32px;">
              Use the code below to verify your email address. This code expires in <strong style="color:#f0ece4;">10 minutes</strong>.
            </p>
            <div style="background:#1a1a1a;border:0.5px solid #222;border-radius:6px;padding:32px;text-align:center;margin-bottom:32px;">
              <span style="font-size:40px;font-family:monospace;letter-spacing:0.3em;color:#4a7c59;">${otp}</span>
            </div>
            <p style="color:#555;font-size:11px;line-height:1.6;">
              If you did not request this, please ignore this email. Do not share this code with anyone.
            </p>
          </div>
        </body>
      </html>
    `,
  });
};

export const sendPasswordResetEmail = async (
  to: string,
  name: string,
  resetLink: string,
): Promise<void> => {
  await sendMail({
    to,
    subject: 'Archana — Reset your password',
    html: `
      <!DOCTYPE html>
      <html>
        <body style="background:#0d0d0d;font-family:Inter,sans-serif;padding:40px;color:#f0ece4;">
          <div style="max-width:480px;margin:0 auto;background:#141414;border:0.5px solid #222;border-radius:6px;padding:40px;">
            <div style="text-align:center;margin-bottom:32px;">
              <span style="font-family:Georgia,serif;font-size:24px;letter-spacing:0.2em;color:#4a7c59;">Archana</span>
            </div>
            <h2 style="font-family:Georgia,serif;font-size:20px;font-weight:400;color:#f0ece4;">
              Reset your password
            </h2>
            <p style="color:#aaa;font-size:14px;line-height:1.8;margin-bottom:32px;">
              Hello ${name}, click the button below to reset your password. This link expires in <strong style="color:#f0ece4;">1 hour</strong>.
            </p>
            <div style="text-align:center;margin-bottom:32px;">
              <a href="${resetLink}" style="background:#4a7c59;color:#fff;padding:14px 32px;border-radius:24px;text-decoration:none;font-size:12px;letter-spacing:0.1em;text-transform:uppercase;">
                Reset Password
              </a>
            </div>
            <p style="color:#555;font-size:11px;line-height:1.6;">
              If you did not request a password reset, please ignore this email.
            </p>
          </div>
        </body>
      </html>
    `,
  });
};

export const sendWelcomeEmail = async (to: string, name: string): Promise<void> => {
  await sendMail({
    to,
    subject: 'Welcome to Archana — Crafted for discerning homes',
    html: `
      <!DOCTYPE html>
      <html>
        <body style="background:#0d0d0d;font-family:Inter,sans-serif;padding:40px;color:#f0ece4;">
          <div style="max-width:480px;margin:0 auto;background:#141414;border:0.5px solid #222;border-radius:6px;padding:40px;">
            <div style="text-align:center;margin-bottom:32px;">
              <span style="font-family:Georgia,serif;font-size:24px;letter-spacing:0.2em;color:#4a7c59;">Archana</span>
            </div>
            <h2 style="font-family:Georgia,serif;font-size:20px;font-weight:400;font-style:italic;color:#f0ece4;">
              Welcome, ${name}
            </h2>
            <p style="color:#aaa;font-size:14px;line-height:1.8;">
              Thank you for joining Archana. Explore our handcrafted furniture collection, designed and built in our Hyderabad workshop using premium teak, walnut, and marble.
            </p>
            <div style="text-align:center;margin-top:32px;">
              <a href="${process.env['FRONTEND_URL']}/products" style="background:#4a7c59;color:#fff;padding:14px 32px;border-radius:24px;text-decoration:none;font-size:12px;letter-spacing:0.1em;text-transform:uppercase;">
                Explore Collection
              </a>
            </div>
          </div>
        </body>
      </html>
    `,
  });
};

export const sendOrderConfirmationEmail = async (
  to: string,
  name: string,
  orderId: string,
  trackingId: string,
  total: number,
): Promise<void> => {
  await sendMail({
    to,
    subject: `Archana — Order Confirmed #${trackingId}`,
    html: `
      <!DOCTYPE html>
      <html>
        <body style="background:#0d0d0d;font-family:Inter,sans-serif;padding:40px;color:#f0ece4;">
          <div style="max-width:480px;margin:0 auto;background:#141414;border:0.5px solid #222;border-radius:6px;padding:40px;">
            <div style="text-align:center;margin-bottom:32px;">
              <span style="font-family:Georgia,serif;font-size:24px;letter-spacing:0.2em;color:#4a7c59;">Archana</span>
            </div>
            <h2 style="font-family:Georgia,serif;font-size:20px;font-weight:400;color:#f0ece4;">
              Order Confirmed!
            </h2>
            <p style="color:#aaa;font-size:14px;line-height:1.8;">
              Thank you ${name}, your order has been received and confirmed.
            </p>
            <div style="background:#1a1a1a;border:0.5px solid #222;border-radius:6px;padding:24px;margin:24px 0;">
              <p style="color:#555;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;margin:0 0 8px;">Tracking ID</p>
              <p style="color:#4a7c59;font-size:16px;font-family:monospace;margin:0;">${trackingId}</p>
              <p style="color:#555;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;margin:16px 0 8px;">Total Amount</p>
              <p style="color:#f0ece4;font-size:20px;margin:0;">₹${total.toLocaleString('en-IN')}</p>
            </div>
            <div style="text-align:center;">
              <a href="${process.env['FRONTEND_URL']}/dashboard/orders/${orderId}" style="background:#4a7c59;color:#fff;padding:14px 32px;border-radius:24px;text-decoration:none;font-size:12px;letter-spacing:0.1em;text-transform:uppercase;">
                Track Your Order
              </a>
            </div>
          </div>
        </body>
      </html>
    `,
  });
};
