import nodemailer from 'nodemailer';

interface IMailContact {
  name: string;
  email: string;
}

interface ISendMail {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  body: string;
}

export default class EtherealMail {
  public static async sendMail({
    to,
    from,
    subject,
    body,
  }: ISendMail): Promise<void> {
    const account = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });

    const message = await transporter.sendMail({
      from: {
        name: from?.name || 'Support API Vendas',
        address: from?.email || 'support@apivedas.com',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject: subject || 'Reset account password',
      text: body,
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}
