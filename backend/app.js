require('dotenv').config({ path: __dirname + '/.env' });
const express = require('express');
const db = require('./src/utils/db.util');
const routes = require('./src/routes/router');
const cors = require('cors');

const PORT = 9900;

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', routes);

(async () => {
  await db.init();
  app.listen(PORT, (err) => {
    console.log('\x1b[32m%s\x1b[0m',`\n⦶ SERVIDOR INICIADO NA PORTA ${PORT}`);
  });
})();