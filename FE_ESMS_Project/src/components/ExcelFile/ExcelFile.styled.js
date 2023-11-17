import Theme from "@/Theme";
import styled from "styled-components";

export const DivStyled = styled.div`
    margin-top: 20px;

    input[type="file"] {
        display: none;
    }

    label {
        position: relative;
        top: -0px;
        padding: 5.5px 10px;
        border: 1px solid ${Theme.color.gray_2};
        border-radius: 6px;
        background-color: ${Theme.color.white_color};
        border-color: ${Theme.color.gray_2};
        color: rgba(0, 0, 0, 0.88);
        box-shadow: 0 2px 0 rgba(0, 0, 0, 0.02);
        transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);

        &:hover {
            color: ${Theme.color.blue_3};
            border-color: ${Theme.color.blue_3};
        }
    }

    .input {
        /* margin-left: 20px; */
    }

    .upload {
        margin-left: 10px;
    }
`;
