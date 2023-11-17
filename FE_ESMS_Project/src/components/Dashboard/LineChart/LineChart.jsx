// import PropTypes from "prop-types";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import PropTypes from "prop-types";

import * as St from "./LineChart.styled";
// import { useEffect, useState } from "react";

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend
);

const LineChart = ({ labels, data, loading, max }) => {
    if (!Array.isArray(data) || !Array.isArray(labels)) {
        return null;
    }

    const datas = {
        // labels: ["Sep", "Oct", "Nov", "Dec"],
        labels: labels,
        datasets: [
            {
                label: "Value",
                data: data,
                // backgroundColor: "transparent",
                backgroundColor: "rgb(75, 192, 192)",
                borderColor: "rgb(75, 192, 192)",
                pointBorderColor: "transparent",
                borderWidth: 3,
                tension: 0.3,
            },
        ],
    };

    const option = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: false,
            title: {
                display: true,
                text: "Data",
                font: {
                    size: 16,
                    weight: "bold",
                },
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
            },
            y: {
                min: 0,
                max: max,
                ticks: {
                    stepSize: 2,
                },
            },
        },
    };

    return (
        <St.CardStyled hoverable loading={loading}>
            <Line className="chart" data={datas} options={option} />
        </St.CardStyled>
    );
};

LineChart.propTypes = {
    data: PropTypes.array,
    loading: PropTypes.bool,
    max: PropTypes.number,
    labels: PropTypes.array,
};

export default LineChart;
