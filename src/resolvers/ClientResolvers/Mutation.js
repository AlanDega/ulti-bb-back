const { createClient, updateClient, deleteClient } = require('../../services/ClientService');
const authenticate = require('../../utils/authenticate');
const createNewClient = async (_, { data }) => {
    const client = await createClient(data);
    return client;
};

const updateOneClient = async (_, {id, data}) => {
    const client = await updateClient(id, data);
    if (!client) throw new Error('Client not exist');
    return client;
};

const deleteOneClient = async (_,{ id }) => {
    const client = await deleteClient(id);
    if (!client) throw new Error('Client not exist');
    return 'Client deleted';
};

const login = async (_, params) => {
    const token = await authenticate(params).catch(e => { throw e;});
    return { token: token, message:'Login Sucessful' };
};

module.exports = {
    createNewClient,
    updateOneClient,
    deleteOneClient,
    login
};