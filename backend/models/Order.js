const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrderSchema = new Schema({
  customer: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
  items: [
    {
      product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true }
    }
  ],
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'completed', 'cancelled'], default: 'completed' },
  orderDate: { type: Date, default: Date.now }
});

OrderSchema.index({ orderDate: 1 });
OrderSchema.index({ status: 1 });

module.exports = mongoose.model('Order', OrderSchema);
