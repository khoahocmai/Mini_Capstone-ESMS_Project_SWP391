import { post } from "@/utils/ApiCaller";

export const postNewStaff = (data) => {
    return post("subInSlots/", data);
};
