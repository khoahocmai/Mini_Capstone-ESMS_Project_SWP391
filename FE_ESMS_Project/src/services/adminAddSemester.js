import { post } from "@/utils/ApiCaller";

export const postNewSemester = (data) => {
    return post("semesters/whenCreateSemester/", data);
};
