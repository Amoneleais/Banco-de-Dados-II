const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri);

const init = async () => {
  try {
    await client.connect();
    console.log('\x1b[34m%s\x1b[0m', '⦷ CONECTADO AO BANCO DE DADOS');
  } catch (error) {
    console.log(error);
  }
};

const getClient = () => {
  return client;
};

module.exports.init = init;
module.exports.getClient = getClient;