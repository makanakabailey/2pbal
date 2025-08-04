import { storage } from './storage';
import { sendEmail, generatePackageReminderEmailHTML } from './email-service';

export class EmailReminderService {
  private intervalId: NodeJS.Timeout | null = null;
  private readonly WEEKLY_INTERVAL = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
  
  constructor() {
    this.start();
  }

  start() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    
    console.log('[EmailReminderService] Starting weekly package reminder service');
    
    // Run immediately on startup, then every 24 hours
    this.sendWeeklyReminders();
    this.intervalId = setInterval(() => {
      this.sendWeeklyReminders();
    }, 24 * 60 * 60 * 1000); // Check daily, but only send weekly
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      console.log('[EmailReminderService] Email reminder service stopped');
    }
  }

  private async sendWeeklyReminders() {
    try {
      console.log('[EmailReminderService] Checking for users who need package reminders');
      
      const users = await storage.getAllUsers();
      const now = new Date();
      
      for (const user of users) {
        try {
          // Skip unverified users
          if (!user.emailVerified) {
            continue;
          }

          // Get user's most viewed package
          const mostViewedPackage = await storage.getMostViewedPackageForUser(user.id);
          
          if (!mostViewedPackage) {
            continue; // No package views to remind about
          }

          // Check if it's been at least 7 days since last reminder
          const lastReminderSent = mostViewedPackage.lastReminderSent;
          const shouldSendReminder = !lastReminderSent || 
            (now.getTime() - lastReminderSent.getTime()) >= this.WEEKLY_INTERVAL;

          if (!shouldSendReminder) {
            continue;
          }

          // Generate package details for email
          const packageDetails = this.getPackageDetails(mostViewedPackage.packageType);
          
          if (!packageDetails) {
            continue;
          }

          // Send reminder email
          const emailHTML = generatePackageReminderEmailHTML(
            user.firstName || 'there',
            packageDetails,
            mostViewedPackage.viewCount || 1,
            Math.floor((mostViewedPackage.viewDuration || 0) / 60) // Convert to minutes
          );

          const emailSent = await sendEmail({
            to: user.email,
            subject: `Don't Miss Out: ${packageDetails.name} - Perfect for Your Business`,
            html: emailHTML
          });

          if (emailSent) {
            // Update the last reminder sent timestamp
            await storage.updateLastReminderSent(user.id, mostViewedPackage.packageType);
            console.log(`[EmailReminderService] Sent reminder email to ${user.email} for package ${mostViewedPackage.packageType}`);
          } else {
            console.error(`[EmailReminderService] Failed to send reminder email to ${user.email}`);
          }

        } catch (error) {
          console.error(`[EmailReminderService] Error processing user ${user.id}:`, error);
        }
      }

    } catch (error) {
      console.error('[EmailReminderService] Error in sendWeeklyReminders:', error);
    }
  }

  private getPackageDetails(packageType: string) {
    const packages = {
      'digital-foundation': {
        name: 'Digital Foundation',
        price: '$5,500',
        description: 'Complete digital presence setup with website, branding, and social media management',
        features: [
          'Professional website design & development',
          'Complete brand identity package',
          'Social media setup & strategy',
          'SEO optimization',
          'Content creation for launch'
        ],
        cta: 'Transform Your Digital Presence',
        url: '/package/digital-foundation'
      },
      'growth-accelerator': {
        name: 'Growth Accelerator',
        price: '$8,500',
        description: 'Advanced marketing automation and lead generation system',
        features: [
          'Marketing automation setup',
          'Lead generation funnels',
          'Email marketing campaigns',
          'Performance tracking & analytics',
          'Conversion optimization'
        ],
        cta: 'Accelerate Your Growth',
        url: '/package/growth-accelerator'
      },
      'enterprise-solution': {
        name: 'Enterprise Solution',
        price: '$15,000',
        description: 'Full-scale digital transformation for established businesses',
        features: [
          'Custom enterprise software',
          'Advanced integrations',
          'Dedicated project management',
          'Priority support & maintenance',
          'Scalable infrastructure'
        ],
        cta: 'Scale Your Enterprise',
        url: '/package/enterprise-solution'
      }
    };

    return packages[packageType as keyof typeof packages] || null;
  }
}

// Export singleton instance
export const emailReminderService = new EmailReminderService();