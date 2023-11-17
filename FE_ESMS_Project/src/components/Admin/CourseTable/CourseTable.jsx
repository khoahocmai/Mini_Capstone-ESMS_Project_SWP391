import { Flex, Form, Select, Tag, Typography } from "antd";
import { useEffect, useState } from "react";
import * as St from "./CourseTable.styled";
import instance from "@/utils/instance";
import cookies from "@/utils/cookies";
// import cookies from "@/utils/cookies";
// import ButtonAdd from "@/components/ButtonAdd";

const CourseTable = () => {
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    // const [modalVisible, setModalVisible] = useState(false);
    const [semesters, setSemesters] = useState([]);
    const [selectSemester, setSelectSemester] = useState();
    const [semesterId, setSemesterId] = useState(0);
    const [selectPhase, setSelectPhase] = useState();
    const [phases, setPhases] = useState([]);
    const [phaseId, setPhaseId] = useState(0);
    const pageSize = 10;

    const token = cookies.getToken();

    const fetchSemester = () => {
        instance
            .get("semesters", {
                params: {
                    token: token,
                },
            })
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
                setData([]);
                setLoading(false);
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
                    if (semesterId !== 0) {
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
                    }
                })
                .catch((error) => {
                    console.log(error);
                    setData([]);
                    setLoading(false);
                })
                .finally(() => {});
        }
    };

    const fetchData = () => {
        setLoading(true);
        if (phaseId !== 0) {
            setLoading(true);
            instance
                .get(`courses?ePId=${phaseId}`, {
                    params: {
                        token: token,
                    },
                })
                .then((res) => {
                    if (res.data === "") {
                        setData([]);
                        setLoading(false);
                        return;
                    }
                    const formattedData = res.data.data
                        .sort((a, b) => b.courseId - a.courseId)
                        .map((item, index) => ({
                            ...item,
                            no: index + 1,
                            key: item.courseId,
                        }));
                    setData(formattedData);
                    setLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                    setData([]);
                    setLoading(false);
                })
                .finally(() => {});
        } else {
            setData([]);
        }
    };

    useEffect(() => {
        fetchData();
    }, [phaseId]);

    useEffect(() => {
        fetchSemester();
    }, []);

    useEffect(() => {
        fetchPhase();
    }, [semesterId]);

    const handleSelectSemester = (id, option) => {
        if (id !== semesterId) {
            setSelectSemester(option.label);
            setSemesterId(id);
            setPhaseId(0);
        }
    };

    const handleSelectPhase = (id, option) => {
        if (id !== phaseId) {
            setSelectPhase(option.label);
            setPhaseId(id);
        }
    };

    const columns = [
        {
            title: "No",
            width: "20%",
            render: (record) => {
                return <Typography>{record.no}</Typography>;
            },
        },
        {
            title: "Course Code",
            width: "30%",
            render: (record) => {
                return <Typography>{record.subCode}</Typography>;
            },
        },
        {
            title: "Num of Students",
            width: "25%",
            render: (record) => {
                return <Typography>{record.numOfStu}</Typography>;
            },
        },
        {
            title: "Status",
            width: "25%",
            render: (record) => {
                let color = "geekblue";
                if (record.status === 1) {
                    color = "magenta";
                }
                return (
                    <Tag color={color} key={record.id}>
                        {record.status === 1 ? "PENDING" : "DONE"}
                    </Tag>
                );
            },
        },
    ];

    return (
        <St.DivTable>
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
                        <Typography className="title">Phase: </Typography>
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

            <Form form={form} component={false}>
                <St.StyledTable
                    bordered
                    dataSource={data}
                    columns={columns}
                    rowClassName="editable-row"
                    pagination={{
                        pageSize: pageSize,
                        hideOnSinglePage: data.length <= pageSize,
                        showSizeChanger: false,
                    }}
                    loading={loading}
                />
            </Form>
        </St.DivTable>
    );
};

export default CourseTable;
