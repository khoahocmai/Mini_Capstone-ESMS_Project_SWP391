import { Button, Space, Tag } from "antd";
import styled from "styled-components";

export const DivTable = styled.div`
    /* margin-top: 20px; */
    /* padding-top: 50px; */
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

    width: 400px;

    .ant-space-item {
        width: 100%;
    }
`;
