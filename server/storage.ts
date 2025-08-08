import { 
  type User, 
  type InsertUser, 
  type LoginData,
  type SignupData,
  type ProfileUpdate,
  type UserSession,
  type Quote, 
  type InsertQuote,
  type UserProject,
  type InsertProject,
  type ActivityLog,
  type EmailVerification,
  type AvatarUpload,
  type PreferencesUpdate,
  type ChangePassword,
  type AccountDeletion,
  type Payment,
  type InsertPayment,
  type Subscription,
  type InsertSubscription,
  type Invoice,
  type InsertInvoice,
  type EmailVerificationToken,
  type InsertEmailVerificationToken,
  type PackageViewTracking,
  type InsertPackageViewTracking,
  users, 
  userSessions, 
  quotes, 
  userProjects, 
  activityLogs, 
  emailVerifications,
  emailVerificationTokens,
  packageViewTracking,
  payments,
  subscriptions,
  invoices
} from "@shared/schema";
import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";
import { db } from './db';
import { eq, desc, and } from 'drizzle-orm';

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(userData: SignupData): Promise<User>;
  updateUser(id: number, userData: ProfileUpdate): Promise<User | undefined>;
  updateUserWithRecommendation(id: number, userData: ProfileUpdate, recommendation: any): Promise<User | undefined>;
  loginUser(credentials: LoginData): Promise<{ user: User; session: UserSession } | null>;
  deleteUser(id: number, password: string): Promise<boolean>;
  forceDeleteUser(id: number): Promise<boolean>;
  changePassword(id: number, currentPassword: string, newPassword: string): Promise<boolean>;
  updateAvatar(id: number, avatar: string): Promise<User | undefined>;
  updatePreferences(id: number, preferences: PreferencesUpdate): Promise<User | undefined>;
  
  // Admin operations
  getAllUsers(): Promise<User[]>;
  updateUserRole(userId: number, role: string): Promise<User | undefined>;
  
  // Session operations
  createSession(userId: number): Promise<UserSession>;
  getSession(sessionId: string): Promise<UserSession | undefined>;
  deleteSession(sessionId: string): Promise<void>;
  
  // Email verification operations
  createEmailVerificationToken(userId: number, email: string): Promise<EmailVerificationToken>;
  getEmailVerificationToken(token: string): Promise<EmailVerificationToken | undefined>;
  verifyEmailToken(token: string): Promise<boolean>;
  deleteEmailVerificationToken(token: string): Promise<void>;
  
  // Package tracking operations
  trackPackageView(data: InsertPackageViewTracking): Promise<PackageViewTracking>;
  getPackageViewsForUser(userId: number): Promise<PackageViewTracking[]>;
  getMostViewedPackageForUser(userId: number): Promise<PackageViewTracking | undefined>;
  updateLastReminderSent(userId: number, packageType: string): Promise<void>;
  
  // Quote operations
  createQuote(quote: InsertQuote): Promise<Quote>;
  getQuotes(userId?: number): Promise<Quote[]>;
  getQuote(id: number): Promise<Quote | undefined>;
  
  // Project operations
  createProject(project: InsertProject): Promise<UserProject>;
  getUserProjects(userId: number): Promise<UserProject[]>;
  getProject(id: number): Promise<UserProject | undefined>;
  updateProject(id: number, data: Partial<InsertProject>): Promise<UserProject | undefined>;
  
  // Activity logging
  logActivity(activity: {
    userId?: number;
    adminId?: number;
    action: string;
    target?: string;
    targetId?: number;
    details?: any;
    ipAddress?: string;
    userAgent?: string;
  }): Promise<ActivityLog>;
  getActivityLogs(userId?: number, limit?: number): Promise<ActivityLog[]>;
  
  // Payment operations
  createPayment(payment: InsertPayment): Promise<Payment>;
  getPayment(id: number): Promise<Payment | undefined>;
  getPaymentByStripeId(stripePaymentIntentId: string): Promise<Payment | undefined>;
  getUserPayments(userId: number): Promise<Payment[]>;
  updatePayment(id: number, data: Partial<InsertPayment>): Promise<Payment | undefined>;
  
  // Subscription operations
  createSubscription(subscription: InsertSubscription): Promise<Subscription>;
  getSubscription(id: number): Promise<Subscription | undefined>;
  getSubscriptionByStripeId(stripeSubscriptionId: string): Promise<Subscription | undefined>;
  getUserSubscriptions(userId: number): Promise<Subscription[]>;
  getAllSubscriptions(): Promise<Subscription[]>;
  updateSubscription(id: number, data: Partial<InsertSubscription>): Promise<Subscription | undefined>;
  
  // Invoice operations
  createInvoice(invoice: InsertInvoice): Promise<Invoice>;
  getInvoice(id: number): Promise<Invoice | undefined>;
  getInvoiceByStripeId(stripeInvoiceId: string): Promise<Invoice | undefined>;
  getUserInvoices(userId: number): Promise<Invoice[]>;
  updateInvoice(id: number, data: Partial<InsertInvoice>): Promise<Invoice | undefined>;
  
  // Email verification
  createEmailVerification(userId: number): Promise<EmailVerification>;
  verifyEmail(token: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User> = new Map();
  private sessions: Map<string, UserSession> = new Map();
  private quotes: Map<number, Quote> = new Map();
  private projects: Map<number, UserProject> = new Map();
  private activityLogs: Map<number, ActivityLog> = new Map();
  private emailVerifications: Map<string, EmailVerification> = new Map();
  private emailVerificationTokens: Map<string, EmailVerificationToken> = new Map();
  private packageViewTracking: Map<number, PackageViewTracking> = new Map();
  private payments: Map<number, Payment> = new Map();
  private subscriptions: Map<number, Subscription> = new Map();
  private invoices: Map<number, Invoice> = new Map();
  private nextUserId = 1;
  private nextQuoteId = 1;
  private nextProjectId = 1;
  private nextActivityId = 1;
  private nextEmailVerificationTokenId = 1;
  private nextPackageViewId = 1;
  private nextPaymentId = 1;
  private nextSubscriptionId = 1;
  private nextInvoiceId = 1;
  
  constructor() {
    // Create default admin user
    this.createAdminUser();
  }
  
  private async createAdminUser() {
    const hashedPassword = await bcrypt.hash("admin123", 10);
    const adminUser: User = {
      id: this.nextUserId++,
      email: "admin@2pbal.com",
      password: hashedPassword,
      firstName: "Admin",
      lastName: "User",
      company: "2Pbal",
      phone: null,
      jobTitle: "Administrator",
      industry: "Technology",
      companySize: null,
      website: null,
      address: null,
      businessGoals: null,
      currentChallenges: null,
      preferredBudget: null,
      projectTimeline: null,
      referralSource: null,
      marketingConsent: false,
      profileComplete: true,
      recommendedPackage: null,
      recommendationScore: null,
      recommendationReason: null,
      recommendationDate: null,
      isActive: true,
      role: "admin",
      avatar: null,
      emailVerified: true,
      preferences: { theme: 'light', notifications: true, language: 'en', timezone: 'UTC' },
      subscription: null,
      lastLogin: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.set(adminUser.id, adminUser);
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    for (const user of Array.from(this.users.values())) {
      if (user.email === email) {
        return user;
      }
    }
    return undefined;
  }

  async createUser(userData: SignupData): Promise<User> {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    
    const user: User = {
      id: this.nextUserId++,
      email: userData.email,
      password: hashedPassword,
      firstName: userData.firstName,
      lastName: userData.lastName,
      company: userData.company || null,
      phone: userData.phone || null,
      jobTitle: null,
      industry: null,
      companySize: null,
      website: null,
      address: null,
      businessGoals: null,
      currentChallenges: null,
      preferredBudget: null,
      projectTimeline: null,
      referralSource: null,
      marketingConsent: userData.marketingConsent || false,
      profileComplete: false,
      recommendedPackage: null,
      recommendationScore: null,
      recommendationReason: null,
      recommendationDate: null,
      isActive: true,
      role: "user",
      avatar: null,
      emailVerified: false,
      preferences: { theme: 'light', notifications: true, language: 'en', timezone: 'UTC' },
      subscription: null,
      lastLogin: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    this.users.set(user.id, user);
    return user;
  }

  async updateUser(id: number, userData: ProfileUpdate): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser: User = {
      ...user,
      ...userData,
      updatedAt: new Date(),
      profileComplete: true,
    };
    
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async updateUserWithRecommendation(id: number, userData: ProfileUpdate, recommendation: any): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;

    const updatedUser: User = { 
      ...user, 
      ...userData, 
      profileComplete: true,
      recommendedPackage: recommendation.packageType,
      recommendationScore: recommendation.score,
      recommendationReason: recommendation.reason,
      recommendationDate: new Date(),
      updatedAt: new Date() 
    };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async loginUser(credentials: LoginData): Promise<{ user: User; session: UserSession } | null> {
    const user = await this.getUserByEmail(credentials.email);
    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
    if (!isPasswordValid) return null;

    // Update last login
    const updatedUser = { ...user, lastLogin: new Date() };
    this.users.set(user.id, updatedUser);

    const session = await this.createSession(user.id);
    return { user: updatedUser, session };
  }

  async createSession(userId: number): Promise<UserSession> {
    const sessionId = randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    const session: UserSession = {
      id: sessionId,
      userId,
      expiresAt,
      createdAt: new Date(),
    };
    
    this.sessions.set(sessionId, session);
    return session;
  }

  async getSession(sessionId: string): Promise<UserSession | undefined> {
    const session = this.sessions.get(sessionId);
    
    if (!session || session.expiresAt < new Date()) {
      if (session) {
        await this.deleteSession(sessionId);
      }
      return undefined;
    }
    
    return session;
  }

  async deleteSession(sessionId: string): Promise<void> {
    this.sessions.delete(sessionId);
  }

  async createQuote(quoteData: InsertQuote): Promise<Quote> {
    const quote: Quote = {
      id: this.nextQuoteId++,
      userId: quoteData.userId || null,
      // Remove name field as it doesn't exist in schema
      email: quoteData.email,
      company: quoteData.company || null,
      phone: quoteData.phone || null,
      goals: Array.isArray(quoteData.goals) ? quoteData.goals as string[] : [],
      overspending: Array.isArray(quoteData.overspending) ? quoteData.overspending as string[] : [],
      outcomes: Array.isArray(quoteData.outcomes) ? quoteData.outcomes as string[] : [],
      projectDescription: quoteData.projectDescription,
      timeline: quoteData.timeline,
      attachments: Array.isArray(quoteData.attachments) ? quoteData.attachments as {filename: string, mimetype: string, size: number, data: string}[] : [],
      status: quoteData.status || "pending",
      createdAt: new Date(),
    };
    
    this.quotes.set(quote.id, quote);
    return quote;
  }

  async getQuotes(userId?: number): Promise<Quote[]> {
    const allQuotes = Array.from(this.quotes.values());
    
    if (userId) {
      return allQuotes
        .filter(quote => quote.userId === userId)
        .sort((a, b) => 
          (b.createdAt ? b.createdAt.getTime() : 0) - (a.createdAt ? a.createdAt.getTime() : 0)
        );
    }
    
    return allQuotes.sort((a, b) => 
      (b.createdAt ? b.createdAt.getTime() : 0) - (a.createdAt ? a.createdAt.getTime() : 0)
    );
  }

  async getQuote(id: number): Promise<Quote | undefined> {
    return this.quotes.get(id);
  }

  async createProject(projectData: InsertProject): Promise<UserProject> {
    const project: UserProject = {
      id: this.nextProjectId++,
      userId: projectData.userId,
      name: projectData.name,
      description: projectData.description || null,
      services: projectData.services || [],
      packageType: projectData.packageType || null,
      totalCost: projectData.totalCost || 0,
      paidAmount: projectData.paidAmount || 0,
      status: projectData.status || "planning",
      progress: projectData.progress || 0,
      startDate: projectData.startDate || null,
      estimatedCompletion: projectData.estimatedCompletion || null,
      milestones: projectData.milestones || [],
      timeline: projectData.timeline || [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    this.projects.set(project.id, project);
    return project;
  }

  async getUserProjects(userId: number): Promise<UserProject[]> {
    return Array.from(this.projects.values())
      .filter(project => project.userId === userId)
      .sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
  }

  async getProject(id: number): Promise<UserProject | undefined> {
    return this.projects.get(id);
  }

  async updateProject(id: number, data: Partial<InsertProject>): Promise<UserProject | undefined> {
    const project = this.projects.get(id);
    if (!project) return undefined;
    
    const updatedProject: UserProject = {
      ...project,
      ...data,
      updatedAt: new Date(),
    };
    
    this.projects.set(id, updatedProject);
    return updatedProject;
  }

  // Account management methods
  async deleteUser(id: number, password: string): Promise<boolean> {
    const user = this.users.get(id);
    if (!user) return false;

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return false;

    this.users.delete(id);
    // Clean up related sessions
    const sessionsToDelete: string[] = [];
    for (const [sessionId, session] of Array.from(this.sessions.entries())) {
      if (session.userId === id) {
        sessionsToDelete.push(sessionId);
      }
    }
    sessionsToDelete.forEach(sessionId => this.sessions.delete(sessionId));
    return true;
  }

  async forceDeleteUser(id: number): Promise<boolean> {
    const user = this.users.get(id);
    if (!user) return false;

    this.users.delete(id);
    // Also clean up related data
    for (const [sessionId, session] of Array.from(this.sessions.entries())) {
      if (session.userId === id) {
        this.sessions.delete(sessionId);
      }
    }
    
    return true;
  }

  async changePassword(id: number, currentPassword: string, newPassword: string): Promise<boolean> {
    const user = this.users.get(id);
    if (!user) return false;

    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isCurrentPasswordValid) return false;

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    const updatedUser = { ...user, password: hashedNewPassword, updatedAt: new Date() };
    this.users.set(id, updatedUser);
    return true;
  }

  async updateAvatar(id: number, avatar: string): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;

    const updatedUser = { ...user, avatar, updatedAt: new Date() };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async updatePreferences(id: number, preferences: PreferencesUpdate): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;

    const updatedUser = { 
      ...user, 
      preferences: { ...user.preferences, ...preferences }, 
      updatedAt: new Date() 
    };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  // Admin methods
  async getAllUsers(): Promise<User[]> {
    return Array.from(this.users.values())
      .sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
  }

  async updateUserRole(userId: number, role: string): Promise<User | undefined> {
    const user = this.users.get(userId);
    if (!user) return undefined;

    const updatedUser = { ...user, role, updatedAt: new Date() };
    this.users.set(userId, updatedUser);
    return updatedUser;
  }

  // Activity logging
  async logActivity(activity: {
    userId?: number;
    adminId?: number;
    action: string;
    target?: string;
    targetId?: number;
    details?: any;
    ipAddress?: string;
    userAgent?: string;
  }): Promise<ActivityLog> {
    const log: ActivityLog = {
      id: this.nextActivityId++,
      userId: activity.userId || null,
      adminId: activity.adminId || null,
      action: activity.action,
      target: activity.target || null,
      targetId: activity.targetId || null,
      details: activity.details || null,
      ipAddress: activity.ipAddress || null,
      userAgent: activity.userAgent || null,
      createdAt: new Date(),
    };
    
    this.activityLogs.set(log.id, log);
    return log;
  }

  async getActivityLogs(userId?: number, limit: number = 50): Promise<ActivityLog[]> {
    const logs = Array.from(this.activityLogs.values());
    
    let filteredLogs = logs;
    if (userId) {
      filteredLogs = logs.filter(log => log.userId === userId || log.adminId === userId);
    }
    
    return filteredLogs
      .sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0))
      .slice(0, limit);
  }

  // Email verification
  async createEmailVerification(userId: number): Promise<EmailVerification> {
    const token = randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    const verification: EmailVerification = {
      id: this.nextActivityId++,
      userId,
      token,
      expiresAt,
      createdAt: new Date(),
    };
    
    this.emailVerifications.set(token, verification);
    return verification;
  }

  async verifyEmail(token: string): Promise<boolean> {
    const verification = this.emailVerifications.get(token);
    if (!verification || verification.expiresAt < new Date()) {
      return false;
    }

    const user = this.users.get(verification.userId);
    if (!user) return false;

    const updatedUser = { ...user, emailVerified: true, updatedAt: new Date() };
    this.users.set(user.id, updatedUser);
    
    this.emailVerifications.delete(token);
    return true;
  }

  // Email verification token operations
  async createEmailVerificationToken(userId: number, email: string): Promise<EmailVerificationToken> {
    const token = randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    const verificationToken: EmailVerificationToken = {
      id: this.nextEmailVerificationTokenId++,
      userId,
      token,
      email,
      expiresAt,
      createdAt: new Date(),
    };
    
    this.emailVerificationTokens.set(token, verificationToken);
    return verificationToken;
  }

  async getEmailVerificationToken(token: string): Promise<EmailVerificationToken | undefined> {
    const verification = this.emailVerificationTokens.get(token);
    if (!verification || verification.expiresAt < new Date()) {
      if (verification) {
        this.emailVerificationTokens.delete(token);
      }
      return undefined;
    }
    return verification;
  }

  async verifyEmailToken(token: string): Promise<boolean> {
    const verification = this.emailVerificationTokens.get(token);
    if (!verification || verification.expiresAt < new Date()) {
      return false;
    }

    const user = this.users.get(verification.userId);
    if (!user) return false;

    const updatedUser = { ...user, emailVerified: true, updatedAt: new Date() };
    this.users.set(user.id, updatedUser);
    
    this.emailVerificationTokens.delete(token);
    return true;
  }

  async deleteEmailVerificationToken(token: string): Promise<void> {
    this.emailVerificationTokens.delete(token);
  }

  // Package tracking operations
  async trackPackageView(data: InsertPackageViewTracking): Promise<PackageViewTracking> {
    const tracking: PackageViewTracking = {
      id: this.nextPackageViewId++,
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    this.packageViewTracking.set(tracking.id, tracking);
    return tracking;
  }

  async getPackageViewsForUser(userId: number): Promise<PackageViewTracking[]> {
    return Array.from(this.packageViewTracking.values())
      .filter(view => view.userId === userId)
      .sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
  }

  async getMostViewedPackageForUser(userId: number): Promise<PackageViewTracking | undefined> {
    const userViews = await this.getPackageViewsForUser(userId);
    
    if (userViews.length === 0) return undefined;
    
    // Group by package type and sum view counts and durations
    const packageStats = new Map<string, { count: number; totalDuration: number; latest: PackageViewTracking }>();
    
    for (const view of userViews) {
      const existing = packageStats.get(view.packageType);
      if (existing) {
        existing.count += (view.viewCount || 1);
        existing.totalDuration += (view.viewDuration || 0);
        if (view.createdAt && (!existing.latest.createdAt || view.createdAt > existing.latest.createdAt)) {
          existing.latest = view;
        }
      } else {
        packageStats.set(view.packageType, {
          count: view.viewCount || 1,
          totalDuration: view.viewDuration || 0,
          latest: view
        });
      }
    }
    
    // Find package with highest engagement (combination of views and time spent)
    let bestPackage: PackageViewTracking | undefined;
    let bestScore = 0;
    
    for (const [packageType, stats] of packageStats) {
      const score = stats.count * 10 + stats.totalDuration; // Weight views more than duration
      if (score > bestScore) {
        bestScore = score;
        bestPackage = stats.latest;
      }
    }
    
    return bestPackage;
  }

  async updateLastReminderSent(userId: number, packageType: string): Promise<void> {
    const views = await this.getPackageViewsForUser(userId);
    const relevantViews = views.filter(v => v.packageType === packageType);
    
    for (const view of relevantViews) {
      const updatedView = { ...view, lastReminderSent: new Date(), updatedAt: new Date() };
      this.packageViewTracking.set(view.id, updatedView);
    }
  }

  // Payment operations
  async createPayment(payment: InsertPayment): Promise<Payment> {
    const newPayment: Payment = {
      id: this.nextPaymentId++,
      ...payment,
      metadata: payment.metadata || {},
      projectId: payment.projectId || null,
      status: payment.status || null,
      description: payment.description || null,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.payments.set(newPayment.id, newPayment);
    return newPayment;
  }

  async getPayment(id: number): Promise<Payment | undefined> {
    return this.payments.get(id);
  }

  async getPaymentByStripeId(stripePaymentIntentId: string): Promise<Payment | undefined> {
    return Array.from(this.payments.values()).find(p => p.stripePaymentIntentId === stripePaymentIntentId);
  }

  async getUserPayments(userId: number): Promise<Payment[]> {
    return Array.from(this.payments.values())
      .filter(p => p.userId === userId)
      .sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
  }

  async updatePayment(id: number, data: Partial<InsertPayment>): Promise<Payment | undefined> {
    const payment = this.payments.get(id);
    if (!payment) return undefined;

    const updatedPayment = { ...payment, ...data, updatedAt: new Date() };
    this.payments.set(id, updatedPayment);
    return updatedPayment;
  }

  // Subscription operations
  async createSubscription(subscription: InsertSubscription): Promise<Subscription> {
    const newSubscription: Subscription = {
      id: this.nextSubscriptionId++,
      ...subscription,
      amount: subscription.amount || null,
      stripeCustomerId: subscription.stripeCustomerId || null,
      status: subscription.status || null,
      packageType: subscription.packageType || null,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.subscriptions.set(newSubscription.id, newSubscription);
    return newSubscription;
  }

  async getSubscription(id: number): Promise<Subscription | undefined> {
    return this.subscriptions.get(id);
  }

  async getSubscriptionByStripeId(stripeSubscriptionId: string): Promise<Subscription | undefined> {
    return Array.from(this.subscriptions.values()).find(s => s.stripeSubscriptionId === stripeSubscriptionId);
  }

  async getUserSubscriptions(userId: number): Promise<Subscription[]> {
    return Array.from(this.subscriptions.values())
      .filter(s => s.userId === userId)
      .sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
  }

  async getAllSubscriptions(): Promise<Subscription[]> {
    return Array.from(this.subscriptions.values())
      .sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
  }

  async updateSubscription(id: number, data: Partial<InsertSubscription>): Promise<Subscription | undefined> {
    const subscription = this.subscriptions.get(id);
    if (!subscription) return undefined;

    const updatedSubscription = { ...subscription, ...data, updatedAt: new Date() };
    this.subscriptions.set(id, updatedSubscription);
    return updatedSubscription;
  }

  // Invoice operations
  async createInvoice(invoice: InsertInvoice): Promise<Invoice> {
    const newInvoice: Invoice = {
      id: this.nextInvoiceId++,
      ...invoice,
      paymentId: invoice.paymentId || null,
      subscriptionId: invoice.subscriptionId || null,
      status: invoice.status || null,
      description: invoice.description || null,
      currency: invoice.currency || null,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.invoices.set(newInvoice.id, newInvoice);
    return newInvoice;
  }

  async getInvoice(id: number): Promise<Invoice | undefined> {
    return this.invoices.get(id);
  }

  async getInvoiceByStripeId(stripeInvoiceId: string): Promise<Invoice | undefined> {
    return Array.from(this.invoices.values()).find(i => i.stripeInvoiceId === stripeInvoiceId);
  }

  async getUserInvoices(userId: number): Promise<Invoice[]> {
    return Array.from(this.invoices.values())
      .filter(i => i.userId === userId)
      .sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
  }

  async updateInvoice(id: number, data: Partial<InsertInvoice>): Promise<Invoice | undefined> {
    const invoice = this.invoices.get(id);
    if (!invoice) return undefined;

    const updatedInvoice = { ...invoice, ...data, updatedAt: new Date() };
    this.invoices.set(id, updatedInvoice);
    return updatedInvoice;
  }
}

// Database storage implementation

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    try {
      // Temporary fix using basic select to avoid column mapping issues
      const result = await db.select({
        id: users.id,
        email: users.email,
        password: users.password,
        firstName: users.firstName,
        lastName: users.lastName,
        company: users.company,
        phone: users.phone,
        isActive: users.isActive,
        role: users.role,
        emailVerified: users.emailVerified,
        profileComplete: users.profileComplete,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt
      }).from(users).where(eq(users.id, id)).limit(1);
      
      // Fill in optional fields with defaults for the type
      if (result[0]) {
        return {
          ...result[0],
          jobTitle: null,
          industry: null,
          companySize: null,
          website: null,
          address: null,
          businessGoals: null,
          currentChallenges: null,
          preferredBudget: null,
          projectTimeline: null,
          referralSource: null,
          marketingConsent: false,
          recommendedPackage: null,
          recommendationScore: null,
          recommendationReason: null,
          recommendationDate: null,
          avatar: null,
          preferences: { theme: 'light', notifications: true, language: 'en', timezone: 'UTC' },
          subscription: null,
          lastLogin: null
        };
      }
      return undefined;
    } catch (error) {
      console.error('getUser error:', error);
      return undefined;
    }
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    try {
      // Temporary fix using basic select to avoid column mapping issues
      const result = await db.select({
        id: users.id,
        email: users.email,
        password: users.password,
        firstName: users.firstName,
        lastName: users.lastName,
        company: users.company,
        phone: users.phone,
        isActive: users.isActive,
        role: users.role,
        emailVerified: users.emailVerified,
        profileComplete: users.profileComplete,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt
      }).from(users).where(eq(users.email, email)).limit(1);
      
      // Fill in optional fields with defaults for the type
      if (result[0]) {
        return {
          ...result[0],
          jobTitle: null,
          industry: null,
          companySize: null,
          website: null,
          address: null,
          businessGoals: null,
          currentChallenges: null,
          preferredBudget: null,
          projectTimeline: null,
          referralSource: null,
          marketingConsent: false,
          recommendedPackage: null,
          recommendationScore: null,
          recommendationReason: null,
          recommendationDate: null,
          avatar: null,
          preferences: { theme: 'light', notifications: true, language: 'en', timezone: 'UTC' },
          subscription: null,
          lastLogin: null
        };
      }
      return undefined;
    } catch (error) {
      console.error('getUserByEmail error:', error);
      return undefined;
    }
  }

  async createUser(userData: SignupData): Promise<User> {
    const hashedPassword = await bcrypt.hash(userData.password, 12);
    
    const result = await db.insert(users).values({
      email: userData.email,
      password: hashedPassword,
      firstName: userData.firstName,
      lastName: userData.lastName,
      company: userData.company || null,
      phone: userData.phone || null,
      marketingConsent: userData.marketingConsent || false,
      emailVerified: false,
      profileComplete: false,
      isActive: true,
      role: 'user'
    }).returning();

    return result[0];
  }

  async updateUser(id: number, userData: ProfileUpdate): Promise<User | undefined> {
    const result = await db.update(users)
      .set({ ...userData, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    
    return result[0];
  }

  async updateUserWithRecommendation(id: number, userData: ProfileUpdate, recommendation: any): Promise<User | undefined> {
    const result = await db.update(users)
      .set({ 
        ...userData, 
        profileComplete: true,
        recommendedPackage: recommendation.packageType,
        recommendationScore: recommendation.score,
        recommendationReason: recommendation.reason,
        recommendationDate: new Date(),
        updatedAt: new Date() 
      })
      .where(eq(users.id, id))
      .returning();
    return result[0];
  }

  async loginUser(credentials: LoginData): Promise<{ user: User; session: UserSession } | null> {
    const user = await this.getUserByEmail(credentials.email);
    if (!user || !user.isActive) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
    if (!isPasswordValid) {
      return null;
    }

    // Update last login
    await db.update(users)
      .set({ lastLogin: new Date() })
      .where(eq(users.id, user.id));

    const session = await this.createSession(user.id);
    return { user, session };
  }

  async deleteUser(id: number, password: string): Promise<boolean> {
    const user = await this.getUser(id);
    if (!user) return false;

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return false;

    await db.delete(users).where(eq(users.id, id));
    return true;
  }

  async forceDeleteUser(id: number): Promise<boolean> {
    try {
      await db.delete(users).where(eq(users.id, id));
      return true;
    } catch (error) {
      console.error("Force delete user error:", error);
      return false;
    }
  }

  async changePassword(id: number, currentPassword: string, newPassword: string): Promise<boolean> {
    const user = await this.getUser(id);
    if (!user) return false;

    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isCurrentPasswordValid) return false;

    const hashedNewPassword = await bcrypt.hash(newPassword, 12);
    await db.update(users)
      .set({ password: hashedNewPassword, updatedAt: new Date() })
      .where(eq(users.id, id));

    return true;
  }

  async updateAvatar(id: number, avatar: string): Promise<User | undefined> {
    const result = await db.update(users)
      .set({ avatar, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    
    return result[0];
  }

  async updatePreferences(id: number, preferences: PreferencesUpdate): Promise<User | undefined> {
    const user = await this.getUser(id);
    if (!user) return undefined;

    const updatedPreferences = { ...user.preferences, ...preferences };
    const result = await db.update(users)
      .set({ preferences: updatedPreferences, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    
    return result[0];
  }

  // Admin operations
  async getAllUsers(): Promise<User[]> {
    try {
      const result = await db.select({
        id: users.id,
        email: users.email,
        password: users.password,
        firstName: users.firstName,
        lastName: users.lastName,
        company: users.company,
        phone: users.phone,
        isActive: users.isActive,
        role: users.role,
        emailVerified: users.emailVerified,
        profileComplete: users.profileComplete,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt
      }).from(users).orderBy(desc(users.createdAt));
      
      // Fill in optional fields with defaults for the type
      return result.map(user => ({
        ...user,
        jobTitle: null,
        industry: null,
        companySize: null,
        website: null,
        address: null,
        businessGoals: null,
        currentChallenges: null,
        preferredBudget: null,
        projectTimeline: null,
        referralSource: null,
        marketingConsent: false,
        recommendedPackage: null,
        recommendationScore: null,
        recommendationReason: null,
        recommendationDate: null,
        avatar: null,
        preferences: { theme: 'light', notifications: true, language: 'en', timezone: 'UTC' },
        subscription: null,
        lastLogin: null
      }));
    } catch (error) {
      console.error('getAllUsers error:', error);
      return [];
    }
  }

  async updateUserRole(userId: number, role: string): Promise<User | undefined> {
    const result = await db.update(users)
      .set({ role, updatedAt: new Date() })
      .where(eq(users.id, userId))
      .returning();
    
    return result[0];
  }

  // Session operations
  async createSession(userId: number): Promise<UserSession> {
    const sessionId = randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    const result = await db.insert(userSessions).values({
      id: sessionId,
      userId,
      expiresAt
    }).returning();

    return result[0];
  }

  async getSession(sessionId: string): Promise<UserSession | undefined> {
    const result = await db.select().from(userSessions)
      .where(and(
        eq(userSessions.id, sessionId),
        // Check if session hasn't expired
      ))
      .limit(1);
    
    const session = result[0];
    if (!session || session.expiresAt < new Date()) {
      if (session) {
        await this.deleteSession(sessionId);
      }
      return undefined;
    }

    return session;
  }

  async deleteSession(sessionId: string): Promise<void> {
    await db.delete(userSessions).where(eq(userSessions.id, sessionId));
  }

  // Quote operations
  async createQuote(quote: InsertQuote): Promise<Quote> {
    const result = await db.insert(quotes).values({
      email: quote.email,
      company: quote.company || null,
      phone: quote.phone || null,
      goals: quote.goals,
      overspending: quote.overspending,
      outcomes: quote.outcomes,
      projectDescription: quote.projectDescription,
      timeline: quote.timeline,
      attachments: quote.attachments || [],
      status: quote.status || "pending"
    }).returning();
    return result[0];
  }

  async getQuotes(userId?: number): Promise<Quote[]> {
    if (userId) {
      return await db.select().from(quotes)
        .where(eq(quotes.userId, userId))
        .orderBy(desc(quotes.createdAt));
    }
    return await db.select().from(quotes).orderBy(desc(quotes.createdAt));
  }

  async getQuote(id: number): Promise<Quote | undefined> {
    const result = await db.select().from(quotes).where(eq(quotes.id, id)).limit(1);
    return result[0];
  }

  // Project operations
  async createProject(project: InsertProject): Promise<UserProject> {
    const result = await db.insert(userProjects).values(project).returning();
    return result[0];
  }

  async getUserProjects(userId: number): Promise<UserProject[]> {
    return await db.select().from(userProjects)
      .where(eq(userProjects.userId, userId))
      .orderBy(desc(userProjects.createdAt));
  }

  async getProject(id: number): Promise<UserProject | undefined> {
    const result = await db.select().from(userProjects).where(eq(userProjects.id, id)).limit(1);
    return result[0];
  }

  async updateProject(id: number, data: Partial<InsertProject>): Promise<UserProject | undefined> {
    const result = await db.update(userProjects)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(userProjects.id, id))
      .returning();
    
    return result[0];
  }

  // Activity logging
  async logActivity(activity: {
    userId?: number;
    adminId?: number;
    action: string;
    target?: string;
    targetId?: number;
    details?: any;
    ipAddress?: string;
    userAgent?: string;
  }): Promise<ActivityLog> {
    const result = await db.insert(activityLogs).values({
      userId: activity.userId || null,
      adminId: activity.adminId || null,
      action: activity.action,
      target: activity.target || null,
      targetId: activity.targetId || null,
      details: activity.details || null,
      ipAddress: activity.ipAddress || null,
      userAgent: activity.userAgent || null
    }).returning();

    return result[0];
  }

  async getActivityLogs(userId?: number, limit: number = 50): Promise<ActivityLog[]> {
    if (userId) {
      return await db.select().from(activityLogs)
        .where(eq(activityLogs.userId, userId))
        .orderBy(desc(activityLogs.createdAt))
        .limit(limit);
    }
    
    return await db.select().from(activityLogs)
      .orderBy(desc(activityLogs.createdAt))
      .limit(limit);
  }

  // Email verification
  async createEmailVerification(userId: number): Promise<EmailVerification> {
    const token = randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    const result = await db.insert(emailVerifications).values({
      userId,
      token,
      expiresAt
    }).returning();

    return result[0];
  }

  async verifyEmail(token: string): Promise<boolean> {
    const result = await db.select().from(emailVerifications)
      .where(eq(emailVerifications.token, token))
      .limit(1);
    
    const verification = result[0];
    if (!verification || verification.expiresAt < new Date()) {
      return false;
    }

    await db.update(users)
      .set({ emailVerified: true, updatedAt: new Date() })
      .where(eq(users.id, verification.userId));
    
    await db.delete(emailVerifications).where(eq(emailVerifications.token, token));
    return true;
  }

  // Payment operations
  async createPayment(payment: InsertPayment): Promise<Payment> {
    const result = await db.insert(payments).values(payment).returning();
    return result[0];
  }

  async getPayment(id: number): Promise<Payment | undefined> {
    const result = await db.select().from(payments).where(eq(payments.id, id)).limit(1);
    return result[0];
  }

  async getPaymentByStripeId(stripePaymentIntentId: string): Promise<Payment | undefined> {
    const result = await db.select().from(payments)
      .where(eq(payments.stripePaymentIntentId, stripePaymentIntentId)).limit(1);
    return result[0];
  }

  async getUserPayments(userId: number): Promise<Payment[]> {
    return await db.select().from(payments)
      .where(eq(payments.userId, userId))
      .orderBy(desc(payments.createdAt));
  }

  async updatePayment(id: number, data: Partial<InsertPayment>): Promise<Payment | undefined> {
    const result = await db.update(payments)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(payments.id, id))
      .returning();
    return result[0];
  }

  // Subscription operations
  async createSubscription(subscription: InsertSubscription): Promise<Subscription> {
    const result = await db.insert(subscriptions).values(subscription).returning();
    return result[0];
  }

  async getSubscription(id: number): Promise<Subscription | undefined> {
    const result = await db.select().from(subscriptions).where(eq(subscriptions.id, id)).limit(1);
    return result[0];
  }

  async getSubscriptionByStripeId(stripeSubscriptionId: string): Promise<Subscription | undefined> {
    const result = await db.select().from(subscriptions)
      .where(eq(subscriptions.stripeSubscriptionId, stripeSubscriptionId)).limit(1);
    return result[0];
  }

  async getUserSubscriptions(userId: number): Promise<Subscription[]> {
    return await db.select().from(subscriptions)
      .where(eq(subscriptions.userId, userId))
      .orderBy(desc(subscriptions.createdAt));
  }

  async getAllSubscriptions(): Promise<Subscription[]> {
    return await db.select().from(subscriptions)
      .orderBy(desc(subscriptions.createdAt));
  }

  async updateSubscription(id: number, data: Partial<InsertSubscription>): Promise<Subscription | undefined> {
    const result = await db.update(subscriptions)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(subscriptions.id, id))
      .returning();
    return result[0];
  }

  // Invoice operations
  async createInvoice(invoice: InsertInvoice): Promise<Invoice> {
    const result = await db.insert(invoices).values(invoice).returning();
    return result[0];
  }

  async getInvoice(id: number): Promise<Invoice | undefined> {
    const result = await db.select().from(invoices).where(eq(invoices.id, id)).limit(1);
    return result[0];
  }

  async getInvoiceByStripeId(stripeInvoiceId: string): Promise<Invoice | undefined> {
    const result = await db.select().from(invoices)
      .where(eq(invoices.stripeInvoiceId, stripeInvoiceId)).limit(1);
    return result[0];
  }

  async getUserInvoices(userId: number): Promise<Invoice[]> {
    return await db.select().from(invoices)
      .where(eq(invoices.userId, userId))
      .orderBy(desc(invoices.createdAt));
  }

  async updateInvoice(id: number, data: Partial<InsertInvoice>): Promise<Invoice | undefined> {
    const result = await db.update(invoices)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(invoices.id, id))
      .returning();
    return result[0];
  }

  // Email verification token operations
  async createEmailVerificationToken(userId: number, email: string): Promise<EmailVerificationToken> {
    const token = randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    const result = await db.insert(emailVerificationTokens).values({
      userId,
      token,
      email,
      expiresAt
    }).returning();
    
    return result[0];
  }

  async getEmailVerificationToken(token: string): Promise<EmailVerificationToken | undefined> {
    const result = await db.select().from(emailVerificationTokens)
      .where(eq(emailVerificationTokens.token, token))
      .limit(1);
    
    const verification = result[0];
    if (!verification || verification.expiresAt < new Date()) {
      if (verification) {
        await this.deleteEmailVerificationToken(token);
      }
      return undefined;
    }
    return verification;
  }

  async verifyEmailToken(token: string): Promise<boolean> {
    const verification = await this.getEmailVerificationToken(token);
    if (!verification) return false;

    // Update user's email verification status
    const result = await db.update(users)
      .set({ emailVerified: true, updatedAt: new Date() })
      .where(eq(users.id, verification.userId))
      .returning();

    if (result.length > 0) {
      await this.deleteEmailVerificationToken(token);
      return true;
    }

    return false;
  }

  async deleteEmailVerificationToken(token: string): Promise<void> {
    await db.delete(emailVerificationTokens).where(eq(emailVerificationTokens.token, token));
  }

  // Package tracking operations
  async trackPackageView(data: InsertPackageViewTracking): Promise<PackageViewTracking> {
    const result = await db.insert(packageViewTracking).values(data).returning();
    return result[0];
  }

  async getPackageViewsForUser(userId: number): Promise<PackageViewTracking[]> {
    return await db.select().from(packageViewTracking)
      .where(eq(packageViewTracking.userId, userId))
      .orderBy(desc(packageViewTracking.createdAt));
  }

  async getMostViewedPackageForUser(userId: number): Promise<PackageViewTracking | undefined> {
    const userViews = await this.getPackageViewsForUser(userId);
    
    if (userViews.length === 0) return undefined;
    
    // Group by package type and sum view counts and durations
    const packageStats = new Map<string, { count: number; totalDuration: number; latest: PackageViewTracking }>();
    
    for (const view of userViews) {
      const existing = packageStats.get(view.packageType);
      if (existing) {
        existing.count += (view.viewCount || 1);
        existing.totalDuration += (view.viewDuration || 0);
        if (view.createdAt && (!existing.latest.createdAt || view.createdAt > existing.latest.createdAt)) {
          existing.latest = view;
        }
      } else {
        packageStats.set(view.packageType, {
          count: view.viewCount || 1,
          totalDuration: view.viewDuration || 0,
          latest: view
        });
      }
    }
    
    // Find package with highest engagement (combination of views and time spent)
    let bestPackage: PackageViewTracking | undefined;
    let bestScore = 0;
    
    for (const [packageType, stats] of packageStats) {
      const score = stats.count * 10 + stats.totalDuration; // Weight views more than duration
      if (score > bestScore) {
        bestScore = score;
        bestPackage = stats.latest;
      }
    }
    
    return bestPackage;
  }

  async updateLastReminderSent(userId: number, packageType: string): Promise<void> {
    await db.update(packageViewTracking)
      .set({ lastReminderSent: new Date(), updatedAt: new Date() })
      .where(and(
        eq(packageViewTracking.userId, userId),
        eq(packageViewTracking.packageType, packageType)
      ));
  }


}

// Use database storage in production, memory storage for development/testing
export const storage = process.env.DATABASE_URL ? new DatabaseStorage() : new MemStorage();