import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  Transaction:{type:String ,default:'Success'},
  assetId: { type: Number, required: true },
  from:{type:String ,required:true},
  to:{type:String ,required:true},
  price: { type: Number, required: true },
});

export default mongoose.models.Transaction || mongoose.model("Transaction", TransactionSchema);
