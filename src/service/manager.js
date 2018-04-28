import {doPost} from "../utils/request";

/**
 * 管理员登录
 * @param username
 * @param password
 */
export const managerLogin = (username, password) => doPost("/api/manage/user/manager_login.do", {username, password});

/**
 * 退出登录
 */
export const managerLogout = () => doPost("/api/manage/user/manager_logout.do");

/**
 * 获取管理员信息
 */
export const getManagerInfomation = () => doPost('/api/manage/user/get_information.do');
