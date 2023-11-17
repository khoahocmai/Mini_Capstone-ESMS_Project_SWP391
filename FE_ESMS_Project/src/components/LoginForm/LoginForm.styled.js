import Theme from "@/Theme";
import styled from "styled-components";

export const DivLogin = styled.div`
    height: 100vh;
    background: #eef5ff;

    .login__container {
        height: 100%;
        width: 430px;
        margin-left: auto;
        margin-right: auto;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .login__inner {
        width: 100%;
        border-radius: 20px;
        background: #fff;
        display: flex;
        align-items: center;
        flex-direction: column;
    }

    .login-image {
        margin-top: 70px;
        width: 200px;
        height: 200px;
        flex-shrink: 0;
    }

    .login-heading {
        margin: 12px 0;
        font-size: 3rem;
        color: ${Theme.color.black_1};
    }

    .login-desc {
        position: relative;
        margin: 20px 0;
        font-size: 1.6rem;
        color: ${Theme.color.black_1};
        font-weight: 400;

        &::after {
            position: absolute;
            bottom: -25px;
            left: calc(50% - 50px);
            content: "";
            width: 100px;
            height: 1px;
            background-color: ${Theme.color.black_1};
        }
    }

    .login-button {
        margin-top: 60px;
        padding: 8px 26px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 430px;
        cursor: pointer;

        button {
            min-width: 230px;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0.7rem 1.4rem;
            font-size: 1.2rem;
            /* line-height: 1.25rem; */
            font-weight: 700;
            text-align: center;
            text-transform: uppercase;
            vertical-align: middle;
            border-radius: 50px;
            border: 1px solid rgba(0, 0, 0, 0.25);
            gap: 0.75rem;
            color: rgb(65, 63, 63);
            background-color: #fff;
            cursor: pointer;
            transition: all 0.6s ease;
        }

        .button svg {
            margin-right: 10px;
            height: 24px;
        }

        button:hover {
            /* transform: scale(1.02); */
            background-color: #eef5ff;
        }
    }

    .login-contact {
        margin-top: 80px;
        padding-bottom: 30px;

        .login-contact-link {
            cursor: pointer;
            color: ${Theme.color.blue_5};
        }

        a {
            position: relative;
        }

        a::before {
            position: absolute;
            display: block;
            content: "";
            right: 0;
            top: 100%;
            width: 0;
            height: 2.3px;
            opacity: 0.75;
            background: ${Theme.color.blue_5};
            transition: all 0.25s linear 0s;
        }
        a:hover::before {
            width: 100%;
            left: 0;
            top: 100%;
        }
    }
`;
