import axios from "../helpers/axios";
import { orderConstants } from "./constants";

export const getCustomerOrders = () => {
  return (dispatch) => {
    dispatch({ type: orderConstants.GET_CUSTOMER_ORDER_REQUEST });
    axios.post("/order/getCustomerOrders")
    .then((res) => {
      if (res.status === 200) {
        console.log(res);
        const { orders } = res.data;
        dispatch({
          type: orderConstants.GET_CUSTOMER_ORDER_SUCCESS,
          payload: { orders },
        });
      } else {
        const { error } = res.data;
        dispatch({
          type: orderConstants.GET_CUSTOMER_ORDER_FAILURE,
          payload: { error },
        });
      }
    })
    .catch((err)=>{
      console.log(err);
    })
  };
};

export const updateOrder = (payload) => {
  return async (dispatch) => {
    dispatch({ type: orderConstants.UPDATE_CUSTOMER_ORDER_REQUEST });
    try {
      const res = await axios.post("/order/update", payload);
      console.log(res);
      if (res.status === 200) {
        dispatch({ type: orderConstants.UPDATE_CUSTOMER_ORDER_SUCCESS });
        dispatch(getCustomerOrders());
      } else {
        const { error } = res.data;
        dispatch({
          type: orderConstants.UPDATE_CUSTOMER_ORDER_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};