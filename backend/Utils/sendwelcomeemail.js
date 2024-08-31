import nodemailer from "nodemailer"
import dotenv from "dotenv"

dotenv.config();


const sendwelcomeemail = async(email)=>{
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, 
        auth: {
          user: process.env.USER_ID,
          pass: process.env.USER_PASS,
        },
      });
    
      async function main() {
        const info = await transporter.sendMail({
          from: 'barter4skills@gmail.com',
          to: email, 
          subject: "Welcome from Barter4Skills",
          text: "/",
          html: `You successfully created account at <b>${process.env.FRONTEND}</b>.`,
        });
        console.log("Message sent: %s", info.messageId);
      }
      main().catch(console.error);
}

export default sendwelcomeemail;