import React from "react";
import Auxiliar from "../../hoc/Auxiliar";
import styles from "./Layout.module.css";
import MobileNav from "../MobileNav/MobileNav";
import { Link } from "react-router-dom";

const layout = props => (
  <Auxiliar>
    <MobileNav />
    <div className={styles.Nav}>
      <p>Robo 3 Dashboard</p>
      <div className={styles.hoverBack}>
        <a href='#'>Distribution</a>
      </div>
      <div className={styles.hoverBack}>
        <a href='#GroupedChart'>Solutions</a>
      </div>
      <div className={styles.hoverBack}>
        <a href='#BarChart'>Success Prob.</a>
      </div>
      <div className={styles.hoverBack}>
        <Link to='./'>Logout</Link>
      </div>
    </div>
    <main>{props.children}</main>
  </Auxiliar>
);

export default layout;
