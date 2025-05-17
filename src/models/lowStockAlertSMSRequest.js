class lowStockAlertSMSRequest {
    constructor(name, product, storage, amount, min_amount, phone) {
        this.name = name;
        this.product = product;
        this.storage = storage;
        this.amount = amount;
        this.min_amount = min_amount;
        this.phone = phone;
    }

    static validate(data) {
        if (!data.phone || typeof data.phone !== 'string' || !/^\d{10}$/.test(data.phone)) {
            throw new Error('Phone number is required and must be a valid 10-digit number.');
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

module.exports = lowStockAlertSMSRequest;