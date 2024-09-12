import mongoose, { Schema } from "mongoose";

const BudgetSchema = new mongoose.Schema(
  {
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
    datetime: {
      type: String,
    },

    category: {
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
