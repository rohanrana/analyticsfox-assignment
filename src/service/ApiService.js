import axios from "axios";
// import OpenNotification from "../components/common/CommonButton/OpenNotification";
// import { fields, requiredFields } from "../constants/Common";

const   UtilService = {
  roundNumer(number, place) {
    return +(Math.round(number + `e+${place}`) + `e-${place}`);
  },
  subString(string, start, end) {
    return string.substring(start, end);
  },
  callApi(object, cb) {
    let headers = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    axios[object.method](object.url, object.request, headers)
      // axios(request)
      .then(({ data }) => {
        cb(null, data);
      })
      .catch(error => {
        if (error.response && error.response.data) {
          cb(null, error.response.data);
        }
      });
  }
};

// UtilService.callApi()
export default UtilService;
