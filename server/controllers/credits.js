import express from 'express';
import mongoose from 'mongoose';
import {PythonShell} from 'python-shell';
import Credit from '../models/ccredit.js';
import PostMessage from '../models/postMessage.js';
import Predict from '../models/prediction.js';
import moment from 'moment';
const router = express.Router();

export const getCredit = async (req, res) => { 
const { id,memberid } = req.params;

try {
    console.log("memberId:",memberid);
    const post = await PostMessage.findById(id);
    const credit = await Credit.find({member_id: memberid});
    const info =[];
    info.push(post,credit[0]);

    if(credit[0]){
    const term = post.loanLength;
    const loanAmount = post.loanAmount;
    const interestRate = post.interestRate;
    const instalment = loanAmount*((interestRate/1200)*((1+interestRate/1200)**term)/(((1+interestRate/1200)**term)-1));
    const annualIncome = credit[0].annual_inc;
    const dti = (instalment/(annualIncome/12))*100;
    const inq_last_6mths = credit[0].inq_last_6mths;
    const revol_bal = credit[0].revol_bal;
    const total_acc = credit[0].total_acc;
    const chargeoff_within_12_mths= credit[0].chargeoff_within_12_mths;
    const mort_acc = credit[0].mort_acc;
    const num_accts_ever_120_pd = credit[0].num_accts_ever_120_pd;
    const percent_bc_gt_75 = credit[0].percent_bc_gt_75;
    const pub_rec_bankruptcies = credit[0].pub_rec_bankruptcies;

    post['dti'] = dti;
    post['instalment'] = instalment;
    var currentTime = new Date();
    var earliest_cr_line_year;
    var earliest_cr_line_month;
    if(credit[0].earliest_cr_line.split('-')[0].length == 2){
        earliest_cr_line_year = moment(credit[0].earliest_cr_line.split('-')[0], "YY").format("YYYY");
        earliest_cr_line_month = moment(credit[0].earliest_cr_line.split('-')[1], "MMM").format("M");
    }
    if(credit[0].earliest_cr_line.split('-')[0].length == 3){
        earliest_cr_line_year = moment(credit[0].earliest_cr_line.split('-')[1], "YY").format("YYYY");
        earliest_cr_line_month = moment(credit[0].earliest_cr_line.split('-')[0], "MMM").format("M");
    }
    
    var earliest_cr_line = new Date(earliest_cr_line_year,earliest_cr_line_month-1);
    const earliest_cr_line_format = moment(earliest_cr_line).format('MMM-YYYY')
    const num_yr_creline = parseInt(currentTime.getFullYear() - earliest_cr_line_year);
    let last_credit_pull_year;
    let last_credit_pull_month;
    console.log(credit[0].last_credit_pull_d.split('-')[0].length);
    if(credit[0].last_credit_pull_d.split('-')[0].length == 2){
        last_credit_pull_year = moment(credit[0].last_credit_pull_d.split('-')[0], "YY").format("YYYY");
        last_credit_pull_month = moment(credit[0].last_credit_pull_d.split('-')[1], "MMM").format("M");
    }
    else if(credit[0].earliest_cr_line.split('-')[0].length == 3){
        last_credit_pull_year = moment(credit[0].last_credit_pull_d.split('-')[1], "YY").format("YYYY");
        last_credit_pull_month = moment(credit[0].last_credit_pull_d.split('-')[0], "MMM").format("M");
    }
console.log(last_credit_pull_year);
    var last_credit_pull = new Date(last_credit_pull_year,last_credit_pull_month-1);
    const last_credit_pull_format = moment(last_credit_pull).format('MMM-YYYY')
    const num_yr_last_credit_pull = parseInt(currentTime.getFullYear() - last_credit_pull_year);
    const fisco_score = credit[0].fico_score;
    const emp_title = post.emp_length;
    const home_ownership = credit[0].home_ownership;
    const emp_length = credit[0].emp_length;
    const loanPurpose = post.loanPurpose;
    const grade = post.loanGrade;

    let issue_d_year;
    let issue_d_month;
    
    if(credit[0].issue_d.split('-')[0].length == 2){
        issue_d_year = moment(credit[0].issue_d.split('-')[0], "YY").format("YYYY");
        issue_d_month = moment(credit[0].issue_d.split('-')[1], "MMM").format("M");
    }
    else if(credit[0].issue_d.split('-')[0].length == 3){
        issue_d_year = moment(credit[0].issue_d.split('-')[1], "YY").format("YYYY");
        issue_d_month = moment(credit[0].issue_d.split('-')[0], "MMM").format("M");
    }
    var issue_d = new Date(issue_d_year,issue_d_month-1);
    const issue_d_format = moment(issue_d).format('MMM-YYYY')

    let last_pymnt_d_year;
    let last_pymnt_d_month;

    if(credit[0].last_pymnt_d.split('-')[0].length == 2){
        last_pymnt_d_year = moment(credit[0].last_pymnt_d.split('-')[0], "YY").format("YYYY");
        last_pymnt_d_month = moment(credit[0].last_pymnt_d.split('-')[1], "MMM").format("M");
    }
    else if(credit[0].last_pymnt_d.split('-')[0].length == 3){
        last_pymnt_d_year = moment(credit[0].last_pymnt_d.split('-')[1], "YY").format("YYYY");
        last_pymnt_d_month = moment(credit[0].last_pymnt_d.split('-')[0], "MMM").format("M");
    }
    var last_pymnt_d = new Date(last_pymnt_d_year,last_pymnt_d_month-1);
    const last_pymnt_d_format = moment(last_pymnt_d).format('MMM-YYYY')

    credit[0].issue_d = issue_d_format;
    credit[0].earliest_cr_line = earliest_cr_line_format;
    credit[0].last_credit_pull_d = last_credit_pull_format;
    credit[0].last_pymnt_d = last_pymnt_d_format;

    console.log(credit[0]);
    console.log(post);
    let options = {
        mode: 'text',
        // pythonOptions: ['-u'], // get print results in real-time
        args: [term, loanAmount, interestRate, instalment, annualIncome,dti,inq_last_6mths,revol_bal,total_acc,chargeoff_within_12_mths,mort_acc, num_accts_ever_120_pd, percent_bc_gt_75,pub_rec_bankruptcies, grade, num_yr_creline, num_yr_last_credit_pull, fisco_score, emp_title, home_ownership, emp_length, loanPurpose]
        };
        
        const resultss = await PythonShell.run('controllers/predict.py', options, function (err, results) {
        if (err) {
            console.log(err)};
        // results is an array consisting of messages collected during execution
        console.log(results);
        return results;
        }); 

        
    const f_reuslt = parseInt(resultss[0]);
    let default_rate =0;
    let cr_profle = '';
    let ead =0;
    let lgd = 0;
    let el =0;
    const loanProfileID= post._id;
    if(f_reuslt == 0){
        default_rate = parseFloat(resultss[4]);
        if(default_rate<0.1){
            cr_profle = 'Low_risk'
        } else if (default_rate>=0.1 && default_rate<0.3){
            cr_profle = 'Medium_risk'
        } else if (default_rate>=0.3 && default_rate<0.55){
            cr_profle = 'Moderate_risk'
        } else {
            cr_profle = 'High_risk'
        }
        
        ead = loanAmount - instalment*(term*0.538) + interestRate*(term*(1-0.538)); 
        lgd = (ead - 0.0*ead)/ead*100;
        el = default_rate*lgd/100*ead;
    }
    
    
    const predictCheck = await Predict.find({$and:[{loanProfileID:loanProfileID},{memberID: memberid}]});
    
    if(predictCheck[0]){
        const id = predictCheck[0]._id;
        const updatedPredict = {memberID: memberid,creator: post.creator,loanProfileID:loanProfileID, 
            createdAt: new Date().toISOString(), cr_profile: cr_profle, p_default: default_rate, 
            f_result: f_reuslt,e_default:ead,lg_default:lgd,e_loss:el,_id:id};
        await Predict.findByIdAndUpdate(id, updatedPredict, { new: true });
    }
    else{
        const newPredict = new Predict({memberID: memberid,creator: post.creator,
            loanProfileID:loanProfileID, createdAt: new Date().toISOString(), cr_profile: cr_profle, p_default: default_rate, 
            f_result: f_reuslt,e_default:ead,lg_default:lgd,e_loss:el})
        await newPredict.save();
    }
    const predictAll = await Predict.find({memberID: memberid});
    const predictProfile = await PostMessage.find({memberID: memberid});
    const predict = await Predict.find({$and:[{loanProfileID:loanProfileID},{memberID: memberid}]})
    const dataFormat = [dti,instalment];
    info.push(resultss);
    info.push(dataFormat);
    info.push(predict[0]);
    info.push(predictAll);
    info.push(predictProfile);
}
    res.status(200).json({data: info});
} catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
}
}