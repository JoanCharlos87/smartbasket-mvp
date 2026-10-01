const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// 1. Endpoint de catálogo activo de Tiendas 3B
app.get('/api/catalogo', (req, res) => {
  res.json([
    { id: 1, nombre: "Leche Entera Vaca Blanca 1L (Marca Propia)", precio: 17.50, categoria: "Lácteos" },
    { id: 2, nombre: "Arroz Extra Grano Macizo 900g", precio: 18.00, categoria: "Granos" },
    { id: 3, nombre: "Frijol Negro Máxima Pureza 900g", precio: 26.50, categoria: "Granos" },
    { id: 4, nombre: "Aceite Comestible Puro 800ml", precio: 31.00, categoria: "Abarrotes" },
    { id: 5, nombre: "Detergente Multiusos 3B 1kg", precio: 22.00, categoria: "Limpieza" }
  ]);
});

// 2. Webhook GET: Verificación requerida por Meta Cloud API
app.get('/webhook', (req, res) => {
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];
  if (req.query['hub.mode'] === 'subscribe' && token === (process.env.VERIFY_TOKEN || 'smartbasket_token_2026')) {
    return res.status(200).send(challenge);
  }
  res.sendStatus(403);
});

// 3. Webhook POST: Receptor de eventos de WhatsApp
app.post('/webhook', (req, res) => {
  console.log('Mensaje recibido en WhatsApp Webhook:', JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Servidor de SmartBasket 3B escuchando en el puerto ${PORT}`);
});