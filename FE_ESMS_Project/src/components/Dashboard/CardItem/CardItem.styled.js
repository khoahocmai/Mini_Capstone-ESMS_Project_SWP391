import Theme from "@/Theme";
import { Card } from "antd";
import styled from "styled-components";

export const CardStyled = styled(Card)`
    height: 150px;
    background-color: ${Theme.color.blue_2};
    transition: all 0.3s ease-in-out;

    &:hover {
        transform: translateY(-6px);
        background-color: ${Theme.color.blue_1};
    }

    .ant-card-body {
        padding: 16px;
        height: 100%;
    }

    .wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .title {
            font-size: 2.4rem;
            color:${Theme.color.white_matte} ;

            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .icon {
            padding: 8px;
            border: 1px solid white;
            border-radius: 50%;
            color: ${Theme.color.white_color};
            font-size: 2rem;
        }
    }

    .value {
        margin-top: 5px;
        display: flex;
        flex-direction: column;

        .value-title {
            font-size: 3.2rem;
            color: ${Theme.color.white_color};
        }

        .value-desc {
            color: ${Theme.color.white_matte};
        }
    }
`;
