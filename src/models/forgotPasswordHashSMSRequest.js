class forgotPasswordHashSMSRequest {
    constructor(phone, hash, name) {
        this.phone = phone;
        this.hash = hash;
        this.name = name;
    }
  
    static validate(data) {
      if (!data.phone || typeof data.phone !== 'string' || !/^\d{10}$/.test(data.phone)) {
          throw new Error('Phone number is required and must be a valid 10-digit number.');
        }
        if (!data.hash || typeof data.hash !== 'string') {
          throw new Error('Invalid hash format. Hash must be a string.');
        }
        if (!data.name || typeof data.name !== 'string') {
            throw new Error('Name is required and must be a string.');
        }
    }
  }
  
  module.exports = forgotPasswordHashSMSRequest;