import axios from 'axios'
import qs from 'qs'
//测试服务器

export const BASEURL = axios.defaults.baseURL = 'http://192.168.1.50:8088';
// export const BASEURL = axios.defaults.baseURL = 'http://192.168.0.108:8001';

//  拦截请求
axios.interceptors.request.use(
  config => {
    // const token = '1d2f3016-496b-49d1-b0b5-5fba9acb3a7c';//企业
    const token = '7b05d7255df946779494827d32b3146d';//个人
    // const token = localStorage.getItem('token');
    config.headers = {
      'Content-Type':'application/x-www-form-urlencoded',//设置跨域头部
      'token':token
    };
    if (token) {
      axios.defaults.headers.common['token'] = token;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

//  拦截响应
axios.interceptors.response.use(function (config) {
  return config
});


//个人服务器
// export const BASEURL = axios.defaults.baseURL = 'http:///';

export const fetch = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err);
      })
  })
};

export const get = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err);
      })
  })
};


export const post = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    axios.post(url, qs.stringify(data, { arrayFormat: 'repeat' }))
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err.status);
      })
  })
};

export const patch = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    axios.patch(url, qs.stringify(data, { arrayFormat: 'repeat' }))
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err);
      })
  })
};

export const put = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    axios.put(url, qs.stringify(data))
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err);
      })
  })
};
