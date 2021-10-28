// STEP 1 - Include Dependencies
// Include react
import React from "react";

// Include the react-fusioncharts component
import ReactFC from "react-fusioncharts";

// Include the fusioncharts library
import FusionCharts from "fusioncharts";

// Include the chart type
import Column2D from "fusioncharts/fusioncharts.charts";

// Include the theme as fusion
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

import { useGlobalContext } from "../../context/context";

// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

const Column3D = () => {
  // STEP 2 - Chart Data

  let { repos } = useGlobalContext();
  // console.log(repos);
  repos.sort((prev, next) => {
    if (prev.stargazers_count > next.stargazers_count) return -1;
    else if (prev.stargazers_count < next.stargazers_count) return 1;
    return 0;
  });
  // repos = repos.filter((repo) => repo.stargazers_count > 0);
  if (repos.length > 5) {
    repos = repos.slice(0, 5);
  }

  const chartData = repos.map((repo) => {
    return { label: repo.name, value: repo.stargazers_count };
  });

  // const chartData = [
  //   {
  //     label: "Venezuela",
  //     value: "290",
  //   },
  //   {
  //     label: "Saudi",
  //     value: "260",
  //   },
  //   {
  //     label: "Canada",
  //     value: "180",
  //   },
  //   {
  //     label: "Iran",
  //     value: "140",
  //   },
  //   {
  //     label: "Russia",
  //     value: "115",
  //   },
  //   {
  //     label: "UAE",
  //     value: "100",
  //   },
  //   {i
  //     label: "US",
  //     value: "30",
  //   },
  //   {
  //     label: "China",
  //     value: "30",
  //   },
  // ];

  // STEP 3 - Creating the JSON object to store the chart configurations
  const chartConfigs = {
    type: "column2d", // The chart type
    width: "100%", // Width of the chart
    height: "400", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        //Set the chart caption
        caption: "Most Popular",
        xAxisName: "Repos",
        yAxisName: "Stars",
        theme: "fusion",
        showValues: true,
      },
      // Chart Data
      data: chartData,
    },
  };
  return <ReactFC {...chartConfigs} />;
};

// STEP 4 - Creating the DOM element to pass the react-fusioncharts component

export default Column3D;
