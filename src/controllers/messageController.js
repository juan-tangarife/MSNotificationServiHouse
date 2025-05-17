const verifySMSCodeRequest = require('../models/verifySMSCodeRequest');
const forgotPasswordHashSMSRequest = require('../models/forgotPasswordHashSMSRequest');
const { PrismaClient } = require('@prisma/client'); //Importamos el cliente de prisma
const prisma = new PrismaClient(); //Creamos una instancia de prisma
const { sendSMS } = require('../middlewares/sms');
const verifyToken = require('../middlewares/auth'); //Importamos la función de verificación de token
const lowStockAlertSMSRequest = require('../models/lowStockAlertSMSRequest');
const sendVerifyCode = async (req, res) => {
    try {
       const { message, success } = verifyToken(req);
        if (!success) {
            return res.status(401).json({
                status: false,
                code: 401,
                message: message
            });
        }
        if (!req.body) {
            return res.status(400).json({
                status: false,
                code: 400,
                message: 'Request body is required'
            });
        }
        verifySMSCodeRequest.validate(req.body);
        const { phone, code, name } = req.body;
        const templateData = await prisma.messageTemplates.findFirst({
            where: {
                event: 'USERVERIFICATION',
                isActive: true
            }
        });
        if (!templateData) {
            return res.status(404).json({
                status: false,
                code: 404,
                 message: 'Template for this event not found'
                 });
        }
        templateData.text = templateData.text.replace(/{{code}}/g, code)
                                                 .replace(/{{name}}/g, name);
        const smsSent = await sendSMS(phone, templateData.text);
        if (!smsSent) {
            return res.status(500).json({ 
                status: false,
                code: 500,
                message: 'Failed to send SMS'
             });
        }
        res.status(200).json({
            status: true,
            code: 200,
            message: 'SMS sent successfully',
        });
        
    } catch (error) {
        res.status(500).json({
            status: false,
            code: 500,
            message: 'Failed to send SMS',
            error: error.message
        });
    }
}

const send2FACode = async (req, res) => {
    try {
        const { message, success } = verifyToken(req);
        if (!success) {
            return res.status(401).json({
                status: false,
                code: 401,
                message: message
            });
        }
        if (!req.body) {
            return res.status(400).json({
                status: false,
                code: 400,
                message: 'Request body is required'
            });
        }
        verifySMSCodeRequest.validate(req.body);
        const { phone, code, name } = req.body;
        const templateData = await prisma.messageTemplates.findFirst({
            where: {
                event: '2FA',
                isActive: true
            }
        });
        if (!templateData) {
            return res.status(404).json({
                status: false,
                code: 404,
                 message: 'Template for this event not found'
                 });
        }
        templateData.text = templateData.text.replace(/{{code}}/g, code)
                                                 .replace(/{{name}}/g, name);
        const smsSent = await sendSMS(phone, templateData.text);
        if (!smsSent) {
            return res.status(500).json({ 
                status: false,
                code: 500,
                message: 'Failed to send SMS'
             });
        }
        res.status(200).json({
            status: true,
            code: 200,
            message: 'SMS sent successfully',
        });
        
    } catch (error) {
        res.status(500).json({
            status: false,
            code: 500,
            message: 'Failed to send SMS',
            error: error.message
        });
    }
}

const sendForgotPasswordHash = async (req, res) => {
    try {
        const { message, success } = verifyToken(req);
        if (!success) {
            return res.status(401).json({
                status: false,
                code: 401,
                message: message
            });
        }

        if (!req.body) {
            return res.status(400).json({
                status: false,
                code: 400,
                message: 'Request body is required'
            });
        }
        forgotPasswordHashSMSRequest.validate(req.body);
        const { phone, hash, name } = req.body;
        const templateData = await prisma.messageTemplates.findFirst({
            where: {
                event: 'FORGOTPASS',
                isActive: true
            }
        });
        if (!templateData) {
            return res.status(404).json({
                status: false,
                code: 404,
                 message: 'Template for this event not found'
                 });
        }
        templateData.text = templateData.text.replace(/{{hash}}/g, hash)
                                                 .replace(/{{name}}/g, name);
        const smsSent = await sendSMS(phone, templateData.text);
        if (!smsSent) {
            return res.status(500).json({ 
                status: false,
                code: 500,
                message: 'Failed to send SMS'
             });
        }
        res.status(200).json({
            status: true,
            code: 200,
            message: 'SMS sent successfully',
        });

    } catch (error) {
        res.status(500).json({
            status: false,
            code: 500,
            message: 'Failed to send SMS',
            error: error.message
        });
    }
}

const sendRestorePasswordHash = async (req, res) => {
    try {
        const { message, success } = verifyToken(req);
        if (!success) {
            return res.status(401).json({
                status: false,
                code: 401,
                message: message
            });
        }
        if (!req.body) {
            return res.status(400).json({
                status: false,
                code: 400,
                message: 'Request body is required'
            });
        }
        forgotPasswordHashSMSRequest.validate(req.body);
        const { phone, hash, name } = req.body;
        const templateData = await prisma.messageTemplates.findFirst({
            where: {
                event: 'RESTOREPASS',
                isActive: true
            }
        });
        if (!templateData) {
            return res.status(404).json({
                status: false,
                code: 404,
                 message: 'Template for this event not found'
                 });
        }
        templateData.text = templateData.text.replace(/{{hash}}/g, hash)
                                                 .replace(/{{name}}/g, name);
        const smsSent = await sendSMS(phone, templateData.text);
        if (!smsSent) {
            return res.status(500).json({ 
                status: false,
                code: 500,
                message: 'Failed to send SMS'
             });
        }
        res.status(200).json({
            status: true,
            code: 200,
            message: 'SMS sent successfully',
        });

    } catch (error) {
        res.status(500).json({
            status: false,
            code: 500,
            message: 'Failed to send SMS',
            error: error.message
        });
    }
}

const sendLowStockAlert = async (req, res) => {
    try {
        const { message, success } = verifyToken(req);
        if (!success) {
            return res.status(401).json({
                status: false,
                code: 401,
                message: message
            });
        }
        if (!req.body) {
            return res.status(400).json({
                status: false,
                code: 400,
                message: 'Request body is required'
            });
        }
        lowStockAlertSMSRequest.validate(req.body);
        const { name, product, storage, amount, min_amount, phone } = req.body;
        const templateData = await prisma.messageTemplates.findFirst({
            where: {
                event: 'LOWSTOCKALERT',
                isActive: true
            }
        });
        if (!templateData) {
            return res.status(404).json({
                status: false,
                code: 404,
                 message: 'Template for this event not found'
                 });
        }
        templateData.text = templateData.text.replace(/{{name}}/g, name)
                                                 .replace(/{{product}}/g, product)
                                                 .replace(/{{storage}}/g, storage)
                                                 .replace(/{{amount}}/g, amount)
                                                 .replace(/{{min_amount}}/g, min_amount);
        const smsSent = await sendSMS(phone, templateData.text);
        if (!smsSent) {
            return res.status(500).json({ 
                status: false,
                code: 500,
                message: 'Failed to send SMS'
             });
        }
        res.status(200).json({
            status: true,
            code: 200,
            message: 'SMS sent successfully',
        });

    } catch (error) {
        res.status(500).json({
            status: false,
            code: 500,
            message: 'Failed to send SMS',
            error: error.message
        });
    }
}

module.exports = {
    sendVerifyCode, send2FACode, sendForgotPasswordHash, sendRestorePasswordHash, sendLowStockAlert
};

