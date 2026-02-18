 const express = require('express');
 const app = express();
 const port = 3001;


 app.use(express.json());

 app.post('/send_email', (req, res) => {
    const { email    } = req.body;
    console.log("email yuborildi");
    
   res.json({ message: 'Email sent successfully from Server 2!' });
 });
 app.listen(port, () => {
    console.log(`Server 2 is running on http://localhost:${port}`);
 });