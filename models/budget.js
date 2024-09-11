import mongoose, { Schema } from "mongoose";

const BudgetSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    paidfor: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    paidby: {
      type: String,
      required: true,
    },
    paidusing: {
      type: String,
      required: true,
    },
    date: {
      type: String,
    },
    time: {
      type: String,
    },
    type: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Budget = mongoose.models.Budget || mongoose.model("Budget", BudgetSchema);

export default Budget;
