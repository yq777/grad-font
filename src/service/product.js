import {doPost} from "../utils/request";

/**
 * 保存商品
 * @param model
 */
export const saveProduct = (model) => doPost("/api/manage/product/save.do", model);

export const uploadPicture = (form) => doPost("/api/manage/product/upload.do", form);

export const getProducts = (pageSize, nowPage) => doPost('/api/manage/product/list.do', {pageSize, nowPage});

export const searProduct = (pageSize, nowPage, name) => doPost('/api/manage/product/search.do',
  {pageSize, nowPage, name});

export const abledProduct = (productId, status) => doPost('/api/manage/product/set_sale_status.do',
  {productId, status});

export const removeProduct = (ids) => doPost('/api/manage/product/delete_product.do', {ids});

export const getFontProducts = (pageSize, nowPage, keyword, categoryId, orderBy) => doPost("/api/product/list.do", {
  pageSize, nowPage, keyword, categoryId, orderBy
});
