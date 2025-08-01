/**
 * Database Configuration Utility
 * 
 * This module provides flexible database connection handling that can switch
 * between Replit PostgreSQL and Neon PostgreSQL based on environment configuration.
 * 
 * Environment Variables:
 * - DATABASE_URL: Full connection string (takes precedence)
 * - DB_PROVIDER: 'replit' | 'neon' (fallback if DATABASE_URL not set)
 * - NEON_DATABASE_URL: Neon-specific connection string
 */

import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

// Configure WebSocket constructor for Neon
neonConfig.webSocketConstructor = ws;

/**
 * Determines which database provider to use and returns appropriate configuration
 */
function getDatabaseConfig() {
  // If DATABASE_URL is set, use it directly (Replit auto-configuration)
  if (process.env.DATABASE_URL) {
    return {
      provider: 'replit',
      connectionString: process.env.DATABASE_URL,
      description: 'Using Replit PostgreSQL (auto-configured)'
    };
  }

  // If NEON_DATABASE_URL is set, use Neon
  if (process.env.NEON_DATABASE_URL) {
    return {
      provider: 'neon',
      connectionString: process.env.NEON_DATABASE_URL,
      description: 'Using Neon PostgreSQL (cloud-hosted)'
    };
  }

  // If DB_PROVIDER is explicitly set to neon but no URL provided
  if (process.env.DB_PROVIDER === 'neon') {
    throw new Error(
      "DB_PROVIDER is set to 'neon' but NEON_DATABASE_URL is not provided. " +
      "Please set NEON_DATABASE_URL or remove DB_PROVIDER to use Replit PostgreSQL."
    );
  }

  // No database configuration found
  throw new Error(
    "No database configuration found. Please ensure DATABASE_URL is set " +
    "(automatically provided by Replit) or configure NEON_DATABASE_URL for Neon PostgreSQL."
  );
}

// Get database configuration
const dbConfig = getDatabaseConfig();

// Log which database provider is being used
console.log(`[DB] ${dbConfig.description}`);

// Create connection pool and database instance
export const pool = new Pool({ connectionString: dbConfig.connectionString });
export const db = drizzle({ client: pool, schema });
export const databaseProvider = dbConfig.provider;

/**
 * Utility function to get current database status
 */
export function getDatabaseStatus() {
  return {
    provider: databaseProvider,
    description: dbConfig.description,
    hasConnection: !!dbConfig.connectionString
  };
}