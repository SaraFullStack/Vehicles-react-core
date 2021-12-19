import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import VehicleItem from "./vehicleItem";
import Pagination from "./pagination";
import { readVehicles, deleteEvent } from "../actions";
import _ from "lodash";
import FloatingActionButton from "material-ui/FloatingActionButton";
import { Link } from "react-router-dom";
import ContentAdd from "material-ui/svg-icons/content/add";

class Vehicles extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totalRecords: "",
      totalPages: "",
      pageLimit: "",
      currentPage: "",
      startIndex: "",
      endIndex: "",
    };
  }

  async componentDidMount() {
    this.props.readVehicles();
    this.setState({
      totalRecords: this.props.products.length,
    });
  }

  renderEvents() {
    return _.map(this.props.products, (event) => (
      <VehicleItem product={event} />
    ));
  }

  showProducts = (vehicles) => {
    var result = null;
    if (vehicles.length > 0) {
      result = vehicles.map((event, index) => {
        return <VehicleItem vehicle={event} />;
      });
    }
    return result;
  };

  onChangePage = (data) => {
    this.setState({
      pageLimit: data.pageLimit,
      totalPages: data.totalPages,
      currentPage: data.page,
      startIndex: data.startIndex,
      endIndex: data.endIndex,
    });
  };

  render() {
    const style = {
      position: "fixed",
      right: 12,
      bottom: 12,
    };
    var { products } = this.props;
    var { totalPages, currentPage, pageLimit, startIndex, endIndex } =
      this.state;
    const arr = [];
    _.map(this.props.products, (event) => arr.push(event));
    var rowsPerPage = arr.slice(startIndex, endIndex + 1);
    return (
      <div className="section product_list_mng">
        <FloatingActionButton
          style={style}
          containerElement={<Link to="/vehicles/new" />}
        >
          <ContentAdd />
        </FloatingActionButton>
        <div className="container-fluid">
          <div className="box_product_control mb-15">
            <div className="row">
              <div className="col-xs-12 box_change_pagelimit">
                Paginación:
                <select
                  className="form-control"
                  value={pageLimit}
                  onChange={(e) =>
                    this.setState({ pageLimit: parseInt(e.target.value) })
                  }
                >
                  <option value={10}>10</option>
                  <option value={50}>50</option>
                  <option value={JSON.stringify(products).length}>Todos</option>
                </select>
              </div>
            </div>
          </div>
          <div className="box_tbl_list" id="vehicles">
            <table className="table table-bordered table-hover">
              <thead>
                <tr>
                  <th className="text-center">Número de Pedido</th>
                  <th className="text-center">Bastidor</th>
                  <th className="text-center">Modelo</th>
                  <th className="text-center">Matrícula</th>
                  <th className="text-center">Fecha de entrega</th>
                  <th className="text-center">Botones</th>
                </tr>
              </thead>
              <tbody>{this.showProducts(rowsPerPage)}</tbody>
            </table>
          </div>
          <div className="box_pagination">
            <div className="col-xs-12 box_pagination_info text-right">
              <p>
                {products.length} Vehículos | Página {currentPage}/{totalPages}
              </p>
            </div>
            <div className="row">
              <div className="col-xs-12 text-center">
                <Pagination
                  totalRecords={arr.length}
                  pageLimit={pageLimit || 10}
                  initialPage={1}
                  pagesToShow={5}
                  onChangePage={this.onChangePage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Vehicles.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  keyword: PropTypes.string,
};

const mapStateToProps = (state) => {
  return {
    products: state.vehicles,
  };
};

const mapDispatchToProps = { readVehicles, deleteEvent };

export default connect(mapStateToProps, mapDispatchToProps)(Vehicles);
