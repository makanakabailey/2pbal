import { Resend } from 'resend';

if (!process.env.RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY environment variable must be set");
}

const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailParams {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail(params: EmailParams): Promise<boolean> {
  try {
    const { data, error } = await resend.emails.send({
      from: '2Pbal <onboarding@resend.dev>',
      to: params.to,
      subject: params.subject,
      html: params.html,
    });

    if (error) {
      console.error('Resend email error:', error);
      return false;
    }

    console.log('Email sent successfully:', data?.id);
    return true;
  } catch (error) {
    console.error('Email service error:', error);
    return false;
  }
}

export function generateVerificationEmailHTML(userFirstName: string, verificationLink: string): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify Your Email - 2Pbal</title>
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                line-height: 1.6;
                color: #333;
                background-color: #f8f9fa;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 40px auto;
                background: white;
                border-radius: 10px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                overflow: hidden;
            }
            .header {
                background: linear-gradient(135deg, #2563eb, #06b6d4);
                color: white;
                padding: 40px 30px;
                text-align: center;
            }
            .header h1 {
                margin: 0;
                font-size: 28px;
                font-weight: 600;
            }
            .content {
                padding: 40px 30px;
            }
            .greeting {
                font-size: 18px;
                color: #2563eb;
                margin-bottom: 20px;
            }
            .message {
                font-size: 16px;
                margin-bottom: 30px;
                line-height: 1.7;
            }
            .verify-button {
                display: inline-block;
                background: linear-gradient(135deg, #84cc16, #06b6d4);
                color: white;
                padding: 16px 32px;
                text-decoration: none;
                border-radius: 8px;
                font-weight: 600;
                font-size: 16px;
                text-align: center;
                transition: transform 0.2s;
            }
            .verify-button:hover {
                transform: translateY(-2px);
            }
            .footer {
                background-color: #f8f9fa;
                padding: 30px;
                text-align: center;
                color: #666;
                font-size: 14px;
            }
            .footer a {
                color: #2563eb;
                text-decoration: none;
            }
            .security-note {
                background-color: #fef3c7;
                border-left: 4px solid #f59e0b;
                padding: 15px;
                margin: 30px 0;
                border-radius: 4px;
            }
            .security-note strong {
                color: #92400e;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>2Pbal</h1>
                <p style="margin: 10px 0 0 0; opacity: 0.9;">Precise Programming for Business Advancement</p>
            </div>
            
            <div class="content">
                <div class="greeting">
                    Hello ${userFirstName || 'there'}!
                </div>
                
                <div class="message">
                    Welcome to 2Pbal! We're excited to have you join our community of businesses achieving enterprise results without enterprise costs.
                </div>
                
                <div class="message">
                    To complete your account setup and start accessing our services, please verify your email address by clicking the button below:
                </div>
                
                <div style="text-align: center; margin: 40px 0;">
                    <a href="${verificationLink}" class="verify-button">
                        Verify Email Address
                    </a>
                </div>
                
                <div class="security-note">
                    <strong>Security Note:</strong> This verification link will expire in 24 hours. If you didn't create an account with 2Pbal, please ignore this email.
                </div>
                
                <div class="message">
                    Once verified, you'll be able to:
                    <ul style="margin: 15px 0; padding-left: 20px;">
                        <li>Browse and purchase our service packages</li>
                        <li>Request custom quotes for your business needs</li>
                        <li>Access your client portal and project management tools</li>
                        <li>Calculate potential savings with our interactive calculator</li>
                    </ul>
                </div>
                
                <div class="message">
                    If the button above doesn't work, you can copy and paste this link into your browser:
                    <br>
                    <a href="${verificationLink}" style="color: #2563eb; word-break: break-all;">${verificationLink}</a>
                </div>
            </div>
            
            <div class="footer">
                <p>Need help? Contact us at <a href="mailto:support@2pbal.com">support@2pbal.com</a></p>
                <p>&copy; 2024 2Pbal. All rights reserved.</p>
                <p style="margin-top: 20px; font-size: 12px; color: #999;">
                    This email was sent to you. If you didn't sign up for 2Pbal, you can safely ignore this email.
                </p>
            </div>
        </div>
    </body>
    </html>
  `;
}

export function generatePackageReminderEmailHTML(
  userName: string,
  packageDetails: {
    name: string;
    price: string;
    description: string;
    features: string[];
    cta: string;
    url: string;
  },
  viewCount: number,
  timeSpentMinutes: number
): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Don't Miss Out - ${packageDetails.name}</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4; }
    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
    .header { text-align: center; padding: 20px 0; border-bottom: 2px solid #1e40af; }
    .logo { font-size: 28px; font-weight: bold; color: #1e40af; }
    .tagline { font-size: 14px; color: #6b7280; margin-top: 5px; }
    .content { padding: 30px 0; }
    .greeting { font-size: 18px; margin-bottom: 20px; }
    .package-card { background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); color: white; padding: 25px; border-radius: 10px; margin: 20px 0; }
    .package-name { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
    .package-price { font-size: 20px; color: #fbbf24; margin-bottom: 15px; }
    .package-description { font-size: 16px; margin-bottom: 20px; opacity: 0.9; }
    .features { list-style: none; padding: 0; margin: 20px 0; }
    .features li { padding: 8px 0; padding-left: 25px; position: relative; }
    .features li:before { content: "✓"; position: absolute; left: 0; color: #10b981; font-weight: bold; }
    .cta-button { display: inline-block; background-color: #10b981; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0; transition: background-color 0.3s; }
    .cta-button:hover { background-color: #059669; }
    .stats { background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0; }
    .stats h3 { margin-top: 0; color: #1e40af; }
    .stat-row { display: flex; justify-content: space-between; margin: 10px 0; }
    .urgency { background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; }
    .footer { text-align: center; padding: 20px 0; font-size: 14px; color: #6b7280; border-top: 1px solid #e5e7eb; }
    .unsubscribe { font-size: 12px; color: #9ca3af; margin-top: 10px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">2Pbal</div>
      <div class="tagline">Precise Programming for Business Advancement and Leverage</div>
    </div>
    
    <div class="content">
      <div class="greeting">Hi ${userName},</div>
      
      <p>We noticed you've been interested in our <strong>${packageDetails.name}</strong> package - you've viewed it <strong>${viewCount} time${viewCount > 1 ? 's' : ''}</strong> and spent <strong>${timeSpentMinutes} minute${timeSpentMinutes !== 1 ? 's' : ''}</strong> learning about it.</p>
      
      <p>That tells us you're serious about growing your business. We don't want you to miss out on the perfect solution for your needs.</p>
      
      <div class="package-card">
        <div class="package-name">${packageDetails.name}</div>
        <div class="package-price">${packageDetails.price}</div>
        <div class="package-description">${packageDetails.description}</div>
        
        <ul class="features">
          ${packageDetails.features.map(feature => `<li>${feature}</li>`).join('')}
        </ul>
        
        <div style="text-align: center;">
          <a href="${packageDetails.url}?utm_source=email&utm_medium=reminder&utm_campaign=weekly_reminder" class="cta-button">${packageDetails.cta}</a>
        </div>
      </div>
      
      <div class="stats">
        <h3>Your Interest Summary</h3>
        <div class="stat-row">
          <span>Times viewed this package:</span>
          <strong>${viewCount}</strong>
        </div>
        <div class="stat-row">
          <span>Time spent researching:</span>
          <strong>${timeSpentMinutes} minutes</strong>
        </div>
        <div class="stat-row">
          <span>Ready to move forward?</span>
          <strong>Let's talk!</strong>
        </div>
      </div>
      
      <div class="urgency">
        <strong>⏰ Don't Wait Too Long</strong><br>
        The best time to start your digital transformation was yesterday. The second best time is today. Companies that delay digital improvements typically fall behind competitors by 6-12 months.
      </div>
      
      <p>Ready to take the next step? <a href="/quote?package=${packageDetails.name.toLowerCase().replace(' ', '-')}&utm_source=email&utm_medium=reminder">Get a personalized quote</a> or <a href="/schedule-consultation?utm_source=email&utm_medium=reminder">schedule a free consultation</a> to discuss your specific needs.</p>
      
      <p>Questions? Simply reply to this email - we read every message personally.</p>
      
      <p>Best regards,<br>
      <strong>The 2Pbal Team</strong><br>
      <em>Your Partners in Digital Growth</em></p>
    </div>
    
    <div class="footer">
      <p>2Pbal - Enterprise Results, Without Enterprise Costs</p>
      <div class="unsubscribe">
        <p>You're receiving this because you viewed our ${packageDetails.name} package.</p>
        <p>Want fewer emails? <a href="/account-settings">Update your preferences</a></p>
      </div>
    </div>
  </div>
</body>
</html>
  `;
}