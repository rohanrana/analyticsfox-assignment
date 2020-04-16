import UtilService from "../../service/ApiService";
import { API_GET_ASSIGNMENTS } from "../../constants/ApiConstants";
import {
  SET_HEADER_NAME,
  SIGNIN_USER_SUCCESS,
  SIGNOUT_USER_SUCCESS
} from "../../constants/ActionTypes";
import { message } from "antd";
import OpenNotification from "../../components/OpenNotification";

// export const getAssignments = data => {
//   return dispatch => {
//     //   dispatch({ type: FETCH_START });
//     let obj = {
//       ...API_GET_ASSIGNMENTS
//     };
//     dispatch({ type: GET_ALL_ASSIGNMENTS_START });

//     UtilService.callApi(obj, (err, data) => {
//       if (data && data.length !== 0) {
//         dispatch({ type: GET_ALL_ASSIGNMENTS_SUCCESS, payload: data });
//       } else {
//         dispatch({ type: GET_ALL_ASSIGNMENTS_FAIL, payload: data });
//       }
//     });
//   };
// };
export const userSignIn = (data, props) => {
  return dispatch => {
    //here we can call api to
    //temporory storedata
    let users = JSON.parse(localStorage.getItem("AF-ALL-USERS"));
    if (users) {
      let found_user = users.find(
        d => d.user_name === data.user_name || d.email === data.user_name
      );
      console.log("FOFOFOFOOOF", found_user);
      if (found_user) {
        if (found_user.password === data.password) {
          localStorage.setItem("AF-USER-DATA", JSON.stringify(data));
          dispatch({ type: SIGNIN_USER_SUCCESS, payload: data });
          props.history.push("/login");
        } else {
          OpenNotification({
            type: "error",
            title: "Email or Password is Incorrect"
          });
        }
      } else {
        OpenNotification({
          type: "error",
          title: "Email or Password is Incorrect"
        });
      }
    } else {
      OpenNotification({ type: "error", title: "User is not registered" });
    }
  };
};

export const userSignOut = props => {
  return dispatch => {
    localStorage.removeItem("AF-USER-DATA");
    props.history.push("/login");
    dispatch({ type: SIGNOUT_USER_SUCCESS });
  };
};
// export const setHeaderName = name => {
//   // let routes =[]
//   return dispatch => {
//     dispatch({ type: SET_HEADER_NAME, payload: name });
//   };
// };
export const authCheckState = () => {
  return dispatch => {
    const userData = localStorage.getItem("AF-USER-DATA");

    if (userData) {
      let user = localStorage.getItem("AF-USER-DATA");
      dispatch({ type: SIGNIN_USER_SUCCESS, payload: user });
    } else {
      userSignOut();
    }
  };
};
