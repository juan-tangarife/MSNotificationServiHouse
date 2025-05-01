class forgotPasswordHashEmailRequest {
    constructor(email, hash, name) {
        this.email = email;
        this.hash = hash;
        this.name = name
    }
  
    static validate(data) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!data.email || typeof data.email !== 'string' || !emailRegex.test(data.email)) {
          throw new Error('Email is required and must be a valid email address.');
        }
      if (!data.hash || typeof data.hash !== 'string') {
          throw new Error('Invalid hash format. Hash must be a string.');
        }
        if (!data.name || typeof data.name !== 'string') {
            throw new Error('Name is required and must be a string.');
        }
    }
  }
  
  module.exports = forgotPasswordHashEmailRequest;