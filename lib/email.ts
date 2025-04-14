import nodemailer from "nodemailer"
import logger from "./logger"

// Создание транспорта для отправки писем
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_SERVER,
  port: Number(process.env.SMTP_PORT),
  secure: true, // Use SSL
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
})

// Интерфейс для письма
interface EmailOptions {
  to: string | string[]
  subject: string
  text?: string
  html?: string
  attachments?: any[]
}

// Отправка письма
export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM || "noreply@ugai.tech",
      ...options,
    }

    const info = await transporter.sendMail(mailOptions)
    logger.info(`Email sent: ${info.messageId}`)
    return true
  } catch (error) {
    logger.error(`Error sending email: ${error.message}`)
    return false
  }
}

// Отправка письма для подтверждения регистрации
export async function sendRegistrationEmail(to: string, name: string, confirmationLink: string): Promise<boolean> {
  const subject = "Подтверждение регистрации в UGAI"
  const html = `
    <h1>Добро пожаловать в UGAI, ${name}!</h1>
    <p>Спасибо за регистрацию в нашей системе.</p>
    <p>Для подтверждения вашего email, пожалуйста, перейдите по следующей ссылке:</p>
    <p><a href="${confirmationLink}">Подтвердить регистрацию</a></p>
    <p>Если вы не регистрировались в UGAI, просто проигнорируйте это письмо.</p>
    <p>С уважением,<br>Команда UGAI</p>
  `

  return sendEmail({ to, subject, html })
}

// Отправка письма для сброса пароля
export async function sendPasswordResetEmail(to: string, name: string, resetLink: string): Promise<boolean> {
  const subject = "Сброс пароля в UGAI"
  const html = `
    <h1>Здравствуйте, ${name}!</h1>
    <p>Вы запросили сброс пароля в системе UGAI.</p>
    <p>Для создания нового пароля, пожалуйста, перейдите по следующей ссылке:</p>
    <p><a href="${resetLink}">Сбросить пароль</a></p>
    <p>Если вы не запрашивали сброс пароля, просто проигнорируйте это письмо.</p>
    <p>С уважением,<br>Команда UGAI</p>
  `

  return sendEmail({ to, subject, html })
}

// Отправка уведомления
export async function sendNotificationEmail(
  to: string,
  name: string,
  title: string,
  message: string,
  link?: string,
): Promise<boolean> {
  const subject = `Уведомление: ${title}`
  const html = `
    <h1>Здравствуйте, ${name}!</h1>
    <p>${message}</p>
    ${link ? `<p><a href="${link}">Подробнее</a></p>` : ""}
    <p>С уважением,<br>Команда UGAI</p>
  `

  return sendEmail({ to, subject, html })
}

export default {
  sendEmail,
  sendRegistrationEmail,
  sendPasswordResetEmail,
  sendNotificationEmail,
}
