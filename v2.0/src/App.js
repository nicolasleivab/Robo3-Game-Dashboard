import React from "react";
import "./App.module.css";
import Layout from "./components/Layout/Layout";
import TutorDashboard from "./pages/TutorDashboard/TutorDashboard";
import Login from "./pages/Login/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Login} />
        <Layout>
          <Route path='/tutor' component={TutorDashboard} />
        </Layout>
      </Switch>
    </Router>
  );
}

export default App;
