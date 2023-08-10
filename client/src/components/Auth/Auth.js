import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import { gapi }from 'gapi-script';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import Icon from './icon';
import { signin, signup } from '../../actions/auth';
import { AUTH } from '../../constants/actionTypes';
import useStyles from './styles';
import Input from './Input';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmpassword: '' };

const SignUp = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const dispatch = useDispatch();
  const naviagte = useNavigate();
  const classes = useStyles();

  useEffect(() =>{
    function start() {
      gapi.client.init({
        clientId:"997334100181-on1nj2q4msoerjkicj52smft24iek7u7.apps.googleusercontent.com",
        scope: "profile"
      })
    };
    gapi.load('client:auth2',start);
  })
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(form));
    setIsSubmit(true);
    
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      if (isSignup) {
        dispatch(signup(form, naviagte));
      } else {
        dispatch(signin(form, naviagte));
      }
    }
  }, [formErrors]);

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    console.log(res);
    try {
      dispatch({ type: AUTH, data: { result, token } });

     naviagte('/');
    } catch (error) {
      console.log(error);
    }
  };

  const googleError = (error) => {console.log(error);alert('Google Sign In was unsuccessful. Try again later')};

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (isSignup && !values.firstName) {
      errors.firstName = "First Name is required!";
    } 
    if (isSignup && !values.lastName) {
      errors.lastName = "Last Name is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 10) {
      errors.password = "Password must be more than 10 characters";
    } 
    if (isSignup && !values.confirmpassword) {
      errors.confirmpassword = "Please reconfirm password";
    }else if(isSignup && values.password != values.confirmpassword){
      errors.confirmpassword = "Password does not match";
    }
    return errors;
  };


  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">{ isSignup ? 'Sign up' : 'Sign in' }</Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            { isSignup && (
            <>
              <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half error={!!formErrors.firstName} helperText={formErrors?.firstName} />
              <Input name="lastName" label="Last Name" handleChange={handleChange} half error={!!formErrors.lastName} helperText={formErrors?.lastName} />
            </>
            )}
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" error={!!formErrors.email} helperText={formErrors?.email}/>
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} error={!!formErrors.password} helperText={formErrors?.password}/>
            { isSignup && <Input name="confirmpassword" label="Repeat Password" handleChange={handleChange} type="password" error={!!formErrors.confirmpassword} helperText={formErrors?.confirmpassword} /> }
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            { isSignup ? 'Sign Up' : 'Sign In' }
          </Button>
          <GoogleLogin
            clientId="997334100181-on1nj2q4msoerjkicj52smft24iek7u7.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                Google Sign In
              </Button>
            )}
            prompt='consent'
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
            scope="profile"
            plugin_name='login'
          />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default SignUp;