import { loginApi, signUpApi, verifyOtp } from "../../Api/api";
import { setUser,setError,clearError,setLogin, setEmail } from "../Slice/authSlice";
import axios from "axios";


export const signUpAsync = (userData, navigate) => async (dispatch) => {
    try {
      const response = await signUpApi(userData);
      console.log("Api Response:", response);
      if (response && response.data) { // Add this check
        if (response.data.error) {
          dispatch(setError(response.data.error));
        } else if (response.status >=  200 && response.status <  300) {
          console.log("User Created Successfully");
          dispatch(setUser(response.data.data));
          navigate('/verify');
        } else {
          dispatch(setError(response.data.error));
        }
      } else {
        // Handle the case where response or response.data is undefined
        dispatch(setError('Unexpected response structure.'));
      }
    } catch (error) {
      console.log('Error during user creation:', error);
      if (error.response) {
        console.log("Error Response", error.response);
        if (error.response.data) { // Check if error.response.data exists
          console.log("Error Response data:", error.response.data.error);
          dispatch(setError(error.response.data.error));
        } else {
          // Handle the case where error.response.data is undefined
          dispatch(setError('Unexpected error response structure.'));
        }
      } else {
        // Handle cases where error.response does not exist
        dispatch(setError('An unexpected error occurred.'));
      }
    }
  };
  
export const verifyOtpAsync = (email,otp,navigate) => async (dispatch) => {
  try{
    const response = await verifyOtp(email,otp)
    console.log("APi Response:",response)
    if (response.status === 200){
      dispatch(setUser(response.data.user))
      navigate('/')
    } else {
      dispatch(setError(response.data.error))
    }
  } catch(error){
    console.log("Errors:",error)
    dispatch(setError(error.response.data.error))
  }
}

export const login = (email,password,navigate) => async (dispatch) =>{
  try{
    const response = await loginApi(email,password)
    console.log(response)
    if(response.status === 200){
      dispatch(setLogin(response.data))
      console.log("Login data:",response.data)
      console.log("token:",response.data.jwt)
      console.log("userid:",response.data.user.id)
      dispatch(clearError())
      navigate('/home')
    }
    else{
      dispatch(setError("invalid details"))
    }
  }catch (error) {
    console.error("Error during user login:", error);
    let errorMessage = 'An unexpected error occurred.';
    if (error.response) {
      // If the error has a response, log the response and set a specific message
      console.error("Error Response", error.response);
      if (error.response.data && error.response.data.error) {
        console.error("Error Response data:", error.response.data.error);
        errorMessage = error.response.data.error;
      } else {
        console.error("Error Response data:", error.response.data);
        errorMessage = 'An error occurred while processing your request.';
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error("Error Request", error.request);
      errorMessage = 'No response received from the server.';
    } else {
      // Something happened in setting up the request that triggered an error
      console.error("Error Message", error.message);
      errorMessage = error.message;
    }
    dispatch(setError(errorMessage));
  }
  

}
export const googleLoginAsync = (tokenId, navigate) => async (dispatch) => {
  try {
     const response = await axios.post('http://127.0.0.1:8000/auth/login/google/', {
       access_token: tokenId,
     });
 
     const { user, token } = response.data;
     console.log("User:",user)
     console.log("Token:",token)
     dispatch(setUser(user));
     dispatch(setLogin(token));
     navigate('/');
  } catch (error) {
     console.log("Error:",error);
     dispatch(setError("Google login failed. Please try again."));
  }
 };
 