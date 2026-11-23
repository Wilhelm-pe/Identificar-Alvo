const express = require('express');
const path = require('path');
const app = express();

app.use(express.json()); // lê json no body
app.use(express.static(path.join(__dirname, 'public'))); // serve o front

app.post('/api/salvar-localizacao', (req, res) => {
    const { latitude, longitude } = req.body;
    // x-forwarded-for pega o ip real atrás de proxy/vercel
    const ipCliente = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    console.log("==========================================");
    console.log(`[NOVO ACESSO REGISTRADO]`);
    console.log(`IP de Origem: ${ipCliente}`);
    console.log(`Coordenadas Recebidas: Lat ${latitude}, Lng ${longitude}`);
    console.log(`Link Google Maps: https://www.google.com/maps?q=${latitude},${longitude}`);
    console.log("==========================================");

    res.json({ status: "sucesso" });
});

module.exports = app; // vercel precisa disso

// fora de produção subo listen na mão; na vercel ele cuida
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
}
