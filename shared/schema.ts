import {
  pgTable,
  varchar,
  text,
  integer,
  timestamp,
  serial,
  jsonb,
  boolean,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  firstName: varchar("first_name", { length: 100 }),
  lastName: varchar("last_name", { length: 100 }),
  company: varchar("company", { length: 200 }),
  phone: varchar("phone", { length: 20 }),
  jobTitle: varchar("job_title", { length: 150 }),
  industry: varchar("industry", { length: 100 }),
  companySize: varchar("company_size", { length: 50 }),
  website: varchar("website", { length: 255 }),
  address: text("address"),
  businessGoals: text("business_goals"),
  currentChallenges: text("current_challenges"),
  preferredBudget: varchar("preferred_budget", { length: 50 }),
  projectTimeline: varchar("project_timeline", { length: 50 }),
  referralSource: varchar("referral_source", { length: 100 }),
  marketingConsent: boolean("marketing_consent").default(false),
  profileComplete: boolean("profile_complete").default(false),
  isActive: boolean("is_active").default(true),
  lastLogin: timestamp("last_login"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const userSessions = pgTable("user_sessions", {
  id: varchar("id").primaryKey(),
  userId: integer("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const quotes = pgTable("quotes", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  phone: text("phone"),
  goals: jsonb("goals").$type<string[]>().notNull(),
  overspending: jsonb("overspending").$type<string[]>().notNull(),
  outcomes: jsonb("outcomes").$type<string[]>().notNull(),
  projectDescription: text("project_description").notNull(),
  timeline: text("timeline").notNull(),
  attachments: jsonb("attachments").$type<{filename: string, mimetype: string, size: number, data: string}[]>().default([]),
  status: varchar("status", { length: 50 }).default("pending"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const userProjects = pgTable("user_projects", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  name: varchar("name", { length: 200 }).notNull(),
  description: text("description"),
  services: jsonb("services").default([]),
  packageType: varchar("package_type", { length: 100 }),
  totalCost: integer("total_cost").default(0),
  paidAmount: integer("paid_amount").default(0),
  status: varchar("status", { length: 50 }).default("planning"),
  progress: integer("progress").default(0),
  startDate: timestamp("start_date"),
  estimatedCompletion: timestamp("estimated_completion"),
  milestones: jsonb("milestones").default([]),
  timeline: jsonb("timeline").default([]),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Validation schemas
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const signupSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  company: z.string().optional(),
  phone: z.string().optional(),
  marketingConsent: z.boolean().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const profileUpdateSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  company: z.string().optional(),
  phone: z.string().optional(),
  jobTitle: z.string().optional(),
  industry: z.string().optional(),
  companySize: z.string().optional(),
  website: z.string().optional(),
  address: z.string().optional(),
  businessGoals: z.string().optional(),
  currentChallenges: z.string().optional(),
  preferredBudget: z.string().optional(),
  projectTimeline: z.string().optional(),
  referralSource: z.string().optional(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  lastLogin: true,
});

export const insertQuoteSchema = createInsertSchema(quotes).omit({
  id: true,
  createdAt: true,
});

export const insertProjectSchema = createInsertSchema(userProjects).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type LoginData = z.infer<typeof loginSchema>;
export type SignupData = z.infer<typeof signupSchema>;
export type ProfileUpdate = z.infer<typeof profileUpdateSchema>;
export type UserSession = typeof userSessions.$inferSelect;
export type Quote = typeof quotes.$inferSelect;
export type InsertQuote = z.infer<typeof insertQuoteSchema>;
export type UserProject = typeof userProjects.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;