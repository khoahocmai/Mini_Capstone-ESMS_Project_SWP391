import styled from "styled-components";

export const StyledDiv = styled.div`
    

    input {
        display: none;
    }

    .toggle-wrapper {
        position: relative;
        cursor: pointer;
        border-radius: 120px;
        width: 550px;
        height: 200px;
        background: #fff;
        overflow: hidden;
        background: linear-gradient(
            to bottom,
            rgba(185, 147, 212, 1) 0%,
            rgba(230, 224, 237, 1) 65%
        );
    }
    .toggle-wrapper:before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
            180deg,
            rgba(231, 95, 122, 1) 0%,
            rgba(255, 177, 104, 1) 83%
        );
        opacity: 0;
        transition: 1s;
        border-radius: 120px;
        overflow: hidden;
    }

    input#switch:checked + *:before {
        opacity: 1;
    }
    .hills {
        position: relative;
        display: flex;
        width: 720px;
        bottom: -150px;
        left: -40px;
    }
    .hill-left {
        position: relative;
        z-index: 2;
        width: 380px;
        height: 120px;
        border-radius: 100%;
        background: #5c6090;
        top: -6px;
        left: -10px;
        transform: rotate(8deg);
    }
    .hill-right {
        position: relative;
        z-index: 1;
        width: 340px;
        height: 150px;
        border-radius: 100%;
        background: #4b4f85;
        left: -80px;
    }

    .tree-left {
        position: absolute;
        z-index: 5;
        left: 100px;
        bottom: -40px;
        bottom: -40px;
    }
    .tree-left .trunk {
        z-index: 3;
        height: 200px;
        width: 16px;
        background: #3b3853;
        border-radius: 100% 100% 0 0;
    }
    .tree-left .trunk {
        background: #3b3853;
    }
    .branch {
        background: #3b3853;
        position: relative;
    }

    .branch:nth-child(1) {
        width: 10px;
        height: 70px;
        top: 46px;
        left: -10px;
        border-radius: 100%;
        transform: rotate(-22deg);
    }
    .branch:nth-child(1):before {
        content: "";
        position: absolute;
        width: 10px;
        height: 44px;
        left: -21px;
        top: 26px;
        border: 10px solid #3b3853;
        border-color: transparent #3b3853 transparent transparent;
        border-radius: 60%;
        transform: rotate(10deg);
    }
    .branch:nth-child(2) {
        width: 10px;
        height: 60px;
        top: -46px;
        left: 16px;
        border-radius: 100%;
        transform: rotate(22deg);
    }
    .branch:nth-child(2):after {
        content: "";
        position: absolute;
        width: 10px;
        height: 56px;
        left: 2px;
        top: 20px;
        border: 10px solid #3b3853;
        border-color: transparent transparent transparent #3b3853;
        border-radius: 60%;
        transform: rotate(-11deg);
    }
    .tree-left .tree {
        position: absolute;
        left: -50px;
        top: -10px;
        width: 120px;
        height: 120px;
        z-index: -1;
        background: rgba(76, 80, 139, 1);
        border-radius: 63% 37% 31% 69% / 60% 74% 26% 40%;
        transform: rotate(40deg);
    }
    .tree-left .tree:before {
        content: "";
        position: absolute;
        left: -50px;
        top: -50px;
        width: 120px;
        height: 120px;
        z-index: -1;
        background: rgba(76, 80, 139, 1);
        border-radius: 63% 37% 31% 69% / 60% 74% 26% 40%;
    }
    .tree-right {
        position: relative;
        left: 370px;
        top: 40px;
    }
    .tree-back {
        position: absolute;
        z-index: 2;
        width: 36px;
        height: 80px;
        border-radius: 80%;
        background: rgba(76, 80, 139, 1);
        top: 30px;
        border-bottom: 100px;
        border-color: rgba(76, 80, 139, 1);
    }
    .tree-back .trunk {
        position: absolute;
        top: 78px;
        background: rgba(76, 80, 139, 1);
        width: 10px;
        height: 23px;
        left: 14px;
    }
    .tree-front {
        position: absolute;
        z-index: 3;
        width: 54px;
        height: 120px;
        border-radius: 80%;
        background: rgba(76, 80, 139, 1);
        top: -6px;
        left: 70px;
        border-bottom: 100px;
        border-color: rgba(76, 80, 139, 1);
    }
    .tree-front .trunk {
        position: absolute;
        z-index: 2;
        top: 120px;
        background: #3b3853;
        width: 12px;
        height: 28px;
        left: 21px;
        border-radius: 4px;
    }
    .tree-front .trunk:before {
        content: "";
        position: absolute;
        width: 12px;
        height: 30px;
        background: #3b3853;
        left: -2px;
        top: -2px;
        border-radius: 4px;
        transform: rotate(2deg);
        transform: skewx(-10deg);
    }
    .tree-front .trunk:after {
        content: "";
        position: absolute;
        top: 23px;
        left: -4px;
        width: 14px;
        height: 6px;
        background: #3b3853;
        border-radius: 100%;
    }
    .moon {
        position: absolute;
        background-color: transparent;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        box-shadow: inset -25px -17px 0 3px #fff;
        left: 190px;
        transform: translatey(40px);
        transition: all 0.6s ease-out 0.3s;
        transition-duration: 0.8s;
    }
    .stars {
        position: absolute;
        right: 124px;
        transform: translatey(50px);
        transition: all 0.6s ease-in 0.3s;
    }
    .star {
        position: relative;
        background: #fff;
    }
    .big-star .vertical {
        width: 12px;
        height: 12px;
    }
    .big-star .vertical:before {
        content: "";
        position: absolute;
        top: -12px;
        width: 0;
        height: 0;
        border-right: 6px solid transparent;
        border-left: 6px solid transparent;
        border-bottom: 12px solid #fff;
    }
    .big-star .vertical:after {
        content: "";
        position: absolute;
        top: 12px;
        border-right: 6px solid transparent;
        border-left: 6px solid transparent;
        border-top: 12px solid #fff;
    }
    .big-star .horizontal {
        position: relative;
        transform: rotate(90deg);
        left: 6px;
        top: -6px;
    }
    .big-star .horizontal:before {
        content: "";
        position: absolute;
        top: -12px;
        width: 0;
        height: 0;
        border-right: 6px solid transparent;
        border-left: 6px solid transparent;
        border-bottom: 12px solid #fff;
    }
    .big-star .horizontal:after {
        content: "";
        position: absolute;
        top: 12px;
        border-right: 6px solid transparent;
        border-left: 6px solid transparent;
        border-top: 12px solid #fff;
    }

    .small-star {
        top: -36px;
        left: 24px;
        width: 8px;
        height: 8px;
    }
    .small-star .vertical:before {
        content: "";
        position: absolute;
        top: -8px;
        width: 0;
        height: 0;
        border-right: 4px solid transparent;
        border-left: 4px solid transparent;
        border-bottom: 8px solid #fff;
    }
    .small-star .vertical:after {
        content: "";
        position: absolute;
        top: 8px;
        border-right: 4px solid transparent;
        border-left: 4px solid transparent;
        border-top: 8px solid #fff;
    }
    .small-star .horizontal {
        position: relative;
        transform: rotate(90deg);
        top: 4px;
        left: 4px;
    }
    .small-star .horizontal:before {
        content: "";
        position: absolute;
        top: -8px;
        width: 0;
        height: 0;
        border-right: 4px solid transparent;
        border-left: 4px solid transparent;
        border-bottom: 8px solid #fff;
    }
    .small-star .horizontal:after {
        content: "";
        position: absolute;
        top: 8px;
        border-right: 4px solid transparent;
        border-left: 4px solid transparent;
        border-top: 8px solid #fff;
    }
    .sun {
        position: absolute;
        z-index: 0;
        width: 150px;
        height: 150px;
        border-radius: 50%;
        background: linear-gradient(
            24deg,
            rgba(255, 219, 156, 1) 0%,
            rgba(254, 195, 87, 1) 53%
        );
        left: 240px;
        top: 160px;
        box-shadow: 8px 8px 54px 12px rgba(255, 214, 150, 0.97);
        transition: all 0.8s ease-in 0.3s;
        transform: translatey(20px);
    }
    .day-night {
        position: absolute;
        z-index: 6;
        width: 200px;
        height: 200px;
        border-radius: 50%;
        background-color: linear-gradient(
            24deg,
            rgba(255, 219, 156, 1) 0%,
            rgba(254, 195, 87, 1) 53%
        );
        overflow: hidden;
        transition: all 0.8s ease-in;
        transform: translatex(0);
        backdrop-filter: blur(6px);
    }
    .switch body {
        background-color: #dddddd;
    }
    .switch .toggle-wrapper {
        background: linear-gradient(
            180deg,
            rgba(231, 95, 122, 1) 0%,
            rgba(255, 177, 104, 1) 83%
        );
    }
    .switch .hill-left {
        background: #602291;
    }
    .switch .hill-right {
        background: #511a7f;
    }
    .switch .branch {
        background: #3b3853;
    }
    .switch .tree-left .tree {
        background: #78177b;
    }
    .switch .tree-left .tree:before {
        background: #78177b;
    }
    .switch .tree-back {
        background: #78177b;
        border-color: #78177b;
    }
    .switch .tree-back .trunk {
        background: #78177b;
    }
    .switch .day-night {
        transform: translatex(350px);
        background-color: #6c528cb3;
    }
    .switch .tree-front {
        background: #78177b;
        border-color: #78177b;
    }
    .switch .moon {
        transform: translatey(160px);
        transition: all 0.5s ease-out 0.3s;
        transition-duration: 0.8s;
    }
    .switch .stars {
        transform: translatey(-80px);
        transition: all 0.6s ease-in 0.3s;
    }
    .switch .sun {
        transition: all 0.8s ease-out 0.3s;
        transform: translatey(-40px);
    }
`;
