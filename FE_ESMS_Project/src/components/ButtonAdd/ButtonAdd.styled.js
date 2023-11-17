import Theme from "@/Theme";
import { Button } from "antd";
import styled from "styled-components";

export const DivStyled = styled.div`
    .ant-btn-primary {
        font-family: ${Theme.font.primary_font};
        font-size: 1.4rem;
        font-weight: 500;
    }
`;
export const ButtonTable = styled(Button)`
    position: absolute;
    top: 0;
    right: 0;
`;
