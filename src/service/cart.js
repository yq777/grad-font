import {doPost} from "../utils/request";

export const upsertCart = (productId, count) => doPost("/api/cart/add.do", {productId, count});

export const getCartList = () => doPost("/api/cart/list.do");

export const updateCartNum = (productId, count) => doPost("/api/cart/update.do", {productId, count});

export const deleteProducts = (productIds) => doPost("/api/cart/delete.do", {productIds});

export const confirmProduct = (productIds) => doPost("/api/cart/confirm.do", {productIds});

export const getCheckedProductList = () => doPost("/api/cart/get_checked_product.do");
