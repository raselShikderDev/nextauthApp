/* eslint-disable @typescript-eslint/no-explicit-any */
import User from "@/models/userModels";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";

export const sendEmail = async ({ email, emailType, userId }: any) => {
      console.log(`Line no. helpers/mailers.ts/Line-06:- userId: ${userId}`);

  try {
     if (!userId) {
    throw new Error("Invalid userId passed to sendEmail");
  }
    const hashToken = await bcrypt.hash(userId.toString(), 10);
         console.log(`Line no. helpers/mailers.ts/Line-13:- hashToken: ${hashToken}`);

    // todo: configure mail for uses
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hashToken,
        verifyTokenExpirey: Date.now() + 3600000,
        }
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          forgotPasswordToken: hashToken,
        forgotPasswordExpeirey: Date.now() + 3600000,
        }
      });
    }

    // Configuring nodemailer to send mail
    // Looking to send emails in production? Check out our Email API/SMTP product!
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    });

    // Email html for reset Password
    const resetHtml = `<p><a href="${process.env.DOMAIN}/resetpassword?token=${hashToken}">Click here</a> to reset your password or copy and paste link below in your broswer.</br>${process.env.DOMAIN}/resetpassword?token=${hashToken}</p>`;
    // Email html for verify email
    const verifyhtml = `<p><a href="${process.env.DOMAIN}/verifyemail?token=${hashToken}">Click here</a> to Verify Your Email or copy and paste link below in your broswer.</br>${process.env.DOMAIN}/verifyemailtoken?token=${hashToken}</p>`;

    // mailinf info configuring
    const emailOptions = {
      from: "rasel@rasel.auth",
      to: email,
      subject: emailType === "VERIFY" ? "Verify Your Email" : "Reset your Password",
      html: emailType === "VERIFY" ? verifyhtml : resetHtml,
    };

    // Sending the mail
    const mailResponse = await transport.sendMail(emailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
~