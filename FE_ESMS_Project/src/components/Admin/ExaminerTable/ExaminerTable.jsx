// import PropTypes from "prop-types";
import { Flex, Select, Tag, Typography } from "antd";
import * as St from "./ExaminerTable.styled";

import { useEffect, useState } from "react";
import instance from "@/utils/instance";
import cookies from "@/utils/cookies";

const ExaminerTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    // const [form] = Form.useForm();
    // const [modalVisible, setModalVisible] = useState(false);
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
            width: "18%",
            render: (record) => {
                return <Typography>{record.exName}</Typography>;
            },
        },
        {
            title: "Role",
            width: "15%",
            render: (record) => {
                return <Tag color="volcano">{record.role}</Tag>;
            },
        },
        {
            title: "Status",
            width: "15%",
            render: (record) => {
                if (record.status) {
                    return <Tag color="red">INACTIVE</Tag>;
                } else {
                    return <Tag color="blue">ACTIVE</Tag>;
                }
            },
        },
        {
            title: "Operation",
            width: "15%",
            render: () => {
                return (
                    <Typography.Link disabled>Can not delete</Typography.Link>
                );
            },
        },
    ];

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
                    console.log("Phase: " + error);
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
                .get(`examiners/getExaminerByPhase?exPhaseId=${phaseId}`, {
                    params: {
                        token: token,
                    },
                })
                .then((res) => {
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

    // const handleOk = () => {
    //     form.validateFields()
    //         .then((values) => {
    //             const { role, email, name } = values;
    //             instance
    //                 .post("users", { role, email, name })
    //                 .then(() => {
    //                     toast.success("Successfully created!");
    //                     form.resetFields();
    //                     setModalVisible(false);
    //                     fetchData();
    //                 })
    //                 .catch((error) => {
    //                     toast.error("This is an error!");
    //                     console.log(error);
    //                 });
    //         })
    //         .catch((info) => {
    //             console.log("Validate Failed:", info);
    //         });
    // };

    // const handleAdd = () => {
    //     setModalVisible(true);
    // };

    // const handleCancel = () => {
    //     form.resetFields();
    //     setModalVisible(false);
    // };

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
            {/* <ButtonAdd
                setModalVisible={setModalVisible}
                title="Add new examiner"
            />
            <Modal
                title="Add new examiner"
                open={modalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form
                    form={form}
                    name="add_row_form"
                    style={{ marginTop: "30px", marginBottom: "30px" }}
                >
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
                        <St.FlexStyled>
                            <Typography className="form__title">
                                Role
                            </Typography>
                            <Input placeholder="Role" className="form__input" />
                        </St.FlexStyled>
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
                        <St.FlexStyled>
                            <Typography className="form__title">
                                Email
                            </Typography>
                            <Input
                                placeholder="Email"
                                className="form__input"
                            />
                        </St.FlexStyled>
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
                        <St.FlexStyled>
                            <Typography className="form__title">
                                Name
                            </Typography>
                            <Input placeholder="Name" className="form__input" />
                        </St.FlexStyled>
                    </Form.Item>
                </Form>
            </Modal> */}
            <St.StyledTable
                columns={columns}
                dataSource={data}
                bordered
                loading={loading}
                pagination={{
                    pageSize: pageSize,
                    hideOnSinglePage: data.length <= pageSize,
                    showSizeChanger: false,
                    // showQuickJumper: true,
                    // onChange: handleChange,
                }}
            />
        </St.DivTable>
    );
};

ExaminerTable.propTypes = {};

export default ExaminerTable;
