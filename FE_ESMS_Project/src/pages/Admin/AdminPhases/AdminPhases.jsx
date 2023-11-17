// import PropTypes from "prop-types";

import PhaseTable from "@/components/Admin/PhaseTable";
import useScrollTopContent from "@/hooks/useScrollTopContent";
import { Col, Divider, Row } from "antd";

const AdminSlots = () => {
    useScrollTopContent();

    return (
        <Row gutter={16}>
            <Col xs={24} sm={24} md={24} lg={24}>
                <Divider
                    orientation="left"
                    style={{
                        fontFamily: "Inter",
                        fontSize: "1.8rem",
                    }}
                >
                    Phase
                </Divider>
                <PhaseTable />
            </Col>
        </Row>
    );
};

AdminSlots.propTypes = {};

export default AdminSlots;
