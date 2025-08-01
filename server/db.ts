/**
 * Main Database Connection Module
 * 
 * This module exports the database connection and related utilities.
 * It uses the flexible database configuration system to support both
 * Replit PostgreSQL and Neon PostgreSQL.
 */

export { db, pool, databaseProvider, getDatabaseStatus } from './db-config';