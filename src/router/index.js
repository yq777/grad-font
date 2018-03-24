import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Index = (resolve) => require(['../views/index/index.vue'], resolve);
const Login = (resolve) => require(['../views/login/login.vue'], resolve);
const Register = (resolve) => require(['../views/register/register.vue'], resolve);
const ForgetPassword = (resolve) => require(['../views/forget-password/forget-password.vue'], resolve);
const AboutUs = (resolve) => require(['../views/about-us/about-us.vue'], resolve);
const Order = (resolve) => require(['../views/order/order.vue'], resolve);
const GoodsList = (resolve) => require(['../views/goods/good-list.vue'], resolve);
const GoodsDetail = (resolve) => require(['../views/goods/goods-detail.vue'], resolve);
const ShopCar = (resolve) => require(['../views/shop-car/shop-car.vue'], resolve);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      meta: {
        title: '零食小站'
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        title: '用户登录--零食小站'
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        title: '用户注册--零食小站'
      }
    },
    {
      path: '/forget/password',
      name: 'ForgetPassword',
      component: ForgetPassword,
      meta: {
        title: '找回密码--零食小站'
      }
    },
    {
      path: '/aboutUs',
      name: 'AboutUs',
      component: AboutUs,
      children: [
        {
          path: 'userCenter',
          name: 'userCenter',
          component: AboutUs,
          meta: {
            title: '关于零食小站'
          }
        },
        {
          path: 'myOrder',
          name: 'myOrders',
          component: Order,
          meta: {
            title: '订单'
          }
        }]
    },
    {
      path: '/goods/list',
      name: 'GoodsList',
      component: GoodsList,
      meta: {
        title: '商品列表'
      }
    },
    {
      path: '/goods/detail',
      name: 'GoodsDetail',
      component: GoodsDetail,
      meta: {
        title: '商品详情'
      }
    },
    {
      path: '/shop/car',
      name: 'ShopCar',
      component: ShopCar,
      meta: {
        title: '购物车'
      }
    }
  ]
})
