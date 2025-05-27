const verifyEmailCodeRequest = require('../models/verifyEmailCodeRequest');
const { PrismaClient } = require('@prisma/client'); //Importamos el cliente de prisma
const prisma = new PrismaClient(); //Creamos una instancia de prisma
const forgotPasswordHashEmailRequest = require('../models/forgotPasswordHashEmailRequest');
const sendEmail = require('../middlewares/email'); //Importamos la función de envío de correo electrónico
const verifyToken = require('../middlewares/auth'); //Importamos la función de verificación de token
const lowStockAlertEmailRequest = require('../models/lowStockAlertEmailRequest');
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
        lowStockAlertEmailRequest.validate(req.body);
        const { email, name, product, storage, amount, min_amount } = req.body;
        const templateData = await prisma.mailTemplates.findFirst({
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
        templateData.template = templateData.body.replace(/{{name}}/g, name)
            .replace(/{{product}}/g, product)
            .replace(/{{storage}}/g, storage)
            .replace(/{{amount}}/g, amount)
            .replace(/{{min_amount}}/g, min_amount);
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

const sendOrderAssigned = async (req, res) => {
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
        const { email, order_number, name } = req.body;
        const templateData = await prisma.mailTemplates.findFirst({
            where: {
                event: 'ORDERASSIGNED',
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
        templateData.template = templateData.body.replace(/{{order_number}}/g, order_number)
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

const sendOrderCreated = async (req, res) => {
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
        const { email, order_number, name } = req.body;
        const templateData = await prisma.mailTemplates.findFirst({
            where: {
                event: 'CONFIRMORDER',
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
        const order = await prisma.order.findUnique({
            where: {
                order_number: order_number
            },
            include:{
                stockTransactions: {
                    include: {
                        Stock: {
                            include: {
                                Product: true
                            }
                        }
                    }
                },
                delivery:true
            }
        })
        let productsRows = '';
        if (order && order.stockTransactions && order.stockTransactions.length > 0) {
            productsRows = order.stockTransactions.map(tx => `
                <tr>
                  <td>${tx.Stock.Product.name ? tx.Stock.Product.name : 'N/A'}</td>
                  <td style="text-align: right;">${tx.amount}</td>
                </tr>
            `).join('');
        } else {
            productsRows = `<tr><td colspan="2">No products found</td></tr>`;
        }
        console.log(JSON.stringify(order))
        const deliveryName = order && order.delivery ? order.delivery.full_name : 'N/A';
        const deliveryEmail = order && order.delivery ? order.delivery.email : 'N/A';

        let html = templateData.body
            .replace(/{{name}}/g, name)
            .replace('{{#each products}}', '')
            .replace('{{/each}}', '')
            .replace('{{delivery.name}}', deliveryName)
            .replace('{{delivery.email}}', deliveryEmail)
            .replace('{{order_number}}', order_number);

        html = html.replace(
            /<tbody>[\s\S]*<\/tbody>/,
            `<tbody>${productsRows}</tbody>`
        );

        templateData.template = html;
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
    sendVerifyCode, send2FACode, sendForgotPasswordHash, sendRestorePasswordHash, sendLowStockAlert, sendOrderAssigned,
    sendOrderCreated
};