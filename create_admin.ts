import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import bcrypt from 'bcryptjs';
import ws from "ws";
import * as schema from "./shared/schema.ts";
import { eq } from 'drizzle-orm';

neonConfig.webSocketConstructor = ws;

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle({ client: pool, schema });

async function createAdmin() {
  try {
    const email = 'mkanakabailey@gmail.com';
    const password = 'admin123';
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // Check if admin already exists
    const existingUser = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.email, email))
      .limit(1);
    
    if (existingUser.length > 0) {
      console.log('Admin user already exists with email:', email);
      // Update the existing user to admin role
      await db
        .update(schema.users)
        .set({
          password: hashedPassword,
          role: 'admin',
          emailVerified: true,
          isActive: true,
          updatedAt: new Date()
        })
        .where(eq(schema.users.email, email));
      console.log('Updated existing user to admin role');
    } else {
      // Create new admin user
      const newAdmin = await db
        .insert(schema.users)
        .values({
          email: email,
          password: hashedPassword,
          firstName: 'Admin',
          lastName: 'User',
          role: 'admin',
          emailVerified: true,
          isActive: true,
          profileComplete: true
        })
        .returning();
      
      console.log('Created new admin user:', newAdmin[0].email);
    }
    
    console.log('Admin account setup completed successfully!');
    console.log('Email:', email);
    console.log('Password: [PROTECTED]');
    
  } catch (error) {
    console.error('Error creating admin account:', error);
  } finally {
    await pool.end();
  }
}

createAdmin();