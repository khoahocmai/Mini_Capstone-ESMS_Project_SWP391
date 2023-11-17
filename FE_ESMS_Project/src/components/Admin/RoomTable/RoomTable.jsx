// import PropTypes from "prop-types";
import { Button, Form, Input, Popconfirm, Select, Tag, Typography } from "antd";
import * as St from "./RoomTable.styled";
import { useEffect, useState } from "react";
import instance from "@/utils/instance";
import toast, { Toaster } from "react-hot-toast";
import Search from "antd/es/input/Search";
import ButtonAdd from "@/components/ButtonAdd";
import cookies from "@/utils/cookies";
// import { item } from "@/layouts/AdminLayout/AdminLayout.items";

const RoomTable = () => {
    // const [search, setSearch] = useState("");
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [form] = Form.useForm();
    const [modalVisible, setModalVisible] = useState(false);
    const [search, setSearch] = useState("");
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
            title: "Room Number",
            width: "20%",
            render: (record) => {
                return <Typography>{record.roomNum}</Typography>;
            },
            sorter: (a, b) => a.roomNum - b.roomNum,
        },
        {
            title: "Location",
            width: "25%",
            render: (record) => {
                return <Typography>{record.location}</Typography>;
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
                        {record.status === 1 ? "ACTIVE" : "INACTIVE"}
                    </Tag>
                );
            },
        },
        {
            title: "Operation",
            width: "20%",
            render: (record) => {
                if (record.delete === 1) {
                    return (
                        <Popconfirm
                            title="Sure to delete?"
                            onConfirm={() => handleDelete(record.id)}
                        >
                            <Typography.Link>Delete</Typography.Link>
                        </Popconfirm>
                    );
                } else {
                    return (
                        <Typography.Link disabled>
                            Can not delete
                        </Typography.Link>
                    );
                }
            },
        },
    ];

    const fetchData = () => {
        setLoading(true);
        // console.log(search);
        instance
            .get(`rooms/${search}`, {
                params: {
                    token: token,
                },
            })
            .then((res) => {
                // console.log(res);
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
    };

    useEffect(() => {
        fetchData();
    }, [search]);

    const handleOk = () => {
        form.validateFields()
            .then((values) => {
                const { roomNumber, location } = values;
                instance
                    .post("rooms", { roomNum: roomNumber, location })
                    .then(() => {
                        toast.success("Successfully created!");
                        form.resetFields();
                        setModalVisible(false);
                        fetchData();
                    })
                    .catch((error) => {
                        toast.error("Error created!");
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

    const handleDelete = (e) => {
        instance
            .delete("rooms", { data: { roomNum: e } })
            .then(() => {
                toast.success("Successfully deleted!");
                fetchData();
            })
            .catch((error) => {
                toast.error("Error deleted!");
                console.log(error);
            });
    };

    const handleSearch = (e) => {
        setSearch(e);
    };

    const location = [
        {
            value: "XAVALO",
            label: "XAVALO",
        },
        {
            value: "NVH",
            label: "NVH",
        },
    ];

    const layout = {
        labelCol: {
            span: 7,
        },

        labelAlign: "left",

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
            <St.SpaceStyled>
                <Search allowClear onSearch={handleSearch} />
            </St.SpaceStyled>

            <ButtonAdd
                disabled={true}
                setModalVisible={setModalVisible}
                title="Can not add now"
            />
            <St.ModalStyled
                title="Add a room"
                open={modalVisible}
                onOk={handleOk}
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
                        name="roomNumber"
                        label="Room Number"
                        rules={[
                            {
                                required: true,
                                message: "Please input a room number!",
                            },
                            {
                                pattern: /^[0-9]+$/,
                                message: "Invalid room number!",
                            },
                        ]}
                    >
                        <Input placeholder="Room Number" allowClear />
                    </Form.Item>

                    <Form.Item
                        name="location"
                        label="Location"
                        {...layout}
                        rules={[
                            {
                                required: true,
                                message: "Please choose a location",
                            },
                        ]}
                    >
                        <Select
                            options={location}
                            placeholder="Please choose a location"
                        />
                    </Form.Item>
                </Form>
            </St.ModalStyled>
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

RoomTable.propTypes = {};

export default RoomTable;
