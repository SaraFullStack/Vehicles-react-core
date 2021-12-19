import React, { Component } from "react";
import moment from "moment";
import { readVehicles, deleteEvent } from "../actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class VehicleItem extends Component {
  constructor(props) {
    super(props);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }
  render() {
    var { vehicle } = this.props;

    return (
      <tr>
        <td className="col_name">{vehicle.order}</td>
        <td className="col_name">{vehicle.vin}</td>
        <td className="col_name">{vehicle.model}</td>
        <td className="col_name">{vehicle.card}</td>
        <td className="col_name">
          {moment(vehicle.delivery).format("DD-MM-YYYY")}
        </td>
        <td>
          <Link to={`/vehicles/${vehicle.order}`}>
            <button className="btn btn-primary">
              <i className="fa fa-eye"></i>
            </button>
          </Link>
          <button
            className="btn btn-danger"
            onClick={() => this.onDeleteClick(vehicle.order)}
          >
            <i className="fa fa-trash"></i>
          </button>
        </td>
      </tr>
    );
  }
  async onDeleteClick(numero) {
    await this.props.deleteEvent(numero);
  }
}

const mapStateToProps = (state) => ({ vehicles: state.vehicles });

const mapDispatchToProps = { readVehicles, deleteEvent };
export default connect(mapStateToProps, mapDispatchToProps)(VehicleItem);
