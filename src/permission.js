import router from "@/router/index.js";
import { getUserInfo } from "./api/login";

router.beforeEach((to, from, next) => {
  //获取token
  const token = localStorage.getItem("mam-token");
  if (!token) {
    //不存在token
    //不允许访问其他页面，回到登录页
    if (to.path !== "/login") {
      next({ path: "/login" });
    } else {
      next();
    }
  } else {
    //存在token
    if (to.path === "/login") {
      next();
    } else {
      //判断是否有用户信息
      const userInfo = localStorage.getItem("mam-user");
      if (userInfo) {
        next();
      } else {
        //通过token获取用户信息
        getUserInfo(token).then((response) => {
          const resp = response.data;
          if (resp.flag) {
            //保存数据
            localStorage.setItem("mam-user", JSON.stringify(resp.data));
            next();
          } else {
            //未获取到，重新登录
            next({ path: "/login" });
          }
        });
      }
    }
  }
});
