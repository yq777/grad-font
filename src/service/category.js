import {doPost} from "../utils/request";

export const saveCategory = (categoryName, parentId) => doPost('/api/manage/category/add_category.do',
  {categoryName, parentId});

export const updateCategory = (categoryName, categoryId) => doPost('/api/manage/category/update_category_name.do',
  {categoryName, categoryId});

export const getChildrenCategory = (parentId) => doPost('/api/manage/category/get_category.do', {parentId});

export const getIndexCategory = (parentId) => doPost('/api/manage/category/get_index_category.do', {parentId});

export const removeCategory = (ids) => doPost('/api/manage/category/delete_category.do', {ids});
