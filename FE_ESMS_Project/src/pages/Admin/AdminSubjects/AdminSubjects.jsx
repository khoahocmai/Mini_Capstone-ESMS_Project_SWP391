// import PropTypes from "prop-types";

import SubjectTable from "@/components/Admin/SubjectTable";
import useScrollTopContent from "@/hooks/useScrollTopContent";
import { Col, Divider, Row } from "antd";

const AdminSubjects = () => {
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
                    Subject
                </Divider>
                <SubjectTable />
            </Col>
        </Row>
    );
};

AdminSubjects.propTypes = {};

export default AdminSubjects;
