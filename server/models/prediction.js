import mongoose from "mongoose";

const Schema = mongoose.Schema;


const PredictSchema = new Schema(
  {
    memberID: String,
    loanProfileID: String,
    cr_profile: String,
    p_default: Number,
    f_result: String,
    e_default: Number,
    lg_default: Number,
    e_loss: Number,
    creator: String,
    createdAt: {
        type: Date,
        default: new Date()
    },
  }
);

const Predict = mongoose.model("Predict", PredictSchema);

export default Predict;