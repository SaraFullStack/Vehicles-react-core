import _ from "lodash";
import {
  CREATE_VEHICLE,
  READ_VEHICLES,
  READ_VEHICLE,
  UPDATE_VEHICLE,
  DELETE_VEHICLE,
} from "../actions";

export default (vehicles = {}, action) => {
  switch (action.type) {
    case CREATE_VEHICLE:
    case READ_VEHICLE:
    case UPDATE_VEHICLE:
      const data = action.response.data;
      return { ...vehicles, [data.order]: data };
    case READ_VEHICLES:
      return _.mapKeys(action.response.data, "order");
    case DELETE_VEHICLE:
      delete vehicles[action.order];
      return { ...vehicles };
    default:
      return vehicles;
  }
};
