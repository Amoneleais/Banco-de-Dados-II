const client = require('../utils/db.util').getClient();
const Users = client.db().collection('usuarios');

//Função regex para verificar se o input de data é válido
function isValidDate(dateString){
  const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;
  return regex.test(dateString);
};

const UserController = {
    
    create: async (req, res) => {
      try{
        const { nome, email, cpf, nascimento, cep, endereco } = req.body;
        //Verificação de tipos de entrada
        if (typeof nome !== 'string' || typeof email !== 'string' || typeof cpf !== 'string' || !isValidDate(nascimento) ||
        typeof cep !== 'string' || typeof endereco !== 'string') {
          return res.status(400).json({ error: 'Invalid input' });
        }
        //Busca o último usuário inserido na coleção usuários
        const lastUser = await Users.findOne({}, { sort: { _id: 1 } });
        //Algorítmo para incrementar o id mais recente
        const newId = lastUser ? lastUser._id + 1 : 1;
        const newUser = { _id: newId, nome, email, cpf, nascimento, cep, endereco };      
        const create = await Users.insertOne(newUser);
        res.send(create).status(201);
      }catch(err){
        res.status(500);
      }
    },
    getAll: async (req, res) => {
      try{
        let getAll = await Users.find().toArray();
        res.send(getAll).status(200);
      } catch (err){
        res.status(500);
      }
    },
    getOne: async (req, res) => {
      try{
        const id = parseInt(req.params.id);
        let getUser = await Users.findOne({_id: id});
        res.send(getUser).status(200);
      }catch(err){
        res.status(500);
      }
    },
    update: async (req, res) => {
      try{
        const id = parseInt(req.params.id);
        const updateFields = req.body;
        let getUser = await Users.findOne({_id: id});
        const updatedUser = { ...getUser };
        //Faz um merge apenas onde foi alterado
        for (const field in updateFields) {
          if (updateFields.hasOwnProperty(field)) {
            updatedUser[field] = updateFields[field];
          }
        }
        const update = await Users.updateOne({_id: id}, {$set: updatedUser});
        res.send(update).status(200);
      }catch(err){
        res.status(500);
      }
    },
    delete: async (req, res) => {
      try{
        const id = parseInt(req.params.id);
        const remove = await Users.deleteOne({_id: id});
        res.send(remove).status(200);
      }catch (err){
        res.status(500);
      }
    }
}


module.exports = UserController;
  