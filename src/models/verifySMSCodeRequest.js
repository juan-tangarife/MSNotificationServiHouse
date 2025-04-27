class verifySMSCodeRequest {
    constructor(phone, code, name) {
      this.phone = phone;
      this.code = code;
      this.name = name;
    }
  
    static validate(data) {
      if (!data.phone || typeof data.phone !== 'string' || !/^\d{10}$/.test(data.phone)) {
        throw new Error('Phone number is required and must be a valid 10-digit number.');
      }
        if (!data.code || typeof data.code !== 'string' || data.code.length !== 6) {
          throw new Error('Invalid code format. Code must be a 6-digit string.');
        }
          if (!data.name || typeof data.name !== 'string') {
              throw new Error('Name is required and must be a string.');
          }
    }
  }
  
  module.exports = verifySMSCodeRequest;