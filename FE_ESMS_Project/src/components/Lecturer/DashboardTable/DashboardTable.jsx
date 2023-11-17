// import PropTypes from "prop-types";

import CardItem from "@/components/Dashboard/CardItem/CardItem";
import LineChart from "@/components/Dashboard/LineChart";
import {
    Card,
    Col,
    Divider,
    Flex,
    Row,
    Select,
    Table,
    Tag,
    Typography,
} from "antd";
import {
    HistoryOutlined,
    ScheduleOutlined,
    PaperClipOutlined,
    MoneyCollectOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import * as St from "./DashboardTable.styled";
import instance from "@/utils/instance";
import cookies from "@/utils/cookies";

const DashboardTable = () => {
    const [semesters, setSemesters] = useState([]);
    const [selectSemester, setSelectSemester] = useState();
    const [semesterId, setSemesterId] = useState(0);
    const [selectPhase, setSelectPhase] = useState();
    const [phases, setPhases] = useState([]);
    const [phaseId, setPhaseId] = useState(0);

    const [totalRegister, setTotalRegister] = useState(0);
    const [loadingTotalRegister, setLoadingTotalRegister] = useState(true);

    const [totalRegisterByPhase, setTotalRegisterByPhase] = useState(0);
    const [loadingTotalRegisterByPhase, setLoadingTotalRegisterByPhase] =
        useState(true);

    const [slotComing, setSlotComing] = useState(0);
    const [loadingSlotComing, setLoadingSlotComing] = useState(true);

    const [chartData, setChartData] = useState([]);
    const [chartLabels, setChartLabels] = useState([]);
    const [loadingChart, setLoadingChart] = useState(true);

    const [money, setMoney] = useState("0 vnd");

    const [max, setMax] = useState(0);

    const token = cookies.getToken();
    const pageSize = 10;

    const fetchSemester = () => {
        instance
            .get("semesters/otherRole")
            .then((res) => {
                const semestersData = res.data.data.map((item) => ({
                    label: item.season + " " + item.year,
                    value: item.id,
                    status: item.status,
                }));
                const newData = semestersData.reverse();
                setSemesterId(newData[0].value);
                setSelectSemester(newData[0].label);
                setSemesters(newData);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {});
    };

    const fetchPhase = () => {
        instance
            .get(`examPhases/otherRole`, {
                params: {
                    id: semesterId,
                },
            })
            .then((res) => {
                // console.log(res.data.data);
                if (semesterId !== 0) {
                    if (res.data.data.length !== 0) {
                        const phaseData = res.data.data.map((item) => ({
                            label: item.ePName,
                            value: item.id,
                            status: item.status,
                        }));
                        const newData = phaseData.reverse();
                        setSelectPhase(newData[0].label);
                        setPhaseId(newData[0].value);
                        setPhases(newData);
                        // console.log(newData);
                    } else {
                        setSelectPhase("");
                        setPhases([]);
                    }
                }
            })
            .catch((error) => {
                console.log("Phase: " + error);
            })
            .finally(() => {});
    };

    const fetchTotalRegister = () => {
        setLoadingTotalRegister(true);

        instance
            .get(`dashboard/totalRegistionOfLec`, {
                params: {
                    token: token,
                },
            })
            .then((res) => {
                const data = res.data.data;
                setTotalRegister(data);
                setLoadingTotalRegister(false);
            })
            .catch((error) => {
                console.log(error);
                setTotalRegister(0);
                setLoadingTotalRegister(false);
            })
            .finally(() => {});
    };

    const fetchTotalRegisterByPhase = () => {
        setLoadingTotalRegisterByPhase(true);
        if (phaseId !== 0) {
            setLoadingTotalRegisterByPhase(true);
            instance
                .get(
                    `dashboard/totalRegistionOfLecOnePhase?phaseId=${phaseId}`,
                    {
                        params: {
                            token: token,
                        },
                    }
                )
                .then((res) => {
                    const data = res.data.data;
                    setTotalRegisterByPhase(data);
                    setLoadingTotalRegisterByPhase(false);
                })
                .catch((error) => {
                    console.log(error);
                    setTotalRegisterByPhase(0);
                    setLoadingTotalRegisterByPhase(false);
                })
                .finally(() => {});
        } else {
            setTotalRegisterByPhase([]);
            // setLoadingTotalRegisterByPhase(false);
        }
    };

    const fetchSlotComing = () => {
        setLoadingSlotComing(true);
        if (phaseId !== 0) {
            setLoadingSlotComing(true);
            instance
                .get(`dashboard/futureSlotOfLecOnePhase?phaseId=${phaseId}`, {
                    params: {
                        token: token,
                    },
                })
                .then((res) => {
                    const data = res.data.data;
                    setSlotComing(data);

                    setLoadingSlotComing(false);

                    const money = data * 180000;
                    const formatMoney = (amount) => {
                        return new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                        }).format(amount);
                    };
                    setMoney(formatMoney(money));
                    // setMoney(`${formatMoney(money)} vnd`);
                })
                .catch((error) => {
                    console.log(error);
                    setSlotComing(0);
                    setLoadingSlotComing(false);
                })
                .finally(() => {});
        } else {
            setSlotComing([]);
            // setLoadingSlotComing(false);
        }
    };

    const fetchChartData = () => {
        setLoadingChart(true);
        if (semesterId !== 0) {
            instance
                .get(
                    `dashboard/totalRegistionEachPhase?semesterId=${semesterId}`,
                    {
                        params: {
                            token: token,
                        },
                    }
                )
                .then((res) => {
                    // console.log(res.data.data);
                    const data = res.data.data;
                    const formattedData = data
                        .sort((a, b) => b.phaseId - a.phaseId)
                        .map((item) => ({
                            ...item,
                        }));
                    const numbers = data.map((item) => item.slot);
                    const maxNumber = Math.max(...numbers);
                    if (maxNumber !== -Infinity) {
                        if (maxNumber % 2 === 0) {
                            // số chẵn
                            setMax(maxNumber + 2);
                        } else {
                            // số lẻ
                            setMax(maxNumber + 1);
                        }
                    } else {
                        setMax(0);
                    }
                    const newData = formattedData.map((item) => item.slot);
                    setChartData(newData);
                    // const labels = data.map((item) => item.phaseName);
                    const labels = formattedData.map(
                        (item, index) => `Phase ${index + 1}`
                    );
                    setChartLabels(labels);
                    setLoadingChart(false);
                })
                .catch((error) => {
                    console.log(error);
                    setChartData([]);
                    setChartLabels([]);
                    setLoadingChart(false);
                })
                .finally(() => {});
        } else {
            setChartData([]);
            setChartLabels([]);
            // setLoadingChart(false);
        }
    };

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const fetchChartData2 = () => {
        setLoading(true);
        if (phaseId !== 0) {
            // console.log(phaseId);
            instance
                .get("dashboard/detailFutureSlotOfLecOnePhase", {
                    params: {
                        phaseId: phaseId,
                        token: token,
                    },
                })
                .then((res) => {
                    // console.log(res.data.data);
                    const formattedData = res.data.data.map((item, index) => ({
                        ...item,
                        key: index + 1,
                        no: index + 1,
                        // startTime: item.startTime.slice(0, 5),
                        // endTime: item.endTime.slice(0, 5),
                    }));
                    setData(formattedData);
                    setLoading(false);
                })
                .catch((error) => {
                    setData([]);
                    setLoading(false);
                    console.log(error);
                });
        }
    };

    useEffect(() => {
        fetchSemester();
        fetchTotalRegister();
    }, []);

    useEffect(() => {
        fetchPhase();
        fetchChartData();
    }, [semesterId]);

    useEffect(() => {
        fetchTotalRegisterByPhase();
        fetchSlotComing();
        fetchChartData2();
    }, [phaseId]);

    const handleSelectSemester = (id, option) => {
        if (id !== semesterId) {
            if (option.status === 0) {
                // console.log("false");
            } else {
                // console.log("true");
            }
            setSelectSemester(option.label);
            setSemesterId(id);
            setPhaseId(0);
            setPhases([]);
        }
    };

    const handleSelectPhase = (id, option) => {
        // setSelectPhase(option.label);
        // setPhaseId(id);
        // console.log(option);

        if (id !== phaseId) {
            if (option.status === false) {
                // console.log("false");
            } else {
                // console.log("true");
            }
            setSelectPhase(option.label);
            setPhaseId(id);
        }
    };

    const columns = [
        {
            title: "No",
            width: "10%",
            render: (record) => {
                return <Typography>{record.no}</Typography>;
            },
        },
        {
            title: "Day",
            width: "20%",
            render: (record) => {
                return <Typography>{record.day}</Typography>;
            },
            // onCell: (record, rowIndex) => {
            //     let rowSpan = 1;
            //     if (rowIndex > 0 && data[rowIndex - 1].day === record.day) {
            //         rowSpan = 0;
            //     } else {
            //         let count = 0;
            //         while (
            //             rowIndex + count < data.length &&
            //             data[rowIndex + count].day === record.day
            //         ) {
            //             count++;
            //         }
            //         rowSpan = count;
            //     }
            //     return {
            //         rowSpan: rowSpan,
            //     };
            // },
        },
        {
            title: "Start Time",
            width: "15%",
            render: (record) => {
                return <Typography>{record.sTime}</Typography>;
            },
        },
        {
            title: "End Time",
            width: "15%",
            render: (record) => {
                return <Typography>{record.eTime}</Typography>;
            },
        },
        {
            title: "Room",
            width: "15%",
            render: (record) => {
                if (record.room === "N/A") {
                    return <Tag color="default">COMING SOON</Tag>;
                } else {
                    return <Typography>{record.room}</Typography>;
                }
            },
        },
        {
            title: "Location",
            width: "25%",
            render: (record) => {
                return <Typography>{record.location}</Typography>;
            },
        },
    ];

    return (
        <div>
            <Row gutter={[16, 20]}>
                <Col xs={24} md={24} lg={24}>
                    <St.StyledLeft>
                        <Typography className="title">Semester: </Typography>
                        <Select
                            onChange={handleSelectSemester}
                            value={selectSemester}
                            className="select"
                            options={semesters}
                        />
                        {phases.length !== 0 ? (
                            <Flex>
                                <Typography className="title">
                                    Phase:{" "}
                                </Typography>
                                <Select
                                    onChange={handleSelectPhase}
                                    value={selectPhase}
                                    className="select"
                                    options={phases}
                                />
                            </Flex>
                        ) : (
                            <div></div>
                        )}
                    </St.StyledLeft>
                </Col>
                <Col xs={24} md={24} lg={11}>
                    <Divider orientation="left">Total</Divider>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={12}>
                            <CardItem
                                loading={loadingTotalRegister}
                                desc={"At all the time"}
                                title={"Total Slots"}
                                value={totalRegister}
                                icon={<ScheduleOutlined className="icon" />}
                            />
                        </Col>
                        <Col xs={24} md={12}>
                            <CardItem
                                desc={"At this phase"}
                                loading={loadingTotalRegisterByPhase}
                                title={"Total Slots"}
                                value={totalRegisterByPhase}
                                icon={<PaperClipOutlined className="icon" />}
                            />
                        </Col>
                        <Col xs={24} md={12}>
                            <CardItem
                                desc={"At this phase"}
                                loading={loadingSlotComing}
                                title={"Coming Slots"}
                                value={slotComing}
                                icon={<HistoryOutlined className="icon" />}
                            />
                        </Col>
                        <Col xs={24} md={12}>
                            <CardItem
                                desc={"At this phase"}
                                title={"Total bonus"}
                                value={money}
                                loading={loadingSlotComing}
                                icon={<MoneyCollectOutlined className="icon" />}
                            />
                        </Col>
                    </Row>
                </Col>
                <Col xs={24} md={24} lg={13}>
                    <Divider orientation="left">Performance</Divider>
                    <LineChart
                        labels={chartLabels}
                        data={chartData}
                        max={max}
                        loading={loadingChart}
                    />
                </Col>
                {/* <Col xs={24}>
                    <Divider orientation="left">Haha</Divider>
                    <BarChart />
                </Col> */}
                <Col xs={24} style={{marginTop: 20}}>
                    <Card hoverable>
                        <Divider orientation="left">Incoming Slots</Divider>
                        <Table
                            scroll={{ x: true }}
                            columns={columns}
                            dataSource={data}
                            bordered
                            loading={loading}
                            pagination={{
                                pageSize: pageSize,
                                hideOnSinglePage: data.length <= pageSize,
                                showSizeChanger: false,
                            }}
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

DashboardTable.propTypes = {};

export default DashboardTable;
