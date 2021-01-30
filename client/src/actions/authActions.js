import axios from 'axios'
import { returnErrors} from './errorActions'
import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
  } from '../actions/types';

  //chrck token & load user
  export const loadUser = ()=>( dispatch, getState) =>{
      //user loading
      dispatch({ type:USER_LOADING})

   

      axios.get('/api/auth/user', tokenConfig(getState))
      .then(res => dispatch({
          type:USER_LOADED,
          payload: res.data
      }))
      .catch(err =>{
          dispatch(returnErrors(err.response.data, err.response.status))
          dispatch({
              type:AUTH_ERROR
          })
      })

  }

  //setup config/headers and token
  export const tokenConfig = getState=>{
         //get token fron local strorage
         const token = getState().auth.token

         //heaaders
         const config = {
             headers:{
                 'Content-type':"application/json"
             }
         }
   
         //add token to headers
         if (token){
             config.headers['x-auth-token'] = token
         }
         return config
  }