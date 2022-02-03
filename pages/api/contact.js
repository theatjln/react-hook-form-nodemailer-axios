import nodemailer from "nodemailer";

export default async (req, res) => {
  console.log("env variables: ", process.env.NEXT_PUBLIC_API_URL, process.env.user, process.env.pass);

  const { name, email, phone, message } = req.body;

  // create configuration for the nodemailer transporter
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.user,
      pass: process.env.pass,
    },
  });

  try {
    const emailRes = await transporter.sendMail({
      from: email,
      to: "markmarkusviajero.contents@gmail.com",
      subject: `Contact form submission from ${name}`,
      html: `<div style="text-align: center;">
      <h3>You have a contact form submission</h3> <br>
      <p> <strong>From: </strong> ${name} (${email}) </p>
      <p> <strong>Phone: </strong> ${phone} </p>
      <p> <strong>Message: </strong> ${message} </p>
      </div>`,
    });
    console.log("Message sent", emailRes.messageId);
  } catch (error) {
    console.log(error);
  }

  res.status(200).json(req.body);
};
