import { post } from "@/utils/ApiCaller";

export const postExamSlot = (data) => {
    return post("examSlots/", data);
};
