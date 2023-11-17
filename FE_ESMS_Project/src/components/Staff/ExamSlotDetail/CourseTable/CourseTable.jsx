import PropTypes from "prop-types";
import instance from "@/utils/instance";
import { Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as St from "./CourseTable.styled";
import cookies from "@/utils/cookies";

const CourseTable = ({ noti }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const param = useParams();
    const token = cookies.getToken();
    const pageSize = 10;

    useEffect(() => {
        // call api here
        // console.log("noti", noti);
        fetchCourse();
    }, [noti]);

    const fetchCourse = () => {
        setLoading(true);
        instance
            .get(`examRooms/getCourseAndNumOfStuOneSlot?exSlotID=${param.id}`, {
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
                // console.log(formattedData);
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

    const columns = [
        // Your columns
        {
            title: "No",
            width: "10%",
            render: (record) => {
                return <Typography>{record.no}</Typography>;
            },
        },
        {
            title: "Course",
            width: "20%",
            render: (record) => {
                return <Typography>{record.subCode}</Typography>;
            },
        },
        {
            title: "Number of Students",
            width: "20%",
            render: (record) => {
                return <Typography>{record.numOfStu}</Typography>;
            },
        },
    ];
    return (
        <St.DivStyled>
            <Table
                columns={columns}
                dataSource={data}
                loading={loading}
                bordered
                pagination={{
                    pageSize: pageSize,
                    hideOnSinglePage: data.length <= pageSize,
                }}
            />
        </St.DivStyled>
    );
};

CourseTable.propTypes = {
    noti: PropTypes.bool,
};

export default CourseTable;
