import { notification } from "antd";

const OpenNotification = option =>
  notification[option.type]({
    message: option.title,
    placement: "bottomRight"
  });

export default OpenNotification;
