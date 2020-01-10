import React from 'react';
import Auxiliar from '../../hoc/Auxiliar';
import styles from './Layout.module.css';

const layout = ( props ) =>(
    <Auxiliar>
        <div className={styles.Title}>Robo3 Dashboard</div>
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
            <a href='#'>Logout</a>
            </div>
        </div>
        <main>
            {props.children}
        </main>
    </Auxiliar> 
);

export default layout;