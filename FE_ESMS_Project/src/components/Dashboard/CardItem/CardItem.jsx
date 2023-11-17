import PropTypes from "prop-types";

import { Flex, Typography } from "antd";

import * as St from "./CardItem.styled";

const CardItem = ({ title, value, icon, loading, desc }) => {
    return (
        <div>
            <St.CardStyled hoverable bordered={true} loading={loading}>
                <Flex className="wrapper">
                    <Typography className="title">{title}</Typography>
                    {icon}
                </Flex>
                <Flex className="value">
                    <Typography className="value-title">{value}</Typography>
                    <Typography className="value-desc">
                       {desc}
                    </Typography>
                </Flex>
            </St.CardStyled>
        </div>
    );
};

CardItem.propTypes = {
    title: PropTypes.string.isRequired,
    // value: PropTypes.number.isRequired,
    icon: PropTypes.node.isRequired,
    loading: PropTypes.bool,
};

export default CardItem;
