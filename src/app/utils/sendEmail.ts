import nodemailer from "nodemailer";
import config from "../config";
import AppError from "../errorHelpers/AppError";
import path from "path";
import ejs from "ejs";

const transporter = nodemailer.createTransport({
  host: config.SMTP.SMTP_HOST,
  port: Number(config.SMTP.SMTP_PORT),
  secure: true,
  auth: {
    user: config.SMTP.SMTP_USER,
    pass: config.SMTP.SMTP_PASS,
  },
});

interface sendEmailResponse {
  to: string;
  subject: string;
  templateName: string;
  templateData?: Record<string, any>;
  attachments?: {
    filename: string;
    content: Buffer | string;
    contentType: string;
  }[];
}

export const sendEmail = async ({
  to,
  subject,
  templateName,
  templateData,
  attachments,
}: sendEmailResponse) => {
  try {
    const templatePath = path.join(__dirname, `templates/${templateName}.ejs`);
    const html = await ejs.renderFile(templatePath, templateData);
    const info = await transporter.sendMail({
      from: config.SMTP.SMTP_FROM,
      to: to,
      subject: subject,
      html: html,
      attachments: attachments?.map((attachment) => ({
        filename: attachment.filename,
        content: attachment.content,
        contentType: attachment.contentType,
      })),
    });
    console.log(`\u2709\uFE0F Email sent to ${to}: ${info.messageId}`);
  } catch (error: any) {
    console.log("Email sending failed:", error.message);
    throw new AppError(401, "Email sending failed");
  }
};
