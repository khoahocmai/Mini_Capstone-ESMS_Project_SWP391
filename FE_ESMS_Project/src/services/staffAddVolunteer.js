import { post } from "@/utils/ApiCaller";

export const postNewVolunteer = (data) => {
    return post("examiners/volunteerExaminer/", data);
};
