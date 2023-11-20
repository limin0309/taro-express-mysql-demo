import Taro from "@tarojs/taro";

const tools = {
  /**
   * 网络请求
   * @{param}	 opts
   */
  request: (opts) => {
    const { url = "", params = {}, method = "GET", ...rest } = opts;
    return new Promise((resolve, reject) => {
      Taro.request({
        url,
        data: params,
        method,
        ...rest,
      })
        .then((res) => {
          const { data } = res;
          if (data?.code === 1) {
            resolve(data);
          } else {
            reject(res);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  /**
   * 页面loading
   * @{param}
   */

  showLoading: (param = "") => {
    let detOpts = {
      title: "加载中...",
      mask: true, // 防止触摸穿透
    };
    if (Object.prototype.toString.call(param) === "[object String]") {
      detOpts.title = param;
    } else if (Object.prototype.toString.call(param) === "[object Object]") {
      detOpts = {
        ...detOpts,
        ...param,
      };
    }
    return Taro.showLoading(detOpts);
  },

  /**
   * 页面提示
   * @{param}
   */
  showToast: (param = "") => {
    let detOpts = {
      title: "温馨提示",
      icon: "none",
      mask: true,
      duration: 2000, // 提示时间
    };
    if (Object.prototype.toString.call(param) === "[object String]") {
      detOpts.title = param;
    } else if (Object.prototype.toString.call(param) === "[object Object]") {
      detOpts = {
        ...detOpts,
        ...param,
      };
    } else {
      throw new Error("参数类型有误，应该是字符串或者对象");
    }
    return Taro.showToast(detOpts);
  },
  /**
   *
   * @{param}	 time 缓存有效时间 单位：s
   */
  setStorageSyncWithTime: (key, value, time) => {
    try {
      const curTime = Date.now();
      // 过期时间
      const expiredTime = curTime + time * 1000;
      Taro.setStorageSync(key, {
        [key]: value,
        expiredTime,
      });
    } catch (err) {
      console.log(err);
    }
  },
  getStorageSyncWithTime: (key) => {
    try {
      const result = Taro.getStorageSync(key);
      const { expiredTime } = result;
      if (Date.now() > expiredTime) {
        // 已过期
        Taro.removeStorageSync(key);
      } else {
        return result[key];
      }
    } catch (err) {
      console.log(err);
    }
  },
  /**
   *
   * @{param}	 fn 如果登录就执行fn
   */
  doLogin: (fn) => {
    const user = tools.getStorageSyncWithTime("userInfo");
    if (!user?.userPhone) {
      tools.navigateTo({
        url: "/pages/login/login",
      });
    } else {
      fn?.();
    }
  },
  isAliPay: Taro.ENV_TYPE.ALIPAY === Taro.getEnv(),
  isBaiDu: Taro.ENV_TYPE.SWAN === Taro.getEnv(),
  isH5: Taro.ENV_TYPE.WEB === Taro.getEnv(),
};

export default tools;
