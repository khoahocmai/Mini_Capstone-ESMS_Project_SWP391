import { Button, Flex, Space, Tag } from "antd";
import styled from "styled-components";

export const DivTable = styled.div`
    margin-top: 20px;
    padding-top: 50px;
    position: relative;
`;

export const ButtonTable = styled(Button)`
    position: absolute;
    top: 0;
    right: 0;
`;

export const TagStyled = styled(Tag)`
    position: absolute;
    top: 0;
    right: 100px;

    height: 32px;

    display: flex;
    align-items: center;
    justify-content: center;

    .label {
        color: #1d39c4;
    }
`;

export const SpaceStyled = styled(Space)`
    position: absolute;
    top: 0;
    left: 0;

    .ant-space-item {
        width: 100%;
    }
`;

export const StyledLeft = styled(Flex)`
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    .title {
        margin-right: 10px;
        /* margin-left: 20px; */

        display: flex;
        justify-content: center;
        align-items: center;

        font-size: 1.6rem;
        line-height: 1;
        font-weight: 600;
    }

    .select {
        margin-right: 20px;
        min-width: 120px;
    }
`;
