// User Model
// This is a sample model structure
// In a real application, you would connect this to a database

class User {
  constructor(id, name, email, createdAt = new Date()) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.createdAt = createdAt;
  }

  // Convert to JSON
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      createdAt: this.createdAt
    };
  }

  // Validate user data
  static validate(userData) {
    const errors = [];
    
    if (!userData.name || userData.name.trim().length === 0) {
      errors.push("Name is required");
    }
    
    if (!userData.email || !this.isValidEmail(userData.email)) {
      errors.push("Valid email is required");
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  static isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

// In-memory storage (replace with database in production)
let users = [];
let nextId = 1;

// User Repository Methods
export const UserRepository = {
  // Get all users
  findAll() {
    return users.map(user => user.toJSON());
  },

  // Find user by ID
  findById(id) {
    const user = users.find(u => u.id === parseInt(id));
    return user ? user.toJSON() : null;
  },

  // Create new user
  create(userData) {
    const validation = User.validate(userData);
    if (!validation.isValid) {
      throw new Error(validation.errors.join(", "));
    }

    const user = new User(nextId++, userData.name, userData.email);
    users.push(user);
    return user.toJSON();
  },

  // Update user
  update(id, userData) {
    const userIndex = users.findIndex(u => u.id === parseInt(id));
    if (userIndex === -1) {
      return null;
    }

    const validation = User.validate({ ...users[userIndex], ...userData });
    if (!validation.isValid) {
      throw new Error(validation.errors.join(", "));
    }

    users[userIndex] = {
      ...users[userIndex],
      ...userData
    };
    return users[userIndex].toJSON();
  },

  // Delete user
  delete(id) {
    const userIndex = users.findIndex(u => u.id === parseInt(id));
    if (userIndex === -1) {
      return false;
    }
    users.splice(userIndex, 1);
    return true;
  }
};

export default User;

