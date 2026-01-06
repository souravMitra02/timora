import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, 
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS,
  },
});


export async function sendMail(to: string, subject: string, html: string) {
  await transporter.sendMail({
    from: `"Timora" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
}


