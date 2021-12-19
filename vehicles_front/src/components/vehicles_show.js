import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import { getVehicle, deleteEvent, putVehicles, postVehicles } from "../actions";

class EventsShow extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    if (id) this.props.getVehicle(id);
  }

  renderField(field) {
    const {
      input,
      label,
      type,
      meta: { touched, error },
    } = field;

    return (
      <TextField
        hintText={label}
        floatingLabelText={label}
        type={type}
        errorText={touched && error}
        {...input}
        fullWidth={true}
      />
    );
  }

  async onDeleteClick() {
    const { order } = this.props.match.params;
    await this.props.deleteEvent(order);
    this.props.history.push("/");
  }

  async onSubmit(values) {
    if (this.props.history.location.pathname.includes("new")) {
      await this.props.postVehicles(values);
      this.props.history.push("/");
    } else {
      await this.props.putVehicles(values, this.props.match.params.order);
      this.props.history.push("/");
    }
  }

  render() {
    const { handleSubmit, pristine, submitting, invalid } = this.props;
    const style = { margin: 12 };

    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <div>
          <Field
            label="Bastidor"
            name="vin"
            type="text"
            component={this.renderField}
          />
        </div>
        <div>
          <Field
            label="Modelo"
            name="model"
            type="text"
            component={this.renderField}
          />
        </div>
        <div>
          <Field
            label="Matrícula"
            name="card"
            type="text"
            component={this.renderField}
          />
        </div>
        <div>
          <Field
            label="Fecha de entrega"
            name="delivery"
            type="text"
            component={this.renderField}
          />
        </div>
        <div>
          <RaisedButton
            label="Enviar"
            type="submit"
            style={style}
            disabled={pristine || submitting || invalid}
          />
          <RaisedButton
            label="Cancelar"
            style={style}
            containerElement={<Link to="/" />}
          />
          <RaisedButton
            label="Borrar"
            style={style}
            onClick={this.onDeleteClick}
          />
        </div>
      </form>
    );
  }
}

const validate = (values) => {
  const errors = {};

  if (!values.vin) errors.vin = "El campo bastidor es obligatorio.";
  if (!values.model) errors.model = "El campo modelo es obligatorio.";
  if (!values.card) errors.card = "El campo matrícula es obligatorio.";
  if (!values.delivery) errors.delivery = "El fecha de entrega es obligatorio.";
  return errors;
};

const mapStateToProps = (state, ownProps) => {
  const event = state.vehicles[ownProps.match.params.order];
  return { initialValues: event, event };
};

const mapDispatchToProps = {
  deleteEvent,
  getVehicle,
  putVehicles,
  postVehicles,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm({ validate, form: "eventShowForm", enableReinitialize: true })(
    EventsShow
  )
);
