import { Button, Form, Input, Select, Tag, Typography } from "antd";
import { useEffect, useState } from "react";

import * as St from "./VolunteerTable.styled";
import instance from "@/utils/instance";
import ButtonAdd from "@/components/ButtonAdd";
import toast from "react-hot-toast";
import cookies from "@/utils/cookies";
import { postNewVolunteer } from "@/services/staffAddVolunteer";

const VolunteerTable = () => {
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [semesters, setSemesters] = useState([]);
    const [selectSemester, setSelectSemester] = useState();
    const [semesterId, setSemesterId] = useState(0);
    const pageSize = 10;

    const token = cookies.getToken();

    const columns = [
        // Your columns
        {
            title: "No",
            width: "12%",
            render: (record) => {
                return <Typography>{record.no}</Typography>;
            },
        },
        {
            title: "Name",
            width: "23%",
            render: (record) => {
                return <Typography>{record.exName}</Typography>;
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
            title: "Type",
            width: "20%",
            render: (record) => {
                if (record.typeExaminer === 2) {
                    return <Tag color="green">VOLUNTEER</Tag>;
                } else {
                    return <Tag color="default">EXAMINER</Tag>;
                }
            },
        },
        {
            title: "Status",
            width: "20%",
            render: (record) => {
                if (record.status === true) {
                    return <Tag color="green">INACTIVE</Tag>;
                } else {
                    return <Tag color="volcano">ACTIVE</Tag>;
                }
            },
        },
    ];

    const fetchData = () => {
        setLoading(true);
        if (semesterId !== 0) {
            instance
                .get(`examiners/volunteerExaminer?semesterId=${semesterId}`, {
                    params: {
                        token: token,
                    },
                })
                .then((res) => {
                    console.log(res);
                    const formattedData = res.data.data
                        // .sort((a, b) => b.id - a.id)
                        .map((item, index) => ({
                            ...item,
                            key: item.id,
                            no: index + 1,
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
        }
    };

    const fetchSemester = () => {
        instance
            .get("semesters/otherRole")
            .then((res) => {
                const semestersData = res.data.data
                    .sort((a, b) => b.id - a.id)
                    .map((item) => ({
                        label: item.season + " " + item.year,
                        value: item.id,
                    }));
                setSemesterId(semestersData[0].value);
                setSelectSemester(semestersData[0].label);
                setSemesters(semestersData);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {});
    };

    useEffect(() => {
        fetchSemester();
    }, []);

    useEffect(() => {
        fetchData();
    }, [semesterId]);

    // const handleOk = () => {
    //     form.validateFields()
    //         .then((values) => {
    //             if (semesterId !== 0) {
    //                 instance
    //                     .post("examiners/volunteerExaminer/", {
    //                         email: values.email,
    //                         name: values.name,
    //                         semesterId: semesterId,
    //                     })
    //                     .then(() => {
    //                         toast.success("Successfully created!");
    //                         form.resetFields();
    //                         setModalVisible(false);
    //                         fetchData();
    //                     })
    //                     .catch((error) => {
    //                         toast.error("This is an error!");
    //                         console.log(error);
    //                     });
    //             }
    //         })
    //         .catch((info) => {
    //             console.log("Validate Failed:", info);
    //         });
    // };

    const handleOk = () => {
        form.validateFields()
            .then(async (values) => {
                try {
                    if (semesterId !== 0) {
                        await postNewVolunteer({
                            email: values.email,
                            name: values.name,
                            semesterId: semesterId,
                        });
                        toast.success("Successfully created!");
                        form.resetFields();
                        setModalVisible(false);
                        fetchData();
                    }
                } catch (error) {
                    toast.error("This is an error!");
                    console.log(error);
                }
            })
            .catch((info) => {
                console.log("Validate Failed:", info);
            });
    };

    const handleCancel = () => {
        form.resetFields();
        setModalVisible(false);
    };

    const handleSelect = (id, option) => {
        console.log(id);
        console.log(semesterId);
        if (id !== semesterId) {
            setData([]);
            setLoading(true);
        }
        setSelectSemester(option.label);
        setSemesterId(id);
    };

    const layout = {
        labelAlign: "left",
        labelCol: {
            span: 4,
        },
        wrapperCol: {
            span: 24,
        },
    };

    const modalFooter = () => {
        return (
            <>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button type="primary" onClick={handleOk}>
                    Submit
                </Button>
            </>
        );
    };

    return (
        <St.DivTable>
            <St.StyledLeft>
                <Typography className="title">Semester: </Typography>
                <Select
                    onChange={handleSelect}
                    value={selectSemester}
                    className="select"
                    options={semesters}
                />
            </St.StyledLeft>

            <ButtonAdd
                setModalVisible={setModalVisible}
                title="Add new volunteer"
            />

            <St.ModalStyled
                title="Add new volunteer"
                open={modalVisible}
                // onOk={handleOk}
                // onCancel={handleCancel}
                footer={modalFooter}
            >
                <Form
                    style={{ marginTop: "30px", marginBottom: "30px" }}
                    form={form}
                    name="add_row_form"
                >
                    <Form.Item
                        {...layout}
                        label="Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Please input the name!",
                            },
                        ]}
                    >
                        <Input placeholder="Name" allowClear />
                    </Form.Item>

                    <Form.Item
                        {...layout}
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "Please input the email!",
                            },
                        ]}
                    >
                        <Input placeholder="Email" allowClear />
                    </Form.Item>
                </Form>
            </St.ModalStyled>

            <St.StyledTable
                columns={columns}
                dataSource={data}
                bordered
                loading={loading}
                pagination={{
                    pageSize: pageSize,
                    hideOnSinglePage: data.length <= pageSize,
                }}
            />
        </St.DivTable>
    );
};

export default VolunteerTable;
