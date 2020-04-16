import React from "react";
import { Card, Col } from "antd";
import UserAvtaar from "../../assets/img/man.png";
import { EditOutlined } from "@ant-design/icons";
const { Meta } = Card;
// import { Link } from "react-router-dom";
export default function CardComponent(props) {
  return (
    <Col style={{ marginTop: 10, cursor: "pointer" }} span={6}>
      <Card
        // title={props.user_name}
        bordered={false}
        cover={<img alt="example" src={UserAvtaar} />}
        actions={[
          // <SettingOutlined key="setting" />,
          <EditOutlined onClick={() => props.history.push(`/user/${props._id}`)} key="edit" />
          // <EllipsisOutlined key="ellipsis" />,
        ]}
        style={{ width: 300 }}
      >
        <Meta title="Name" description={`${props.user_name}`} />
        <Meta
          style={{ marginTop: 10 }}
          title="Phone"
          description={`+91${props.phone}`}
        />
        <Meta
          style={{ marginTop: 10 }}
          title="Email"
          description={`${props.email}`}
        />
      </Card>
    </Col>
  );
}
