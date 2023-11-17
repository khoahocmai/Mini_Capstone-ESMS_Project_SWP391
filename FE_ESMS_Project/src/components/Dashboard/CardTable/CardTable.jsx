import PropTypes from "prop-types";
import { Card, Divider, Table, Typography } from "antd";

const CardTable = ({ data, loading }) => {
    if (!Array.isArray(data)) {
        return null;
    }

    const newData = data;

    const columns = [
        {
            title: "No",
            width: "15%",
            render: (record) => {
                return <Typography>{record.no}</Typography>;
            },
        },
        {
            title: "Name",
            width: "35%",
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
            title: "Total Slot",
            width: "25%",
            render: (record) => {
                return <Typography>{record.quantity}</Typography>;
            },
        },
    ];
    return (
        <div>
            <Card hoverable>
                <Divider orientation="left">
                    Top three examiner per phase
                </Divider>
                <Table
                    scroll={{ x: true }}
                    columns={columns}
                    dataSource={newData}
                    bordered
                    loading={loading}
                    pagination={{
                        pageSize: 6,
                        hideOnSinglePage: newData.length <= 6,
                        showSizeChanger: false,
                    }}
                />
            </Card>
        </div>
    );
};

CardTable.propTypes = {
    data: PropTypes.array,
    loading: PropTypes.bool,
};

export default CardTable;
