// import PropTypes from 'prop-types'
import { Button, Flex, Typography } from "antd";
import * as St from "./PageNotAccess.styled";

import logo from "@/assets/images/Logo.svg";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/");
    };

    return (
        <St.DivStyled>
            <Flex className="animation">
                <Flex className="animation-rain"> </Flex>
                <Flex className="animation-rain"> </Flex>
                <Flex className="animation-rain"> </Flex>
                <Flex className="animation-rain"> </Flex>
            </Flex>
            <Flex className="logo" onClick={handleClick}>
                <Flex className="image">
                    <img className="logo-img" src={logo} />
                </Flex>
                <Typography className="logo-title">MINIONS</Typography>
            </Flex>

            <Flex className="wrapper">
                <Flex className="container">
                    <Typography className="title">403</Typography>
                    <Typography className="desc">PAGE NOT ACCESS!</Typography>
                    <Typography className="sub-desc">
                        Sorry! We can not find the page you are looking for.
                    </Typography>
                    <Button className="button" onClick={handleClick}>
                        <Typography className="button-title">
                            LOGIN PAGE
                        </Typography>
                    </Button>
                </Flex>
            </Flex>
        </St.DivStyled>
    );
};

PageNotFound.propTypes = {};

export default PageNotFound;
