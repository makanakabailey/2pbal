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
  recommendedPackage: varchar("recommended_package", { length: 100 }),
  recommendationScore: integer("recommendation_score"),
  recommendationReason: text("recommendation_reason"),
  recommendationDate: timestamp("recommendation_date"),
  isActive: boolean("is_active").default(true),
  role: varchar("role", { length: 20 }).default("user"), // user, admin
  avatar: text("avatar"), // Base64 or URL for profile picture
  emailVerified: boolean("email_verified").default(false),
  preferences: jsonb("preferences").$type<{
    theme: string;
    notifications: boolean;
    language: string;
    timezone: string;
  }>().default({ theme: 'light', notifications: true, language: 'en', timezone: 'UTC' }),
  subscription: jsonb("subscription").$type<{
    plan: string;
    status: string;
    startDate: string;
    endDate?: string;
    features: string[];
  }>(),
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

export const emailVerificationTokens = pgTable("email_verification_tokens", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  token: varchar("token", { length: 255 }).unique().notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const packageViewTracking = pgTable("package_view_tracking", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id, { onDelete: "cascade" }),
  sessionId: varchar("session_id", { length: 255 }),
  packageName: varchar("package_name", { length: 100 }).notNull(),
  packageType: varchar("package_type", { length: 100 }).notNull(),
  viewDuration: integer("view_duration"), // in seconds
  pageUrl: varchar("page_url", { length: 500 }),
  userAgent: text("user_agent"),
  lastReminderSent: timestamp("last_reminder_sent"),
  viewCount: integer("view_count").default(1),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const quotes = pgTable("quotes", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id, { onDelete: "cascade" }),
  email: text("email").notNull(),
  company: text("company"),
  phone: text("phone"),
  goals: jsonb("goals").$type<string[]>().notNull(),
  overspending: jsonb("overspending").$type<string[]>().notNull(),
  outcomes: jsonb("outcomes").$type<string[]>().notNull(),
  projectDescription: text("project_description").notNull(),
  timeline: text("timeline").notNull(),
  attachments: jsonb("attachments").$type<{
    filename: string;
    mimetype: string;
    size: number;
    cloudinary_url: string;
    cloudinary_public_id: string;
    upload_date: string;
  }[]>().default([]),
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

export const activityLogs = pgTable("activity_logs", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id, { onDelete: "cascade" }),
  adminId: integer("admin_id").references(() => users.id, { onDelete: "set null" }),
  action: varchar("action", { length: 100 }).notNull(),
  target: varchar("target", { length: 100 }), // user, quote, project, etc.
  targetId: integer("target_id"),
  details: jsonb("details"),
  ipAddress: varchar("ip_address", { length: 45 }),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const emailVerifications = pgTable("email_verifications", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  token: varchar("token", { length: 255 }).unique().notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const payments = pgTable("payments", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  projectId: integer("project_id").references(() => userProjects.id, { onDelete: "cascade" }),
  stripePaymentIntentId: varchar("stripe_payment_intent_id", { length: 255 }),
  stripeCustomerId: varchar("stripe_customer_id", { length: 255 }),
  amount: integer("amount").notNull(), // Amount in cents
  currency: varchar("currency", { length: 3 }).default("usd"),
  status: varchar("status", { length: 50 }).default("pending"), // pending, succeeded, failed, canceled
  paymentMethod: varchar("payment_method", { length: 50 }), // card, apple_pay, google_pay, paypal, bank_transfer
  paymentMethodDetails: jsonb("payment_method_details"),
  description: text("description"),
  metadata: jsonb("metadata"),
  receiptUrl: varchar("receipt_url", { length: 500 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const subscriptions = pgTable("subscriptions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  stripeSubscriptionId: varchar("stripe_subscription_id", { length: 255 }).unique(),
  stripeCustomerId: varchar("stripe_customer_id", { length: 255 }),
  stripePriceId: varchar("stripe_price_id", { length: 255 }),
  status: varchar("status", { length: 50 }).default("active"), // active, canceled, past_due, unpaid
  currentPeriodStart: timestamp("current_period_start"),
  currentPeriodEnd: timestamp("current_period_end"),
  cancelAtPeriodEnd: boolean("cancel_at_period_end").default(false),
  canceledAt: timestamp("canceled_at"),
  packageType: varchar("package_type", { length: 100 }),
  amount: integer("amount"), // Amount in cents per billing period
  currency: varchar("currency", { length: 3 }).default("usd"),
  interval: varchar("interval", { length: 20 }), // month, year
  intervalCount: integer("interval_count").default(1),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const invoices = pgTable("invoices", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  subscriptionId: integer("subscription_id").references(() => subscriptions.id, { onDelete: "cascade" }),
  paymentId: integer("payment_id").references(() => payments.id, { onDelete: "set null" }),
  stripeInvoiceId: varchar("stripe_invoice_id", { length: 255 }).unique(),
  invoiceNumber: varchar("invoice_number", { length: 100 }),
  amount: integer("amount").notNull(), // Amount in cents
  amountPaid: integer("amount_paid").default(0),
  currency: varchar("currency", { length: 3 }).default("usd"),
  status: varchar("status", { length: 50 }).default("draft"), // draft, open, paid, void, uncollectible
  description: text("description"),
  dueDate: timestamp("due_date"),
  paidAt: timestamp("paid_at"),
  hostedInvoiceUrl: varchar("hosted_invoice_url", { length: 500 }),
  invoicePdf: varchar("invoice_pdf", { length: 500 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
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

// Package recommendation system
export const packageRecommendationSchema = z.object({
  packageType: z.string(),
  score: z.number(),
  reason: z.string(),
  factors: z.array(z.object({
    factor: z.string(),
    weight: z.number(),
    value: z.string(),
    impact: z.number()
  }))
});

export const avatarUploadSchema = z.object({
  avatar: z.string().min(1, "Avatar data is required"),
});

export const preferencesUpdateSchema = z.object({
  theme: z.enum(["light", "dark"]).default("light"),
  notifications: z.boolean().default(true),
  language: z.enum(["en", "es", "fr", "de"]).default("en"),
  timezone: z.string().default("UTC"),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(6, "Current password is required"),
  newPassword: z.string().min(6, "New password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Password confirmation is required"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "New passwords don't match",
  path: ["confirmPassword"],
});

export const accountDeletionSchema = z.object({
  password: z.string().min(6, "Password is required to delete account"),
  confirmation: z.literal("DELETE", { errorMap: () => ({ message: "Please type DELETE to confirm" }) }),
});

export const emailVerificationSchema = z.object({
  token: z.string().min(1, "Verification token is required"),
});

// Payment schemas
export const createPaymentIntentSchema = z.object({
  amount: z.number().min(1, "Amount must be greater than 0"),
  currency: z.string().default("usd"),
  serviceId: z.string().optional(),
  planId: z.string().optional(),
  description: z.string().optional(),
  metadata: z.record(z.string()).optional(),
});

export const createSubscriptionSchema = z.object({
  priceId: z.string().min(1, "Price ID is required"),
  packageType: z.string().min(1, "Package type is required"),
  paymentMethod: z.string().optional(),
});

export const updatePaymentSchema = z.object({
  status: z.enum(["pending", "succeeded", "failed", "canceled"]),
  paymentMethod: z.string().optional(),
  receiptUrl: z.string().optional(),
});

export const cancelSubscriptionSchema = z.object({
  subscriptionId: z.string().min(1, "Subscription ID is required"),
  cancelAtPeriodEnd: z.boolean().default(true),
});

// Insert schemas for payment tables
export const insertPaymentSchema = createInsertSchema(payments).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertSubscriptionSchema = createInsertSchema(subscriptions).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertInvoiceSchema = createInsertSchema(invoices).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Types
export type InsertPayment = z.infer<typeof insertPaymentSchema>;
export type Payment = typeof payments.$inferSelect;
export type InsertSubscription = z.infer<typeof insertSubscriptionSchema>;
export type Subscription = typeof subscriptions.$inferSelect;
export type InsertInvoice = z.infer<typeof insertInvoiceSchema>;
export type Invoice = typeof invoices.$inferSelect;

// Insert schemas for new tables
export const insertEmailVerificationTokenSchema = createInsertSchema(emailVerificationTokens).omit({
  id: true,
  createdAt: true,
});

export const insertPackageViewTrackingSchema = createInsertSchema(packageViewTracking).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Types for new tables
export type InsertEmailVerificationToken = z.infer<typeof insertEmailVerificationTokenSchema>;
export type EmailVerificationToken = typeof emailVerificationTokens.$inferSelect;
export type InsertPackageViewTracking = z.infer<typeof insertPackageViewTrackingSchema>;
export type PackageViewTracking = typeof packageViewTracking.$inferSelect;

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
export type ActivityLog = typeof activityLogs.$inferSelect;
export type EmailVerification = typeof emailVerifications.$inferSelect;
export type AvatarUpload = z.infer<typeof avatarUploadSchema>;
export type PreferencesUpdate = z.infer<typeof preferencesUpdateSchema>;
export type ChangePassword = z.infer<typeof changePasswordSchema>;
export type AccountDeletion = z.infer<typeof accountDeletionSchema>;
export type EmailVerificationData = z.infer<typeof emailVerificationSchema>;
export type PackageRecommendation = z.infer<typeof packageRecommendationSchema>;
export type Quote = typeof quotes.$inferSelect;
export type InsertQuote = z.infer<typeof insertQuoteSchema>;
export type UserProject = typeof userProjects.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;