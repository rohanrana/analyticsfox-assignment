import {
    SIGNIN_USER_SUCCESS, SIGNOUT_USER_SUCCESS
  } from "../../constants/ActionTypes";
  

  let userData = JSON.parse(localStorage.getItem("AF-USER-DATA"))
  let INTIAL_STATE = {
    assignmentData: [],
    userData:userData,
    loading: false,
  
  };
  
  export default (state = INTIAL_STATE, action) => {
    switch (action.type) {
      case SIGNIN_USER_SUCCESS:
        return { ...state, userData: action.payload,  };
      case SIGNOUT_USER_SUCCESS:{
        return { ...state, userData: null,  };

      }  
      default:
        return { ...state };
    }
  };
  