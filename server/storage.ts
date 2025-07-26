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
  type AccountDeletion
} from "@shared/schema";
import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(userData: SignupData): Promise<User>;
  updateUser(id: number, userData: ProfileUpdate): Promise<User | undefined>;
  loginUser(credentials: LoginData): Promise<{ user: User; session: UserSession } | null>;
  deleteUser(id: number, password: string): Promise<boolean>;
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
  private nextUserId = 1;
  private nextQuoteId = 1;
  private nextProjectId = 1;
  private nextActivityId = 1;
  
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
      name: quoteData.name,
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
    for (const [sessionId, session] of this.sessions.entries()) {
      if (session.userId === id) {
        sessionsToDelete.push(sessionId);
      }
    }
    sessionsToDelete.forEach(sessionId => this.sessions.delete(sessionId));
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
}

export const storage = new MemStorage();