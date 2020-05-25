import React from "react";
import "./App.css";
import Dashboard from "./components/dashboard/Dashboard";
import Header from "./components/layout/Header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddProject from "./components/project/AddProject";
import { Provider } from "react-redux";
import store from "./store";
import UpdateProject from "./components/project/UpdateProject";
import ProjectBoard from "./components/ProjectBoard/ProjectBoard";
import AddProjectTask from "./components/ProjectTask/AddProjectTask";
import UpdateProjectTask from "./components/ProjectTask/UpdateProjectTask";
import Landing from "./components/layout/Landing";
import Register from "./components/UserManagement/Register";
import Login from "./components/UserManagement/Login";
import setJwtToken from "./utils/jwtUtils";
import jwt_decode from "jwt-decode";
import { SET_CURRENT_USER } from "./actions/types";
import { logout } from "./actions/securityActions";
import SecuredRoutes from "./utils/securedRoutes";

const jwtToken = localStorage.getItem("jwtToken");
if (jwtToken) {
  setJwtToken(jwtToken);
  const decodedToken = jwt_decode(jwtToken);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decodedToken,
  });

  const currentTime = Date.now() / 1000;
  if (currentTime > decodedToken.exp) {
    store.dispatch(logout());
    window.location.href = "/";
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header />
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Switch>
            <SecuredRoutes exact path="/dashboard" component={Dashboard} />
            <SecuredRoutes exact path="/addProject" component={AddProject} />
            <SecuredRoutes
              exact
              path="/updateProject/:id"
              component={UpdateProject}
            />
            <SecuredRoutes
              exact
              path="/projectBoard/:id"
              component={ProjectBoard}
            />
            <SecuredRoutes
              exact
              path="/addProjectTask/:id"
              component={AddProjectTask}
            />
            <SecuredRoutes
              exact
              path="/updateProjectTask/:backlog_id/:pt_id"
              component={UpdateProjectTask}
            />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
