// import PropTypes from "prop-types";
import { Flex, Form, Input, Modal, Select, Tag, Typography } from "antd";
import * as St from "./ExaminerTable.styled";

import { useEffect, useState } from "react";
import instance from "@/utils/instance";
import toast, { Toaster } from "react-hot-toast";
import cookies from "@/utils/cookies";

const ExaminerTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [form] = Form.useForm();
    const [modalVisible, setModalVisible] = useState(false);
    const [semesters, setSemesters] = useState([]);
    const [selectSemester, setSelectSemester] = useState();
    const [semesterId, setSemesterId] = useState(0);
    const [selectPhase, setSelectPhase] = useState();
    const [phases, setPhases] = useState([]);
    const [phaseId, setPhaseId] = useState(0);
    const pageSize = 10;

    const token = cookies.getToken();

    const columns = [
        {
            title: "No",
            width: "10%",
            render: (record) => {
                return <Typography>{record.no}</Typography>;
            },
        },
        {
            title: "Email",
            width: "25%",
            render: (record) => {
                return <Typography>{record.exEmail}</Typography>;
            },
        },
        {
            title: "Name",
            width: "20%",
            render: (record) => {
                return <Typography>{record.exName}</Typography>;
            },
        },
        {
            title: "Role",
            width: "15%",
            render: (record) => {
                if (record.role === "lecturer") {
                    return <Tag color="red">{record.role.toUpperCase()}</Tag>;
                } else {
                    return (
                        <Tag color="volcano">{record.role.toUpperCase()}</Tag>
                    );
                }
            },
        },
        {
            title: "Status",
            width: "15%",
            render: (record) => {
                if (record.status === true) {
                    return <Tag color="default">INACTIVE</Tag>;
                } else {
                    return <Tag color="green">ACTIVE</Tag>;
                }
            },
        },

        // {
        //     title: "Operation",
        //     width: "15%",
        //     render: (record) =>
        //         data.length >= 1 ? (
        //             <Popconfirm
        //                 title="Sure to delete?"
        //                 onConfirm={() => handleDelete(record.key)}
        //             >
        //                 <Typography.Link>Detail</Typography.Link>
        //             </Popconfirm>
        //         ) : null,
        // },
    ];

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
                .get(`examPhases/otherRole`, {
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

    const fetchData = () => {
        setLoading(true);
        if (phaseId !== 0) {
            setLoading(true);
            instance
                .get(`examiners/getExaminerByPhase?exPhaseId=${phaseId}`, {
                    params: {
                        token: token,
                    },
                })
                .then((res) => {
                    console.log(res);
                    const formattedData = res.data.data.map((item, index) => ({
                        ...item,
                        no: index + 1,
                        key: index + 1,
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
            // setLoading(false);
        }
    };

    // useEffect(() => {
    //     fetchData();
    // }, [page]);

    useEffect(() => {
        fetchData();
    }, [phaseId]);

    useEffect(() => {
        fetchSemester();
    }, []);

    useEffect(() => {
        fetchPhase();
    }, [semesterId]);

    // const handleDelete = (e) => {
    //     setLoading(true);
    //     instance
    //         .delete("users", { data: { email: e } })
    //         .then(() => {
    //             toast.success("Successfully deleted!");
    //             fetchData();
    //         })
    //         .catch((error) => {
    //             toast.error("Error deleted!");
    //             console.log(error);
    //         });
    // };

    const handleOk = () => {
        form.validateFields()
            .then((values) => {
                const { role, email, name } = values;
                instance
                    .post("users", { role, email, name })
                    .then(() => {
                        toast.success("Successfully created!");
                        form.resetFields();
                        setModalVisible(false);
                        fetchData();
                    })
                    .catch((error) => {
                        toast.error("This is an error!");
                        console.log(error);
                    });
            })
            .catch((info) => {
                console.log("Validate Failed:", info);
            });
    };

    const handleCancel = () => {
        form.resetFields();
        setModalVisible(false);
    };

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
            <Modal
                title="Add a row"
                open={modalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} name="add_row_form">
                    <Form.Item
                        name="role"
                        rules={[
                            {
                                required: true,
                                message: "Please choose role!",
                            },
                            {
                                pattern:
                                    /^(Admin|admin|ADMIN|Staff|staff|Lecturer|lecturer)$/,
                                message: "Invalid role!",
                            },
                        ]}
                    >
                        <Input placeholder="Role" />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "Please input the email!",
                            },
                        ]}
                    >
                        <Input placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Please input the name!",
                            },
                        ]}
                    >
                        <Input placeholder="Name" />
                    </Form.Item>
                </Form>
            </Modal>
            <St.StyledTable
                columns={columns}
                dataSource={data}
                bordered
                loading={loading}
                pagination={{
                    pageSize: pageSize,
                    hideOnSinglePage: data.length <= pageSize,
                    showSizeChanger: false,
                    showQuickJumper: true,
                    // onChange: handleChange,
                }}
            />
        </St.DivTable>
    );
};

ExaminerTable.propTypes = {};

export default ExaminerTable;
