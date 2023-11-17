// import PropTypes from "prop-types";

// import BarChart from "@/components/Dashboard/BarChart";
import CardItem from "@/components/Dashboard/CardItem/CardItem";
import CardTable from "@/components/Dashboard/CardTable";
import LineChart from "@/components/Dashboard/LineChart";
import { ScheduleOutlined } from "@ant-design/icons";
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

    const token = cookies.getToken();

    const [totalExamSlot, setTotalExamSlot] = useState(0);
    const [loadingSlot, setLoadingSlot] = useState(true);

    const [totalExaminer, setTotalExaminer] = useState(0);
    const [loadingExaminer, setLoadingExaminer] = useState(true);

    const [totalCourse, setTotalCourse] = useState(0);
    const [loadingCourse, setLoadingCourse] = useState(true);

    const [totalNumOfCourse, setTotalNumOfCourse] = useState(0);
    const [loadingNumOfCourse, setLoadingNumOfCourse] = useState(true);

    const [dataTopExaminer, setDataTopExaminer] = useState([]);
    const [loadingTop, setLoadingTop] = useState(true);

    const [coursePharseData, setCoursePharseData] = useState([]);
    const [coursePharseLabels, setCoursePharseLabels] = useState([]);
    const [loadingCoursePharse, setLoadingCoursePharse] = useState(true);

    const [maxLine, setMaxLine] = useState(0);

    const fetchSemester = () => {
        instance
            .get("semesters/otherRole")
            .then((res) => {
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
            })
            .finally(() => {});
    };

    const fetchPhase = () => {
        if (semesterId !== 0) {
            instance
                .get(`examPhases/otherRole/`, {
                    params: {
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
                })
                .finally(() => {});
        }
    };

    const fetchSlot = () => {
        setLoadingSlot(true);
        if (phaseId !== 0) {
            setLoadingSlot(true);
            instance
                .get(`dashboard/totalExamSlotByPhase`, {
                    params: { token: token, ePId: phaseId },
                })
                .then((res) => {
                    // console.log(res);
                    const data = res.data.data;
                    setTotalExamSlot(data);
                    // console.log(data);
                    setLoadingSlot(false);
                })
                .catch((err) => {
                    console.log(err);
                    setLoadingSlot(false);
                    setTotalExamSlot(0);
                })
                .finally(() => {});
        } else {
            // setLoadingSlot(false);
            setTotalExamSlot(0);
        }
    };

    const fetchExaminer = () => {
        setLoadingExaminer(true);
        if (phaseId !== 0) {
            setLoadingExaminer(true);
            instance
                .get(`dashboard/totalExaminerByPhase`, {
                    params: { token: token, ePId: phaseId },
                })
                .then((res) => {
                    // console.log(res);
                    const data = res.data.data;
                    setTotalExaminer(data);
                    // console.log(data);
                    setLoadingExaminer(false);
                })
                .catch((err) => {
                    console.log(err);
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
                .get(`dashboard/totalCourseByPhase`, {
                    params: { token: token, ePId: phaseId },
                })
                .then((res) => {
                    // console.log(res)
                    const data = res.data.data;
                    setTotalCourse(data);
                    setLoadingCourse(false);
                })
                .catch((err) => {
                    console.log(err);
                    setLoadingCourse(false);
                    setTotalCourse(0);
                })
                .finally(() => {});
        } else {
            // setLoadingCourse(false);
            setTotalCourse(0);
        }
    };

    const fetchNumOfCourse = () => {
        setLoadingNumOfCourse(true);
        if (phaseId !== 0) {
            setLoadingNumOfCourse(true);
            instance
                .get(`dashboard/numOfCourseNotScheduled`, {
                    params: { token: token, ePId: phaseId },
                })
                .then((res) => {
                    // console.log(res);
                    const data =
                        res.data.data.assigned + "/" + res.data.data.total;
                    setTotalNumOfCourse(data);
                    // console.log(data);
                    setLoadingNumOfCourse(false);
                })
                .catch((err) => {
                    console.log(err);
                    setLoadingNumOfCourse(false);
                    setTotalNumOfCourse(0);
                })
                .finally(() => {});
        } else {
            // setLoadingNumOfCourse(false);
            setTotalNumOfCourse(0);
        }
    };

    const fetchTopExaminer = () => {
        setLoadingTop(true);
        if (phaseId !== 0) {
            setLoadingTop(true);
            instance
                .get(`dashboard/topThreeExaminerDashBoard`, {
                    params: { token: token, ePId: phaseId },
                })
                .then((res) => {
                    // console.log(res);
                    const dataTop = res.data.data.map((item, index) => ({
                        ...item,
                        no: index + 1,
                        key: index + 1,
                    }));
                    // console.log(dataTop)
                    setDataTopExaminer(dataTop);
                    setLoadingTop(false);
                })
                .catch((err) => {
                    console.log(err);
                    setLoadingTop(false);
                    setDataTopExaminer([]);
                })
                .finally(() => {});
        } else {
            // setLoadingTop(false);
            setDataTopExaminer([]);
        }
    };

    const fetchCoursePharse = () => {
        setLoadingCoursePharse(true);
        if (phaseId !== 0) {
            setLoadingCoursePharse(true);
            instance
                .get(`dashboard/totalExamroomByPhase`, {
                    params: { token: token, ePId: phaseId },
                })
                .then((res) => {
                    const newData = res.data.data;
                    const numbers = newData.map((item) => item.numExamroom);
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
                    const labels = newData.map((item) => item.day);
                    setCoursePharseLabels(labels);
                    const dataNum = newData.map((item) => item.numExamroom);
                    setCoursePharseData(dataNum);
                    setLoadingCoursePharse(false);
                })
                .catch((err) => {
                    console.log(err);
                    setLoadingCoursePharse(false);
                    setCoursePharseData([]);
                    setCoursePharseLabels([]);
                })
                .finally(() => {});
        } else {
            // setLoadingCoursePharse(false);
            setCoursePharseData([]);
            setCoursePharseLabels([]);
        }
    };

    useEffect(() => {
        fetchSlot();
        fetchExaminer();
        fetchCourse();
        fetchNumOfCourse();
        fetchTopExaminer();
        fetchCoursePharse();
    }, [phaseId]);

    useEffect(() => {
        fetchPhase();
    }, [semesterId]);

    useEffect(() => {
        fetchSemester();
    }, []);

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
                    <Divider orientation="left">Total</Divider>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={12}>
                            <CardItem
                                desc={"At this phase"}
                                title="Total Exam Slots"
                                value={totalExamSlot}
                                loading={loadingSlot}
                                icon={<ScheduleOutlined className="icon" />}
                            />
                        </Col>
                        <Col xs={24} md={12}>
                            <CardItem
                                desc={"At this phase"}
                                title="Total Examiners"
                                value={totalExaminer}
                                loading={loadingExaminer}
                                icon={<ScheduleOutlined className="icon" />}
                            />
                        </Col>
                        <Col xs={24} md={12}>
                            <CardItem
                                desc={"At this phase"}
                                title="Total Courses"
                                value={totalCourse}
                                loading={loadingCourse}
                                icon={<ScheduleOutlined className="icon" />}
                            />
                        </Col>
                        <Col xs={24} md={12}>
                            <CardItem
                                title="Assigned/Total"
                                desc={"Courses at this phase"}
                                value={totalNumOfCourse}
                                loading={loadingNumOfCourse}
                                icon={<ScheduleOutlined className="icon" />}
                            />
                        </Col>
                    </Row>
                </Col>
                <Col xs={24} md={24} lg={13}>
                    <Divider orientation="left">Performance</Divider>
                    <LineChart
                        max={maxLine}
                        loading={loadingCoursePharse}
                        labels={coursePharseLabels}
                        data={coursePharseData}
                    />
                </Col>
                {/* <Col xs={24}>
                    <Divider orientation="left">Hello</Divider>
                    <BarChart />
                </Col> */}
                <Col xs={24}>
                    <Divider orientation="left">Top Examiners</Divider>
                    <CardTable data={dataTopExaminer} loading={loadingTop} />
                </Col>
            </Row>
        </div>
    );
};

DashboardTable.propTypes = {};

export default DashboardTable;
