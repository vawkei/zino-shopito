const nodemailer = require("nodemailer");
const MailGen = require("mailgen");

const sendEmail =async(subject,send_to,template,reply_to,cc)=>{

    //create email transporter:
    const transporter = nodemailer.createTransport({
        service:"gmail",
        host:process.env.EMAIL_HOST,
        port:587,
        auth:{
            user:process.env.EMAIL_USER,
            pass:process.env.EMAIL_PASSWORD
        }
    })

    //create template with mailgen, got the code from npm mailgen doc page
    const mailGenerator = new MailGen({
        theme: 'salted',
        product: {
            // Appears in header & footer of e-mails
            name: 'Shopito Website',
            link: 'https://shopitoapp.vercel.app/'
            // Optional product logo
            // logo: 'https://mailgen.js/img/logo.png'
        }
    });

    const emailTemplate = mailGenerator.generate(template);
    require("fs").writeFileSync("preview.html",emailTemplate,"utf-8")

    //options for sending email:
    const options = {
        from: process.env.EMAIL_USER,
        to:send_to,
        replyTo:reply_to,
        subject:subject,
        html:emailTemplate,
        cc:cc
    }

    //send email:
    transporter.sendMail(options,function(error,info){
        if(error){
            console.log(error)
        }else{
            console.log(info)
        }
    })

};

module.exports = sendEmail