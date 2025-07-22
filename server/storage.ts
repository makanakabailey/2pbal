import { 
  users, 
  userSessions, 
  quotes, 
  userProjects,
  type User, 
  type InsertUser, 
  type LoginData,
  type SignupData,
  type ProfileUpdate,
  type UserSession,
  type Quote, 
  type InsertQuote,
  type UserProject,
  type InsertProject 
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(userData: SignupData): Promise<User>;
  updateUser(id: number, userData: ProfileUpdate): Promise<User | undefined>;
  loginUser(credentials: LoginData): Promise<{ user: User; session: UserSession } | null>;
  
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
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(userData: SignupData): Promise<User> {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    
    const [user] = await db
      .insert(users)
      .values({
        email: userData.email,
        password: hashedPassword,
        firstName: userData.firstName,
        lastName: userData.lastName,
        company: userData.company,
        phone: userData.phone,
        marketingConsent: userData.marketingConsent || false,
      })
      .returning();
    
    return user;
  }

  async updateUser(id: number, userData: ProfileUpdate): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set({
        ...userData,
        updatedAt: new Date(),
        profileComplete: true,
      })
      .where(eq(users.id, id))
      .returning();
    
    return user || undefined;
  }

  async loginUser(credentials: LoginData): Promise<{ user: User; session: UserSession } | null> {
    const user = await this.getUserByEmail(credentials.email);
    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
    if (!isPasswordValid) return null;

    // Update last login
    await db
      .update(users)
      .set({ lastLogin: new Date() })
      .where(eq(users.id, user.id));

    const session = await this.createSession(user.id);
    return { user, session };
  }

  async createSession(userId: number): Promise<UserSession> {
    const sessionId = randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    const [session] = await db
      .insert(userSessions)
      .values({
        id: sessionId,
        userId,
        expiresAt,
      })
      .returning();
    
    return session;
  }

  async getSession(sessionId: string): Promise<UserSession | undefined> {
    const [session] = await db
      .select()
      .from(userSessions)
      .where(eq(userSessions.id, sessionId));
    
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

  async createQuote(quoteData: InsertQuote): Promise<Quote> {
    const [quote] = await db
      .insert(quotes)
      .values(quoteData)
      .returning();
    
    return quote;
  }

  async getQuotes(userId?: number): Promise<Quote[]> {
    if (userId) {
      return await db
        .select()
        .from(quotes)
        .where(eq(quotes.userId, userId))
        .orderBy(desc(quotes.createdAt));
    }
    
    return await db
      .select()
      .from(quotes)
      .orderBy(desc(quotes.createdAt));
  }

  async getQuote(id: number): Promise<Quote | undefined> {
    const [quote] = await db.select().from(quotes).where(eq(quotes.id, id));
    return quote || undefined;
  }

  async createProject(projectData: InsertProject): Promise<UserProject> {
    const [project] = await db
      .insert(userProjects)
      .values(projectData)
      .returning();
    
    return project;
  }

  async getUserProjects(userId: number): Promise<UserProject[]> {
    return await db
      .select()
      .from(userProjects)
      .where(eq(userProjects.userId, userId))
      .orderBy(desc(userProjects.createdAt));
  }

  async getProject(id: number): Promise<UserProject | undefined> {
    const [project] = await db.select().from(userProjects).where(eq(userProjects.id, id));
    return project || undefined;
  }

  async updateProject(id: number, data: Partial<InsertProject>): Promise<UserProject | undefined> {
    const [project] = await db
      .update(userProjects)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(userProjects.id, id))
      .returning();
    
    return project || undefined;
  }
}

export const storage = new DatabaseStorage();