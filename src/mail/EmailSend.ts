import nodemailer from 'nodemailer';

interface ISendMail {
    to: string;
    body: string;
}

export default class EmailSend {
    static async sendEmail({ to, body }: ISendMail) {
        const account = await nodemailer.createTestAccount();

        const tranporter = nodemailer.createTransport({
            host: account.smtp.host,
            port: account.smtp.port,
            secure: account.smtp.secure,
            auth: {
                user: account.user,
                pass: account.pass,
            },
        });

        const message = await tranporter.sendMail({
            from: 'equipe@api.com.br',
            to,
            subject: 'Recuperação de senha ',
            text: body,
        });

        console.log('Message sent: %s', message.messageId);

        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
    }
}
