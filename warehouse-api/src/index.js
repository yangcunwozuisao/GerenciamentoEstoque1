const express = require('express');
const itemsRouter = require('./routes/items');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use('/items', itemsRouter);

app.get('/', (req, res) => res.send('Warehouse API running'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
