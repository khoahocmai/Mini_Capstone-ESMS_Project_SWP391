import Theme from "@/Theme";
import styled from "styled-components";

export const DivStyled = styled.div`
    width: 100vw;
    height: 100vh;
    position: relative;
    background-color: ${Theme.color.primary_color};

    @keyframes drop {
        90% {
            height: 20px;
        }
        100% {
            height: 160px;
            -webkit-transform: translateY(calc(100vh + 160px));
            transform: translateY(calc(100vh + 160px));
        }
    }

    .animation {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        overflow: hidden;

        .animation-rain {
            position: absolute;
            top: 0;
            bottom: 0;
            width: 1px;
            background-color: #eee;
        }

        .animation-rain::after {
            content: "";
            position: absolute;
            top: 0;
            left: -0.5px;
            -webkit-transform: translateY(-160px);
            -ms-transform: translateY(-160px);
            transform: translateY(-160px);
            height: 160px;
            width: 2px;
            background-color: #00ffc0;
        }

        .animation-rain:nth-child(1) {
            left: 20%;
        }

        .animation-rain:nth-child(1)::after {
            -webkit-animation: drop 3s infinite linear;
            animation: drop 3s infinite linear;
            -webkit-animation-delay: 0.2s;
            animation-delay: 0.2s;
        }

        .animation-rain:nth-child(2) {
            left: 40%;
        }

        .animation-rain:nth-child(2)::after {
            -webkit-animation: drop 2s infinite linear;
            animation: drop 2s infinite linear;
            -webkit-animation-delay: 0.7s;
            animation-delay: 0.7s;
        }

        .animation-rain:nth-child(3) {
            left: 60%;
        }

        .animation-rain:nth-child(3)::after {
            -webkit-animation: drop 3s infinite linear;
            animation: drop 3s infinite linear;
            -webkit-animation-delay: 0.9s;
            animation-delay: 0.9s;
        }

        .animation-rain:nth-child(4) {
            left: 80%;
        }

        .animation-rain:nth-child(4)::after {
            -webkit-animation: drop 2s infinite linear;
            animation: drop 2s infinite linear;
            -webkit-animation-delay: 1.2s;
            animation-delay: 1.2s;
        }
    }

    .logo {
        padding: 10px 14px;
        position: absolute;
        top: 3%;
        left: 2%;
        
        border-radius: 12px;
        border: 3px solid #00a992;
        display: flex;
        justify-content: center;
        align-items: center;

        z-index: 100;
        cursor: pointer;

        .image {
            margin-right: 12px;
            width: 40px;
            height: 40px;
            overflow: hidden;


            .logo-img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 14px;
            }
        }

        .logo-title {
            font-size: 2rem;
            font-weight: 500;
        }
    }

    .wrapper {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;

        .container {
            position: absolute;
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;

            .title {
                font-size: 14rem;
                font-weight: 700;
                line-height: 130px;
                text-shadow: 4px 4px 0 #00c5a7;
            }

            .desc {
                margin-top: 20px;
                font-size: 4rem;
                font-weight: 700;
                color: #00a992;
            }

            .sub-desc {
                margin-top: 10px;
                font-size: 2rem;
                font-weight: 500;
                /* color: #00a992; */
            }

            .button {
                margin-top: 40px;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 40px;
                border-radius: 1px;
                color: black;
                transition: all 0.3s ease;
                box-shadow: 0 0 0 2px #000, 2px 2px 0 2px #00c5a7;
                background-image: linear-gradient(45deg, #00e2c7, transparent);

                &:hover {
                    background-image: linear-gradient(
                        -45deg,
                        #00e2c7,
                        transparent
                    );
                    box-shadow: 0 0 0 2px #00c5a7, 2px 2px 0 2px #000;
                    border-color: #00c5a7;
                }

                .button-title {
                    font-size: 1.6rem;
                }
            }
        }
    }
`;
