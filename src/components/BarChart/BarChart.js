import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import styles from "./BarChart.module.css";
import RadioButtonsGroup from "../../components/RadioButtons/RadioButtons";

class BarChart extends Component {
  state = {
    sheetsData: [],
    filteredData: [],
    series: [
      {
        name: "",
        data: []
      }
    ],
    options: {
      chart: {
        type: "bar",
        height: 350
      },
      colors: ["#00e68a"],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded"
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      xaxis: {
        categories: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7],
        tickAmount: 11,
        tickPlacement: "between"
      },
      yaxis: {
        title: {
          text: this.props.title
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function(y) {
            return y;
          }
        }
      }
    }
  };

  render() {
    return (
      <div className={styles.BarChart} id='secondSection'>
        <p>{this.props.title}</p>
        {this.props.isTutor ? (
          <div></div>
        ) : (
          <RadioButtonsGroup
            roundsHandler={this.props.roundsHandler}
            timeHandler={this.props.timeHandler}
          />
        )}
        <ReactApexChart
          options={{ ...this.state.options, ...this.props.categories }}
          series={this.props.barChartSeries}
          type='bar'
          height={350}
        />
      </div>
    );
  }
}

export default BarChart;
