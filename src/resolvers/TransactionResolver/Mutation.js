const {
    createTransaction,
    updateTransaction,
    deleteTransaction
} = require('../../services/TransactionService');
const storage = require('./../../utils/storage');

const createNewTransaction = async (_, { data }, { user }) => {
    data.client = user._id;
    if (data.cover){
        const { createReadStream } = await data.cover;
        const stream = createReadStream();
        const image = await storage({stream});
        data = { ...data, cover: image.url};
    }

    const transaction = await createTransaction(data);
    user.transactions.push(transaction._id);
    user.save();
    return transaction;
};

const updateOneTransaction = async (_, {id,data}, { user }) => {
    if (data.cover){
        const { createReadStream } = await data.cover;
        const stream = createReadStream();
        const image = await storage({stream});
        data = { ...data, cover: image.url, user};
    }
    const transaction = await updateTransaction(id, data,user);
    if (!transaction) throw new Error('Transaction not exist');
    return transaction;
};

const deleteOneTransaction = async (_, { id }, { user }) => {
    const transaction = await deleteTransaction(id, user);
    if (!transaction) throw new Error('Transaction not exist');
    return 'tx deleted';
};

module.exports = {
    createNewTransaction,
    updateOneTransaction,
    deleteOneTransaction
};