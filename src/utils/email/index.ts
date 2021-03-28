import nodemailer from 'nodemailer';
import { Email } from '../../models/email';
import {config} from '../config';

export const SendEmail = async (data: Email) => {
    try {
        console.log("ENVIANDO MENSAJE.........");

        await nodemailer.createTestAccount();

        const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        service: "gmail",
        requireTLS: true,
        secure: true, // true for 465, false for other ports
        tls: { rejectUnauthorized: false },
        auth: {
            user: config.CORREO_GMAIL, // generated ethereal user
            pass: config.CLAVE_GMAIL, // generated ethereal password
        },
        });

        const info = await transporter.sendMail({
        from: `${data.from}`, // sender address
        to: `${data.to}`, // list of receivers
        subject: `${data.subject}`, // Subject line
        text: `${data.text}`, // plain text body
        html: `<h1>VETERINARIA "El mundo de los animales"</h1>
                <p>${data.text}</p>`, // html body
        });

        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    } catch (error) {
        console.log(error.message);
        return false;
    }
}