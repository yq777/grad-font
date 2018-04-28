import {doPost} from "../utils/request";

export const saveAddress = (model) => doPost("/api/shipping/add.do", model);

export const searchAddressList = (pageSize, nowPage) => doPost('/api/shipping/select.do', {pageSize, nowPage});

export const updateAddress = (model) => doPost("/api/shipping/update.do", model);

export const deleteAddress = (id) => doPost("/api/shipping/delete.do", {id});
