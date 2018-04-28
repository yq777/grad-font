import {doPost} from "../utils/request";

export const createOrder = (shippingId) => doPost("/api/order/create.do", {shippingId});

export const pay = (orderNo) => doPost("/api/order/pay.do", {orderNo});

export const searchUserOrder = (nowPage, pageSize) => doPost("/api/order/list.do", {nowPage, pageSize});

export const concelOrder = (orderNo) => doPost("/api/order/cancel.do", {orderNo});

export const getOrderList = (pageSize, nowPage) => doPost("/api/manage/order/list.do", {pageSize, nowPage});

export const sendGoods = (orderNo) => doPost("/api/manage/order/send_goods.do", {orderNo});
