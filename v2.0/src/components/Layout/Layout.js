import React from 'react';
import Auxiliar from '../../hoc/Auxiliar';
import styles from './Layout.module.css';

const layout = ( props ) =>(
    <Auxiliar>
        <div className={styles.Nav}>
        </div>
        <main>
            {props.children}
        </main>
    </Auxiliar> 
);

export default layout;