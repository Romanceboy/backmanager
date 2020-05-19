import Vue from "vue";
import VueRouter from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import Login from "../views/Login.vue";
import Home from "../views/Home.vue";
import welcome from "../components/welcome.vue";
import infor from "../components/infor.vue";
import second from "../components/2-1.vue";

Vue.use(VueRouter);

var router = new VueRouter({
  routes: [
    {
      path: "/",
      redirect: "/Login"
    },
    {
      path: "/Login",
      component: Login
    },
    {
      path: "/Home",
      component: Home,
      children: [
        {
          path: "/",
          redirect: "/welcome"
        },
        {
          path: "/welcome",
          component: welcome
        },
        {
          path: "/Home/infor",
          component: infor
        },
        {
          path: "/Home/2-1",
          component: second
        }
      ],
      meta: {
        isLogin: true // 添加该字段，表示进入这个路由是需要登录的
      } //路由元
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(res => res.meta.isLogin)) {
    if (sessionStorage["name"]) {
      NProgress.start();
      next();
    } else {
      next({
        path: "/login"
      });
    }
  } else {
    next();
  }
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
