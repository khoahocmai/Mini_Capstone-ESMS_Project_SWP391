import { put } from "@/utils/ApiCaller";

export const putExaminer = (data) => {
    return put("examRooms/addExaminer", data);
};
