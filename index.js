const express = require('express');
const path = require('path');
const app = express();

// Middleware necessário para o Express entender JSON enviado pelo body
app.use(express.json());

// Serve os arquivos estáticos da pasta public (onde está o index.html)
app.use(express.static(path.join(__dirname, 'public')));

// Rota POST para receber a localização enviada pelo HTML
app.post('/api/salvar-localizacao', (req, res) => {
    const { latitude, longitude } = req.body;
    const ipCliente = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    // Exibe as informações EXCLUSIVAMENTE no terminal do servidor
    console.log("==========================================");
    console.log(`[NOVO ACESSO REGISTRADO]`);
    console.log(`IP de Origem: ${ipCliente}`);
    console.log(`Coordenadas Recebidas: Lat ${latitude}, Lng ${longitude}`);
    console.log(`Link Google Maps: https://www.google.com/maps?q=${latitude},${longitude}`);
    console.log("==========================================");

    // Responde ao navegador que recebeu com sucesso
    res.json({ status: "sucesso" });
});

// Exporta para a Vercel (obrigatório para serverless)
module.exports = app;

// Só abre a porta 3000 se estiver rodando localmente no seu terminal
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
}
