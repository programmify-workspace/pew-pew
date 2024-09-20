import nodemailer from 'nodemailer';
import express from 'express';
import data from './models/database.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('./public'));

app.get("/", (req, res) => {
  res.sendFile("/index.html")
})

app.get("/projects", (req, res) => {
  data.query('SELECT * FROM projects ORDER BY ID DESC' , (err, results) => {
    if (err) throw err;
    res.status(200).json(results);
});
})


app.post("/send_email", (req, res) =>{
   const {name, email, subject, message} = req.body;
   let transporter = nodemailer.createTransport({
    service:'gmail',
    host: 'smtp.gmail.com',
    port: 587, // Port number
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'williamsakorede1@gmail.com', // Your email
      pass: 'touxvxwsilnbgetz' // Your app password
    }
  });

  let mailOptions = {
    from:{
      name: name,
      address:"williamsakorede1@gmail.com"
    },
    to: email,
    subject: subject,
    text: message 
  };

  const sendMail = async(transporter, mailOptions) => {
    try {
      await transporter.sendMail(mailOptions);
      console.log("Email sent successfully");
      res.status(200).json({message: "Email sent successfully"})
    } catch (error) {
      console.log(error);
    }
  }
  
  sendMail(transporter, mailOptions);
})



  


const PORT = process.env.PORT || 300;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});