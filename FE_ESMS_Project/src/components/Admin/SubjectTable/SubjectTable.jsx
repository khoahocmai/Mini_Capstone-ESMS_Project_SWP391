// import PropTypes from "prop-types";
import { Button, Form, Input, Tag, Typography } from "antd";

import * as St from "./SubjectTable.styled";
import { useEffect, useState } from "react";
import instance from "@/utils/instance";
import toast, { Toaster } from "react-hot-toast";
import ButtonAdd from "@/components/ButtonAdd";
import cookies from "@/utils/cookies";

const SubjectTable = () => {
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
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
            title: "Subject Name",
            width: "30%",
            render: (record) => {
                return <Typography>{record.name}</Typography>;
            },
        },
        {
            title: "Subject Code",
            width: "25%",
            render: (record) => {
                return <Typography>{record.code}</Typography>;
            },
        },
        {
            title: "Status",
            width: "15%",
            render: (record) => {
                let color = "geekblue";
                if (record.status === 1) {
                    color = "magenta";
                }
                return (
                    <Tag color={color} key={record.id}>
                        {record.status === 1 ? "ACTIVE" : "INACTIVE"}
                    </Tag>
                );
            },
        },
        {
            title: "Operation",
            width: "20%",
            render: () => {
                return <Typography.Link disabled>Can not delete</Typography.Link>;
            },
        },
    ];

    // const handleAdd = () => {
    //     setModalVisible(true);
    // };

    const fetchData = () => {
        setLoading(true);
        instance
            .get("subjects", {
                params: {
                    token: token,
                },
            })
            .then((res) => {
                console.log(res);
                const formattedData = res.data.data.map((item, index) => ({
                    ...item,
                    no: index + 1,
                    key: item.id,
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
    };

    useEffect(() => {
        fetchData();
    }, []);

    // const handleDelete = (e) => {
    //     instance
    //         .delete("subjects", { data: { id: e.id } })
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
                const { subjectName, subjectCode } = values;
                console.log(subjectName);
                console.log(subjectCode);
                instance
                    .post("subjects", { name: subjectName, code: subjectCode })
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

    const layout = {
        labelAlign: "left",
        labelCol: {
            span: 7,
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
            <Toaster position="top-right" reverseOrder={false} />
            <ButtonAdd
                disabled={true}
                setModalVisible={setModalVisible}
                title="Can not add now"
            />

            <St.ModalStyled
                title="Add a subject"
                open={modalVisible}
                // onOk={handleOk}/
                // onCancel={handleCancel}
                footer={modalFooter}
            >
                <Form
                    form={form}
                    name="add_row_form"
                    style={{ marginTop: "30px", marginBottom: "30px" }}
                >
                    <Form.Item
                        {...layout}
                        name="subjectName"
                        label="Subject Name"
                        rules={[
                            {
                                required: true,
                                message: "Please input the subject name!",
                            },
                        ]}
                    >
                        <Input allowClear placeholder="Subject Name" />
                    </Form.Item>

                    <Form.Item
                        {...layout}
                        label="Subject Code"
                        name="subjectCode"
                        rules={[
                            {
                                required: true,
                                message: "Please input the subject code!",
                            },
                        ]}
                    >
                        <Input allowClear placeholder="Subject Code" />
                    </Form.Item>
                </Form>
            </St.ModalStyled>
            <Form form={form} component={false}>
                <St.StyledTable
                    scroll={{ x: true }}
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

SubjectTable.propTypes = {};

export default SubjectTable;
