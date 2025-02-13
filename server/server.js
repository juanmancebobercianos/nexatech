const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/send-email', (req, res) => {
    const { nombre, email, asunto, mensaje } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'Gmail', // Puedes usar cualquier servicio SMTP
        auth: {
            user: 'tucorreo@gmail.com', // Reemplaza con tu correo
            pass: 'contraseña_de_tu_correo' // Reemplaza con tu contraseña
        }
    });

    const mailOptions = {
        from: email,
        to: 'contacto@nexatech.com.uy',
        subject: `Nuevo mensaje de: ${nombre} - ${asunto}`,
        text: `${mensaje}\n\nDe: ${nombre} <${email}>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).send('Error al enviar el correo.');
        }
        res.status(200).send('Correo enviado correctamente.');
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});