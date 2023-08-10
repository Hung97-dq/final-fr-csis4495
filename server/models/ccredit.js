import mongoose from "mongoose";

const Schema = mongoose.Schema;


const CreditSchema = new Schema(
  {
    member_id: String,
    emp_title: String,
    emp_length: String,
    home_ownership: String,
    annual_inc: Number,
    dti: Number,
    inq_last_6mths: Number,
    revol_bal: Number,
    total_acc: Number,
    open_acc: Number,
    chargeoff_within_12_mths: Number,
    mort_acc: Number,
    num_accts_ever_120_pd:Number,
    percent_bc_gt_75: Number,
    pub_rec_bankruptcies: Number,
    earliest_cr_line: String,
    last_credit_pull_d:String,
    addr_state: String,
    fico_score: Number,
    loan_amnt: Number,
    issue_d: String,
    loan_status: String,
    last_pymnt: String,
    last_pymnt_amnt: Number,
    last_pymnt_d: String,
    purpose: String,
    int_rate: Number,
    grade: String,
    term: String,
  }
);

const Credit = mongoose.model("Credit", CreditSchema);

export default Credit;