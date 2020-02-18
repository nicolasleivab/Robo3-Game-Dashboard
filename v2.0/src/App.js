import React from "react";
import "./App.module.css";
import Layout from "./components/Layout/Layout";
import TutorDashboard from "./pages/TutorDashboard/TutorDashboard";
import StudentDashboard from "./pages/StudentDashboard/StudentDashboard";
import Login from "./pages/Login/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Login} />
        <Route
          path='/tutor'
          render={props => (
            <Layout
              firstLink={"Distribution"}
              secondLink={"Probability of Success"}
              thirdLink={"Solutions"}
            >
              <TutorDashboard />
            </Layout>
          )}
        />
        <Route
          path='/student'
          render={props => (
            <Layout
              firstLink={"Overview"}
              secondLink={"Solutions"}
              thirdLink={"Heatmap"}
            >
              <StudentDashboard />
            </Layout>
          )}
        />
      </Switch>
    </Router>
  );
}

export default App;
