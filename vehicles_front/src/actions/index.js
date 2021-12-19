import axios from "axios";

export const READ_VEHICLES = "READ_VEHICLES";
export const READ_VEHICLE = "READ_VEHICLE";
export const CREATE_VEHICLE = "CREATE_VEHICLE";
export const UPDATE_VEHICLE = "UPDATE_VEHICLE";
export const DELETE_VEHICLE = "DELETE_VEHICLE";

const ROOT_URL = "https://localhost:7201";
const QUERYSTRING = "?order=";

axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

export const readVehicles = () => async (dispatch) => {
  const response = await axios.get(`${ROOT_URL}/Vehicle`);
  dispatch({ type: READ_VEHICLES, response });
};

export const postVehicles = (values) => async (dispatch) => {
  const response = await axios.post(`${ROOT_URL}/Vehicle`, values);
  dispatch({ type: CREATE_VEHICLE, response });
};

export const putVehicles = (values, order) => async (dispatch) => {
  console.log(`${ROOT_URL}/Vehicle${QUERYSTRING}${order}`);
  const response = await axios.put(
    `${ROOT_URL}/Vehicle${QUERYSTRING}${order}`,
    values
  );
  dispatch({ type: UPDATE_VEHICLE, response });
};

export const getVehicle = (order) => async (dispatch) => {
  const response = await axios.get(`${ROOT_URL}/Vehicle/${order}`);
  dispatch({ type: READ_VEHICLE, response });
};

export const deleteEvent = (order) => async (dispatch) => {
  await axios.delete(`${ROOT_URL}/Vehicle/${QUERYSTRING}${order}`);
  dispatch({ type: DELETE_VEHICLE, order });
};
