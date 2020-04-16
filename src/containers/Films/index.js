import React, { Component } from "react";
import { Row, Col, Button, Table, Pagination, Modal } from "antd";

import UtilService from "../../service/ApiService";
import { withRouter } from "react-router-dom";
import CardComponent from "../../components/CardComponent/CardComponent";

class Films extends Component {
  state = {
    offset: 5,
    current: 1,
    peoples: [],
    loading: false
  };
  componentDidMount() {
    this.GetFilmsData();
  }

  GetFilmsData = e => {
    let obj = {
      url: "https://swapi.co/api/films",
      method: "get"
    };

    this.setState({ loading: true }, () => {
      UtilService.callApi(obj, (err, data) => {

        this.setState({
          peoples: data.results,
          next: data.next,
          total: data.count,
          loading: false
        });
      });
    });
  };

  loadMoreData = () => {
    let obj = {
      url: this.state.next,
      method: "get"
    };

    this.setState({ loadmoreloading: true }, () => {
      UtilService.callApi(obj, (err, data) => {

        this.setState({
          peoples: [...this.state.peoples, ...data.results],
          next: data.next,
          total: data.count,
          loadmoreloading: false
        });
      });
    });
  };

  render() {
    let { peoples, loading, loadmoreloading } = this.state;
    return (
      <div className="site-card-border-less-wrapper">
        <Row gutter={16}>
          {!loading &&
            peoples.map((film, index) => {

                let data = film.characters

              return (
                <div
                  onClick={() =>
                    this.props.history.push(`/${"films"}/${index + 1}/`)
                  }
                  key={index}

                  style={{ cursor: "pointer" }}
                  className="card-wrapper"
                >
                  <h1>{film.title}</h1>
                  <hr />
                  <ul className="card-list-wrapper">
                    {data.slice(0, 5).map((d, index) => {

                       let id = d.split("/")[5]

                      return (
                        <span
                  key={index}

                          style={{ cursor: "pointer" }}
                          onClick={event => {
                            event.stopPropagation();
                            this.props.history.push(
                              `/${"people"}/${id}/`
                            );
                          }}
                        >{`People${index + 1}`}</span>
                      );
                    })}
                  </ul>
                </div>
              );

              // return (
              //   <CardComponent
              //     metaData={film.characters}
              //     {...this.props}
              //     id={index + 1}
              //     name={film.title}
              //     detailLBL="films"
              //     {...film}
              //   />
              // );
            })}
        </Row>

        {loading && <h1>Fetching Films...</h1>}

        <div style={{ textAlign: "center", marginTop: 20 }}>
          {this.state.next && (
            <Button disabled={loadmoreloading} onClick={this.loadMoreData}>
              {loadmoreloading ? "Loading More..." : "Load More"}
            </Button>
          )}
        </div>

        {/* <div className={"pagination-wrapper"}>
              <Pagination
                defaultCurrent={1}
                // current={this.state.current}
                // onChange={this.handlePagination}
                pageSize={5}
                // total={this.state.paginationArray.length}
              />
            </div> */}
      </div>
    );
  }
}

export default withRouter(Films);
