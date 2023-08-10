import React, { useEffect, useState } from 'react';
import { Paper, Typography, CircularProgress, Divider, Breadcrumbs, Link, Box, Button } from '@material-ui/core/';
import { grey } from '@material-ui/core/colors';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useNavigate } from 'react-router-dom';
import CommentSection from './CommentSection';
import { getPost, getPostsBySearch } from '../../actions/posts';
import useStyles from './styles';
import HomeIcon from '@material-ui/icons/Home';
import LineChart from './LineChart';
import DetailBox from './DetailBox';
import TableDetail from './TableDetail';
import PredictionDisplay from './PredictionDisplay';
import Summary from './Summary';
const Post = () => {
  const [showPredict, setShowPredict] = useState(false);
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const GraphData = [];
  const credit = useSelector((state) => state);
  console.log(credit);
  console.log("post:",post,"posts:", posts,"isLoading", isLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const { id, memberid } = useParams();
  
  console.log(id);
  console.log(memberid);
  let USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});
  var ProfileSummaryData = {"id": "Member ID", "subid":"","status":"Pending","result":"","grid":4,"data":[]};
  var LoanProfileData = {"id": "Loan Profile","grid":2,"data":[]};
  var MemberProfileData = {"id": "Borrower's Detail","grid":5,"data":[]};
  var MemberCreditData = {"id": "Borrower's Credit History","grid":4,"data":[]};
  var MemberHistoryLoantData = {"id": "Previous Loans","head":{first:"Issue Date",second:"Loan Amount",third:"Interest",fourth:"Term",fifth:"Last Payment Date",sixth:"Last Payment Amount",seventh:"Status"},"data":[]};
  var MemberHistoryPredicttData = {"id": "Previous Predictions","head":{first:"Request Date",second:"Request Amount",third:"Interest",fourth:"Term",fifth:"Grade",sixth:"Filter Status",seventh:"Risk"},"data":[]};
  var ProfilePrediction = {"id": "Loan Assessment","result":"1","show":false, "head":{first:"Filter Status", second:"Rejection probability", third:"Default Prediction", fourth:"Default Rate", fifth:"Credit Profile", sixth:"Exposure at Default",seventh:"Loss Given Default",eighth:"Expected Loss"},"data":[]}
  if(post?.data[0] && post?.data[3]){
    LoanProfileData.data.push({title:"Loan Amount",content:`${USDollar.format(post.data[0].loanAmount)}`})
    LoanProfileData.data.push({title:"Interest Rate",content:`${post.data[0].interestRate}`+"%"})
    LoanProfileData.data.push({title:"Loan Length",content:post.data[0].loanLength+ " months"})
    LoanProfileData.data.push({title:"Loan Grade",content:post.data[0].loanGrade})
    LoanProfileData.data.push({title:"Loan Purpose",content:post.data[0].loanPurpose})
    LoanProfileData.data.push({title:"Installment",content:post?.data[3]?USDollar.format(parseFloat(post.data[3][1]).toFixed(2))+" per month":''})
    LoanProfileData.data.push({title:"Debt-to-income (DTI):",content:post?.data[3]?parseFloat(post.data[3][0]).toFixed(2)+'%':''})
    LoanProfileData.data.push({title:"Created time",content:post.data[0].createdAt.split('T')[0]+', '+post.data[0].createdAt.split('T')[1].split(':')[0]+':'+post.data[0].createdAt.split('T')[1].split(':')[1]})
    const term = parseInt(post.data[0].loanLength);
    const balance = parseFloat(post.data[0].loanAmount).toFixed(2);
    var balances = parseFloat(balance);
    const interestRate = parseFloat(post.data[0].interestRate).toFixed(2);
    var interest=0;
    var principle=0;
    var culPrinciple =0
    var culInterest =0;
    const payment = parseFloat(post.data[3][1]).toFixed(2);
    var balancedata = {"id": "Balance", "color": "hsl(314, 70%, 50%)","data":[]}
    var interestdata = {"id": "Interest", "color": "hsl(317, 70%, 50%)","data":[]}
    var principledata = {"id": "Principle", "color": "hsl(33, 70%, 50%)","data":[]}
    for(var i=1;i<=term;i++){
      var yBalance = balances;
      interest = (balances*(interestRate/(12*100))).toFixed(2)
      var yInterest = interest 
      culInterest = parseFloat(culInterest) + parseFloat(yInterest)
      principle = payment- yInterest
      var yPrinciple = principle
      culPrinciple = parseFloat(culPrinciple)+ parseFloat(yPrinciple)
      balances = balances - yPrinciple
      var balanceData = {"x": i,"y":yBalance}
      var interestData = {"x": i,"y":culInterest}
      var principleData = {"x": i,"y":culPrinciple}
      balancedata.data.push(balanceData)
      interestdata.data.push(interestData)
      principledata.data.push(principleData)
    }
    console.log(balancedata)
    console.log(interestdata)
    console.log(principledata)
    var data = [];
    GraphData.push(balancedata)
    GraphData.push(interestdata)
    GraphData.push(principledata)
    console.log(GraphData)
  }
  if(post?.data[0] && post?.data[1]){
    MemberProfileData.data.push({title:"Home Ownership",content:post.data[1].home_ownership})
    MemberProfileData.data.push({title:"Job Title",content:post.data[1].emp_title})
    MemberProfileData.data.push({title:"Employment Length",content:post.data[0].emp_length})
    MemberProfileData.data.push({title:"Monthly income",content: USDollar.format(parseFloat(post.data[1].annual_inc)/12)})
    MemberProfileData.data.push({title:"State Location",content: post.data[1].addr_state})
  }
  if(post?.data[0] && post?.data[1]){

    MemberCreditData.data.push({title:"Inquiries last 6 months",content:post.data[1].inq_last_6mths})
    MemberCreditData.data.push({title:"Earliest Credit Line:",content:post.data[1].earliest_cr_line})
    MemberCreditData.data.push({title:"Charge Off within 12 months",content:post.data[1].chargeoff_within_12_mths})
    MemberCreditData.data.push({title:"Last credit pull",content:post.data[1].last_credit_pull_d})
    MemberCreditData.data.push({title:"Total Credit Line",content:post.data[1].total_acc})
    MemberCreditData.data.push({title:"Open Credit Line",content:post.data[1].open_acc})
    MemberCreditData.data.push({title:"Revolving Credit Balance",content:USDollar.format(post.data[1].revol_bal)})
    MemberCreditData.data.push({title:"%Bankcard > 75% limit",content:post.data[1].percent_bc_gt_75})
    MemberCreditData.data.push({title:"Mortgage accounts",content:post.data[1].mort_acc})
    MemberCreditData.data.push({title:"Accounts past due > 120 days",content:post.data[1].num_accts_ever_120_pd})
    MemberCreditData.data.push({title:"Public record of bankruptcies",content: post.data[1].pub_rec_bankruptcies})
    MemberCreditData.data.push({title:"FICO score",content:post.data[1].fico_score})
  }
  if(post?.data[1]){
    // {title:"Issue Date"},{title:"Loan Amount"}, {title:"Interest"}, {title:"Term"}, {title:"Last Payment Date"}, {title:"Last Payment Amount"}, {title:"Status"}
    MemberHistoryLoantData.data.push({first:post.data[1].issue_d,second:USDollar.format(post.data[1].loan_amnt),third:`${post.data[1].int_rate}%`,fourth:post.data[1].term,fifth:post.data[1].last_pymnt_d,sixth:USDollar.format(post.data[1].last_pymnt_amnt),seventh:post.data[1].loan_status})
  }
  if(post?.data[4]){
    ProfilePrediction.data.push({first:post.data[4].f_result,second:`${((parseFloat(post.data[2][1].split(',')[1].slice(1))*100).toFixed(2))}%`,third:post.data[2][2],fourth:`${parseFloat(post.data[2][4]*100).toFixed(2)}%`,fifth:post.data[4].cr_profile.split('_')[0],sixth:USDollar.format(post.data[4].e_default),seventh:`${post.data[4].lg_default}%`,eighth:USDollar.format(post.data[4].e_loss)})
    if(post.data[4].f_result == "0"){
      if(parseFloat(post.data[4].p_default) <= 0.5){
        ProfilePrediction.result = "0";
      }
    }
  }
  if(post?.data[5] && post?.data[6]){
    for(let i=0; i< post.data[5].length;i++){
      if(post.data[0]._id == post.data[5][i].loanProfileID){
        continue;
      }else{
      if(post.data[5][i].cr_profile == ''){
        post.data[5][i].cr_profile = 'No data';
      }
      if(post.data[5][i].f_result == '1'){
        post.data[5][i].f_result = 'Fail';
      }else if(post.data[5][i].f_result == 0) {
        post.data[5][i].f_result = 'Pass';
      }
      let profile;
      for(let j=0;j<post.data[6].length;j++){
        if(post.data[5][i].loanProfileID  == post.data[6][j]._id){
          profile = post.data[6][j];
          MemberHistoryPredicttData.data.push({first:post.data[5][i].createdAt.split('T')[0],second:USDollar.format(profile.loanAmount),third:`${profile.interestRate}%`,fourth:`${profile.loanLength} months`,fifth:profile.loanGrade,sixth:`${post.data[5][i].f_result}`,seventh:post.data[5][i].cr_profile.split('_')[0]})
          continue;
        }
      
      }
    }
    }
    if(post?.data.length == 7){
      if(post.data[0].likes.length > 0){
        ProfileSummaryData.status = "Assessed";
        ProfilePrediction.show = true;
      }
      ProfileSummaryData.subid = post.data[0].memberID;
      var totalLoanAmount =0;
      var totalProbOfDefault =0;
      for(let i=0; i < post.data[6].length; i++){
        totalLoanAmount += parseFloat(post.data[6][i].loanAmount)
      } 
      for(let i=0; i < post.data[5].length; i++){
        totalProbOfDefault += parseFloat(post.data[5][i].p_default)
      }
      var avgLoanAmount =parseFloat(totalLoanAmount/post.data[6].length).toFixed(2);
      var avgProOfDefault = parseFloat(totalProbOfDefault/post.data[5].length).toFixed(2);
      ProfileSummaryData.data.push({title:"FICO Score",content:post.data[1].fico_score});
      ProfileSummaryData.data.push({title:"Loans Requested",content:post.data[5].length});
      ProfileSummaryData.data.push({title:"Avg. Requested Amount",content:USDollar.format(avgLoanAmount)});
      ProfileSummaryData.data.push({title:"Avg. Default Rate",content:`${avgProOfDefault}%`});
      if(post?.data[0]){
      if(post.data[0].likes.length >0){
        ProfileSummaryData.result =ProfilePrediction.result;
      }
    }
    }
  }

  useEffect(() => {
    dispatch(getPost(id,memberid));
  }, [id,memberid]);


  if (!post) return null;


  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  return (
    <Paper style={{ padding: '20px', borderRadius: '1rem', backgroundColor: grey[200] }} elevation={6}>
      <Breadcrumbs aria-label="breadcrumb">
  <Link color="inherit" href="/posts" >
    Home
  </Link>
  <Typography color="textPrimary">{post.data[0].memberID}</Typography>
</Breadcrumbs>
      <div className={classes.card}>
        <div className={classes.section}>
        {/* <Typography variant="h3" component="h2">MemberID: {post.data[0].memberID}</Typography> */}
        {post?.data[1]? 
          <>
          <Summary detail={ProfileSummaryData}></Summary>
          {/* <DetailBox detail={ProfileSummaryData}></DetailBox> */}
        <div className={classes.cardRow}>
        <div className={classes.sectionRow}>
          
          <DetailBox detail={LoanProfileData}></DetailBox>
          </div>
          <div className={classes.imageSection}>
        {post?.data[1]? <>
       
        <LineChart graphData={GraphData}/></> :''}
        
        </div>
          </div>
          
          <DetailBox detail={MemberProfileData}></DetailBox>
          <DetailBox detail={MemberCreditData}></DetailBox>
          <TableDetail details={MemberHistoryLoantData}></TableDetail>
          {post?.data[5].length >1? 
          <TableDetail details={MemberHistoryPredicttData}></TableDetail>:''}
          <PredictionDisplay details={ProfilePrediction}></PredictionDisplay>
         
          </>
          : <Typography variant="h4" component="h3">The member does not have previous historical data</Typography>}
          
          <CommentSection post={post.data[0]} />
        </div>
        
        <Box display={{ xs: 'block', sm: 'none' }} bgcolor="text.disabled" className={classes.homeBox}><Link href="/posts" ><HomeIcon className={classes.homeIcon}></HomeIcon></Link></Box>
      </div>
      
    </Paper>
    
  );
};

export default Post;