import React from 'react';
import Auxiliar from '../../hoc/Auxiliar';
import styles from './Layout.module.css';

const layout = ( props ) =>(
    <Auxiliar>
        <div>Histogram with PieChart, BarChart, MUI Slider, GroupedChart, MUI Select</div>
        <main>
            {props.children}
        </main>
    </Auxiliar> 
);

export default layout;