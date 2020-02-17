import React from "react";
import "./App.module.css";
import Layout from "./components/Layout/Layout";
import TutorDashboard from "./pages/TutorDashboard/TutorDashboard";
import Login from "./pages/Login/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route path='/tutor' component={TutorDashboard} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
