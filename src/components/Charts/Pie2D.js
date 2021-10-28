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

// STEP 2 - Chart Data

// STEP 3 - Creating the JSON object to store the chart configurations

const ChartComponent = () => {
  const { repos } = useGlobalContext();
  let stuff = {};
  repos.forEach((repo) => {
    const language = repo.language;
    if (!language) {
    } else if (!stuff.hasOwnProperty(language)) {
      stuff[language] = 1;
    } else {
      stuff[language]++;
    }
  });
  let data = [];
  for (const key in stuff) {
    data.push({ label: key, value: stuff[key] });
  }
  data.sort((a, b) => b.value - a.value).slice(0, 5);
  // console.log(stuff);
  const chartConfigs = {
    type: "pie2d", // The chart type
    width: "100%", // Width of the chart
    height: "400", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        //Set the chart caption
        caption: "Languages",
        theme: "fusion",
        showPercentValues: true,
        decimals: "0",
      },
      // Chart Data
      data: data,
    },
  };
  return <ReactFC {...chartConfigs} />;
};

// STEP 4 - Creating the DOM element to pass the react-fusioncharts component

export default ChartComponent;
