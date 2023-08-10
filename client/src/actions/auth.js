import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });

    router('/');
  } catch (error) {
    console.log(error);
    if(error.response.status == 404){
      alert("User doesn't exist")
      };
    if(error.response.status == 400){
      alert("Invalid password")
      };
    if(error.response.status == 500){
      alert("Something went wrong")
      };
  }
};

export const signup = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    dispatch({ type: AUTH, data });

    router('/');
  } catch (error) {
    console.log(error);
    if(error.response.status == 400){
    alert("User already exists")
    };
    if(error.response.status == 500){
      alert("Something went wrong")
      };
  }
};