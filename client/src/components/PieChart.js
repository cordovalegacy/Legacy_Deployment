import React from "react";
import { Pie } from 'react-chartjs-2'

const PieChart = ({ PriceData, options }) => {
    return <Pie type="pie" data={PriceData} options={options} className="canvasjs-chart-canvas"/>
}

export default PieChart
