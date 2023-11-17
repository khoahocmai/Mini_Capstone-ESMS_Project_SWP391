// import PropTypes from "prop-types";

import { Flex, Popconfirm, Select, Table, Tag, Typography } from "antd";
import { useEffect, useState } from "react";

import * as St from "./MyExamSlot.styled";
import { useNavigate } from "react-router-dom";
import instance from "@/utils/instance";
import cookies from "@/utils/cookies";
import toast, { Toaster } from "react-hot-toast";
import { putDeleteRegister } from "@/services/lecturerDeleteRegister";

const MyExamSlot = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [semesters, setSemesters] = useState([]);
    const [selectSemester, setSelectSemester] = useState();
    const [semesterId, setSemesterId] = useState(0);
    const [selectPhase, setSelectPhase] = useState();
    const [phases, setPhases] = useState([]);
    const [phaseId, setPhaseId] = useState(0);
    const [statusPhase, setStatusPhase] = useState(false);
    const navigate = useNavigate();
    const pageSize = 10;

    const token = cookies.getToken();

    const fetchData = () => {
        setLoading(true);
        if (phaseId !== 0) {
            setLoading(true);
            instance
                .get(`examiners/scheduledByPhase?examphaseId=${phaseId}`, {
                    params: {
                        token: token,
                    },
                })
                .then((res) => {
                    const formattedData = res.data.data.map((item, index) => ({
                        ...item,
                        key: index + 1,
                        no: index + 1,
                        startTime: item.startTime.slice(0, 5),
                        endTime: item.endTime.slice(0, 5),
                    }));
                    setData(formattedData);
                    setLoading(false);
                })
                .catch((error) => {
                    setData([]);
                    setLoading(false);
                    console.log(error);
                    // console.log("error");
                })
                .finally(() => {});
        } else {
            setData([]);
            // setLoading(false);
        }
    };

    const fetchSemester = () => {
        // setLoading(true);
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
        // setLoading(true);
        instance
            .get(`examPhases/otherRole/`, {
                params: {
                    id: semesterId,
                },
            })
            .then((res) => {
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
                        if (newData[0].status === false) {
                            setStatusPhase(false);
                        } else {
                            setStatusPhase(true);
                        }
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

    useEffect(() => {
        fetchSemester();
    }, []);

    useEffect(() => {
        fetchPhase();
    }, [semesterId]);

    useEffect(() => {
        fetchData();
    }, [phaseId]);

    const handleRegister = () => {
        navigate(`/lecturer/register/${phaseId}`);
    };

    // const handleDelete = (e) => {
    //     instance
    //         .put("examRooms/delLecturer", {
    //             exPhaseId: phaseId,
    //             token: token,
    //             startTime: e.startTime,
    //             endTime: e.endTime,
    //             day: e.day,
    //         })
    //         .then((res) => {
    //             toast.success("Successfully");
    //             console.log(res);
    //             fetchData();
    //         })
    //         .catch((error) => {
    //             toast.error("Error");
    //             console.log(error);
    //         })
    //         .finally(() => {
    //             setLoading(true);
    //         });
    // };

    const handleDelete = async (e) => {
        try {
            setLoading(true);
            await putDeleteRegister({
                exPhaseId: phaseId,
                startTime: e.startTime,
                endTime: e.endTime,
                day: e.day,
            });
            toast.success("Successfully");
            // console.log(res);
            fetchData();
        } catch (error) {
            toast.error("Error");
            console.log(error);
        }
    };

    const handleSelectSemester = (id, option) => {
        if (id !== semesterId) {
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
        setStatusPhase(option.status);

        if (id !== phaseId) {
            if (option.status === false) {
                // console.log("false");
                setStatusPhase(false);
            } else {
                // console.log("true");
                setStatusPhase(true);
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
            width: "15%",
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
                return <Typography>{record.startTime}</Typography>;
            },
        },
        {
            title: "End Time",
            width: "15%",
            render: (record) => {
                return <Typography>{record.endTime}</Typography>;
            },
        },
        {
            title: "Room",
            width: "15%",
            render: (record) => {
                if (record.roomCode === "N/A") {
                    return <Tag color="default">COMING SOON</Tag>;
                } else {
                    return <Typography>{record.roomCode}</Typography>;
                }
            },
        },
        {
            title: "Location",
            width: "15%",
            render: (record) => {
                return <Typography>{record.roomLocation}</Typography>;
            },
        },
        {
            title: "Operation",
            width: "15%",
            render: (record) => {
                if (record.register === false) {
                    return (
                        <Typography.Link disabled>
                            Can not unregister
                        </Typography.Link>
                    );
                } else {
                    return (
                        <Popconfirm
                            title="Sure to register?"
                            onConfirm={() => handleDelete(record)}
                        >
                            <Typography.Link>Unregister</Typography.Link>
                        </Popconfirm>
                    );
                }
            },
        },
    ];

    return (
        <St.DivTable>
            <Toaster position="top-right" reverseOrder={false} />

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

            <St.ButtonTable
                type="primary"
                style={{ marginBottom: 16 }}
                onClick={handleRegister}
                disabled={statusPhase === false}
            >
                Register Exam Schedule
            </St.ButtonTable>

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
        </St.DivTable>
    );
};

MyExamSlot.propTypes = {};

export default MyExamSlot;
