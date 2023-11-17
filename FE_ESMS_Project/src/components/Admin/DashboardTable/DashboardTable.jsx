// import PropTypes from "prop-types";

import BarChart from "@/components/Dashboard/BarChart";
import CardItem from "@/components/Dashboard/CardItem/CardItem";
import CardTable from "@/components/Dashboard/CardTable";
import LineChart from "@/components/Dashboard/LineChart";
import {
    ScheduleOutlined,
    UserOutlined,
    ShopOutlined,
} from "@ant-design/icons";
import { Col, Divider, Flex, Row, Select, Typography } from "antd";
import * as St from "./DashboardTable.styled";
import { useEffect, useState } from "react";
import instance from "@/utils/instance";
import cookies from "@/utils/cookies";

const DashboardTable = () => {
    const [semesters, setSemesters] = useState([]);
    const [selectSemester, setSelectSemester] = useState();
    const [semesterId, setSemesterId] = useState(0);
    const [selectPhase, setSelectPhase] = useState();
    const [phases, setPhases] = useState([]);
    const [phaseId, setPhaseId] = useState(0);

    const [totalExaminer, setTotalExaminer] = useState(0);
    const [loadingExaminer, setLoadingExaminer] = useState(true);

    const [totalCourse, setTotalCourse] = useState("");
    const [loadingCourse, setLoadingCourse] = useState(true);

    const [totalSlot, setTotalSlot] = useState(0);
    const [loadingSlot, setLoadingSlot] = useState(true);

    const [totalRegisterLabels, setTotalRegisterLabels] = useState([]);
    const [totalRegisterData, setTotalRegisterData] = useState([]);
    const [loadingRegister, setLoadingRegister] = useState(true);

    const [dataTop, setDataTop] = useState([]);
    const [loadingDataTop, setLoadingDataTop] = useState(true);

    const [totalCourseAndStuData, setTotalCourseAndStuData] = useState([]);
    const [totalCourseAndStuLabels, setTotalCourseAndStuLabels] = useState([]);
    const [loadingCourseAndStu, setLoadingCourseAndStu] = useState(true);

    const [maxLine, setMaxLine] = useState(0);
    const [maxBar, setMaxBar] = useState(0);

    const token = cookies.getToken();

    const fetchSemester = () => {
        instance
            .get("semesters", {
                params: {
                    token: token,
                },
            })
            .then((res) => {
                // console.log(res.data.data);
                const semestersData = res.data.data.map((item) => ({
                    label: item.season + " " + item.year,
                    value: item.id,
                }));
                const newData = semestersData.reverse();
                setSemesterId(newData[0].value);
                setSelectSemester(newData[0].label);
                setSemesters(newData);
            })
            .catch((error) => {
                console.log(error);
                setSemesterId(0);
            })
            .finally(() => {});
    };

    const fetchPhase = () => {
        if (semesterId !== 0) {
            instance
                .get(`examPhases/otherRole`, {
                    params: {
                        token: token,
                        id: semesterId,
                    },
                })
                .then((res) => {
                    if (res.data.data.length !== 0) {
                        const phaseData = res.data.data.map((item) => ({
                            label: item.ePName,
                            value: item.id,
                        }));
                        const newData = phaseData.reverse();
                        setSelectPhase(newData[0].label);
                        setPhaseId(newData[0].value);
                        setPhases(newData);
                    } else {
                        setSelectPhase("");
                        setPhases([]);
                    }
                })
                .catch((error) => {
                    console.log("Phase: " + error);
                    setPhaseId(0);
                })
                .finally(() => {});
        }
    };

    const fetchExaminer = () => {
        setLoadingExaminer(true);
        if (phaseId !== 0) {
            setLoadingExaminer(true);
            instance
                .get(`dashboard/examinerDashBoard`, {
                    params: { token: token, ePId: phaseId },
                })
                .then((res) => {
                    const data = res.data.data;
                    setTotalExaminer(data);

                    setLoadingExaminer(false);
                })
                .catch((error) => {
                    console.log(error);
                    setLoadingExaminer(false);
                    setTotalExaminer(0);
                })
                .finally(() => {});
        } else {
            // setLoadingExaminer(false);
            setTotalExaminer(0);
        }
    };

    const fetchCourse = () => {
        setLoadingCourse(true);
        if (phaseId !== 0) {
            setLoadingCourse(true);
            instance
                .get(`dashboard/numOfCourseNotScheduled`, {
                    params: { token: token, ePId: phaseId },
                })
                .then((res) => {
                    // console.log(res.data.data);
                    const data =
                        res.data.data.assigned + "/" + res.data.data.total;
                    // console.log(data)                    ;
                    setTotalCourse(data);

                    setLoadingCourse(false);
                })
                .catch((error) => {
                    console.log(error);
                    setLoadingCourse(false);
                    setTotalCourse("No data");
                })
                .finally(() => {});
        } else {
            // setLoadingCourse(false);
            setTotalCourse("No data");
        }
    };

    const fetchSlot = () => {
        setLoadingSlot(true);
        if (phaseId !== 0) {
            setLoadingSlot(true);
            instance
                .get(`dashboard/totalSlotDashBoard`, {
                    params: { token: token, ePId: phaseId },
                })
                .then((res) => {
                    const data = res.data.data;
                    setTotalSlot(data);

                    setLoadingSlot(false);
                })
                .catch((error) => {
                    console.log(error);
                    setLoadingSlot(false);
                    setTotalSlot(0);
                })
                .finally(() => {});
        } else {
            // setLoadingSlot(false);
            setTotalSlot(0);
        }
    };

    const [loadingPercent, setLoadingPercent] = useState(true);
    const [dataPercent, setDataPercent] = useState("No data");

    const fetchPercent = () => {
        setLoadingPercent(true);
        if (phaseId !== 0) {
            setLoadingPercent(true);
            instance
                .get(`dashboard/percentRegisOnePhase`, {
                    params: { token: token, ePId: phaseId },
                })
                .then((res) => {
                    const data = res.data.data;
                    setDataPercent(data);
                    setLoadingPercent(false);
                })
                .catch((error) => {
                    console.log(error);
                    setDataPercent("No data");
                    setLoadingPercent(false);
                })
                .finally(() => {});
        } else {
            // setLoadingSlot(false);
            setDataPercent("No data");
        }
    };

    const fetchTotalRegisterByDay = () => {
        setLoadingRegister(true);
        if (phaseId !== 0) {
            setLoadingRegister(true);
            instance
                .get(`dashboard/numOfDayRegister`, {
                    params: { token: token, ePId: phaseId },
                })
                .then((res) => {
                    // console.log(res.data.data);
                    const data = res.data.data;
                    const numbers = data.map((item) => item.num);
                    const maxNumber = Math.max(...numbers);
                    if (maxNumber !== -Infinity) {
                        if (maxNumber % 2 === 0) {
                            // số chẵn
                            setMaxLine(maxNumber + 2);
                        } else {
                            // số lẻ
                            setMaxLine(maxNumber + 1);
                        }
                    } else {
                        setMaxLine(0);
                    }
                    const labels = data.map((item) => item.day);
                    setTotalRegisterLabels(labels);
                    const dataNum = data.map((item) => item.num);
                    setTotalRegisterData(dataNum);
                    setLoadingRegister(false);
                })
                .catch((error) => {
                    console.log(error);
                    setLoadingRegister(false);
                    setTotalRegisterLabels([]);
                    setTotalRegisterData([]);
                })
                .finally(() => {});
        } else {
            // setLoadingRegister(false);
            setTotalRegisterLabels([]);
            setTotalRegisterData([]);
        }
    };

    const fetchTopExaminer = () => {
        setLoadingDataTop(true);
        if (phaseId !== 0) {
            setLoadingDataTop(true);
            instance
                .get(`dashboard/topThreeExaminerDashBoard`, {
                    params: { token: token, ePId: phaseId },
                })
                .then((res) => {
                    const formatData = res.data.data.map((item, index) => ({
                        ...item,
                        key: index + 1,
                        no: index + 1,
                    }));
                    setDataTop(formatData);
                    setLoadingDataTop(false);
                })
                .catch((error) => {
                    console.log(error);
                    setLoadingDataTop(false);
                    setDataTop([]);
                })
                .finally(() => {});
        } else {
            // setLoadingDataTop(false);
            setDataTop([]);
        }
    };

    const fetchCourseAndStu = () => {
        setLoadingCourseAndStu(true);
        if (phaseId !== 0) {
            setLoadingCourseAndStu(true);
            instance
                .get(`dashboard/courseAndNumOfStuDashBoard?ePId=${phaseId}`, {
                    params: { token: token },
                })
                .then((res) => {
                    const newData = res.data.data;
                    const numbers = newData.map((item) => item.numOfStu);
                    const maxNumber = Math.max(...numbers);
                    if (maxNumber !== -Infinity) {
                        if (maxNumber % 2 === 0) {
                            // số chẵn
                            setMaxBar(maxNumber + 20);
                        } else {
                            // số lẻ
                            setMaxBar(maxNumber + 19);
                        }
                    } else {
                        setMaxBar(0);
                    }
                    const labels = newData.map((item) => item.subCode);
                    setTotalCourseAndStuLabels(labels);
                    const dataNum = newData.map((item) => item.numOfStu);
                    setTotalCourseAndStuData(dataNum);
                    setLoadingCourseAndStu(false);
                })
                .catch((error) => {
                    console.log(error);
                    setLoadingCourseAndStu(false);
                    setTotalCourseAndStuLabels([]);
                    setTotalCourseAndStuData([]);
                })
                .finally(() => {});
        } else {
            // setLoadingCourseAndStu(false);
            setTotalCourseAndStuLabels([]);
            setTotalCourseAndStuData([]);
        }
    };

    // useEffect(() => {
    //     fetchData();
    // }, [page]);

    useEffect(() => {
        fetchExaminer();
        fetchCourse();
        fetchSlot();
        fetchTotalRegisterByDay();
        fetchTopExaminer();
        fetchCourseAndStu();

        fetchPercent();
    }, [phaseId]);

    useEffect(() => {
        fetchSemester();
    }, []);

    useEffect(() => {
        fetchPhase();
    }, [semesterId]);

    const handleSelectSemester = (id, option) => {
        setSelectSemester(option.label);
        setSemesterId(id);
        setPhaseId(0);
        setPhases([]);
    };

    const handleSelectPhase = (id, option) => {
        setSelectPhase(option.label);
        setPhaseId(id);
    };

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
                                    Phase:
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
                    <Divider orientation="left">Data</Divider>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={12}>
                            <CardItem
                                desc={"At this phase"}
                                loading={loadingExaminer}
                                title="Total Examiners"
                                value={totalExaminer}
                                icon={<UserOutlined className="icon" />}
                            />
                        </Col>
                        <Col xs={24} md={12}>
                            <CardItem
                                desc={"Courses at this phase"}
                                loading={loadingCourse}
                                title="Assigned/Total"
                                value={totalCourse}
                                icon={<ScheduleOutlined className="icon" />}
                            />
                        </Col>
                        <Col xs={24} md={12}>
                            <CardItem
                                desc={"At this phase"}
                                loading={loadingSlot}
                                title="Total ExamRooms"
                                value={totalSlot}
                                icon={<ShopOutlined className="icon" />}
                            />
                        </Col>
                        <Col xs={24} md={12}>
                            <CardItem
                                loading={loadingPercent}
                                desc="At this phase"
                                title="Percent of registered"
                                value={dataPercent}
                                icon={<ScheduleOutlined className="icon" />}
                            />
                        </Col>
                    </Row>
                </Col>
                <Col xs={24} md={24} lg={13}>
                    <Divider orientation="left">Register per day</Divider>
                    <LineChart
                        max={maxLine}
                        loading={loadingRegister}
                        data={totalRegisterData}
                        labels={totalRegisterLabels}
                    />
                </Col>
                <Col xs={24}>
                    <Divider orientation="left">
                        Number of students per course
                    </Divider>
                    <BarChart
                        max={maxBar}
                        data={totalCourseAndStuData}
                        labels={totalCourseAndStuLabels}
                        loading={loadingCourseAndStu}
                    />
                </Col>
                <Col xs={24}>
                    <Divider orientation="left">Top examiner</Divider>
                    <CardTable data={dataTop} loading={loadingDataTop} />
                </Col>
            </Row>
        </div>
    );
};

DashboardTable.propTypes = {};

export default DashboardTable;
