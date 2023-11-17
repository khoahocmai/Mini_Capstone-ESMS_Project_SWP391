// import PropTypes from "prop-types";

import ExamPhaseTable from "@/components/Staff/ExamPhaseTable";
import useScrollTopContent from "@/hooks/useScrollTopContent";
// import ExamSlotTable from "@/components/Staff/ExamSlotTable";
import { Col, Divider, Row } from "antd";

const StaffExamPhase = () => {
    useScrollTopContent();

    return (
        <Row gutter={16}>
            <Col span={24}>
                <Divider orientation="left">Exam Phase</Divider>
                <ExamPhaseTable />
            </Col>
        </Row>
    );
};

StaffExamPhase.propTypes = {};

export default StaffExamPhase;
