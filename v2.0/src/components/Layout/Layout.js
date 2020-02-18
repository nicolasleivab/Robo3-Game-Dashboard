import React from "react";
import Auxiliar from "../../hoc/Auxiliar";
import styles from "./Layout.module.css";
import MobileNav from "../MobileNav/MobileNav";
import { Link } from "react-router-dom";

const layout = props => (
  <Auxiliar>
    <MobileNav
      firstLink={props.firstLink}
      secondLink={props.secondLink}
      thirdLink={props.thirdLink}
    />
    <div className={styles.Nav}>
      <p>Robo 3 Dashboard</p>
      <div className={styles.hoverBack}>
        <a href='#'>{props.firstLink}</a>
      </div>
      <div className={styles.hoverBack}>
        <a href='#secondSection'>{props.secondLink}</a>
      </div>
      <div className={styles.hoverBack}>
        <a href='#thirdSection'>{props.thirdLink}</a>
      </div>
      <div className={styles.hoverBack}>
        <Link to='./'>Logout</Link>
      </div>
    </div>
    <main>{props.children}</main>
  </Auxiliar>
);

export default layout;
