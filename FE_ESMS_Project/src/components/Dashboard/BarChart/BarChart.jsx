import PropTypes from "prop-types";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

import * as St from "./BarChart.styled";
// import { useEffect, useState } from "react";

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend
);

const BarChart = ({ data, loading, max, labels }) => {
    // const [max, setMax] = useState(0);

    // useEffect(() => {
    //     const numbers = data.map((item) => item.numOfStu);
    //     const maxNumber = Math.max(...numbers);
    //     if (maxNumber !== -Infinity) {
    //         if (maxNumber % 2 === 0) {
    //             // số chẵn
    //             setMax(maxNumber + 20);
    //         } else {
    //             // số lẻ
    //             setMax(maxNumber + 19);
    //         }
    //     } else {
    //         setMax(0);
    //     }
    // }, [data]);

    if (!Array.isArray(data) || !Array.isArray(labels)) {
        return null;
    }

    const datas = {
        labels: labels,
        datasets: [
            {
                label: "2023",
                data: data,
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                    "rgba(255, 205, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(201, 203, 207, 0.2)",
                ],
                borderColor: [
                    "rgb(255, 99, 132)",
                    "rgb(255, 159, 64)",
                    "rgb(255, 205, 86)",
                    "rgb(75, 192, 192)",
                    "rgb(54, 162, 235)",
                    "rgb(153, 102, 255)",
                    "rgb(201, 203, 207)",
                ],
                pointBorderColor: "transparent",
                borderWidth: 1,
                // tension: 0.3,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: false,
            title: {
                display: true,
                text: "Performance",
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
        <div>
            <St.CardStyled hoverable loading={loading}>
                <Bar className="chart" data={datas} options={options} />
            </St.CardStyled>
        </div>
    );
};

BarChart.propTypes = {
    data: PropTypes.array,
    loading: PropTypes.bool,
    max: PropTypes.number,
    labels: PropTypes.array,
};

export default BarChart;
