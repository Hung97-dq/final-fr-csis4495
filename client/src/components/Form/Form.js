import React, { useState, useEffect } from 'react';
import {TextField, Button, Typography, Paper, FormHelperText} from '@material-ui/core'
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { createPost } from '../../actions/posts';
import { updatePost } from '../../actions/posts';
import { useSelector } from 'react-redux';

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({  memberID: '', loanAmount: '', interestRate: '', loanLength: '', loanGrade: '', loanPurpose: '', emp_length: '' });
  const [isDisabled, setIsDisabled] = useState(true);
  const [optIn, setOptIn] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const terms = String(` All information gathered, declared and produced as a result of the purpose of these app will be protected according to the Privacy Act. Self declaratory information by the customer will be treated as a affidavit, whereas the financial representative agree that no información managed within the app will be disclosure. If any of the parties that are benefit from the app, do not follow these rules there could be consequences.`);
  const [message,setMessage] = useState(terms);
  console.log(currentId);
  const post = useSelector((state) => (currentId ? state?.posts?.posts.find((message) => message._id === currentId) : null));
  console.log(post);
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));

  const canBeSubmitted = () => {
    return optIn ? setIsDisabled(true) : setIsDisabled(false);
  };

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const clear = () => {
    setCurrentId= 0;
    setPostData({  memberID: '', loanAmount: '', interestRate: '', loanLength: '', loanGrade: '', loanPurpose: '', emp_length: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validate(postData));
    setIsSubmit(true);
  };
  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      if (currentId === 0) {
        dispatch(createPost({ ...postData, name: user?.result?.name }));
        clear();
      } else {
        console.log(currentId);
        dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
        clear();
      }
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    const regex = /^\d+$/;
    const regexDecimal = /^(\d)*(\.)?([0-9]{2})?$/;
    if (!values.memberID) {
      errors.memberID = "MemberID is required!";
    } else if (!regex.test(values.memberID)) {
      errors.memberID = "memberID must be in number format!";
    }
    if (!values.loanAmount) {
      errors.loanAmount = "Loan Amount is required!";
    }else if (!regexDecimal.test(values.loanAmount)) {
      errors.loanAmount = "Loan Amount must be in number with exact 2 decimal points format!";
    }
    if (!values.interestRate) {
      errors.interestRate = "Interest Rate is required!";
    }else if (!regexDecimal.test(values.interestRate)) {
      errors.interestRate = "Interest Rate must be in number with exact 2 decimal points format!";
    }
    if (!values.loanLength) {
      errors.loanLength = "Loan Length is required!";
    }
    if (!values.loanGrade) {
      errors.loanGrade = "Loan Grad is required";
    }
    if (!values.loanPurpose) {
      errors.loanPurpose = "Loan Purpose is required";
    }
    if (!values.emp_length) {
      errors.emp_length = "Employee Length is required";
    }
    return errors;
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to create loan profiles.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper} elevation={6}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Editing Loan Profile "${postData.memberID}"` : 'Creating a Loan Profile'}</Typography>
        <TextField name="memberID" variant="outlined" label="Member ID" fullWidth value={postData.memberID} onChange={(e) => setPostData({ ...postData, memberID: e.target.value })} error={!!formErrors.memberID} helperText={formErrors?.memberID}/>
        <TextField name="loanAmount" variant="outlined" label="Loan Amount" fullWidth value={postData.loanAmount} onChange={(e) => setPostData({ ...postData, loanAmount: e.target.value })} error={!!formErrors.loanAmount} helperText={formErrors?.loanAmount} />
        <TextField name="interestRate" variant="outlined" label="Annual Interest Rate" fullWidth value={postData.interestRate} onChange={(e) => setPostData({ ...postData, interestRate: e.target.value })} error={!!formErrors.interestRate} helperText={formErrors?.interestRate} />
        <FormControl variant="outlined" className={classes.formControl} fullWidth error={!!formErrors.loanLength}>
        <InputLabel htmlFor="outlined-loanLength-native-simple">Loan Length</InputLabel>
        <Select
          native
          value={postData.loanLength}
          onChange={(e) => setPostData({ ...postData, loanLength: e.target.value })}
          label="loanLength"
          inputProps={{
            name: 'loanLength',
            id: 'outlined-loanLength-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option value={36}>36 months</option>
          <option value={60}>60 months</option>
        </Select>
        <FormHelperText>{formErrors?.loanLength}</FormHelperText>
      </FormControl>
        <FormControl variant="outlined" className={classes.formControl} fullWidth error={!!formErrors.loanGrade}>
        <InputLabel htmlFor="outlined-loanGrade-native-simple">Loan Grade</InputLabel>
        <Select
          native
          value={postData.loanGrade}
          onChange={(e) => setPostData({ ...postData, loanGrade: e.target.value })}
          label="Loan Grade"
          inputProps={{
            name: 'loanGrade',
            id: 'outlined-loanGrade-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option value={'A'}>A</option>
          <option value={'B'}>B</option>
          <option value={'C'}>C</option>
          <option value={'D'}>D</option>
          <option value={'E'}>E</option>
          <option value={'F'}>F</option>
          <option value={'G'}>G</option>
        </Select>
        <FormHelperText>{formErrors?.loanGrade}</FormHelperText>
      </FormControl>
      <FormControl variant="outlined" className={classes.formControl} fullWidth error={!!formErrors.loanPurpose}>
        <InputLabel htmlFor="outlined-loanPurpose-native-simple">Loan Purpose</InputLabel>
        <Select
          native
          value={postData.loanPurpose}
          onChange={(e) => setPostData({ ...postData, loanPurpose: e.target.value })}
          label="loan Purpose"
          inputProps={{
            name: 'loanPurpose',
            id: 'outlined-loanPurpose-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option value={'Credit Card'}>Credit Card</option>
          <option value={'Debt Consolidation'}>Debt Consolidation</option>
          <option value={'Business'}>Business</option>
          <option value={'Major Purchase'}>Major Purchase</option>
          <option value={'Education'}>Education</option>
        </Select>
        <FormHelperText>{formErrors?.loanPurpose}</FormHelperText>
      </FormControl>
      <FormControl variant="outlined" className={classes.formControl} fullWidth error={!!formErrors.emp_length}>
        <InputLabel htmlFor="outlined-loanGrade-native-simple">Employment Length</InputLabel>
        <Select
          native
          value={postData.emp_length}
          onChange={(e) => setPostData({ ...postData, emp_length: e.target.value })}
          label="Employment Length"
          inputProps={{
            name: 'emp_length',
            id: 'outlined-empLength-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option value={'Lower than 1 year'}>Lower than 1 year</option>
          <option value={'Between 1 to 3 years'}>Between 1 to 3 years</option>
          <option value={'Between 4 to 10 years'}>Between 4 to 10 years</option>
          <option value={'Greater than 10 years'}>Greater than 10 years</option>
        </Select>
        <FormHelperText>{formErrors?.emp_length}</FormHelperText>
      </FormControl>
      <TextField name="message" variant="outlined" label="Terms and Conditions" InputProps={{
            readOnly: true,
          }} fullWidth multiline rows={6} value={message}  />
        <FormControl  variant="outlined" className={classes.formControl} fullWidth>
      <FormGroup aria-label="position" fullWidth>
        <FormControlLabel
          checked={optIn}
          onChange={event => {
            setOptIn(event.target.checked);
            return canBeSubmitted();
          }}
          control={<Checkbox color="primary" />}
          label="I agree with the term and conditions"
          labelPlacement="end"
        />
      </FormGroup>
    </FormControl>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth disabled={isDisabled}>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  );
};

export default Form;