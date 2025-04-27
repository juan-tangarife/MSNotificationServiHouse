class verifyEmailCodeRequest {
  constructor(email, code, name) {
    this.email = email;
    this.code = code;
    this.name = name;
  }

  static validate(data) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || typeof data.email !== 'string' || !emailRegex.test(data.email)) {
        throw new Error('Email is required and must be a valid email address.');
      }
      if (!data.code || typeof data.code !== 'string' || data.code.length !== 6) {
        throw new Error('Invalid code format. Code must be a 6-digit string.');
      }
        if (!data.name || typeof data.name !== 'string') {
            throw new Error('Name is required and must be a string.');
        }
  }
}

module.exports = verifyEmailCodeRequest;