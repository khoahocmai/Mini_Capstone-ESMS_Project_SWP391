import PropTypes from "prop-types";

import { Popover } from "antd";

import * as St from "./PopUpOver.styled";
import logo from "../../assets/images/Logo.svg";

const text = (
    <St.DivHeader>
        <St.PopupTitle>Notification</St.PopupTitle>
        <St.PopupDesc style={{ color: "#685cff" }}>View more</St.PopupDesc>
    </St.DivHeader>
);

const content = (
    <St.DivContent>
        <div className="item">
            <div className="image__wrapper">
                <div className="image">
                    <img className="img" src={logo} alt="" />
                </div>
            </div>
            <div className="desc__wrapper">
                <div>Xin chao tat ca cac thanh vien cua ESMS</div>
                <div className="desc__footer">8 thang truoc</div>
            </div>
        </div>
    </St.DivContent>
);

const PopUpOver = ({ children }) => {
    return (
        <Popover
            overlayInnerStyle={{ padding: 0 }}
            placement="bottomLeft"
            title={text}
            content={content}
            trigger="click"
        >
            {children}
        </Popover>
    );
};

PopUpOver.propTypes = {
    children: PropTypes.node.isRequired,
};

export default PopUpOver;
