import Theme from "@/Theme";
import styled from "styled-components";

export const FooterStyled = styled.div`
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;

    .ant-layout-footer {
        margin: 300px 15px 15px;
        border-top: 2px solid ${Theme.color.gray_3};
    }

    .container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        background-color: ${Theme.color.white_color};

        .logo {
            .logo__title {
                font-size: 2rem;
                font-weight: 700;
                text-transform: uppercase;
                font-family: ${Theme.font.primary_font};
            }
        }

        .middle-title {
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;

            .title {
                font-size: 1.4rem;
                font-weight: 600;
                padding-bottom: 10px;
                font-family: ${Theme.font.primary_font};
            }

            .copyright {
                display: flex;
                justify-content: center;
                align-items: center;
                .desc {
                    font-family: ${Theme.font.primary_font};
                    font-size: 1.2rem;
                }
            }
        }

        .items {
            display: flex;
            justify-content: center;
            align-items: center;

            .sub-item {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 40px;
                height: 40px;
                margin-right: 10px;
                border-radius: 50%;
                background-color: ${Theme.color.gray_2};
            }
        }
    }
`;
