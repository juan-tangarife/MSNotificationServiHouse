class newPasswordRequest {
    constructor(email, name, new_password) {
        this.email = email;
        this.name = name;
        this.new_password = new_password;
    }
  
    static validate(data) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!data.email || typeof data.email !== 'string' || !emailRegex.test(data.email)) {
          throw new Error('Email is required and must be a valid email address.');
        }
      if (!data.new_password || typeof data.new_password !== 'string') {
          throw new Error('Invalid New Password format. New Password must be a string.');
        }
        if (!data.name || typeof data.name !== 'string') {
            throw new Error('Name is required and must be a string.');
        }
    }
  }
  
  module.exports = newPasswordRequest;