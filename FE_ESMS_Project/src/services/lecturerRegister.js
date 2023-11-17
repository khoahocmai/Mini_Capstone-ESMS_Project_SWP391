import { put } from "@/utils/ApiCaller";

export const putRegister = (data) => {
    return put("examRooms/lecturer", data);
};
