import React, { Component } from "react";
import { Row, Col } from "antd";
import { withRouter } from "react-router-dom";
import UtilService from "../../service/ApiService";
export class DetailPage extends Component {
  state = {
    detail: null,
    loading:false
  };

  componentDidMount() {
    this.GetDetail();
  }

  GetDetail = () => {
    let id = this.props.match.params.id;
    let obj = {
      url: `https://swapi.co/api/films/${id}/`,
      method: "get"
    };

    this.setState({loading:true},()=>{
        UtilService.callApi(obj, (err, data) => {
            this.setState({
              detail: data,
              loading:false
            });
          });
    })
   
  };
  render() {
    let { detail ,loading} = this.state;
    return (
      !loading?<div className="site-card-border-less-wrapper">
        <div style={{ textAlign: "center" }}>{detail && detail.title}</div>
        <div className="meta-detail-wrapper">
          <div className="detail-inner">
            <label>Director : </label>
            {detail && <label> {detail.director}</label>}
          </div>
          <div className="detail-inner">
            <label> Producer : </label>
            {detail && <label> {detail.producer}</label>}
          </div>
          <div className="detail-inner">
            <label>Release Date : </label>
            {detail && <label> {detail.release_date}</label>}
          </div>
          
        </div>
      </div>:<h2>Fetching Detail.....</h2>
    );
  }
}

export default withRouter(DetailPage);
