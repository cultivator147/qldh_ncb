import { ItemProps } from "./ItemProps";
import request from "./request";

export const insertItem = (payload: ItemProps) => {
    return request.post('/v1.0/items/insert', payload);
}
export const updateItem = (payload: ItemProps) => {
    return request.post('/v1.0/items/update', payload);
}
export const deleteItem = (payload: ItemProps) => {
    return request.post('/v1.0/items/delete', payload);
}