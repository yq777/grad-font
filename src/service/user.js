import {doPost} from "../utils/request";

/**
 * 用户登录
 * @param username
 * @param password
 * @constructor
 */
export const Login = (username, password) => doPost('/api/user/login.do', {username, password});

/**
 * 验证邮箱或者用户名是否存在
 * @param str
 * @param type
 * @constructor
 */
export const CheckValid = (str, type) => doPost('/api/user/check_valid.do', {str, type});

/**
 * 用户注册
 * @param id
 * @param username
 * @param password
 * @param email
 * @param phone
 * @param question
 * @param answer
 * @constructor
 */
export const Register = ({
  id,
  username,
  password,
  email,
  phone,
  question,
  answer
}) => doPost('/api/user/register.do', {
  id,
  username,
  password,
  email,
  phone,
  question,
  answer
});

/**
 * 退出登录
 * @constructor
 */
export const Logout = () => doPost('/api/user/logout.do');

/**
 * 获取用户信息
 */
export const getUserInfo = () => doPost('/api/user/get_user_info.do');

/**
 * 得到密保密码
 * @param username
 */
export const getQuestion = (username) => doPost('/api/user/forget_get_question.do', {username});

/**
 * 检查密保密码
 * @param username
 * @param password
 * @param answer
 */
export const checkAnswer = (username, question, answer) => doPost('/api/user/forget_check_answer.do',
  {username, question, answer});

/**
 * 忘记密码
 * @param username
 * @param passwordNew
 * @param forgetToken
 */
export const forgetPassword = (username, passwordNew, forgetToken) => doPost('/api/user/forget_reset_password.do',
  {username, passwordNew, forgetToken});

/**
 * 重置密码
 * @param passwordOld
 * @param passwordNew
 */
export const resetPassword = (passwordOld, passwordNew) => doPost('/api/user/reset_password.do',
  {passwordOld, passwordNew});

/**
 * 更新用户信息
 * @param user
 */
export const updateUserInfo = (user) => doPost('/api/user/update_information.do', user);

/**
 * 获取用户信息
 */
export const getUserInfomation = () => doPost('/api/user/get_information.do');
