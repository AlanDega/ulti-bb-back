const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
    currency: {
        type: String,
        enum: ['BTC','ETH','XRP'],
    },

   
    transaction_type: {
        type: String,
        enum:['COMPRA','VENTA'],
    },
    client: {
        type: Schema.Types.ObjectId,
        ref: 'client',
    },
    is_active: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('transactions', TransactionSchema);