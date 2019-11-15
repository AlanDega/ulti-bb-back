const {
    Transactions
} = require('../models');

const createTransaction = async (data) => {
    const transaction = await Transactions.create(data);
    const populateTransaction = await getOneTransaction(transaction._id);
    return populateTransaction;
};

const getOneTransaction = (id) => Transactions.findOne({
    _id: id,
    is_active: true
}).populate('client');

const getAllTransactions = () => Transactions.find({
    is_active: true
}).populate('client');
const updateTransaction = (id, data, client) => Transactions.findOneAndUpdate({_id:id,client}, {
    ...data
}, {
    new: true
}).populate('client');

const deleteTransaction = (id, client) => Transactions.findByIdAndUpdate({
    _id: id,
    is_active: true,
    client
}, {
    is_active: false
});

module.exports = {
    createTransaction,
    updateTransaction,
    deleteTransaction,
    getAllTransactions,
    getOneTransaction
};
