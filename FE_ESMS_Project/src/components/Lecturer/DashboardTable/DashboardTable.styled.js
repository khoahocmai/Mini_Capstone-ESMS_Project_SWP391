import Theme from "@/Theme";
import { Flex } from "antd";
import styled from "styled-components";

export const StyledLeft = styled(Flex)`
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .title {
        margin-right: 10px;
        /* margin-left: 20px; */

        display: flex;
        justify-content: center;
        align-items: center;

        font-size: 1.6rem;
        font-family: ${Theme.font.primary_font};
        line-height: 1;
        font-weight: 600;
    }

    .select {
        margin-right: 20px;
        font-family: ${Theme.font.primary_font};
        min-width: 120px;
    }
`;
