const {
    getAllClients,
    getOneClient
} = require('../../services/ClientService');

const getClients = async () => {
    const clients = await getAllClients();
    return clients;
};

const getSingleClient = async (_, { id }) => {
    const client = await getOneClient(id);
    if(!client) throw new Error('Client not exist');
    return client;
};

const me = async(root, params, { user }) => {
    console.log(user);
    const client = await getOneClient(user._id);
    return client;
};

module.exports = {
    getClients,
    getSingleClient,
    me,
};