import { ItemProps } from "./ItemProps";
import request from "./request";

export const insertItem = (payload: ItemProps) => {
    return request.post('/v1.0/items/insert', payload);
}