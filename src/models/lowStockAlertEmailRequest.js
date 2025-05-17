class lowStockAlertEmailRequest {
    constructor(name, product, storage, amount, min_amount, email) {
        this.name = name;
        this.product = product;
        this.storage = storage;
        this.amount = amount;
        this.min_amount = min_amount;
        this.email = email;
    }
  
    static validate(data) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!data.email || typeof data.email !== 'string' || !emailRegex.test(data.email)) {
          throw new Error('Email is required and must be a valid email address.');
        }
      if (!data.name || typeof data.name !== 'string') {
          throw new Error('Name is required and must be a string.');
      }
      if (!data.product || typeof data.product !== 'string') {
          throw new Error('Product is required and must be a string.');
      }
      if (!data.storage || typeof data.storage !== 'string') {
          throw new Error('Storage is required and must be a string.');
      }
      if (!data.amount || typeof data.amount !== 'number') {
          throw new Error('Amount is required and must be a number.');
      }
      if (!data.min_amount || typeof data.min_amount !== 'number') {
          throw new Error('Minimum amount is required and must be a number.');
      }
    }
  }
  
  module.exports = lowStockAlertEmailRequest;