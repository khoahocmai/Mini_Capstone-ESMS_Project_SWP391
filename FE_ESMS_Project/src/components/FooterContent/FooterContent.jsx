// import PropTypes from 'prop-types'
import { Flex, Typography } from "antd";
import { Footer } from "antd/es/layout/layout";
import * as St from "./FooterContent.styled";

import { LiaCopyrightSolid } from "react-icons/lia";
import { PiPhoneCallBold } from "react-icons/pi";
import { LuMails } from "react-icons/lu";
import { HiOutlineLocationMarker } from "react-icons/hi";

const FooterContent = () => {
    return (
        <St.FooterStyled>
            <Footer className="container">
                <Flex className="logo">
                    <Typography className="logo__title">minions</Typography>
                </Flex>

                <Flex className="middle-title">
                    <Typography className="title">
                        Scheduling has never been difficult for us
                    </Typography>
                    <Flex className="copyright">
                        <Typography className="desc">Copyright</Typography>
                        <LiaCopyrightSolid style={{ margin: "0 3px " }} />
                        <Typography className="desc">2023 Minions</Typography>
                    </Flex>
                </Flex>

                <Flex className="items">
                    <Flex className="sub-item">
                        <PiPhoneCallBold style={{ fontSize: "24px" }} />
                    </Flex>
                    <Flex className="sub-item">
                        <LuMails style={{ fontSize: "24px" }} />
                    </Flex>
                    <Flex className="sub-item">
                        <HiOutlineLocationMarker style={{ fontSize: "24px" }} />
                    </Flex>
                </Flex>
            </Footer>
        </St.FooterStyled>
    );
};

FooterContent.propTypes = {};

export default FooterContent;
