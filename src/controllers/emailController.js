const verifyEmailCodeRequest = require('../models/verifyEmailCodeRequest');
const { PrismaClient } = require('@prisma/client'); //Importamos el cliente de prisma
const prisma = new PrismaClient(); //Creamos una instancia de prisma
const forgotPasswordHashEmailRequest = require('../models/forgotPasswordHashEmailRequest');
const  sendEmail = require('../middlewares/email'); //Importamos la función de envío de correo electrónico
const verifyToken = require('../middlewares/auth'); //Importamos la función de verificación de token
require('dotenv').config(); //Cargamos las variables de entorno
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
        verifyEmailCodeRequest.validate(req.body);
        const { email, code, name } = req.body;
        const templateData = await prisma.mailTemplates.findFirst({
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
        templateData.template = templateData.body.replace(/{{code}}/g, code)
                                                 .replace(/{{name}}/g, name);
        const emailSent = await sendEmail(email, templateData.subject, templateData.template);
        if (!emailSent) {
            return res.status(500).json({ 
                status: false,
                code: 500,
                message: 'Failed to send email'
             });
        }
        res.status(200).json({
            status: true,
            code: 200,
            message: 'Email sent successfully',
        });
        
    } catch (error) {
        res.status(500).json({
            status: false,
            code: 500,
            message: 'Failed to send email',
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
        verifyEmailCodeRequest.validate(req.body);
        const { email, code, name } = req.body;
        const templateData = await prisma.mailTemplates.findFirst({
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
        templateData.template = templateData.body.replace(/{{code}}/g, code)
                                                 .replace(/{{name}}/g, name);
        const emailSent = await sendEmail(email, templateData.subject, templateData.template);
        if (!emailSent) {
            return res.status(500).json({ 
                status: false,
                code: 500,
                message: 'Failed to send email'
             });
        }
        res.status(200).json({
            status: true,
            code: 200,
            message: 'Email sent successfully',
        });
        
    } catch (error) {
        res.status(500).json({
            status: false,
            code: 500,
            message: 'Failed to send email',
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
        forgotPasswordHashEmailRequest.validate(req.body);
        const { email, hash, name } = req.body;
        const templateData = await prisma.mailTemplates.findFirst({
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
        templateData.template = templateData.body.replace(/{{hash}}/g, hash)
                                                 .replace(/{{name}}/g, name);
        const emailSent = await sendEmail(email, templateData.subject, templateData.template);
        if (!emailSent) {
            return res.status(500).json({ 
                status: false,
                code: 500,
                message: 'Failed to send email'
             });
        }
        res.status(200).json({
            status: true,
            code: 200,
            message: 'Email sent successfully',
        });
        
    } catch (error) {
        res.status(500).json({
            status: false,
            code: 500,
            message: 'Failed to send email',
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
        forgotPasswordHashEmailRequest.validate(req.body);
        const { email, hash, name } = req.body;
        const templateData = await prisma.mailTemplates.findFirst({
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
        templateData.template = templateData.body.replace(/{{hash}}/g, hash)
                                                 .replace(/{{name}}/g, name);
        const emailSent = await sendEmail(email, templateData.subject, templateData.template);
        if (!emailSent) {
            return res.status(500).json({ 
                status: false,
                code: 500,
                message: 'Failed to send email'
             });
        }
        res.status(200).json({
            status: true,
            code: 200,
            message: 'Email sent successfully',
        });
        
    } catch (error) {
        res.status(500).json({
            status: false,
            code: 500,
            message: 'Failed to send email',
            error: error.message
        });
    }
}


module.exports = {
    sendVerifyCode, send2FACode, sendForgotPasswordHash, sendRestorePasswordHash
};