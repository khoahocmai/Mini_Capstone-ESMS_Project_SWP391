import { post, remove } from "@/utils/ApiCaller";

export const postNewPhase = (data) => {
    return post("examPhases/", data);
};

export const deletePhase = (data) => {
    return remove("examPhases/", data);
};
