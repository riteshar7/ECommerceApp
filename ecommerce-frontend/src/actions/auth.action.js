import { authConstants, cartConstants } from "./constants";
import axios from "../helpers/axios";

// Signup action
export const signup = (user) => {
  return async (dispatch) => {
    let res;
    try {
      dispatch({ type: authConstants.SIGNUP_REQUEST });
      res = await axios.post(`/signup`, user);

      if (res.status === 200) {
        dispatch({ type: authConstants.SIGNUP_SUCCESS });

        const { token, user } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        dispatch({
          type: authConstants.LOGIN_SUCCESS,
          payload: { token, user },
        });
      } else {
        const { error } = res.data;
        dispatch({ type: authConstants.SIGNUP_FAILURE, payload: { error } });
      }
    } catch (error) {
      const errorMsg = error.response?.data?.error || error.message || "An error occurred during signup";
      dispatch({
        type: authConstants.SIGNUP_FAILURE,
        payload: { error: errorMsg },
      });
    }
  };
};

// Login action
export const login = (user) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.LOGIN_REQUEST });

    try {
      const res = await axios.post(`/signin`, user);

      if (res.status === 200) {
        const { token, user } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        dispatch({
          type: authConstants.LOGIN_SUCCESS,
          payload: { token, user },
        });
      } else {
        const { error } = res.data;
        dispatch({
          type: authConstants.LOGIN_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      const errorMsg = error.response?.data?.error || error.message || "An error occurred during login";
      dispatch({
        type: authConstants.LOGIN_FAILURE,
        payload: { error: errorMsg },
      });
    }
  };
};

// Check if user is logged in
export const isUserLoggedIn = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");

    if (token) {
      const user = JSON.parse(localStorage.getItem("user"));
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: { token, user },
      });
    } else {
      dispatch({
        type: authConstants.LOGIN_FAILURE,
        payload: { error: "Failed to login" },
      });
    }
  };
};

// Signout action
export const signout = () => {
  return async (dispatch) => {
    dispatch({ type: authConstants.LOGOUT_REQUEST });

    // Clear local storage
    localStorage.clear();

    dispatch({ type: authConstants.LOGOUT_SUCCESS });
    dispatch({ type: cartConstants.RESET_CART });

    // Optionally handle signout API call here
  };
};
