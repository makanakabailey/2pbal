import { storage } from './server/storage.js';

async function createAdmin() {
  try {
    // Try to create admin user
    const adminUser = await storage.createUser({
      email: 'admin@2pbal.com',
      password: 'admin123',
      firstName: 'Admin',
      lastName: 'User'
    });
    
    // Update role to admin
    const updatedUser = await storage.updateUserRole(adminUser.id, 'admin');
    
    console.log('Admin user created successfully:');
    console.log('Email: admin@2pbal.com');
    console.log('Password: admin123');
    console.log('Role:', updatedUser.role);
  } catch (error) {
    console.error('Error creating admin:', error.message);
    
    // If user exists, try to update existing user to admin
    try {
      const users = await storage.getAllUsers();
      const existingUser = users.find(u => u.email === 'admin@2pbal.com');
      
      if (existingUser) {
        await storage.updateUserRole(existingUser.id, 'admin');
        console.log('Updated existing user to admin role');
        console.log('Email: admin@2pbal.com');
        console.log('Try using the password you set when signing up');
      }
    } catch (updateError) {
      console.error('Error updating user:', updateError.message);
    }
  }
}

createAdmin();