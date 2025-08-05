import nodemailer from "nodemailer";

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
const submitContactForm = async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"${name}" <${email}>`, // Sender's name and email
      to: process.env.EMAIL_USER, // The client's email address
      subject: `New Contact Form Submission: ${subject}`,
      html: `
                <h1>New Inquiry from Website</h1>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
                <hr/>
                <h2>Message:</h2>
                <p>${message}</p>
            `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("Email sending error:", error);
    res
      .status(500)
      .json({ message: "Failed to send message. Please try again later." });
  }
};

export { submitContactForm };
