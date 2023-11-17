import styled from "styled-components";
import { Button, Flex, Table } from "antd";

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

export const StyledTable = styled(Table)`
    .ant-table-cell {
        height: 65px;
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

        display: flex;
        justify-content: center;
        align-items: center;

        font-size: 1.6rem;
        line-height: 1;
        font-weight: 600;
    }

    .select {
        min-width: 120px;
    }
`;
