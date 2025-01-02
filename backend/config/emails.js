import {
	PASSWORD_RESET_REQUEST_TEMPLATE,
	PASSWORD_RESET_SUCCESS_TEMPLATE,
	VERIFICATION_EMAIL_TEMPLATE,
} from "./emailTemplates.js";
import { transporter, sender } from "./nodemailer.js";

export const sendVerificationEmail = async (email, verificationToken) => {
	const mailOptions = {
		from: `${sender.name} <${sender.email}>`,
		to: email,
		subject: "Verify your email",
		html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
	};

	try {
		const info = await transporter.sendMail(mailOptions);
		console.log("Email sent successfully", info);
	} catch (error) {
		console.error(`Error sending verification email:`, error);
		throw new Error(`Error sending verification email: ${error.message}`);
	}
};

export const sendWelcomeEmail = async (email, name) => {
	const mailOptions = {
		from: `${sender.name} <${sender.email}>`,
		to: email,
		subject: "Welcome to Our App!",
		html: `<h1>Welcome ${name}!</h1><p>Thank you for joining our platform.</p>`
	};

	try {
		const info = await transporter.sendMail(mailOptions);
		console.log("Welcome email sent successfully", info);
	} catch (error) {
		console.error(`Error sending welcome email:`, error);
		throw new Error(`Error sending welcome email: ${error.message}`);
	}
};

export const sendPasswordResetEmail = async (email, resetURL) => {
	const mailOptions = {
		from: `${sender.name} <${sender.email}>`,
		to: email,
		subject: "Reset your password",
		html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
	};

	try {
		const info = await transporter.sendMail(mailOptions);
		console.log("Password reset email sent successfully", info);
	} catch (error) {
		console.error(`Error sending password reset email:`, error);
		throw new Error(`Error sending password reset email: ${error.message}`);
	}
};

export const sendResetSuccessEmail = async (email) => {
	const mailOptions = {
		from: `${sender.name} <${sender.email}>`,
		to: email,
		subject: "Password Reset Successful",
		html: PASSWORD_RESET_SUCCESS_TEMPLATE,
	};

	try {
		const info = await transporter.sendMail(mailOptions);
		console.log("Password reset success email sent successfully", info);
	} catch (error) {
		console.error(`Error sending password reset success email:`, error);
		throw new Error(`Error sending password reset success email: ${error.message}`);
	}
};