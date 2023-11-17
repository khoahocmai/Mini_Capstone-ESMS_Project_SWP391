import { put } from "@/utils/ApiCaller";

export const putDeleteRegister = (data) => {
    return put("examRooms/delLecturer", data);
};
