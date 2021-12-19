import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { composeWithDevTools } from "redux-devtools-extension";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import reducer from "./reducers";
import vehiclesShow from "./components/vehicles_show";
import vehicles from "./components/vehicles";
import "./index.css";

const enhancer =
  process.env.NODE_ENV === "development"
    ? composeWithDevTools(applyMiddleware(thunk))
    : applyMiddleware(thunk);
const store = createStore(reducer, enhancer);

ReactDOM.render(
  <MuiThemeProvider>
    <h1>Listado de pedidos</h1>
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={vehicles} />
          <Route exact path="/vehicles" component={vehicles} />
          <Route path="/vehicles/new" component={vehiclesShow} />
          <Route path="/vehicles/:order" component={vehiclesShow} />
        </Switch>
      </BrowserRouter>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById("root")
);
