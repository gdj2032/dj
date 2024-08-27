import { API_HOST, Credentials } from '@/constants';
import { genQuery, abortablePromise } from './helper';
import { message } from 'antd'
import { instance, doLogout } from '@/utils';

const methods = ['GET', 'POST', 'PUT', 'DELETE'];

async function checkStatus(response: any, toast: boolean = true) {
  switch (response.status) {
    case 200:
      const SESSION = response.headers?.get?.('SESSION');
      instance.session = SESSION;
      return response.text().then((text: string) => Promise.resolve(text ? JSON.parse(text) : {}));
    case 401:
      return (response.json()).then((json: any) => {
        message.error(json.message)
        doLogout()
        return Promise.reject(json);
      });
    case 400:
      return (response.json()).then((json: any) => {
        if (json.message && toast) {
          message.error(json.message)
        }
        return Promise.resolve(json);
      });
    case 500:
      try {
        const json = await response?.json?.()
        if (toast) {
          if (json?.message) {
            message.error(json.message)
          } else {
            message.error('服务器错误')
          }
        }
        return Promise.resolve(json);
      } catch (error) {
        if (toast) {
          message.error('服务器错误')
        }
      }
      return Promise.resolve({});
    default:
      return (response.json()).then((json: any) => {
        if (json.message && toast) {
          message.error(json.message)
        }
        return Promise.reject(json);
      });
  }
}

function fetchRequest(options: IRequestOptions) {
  if (!options.method || methods.indexOf(options.method) === -1) {
    return Promise.reject('请求类型错误');
  }

  const requestUrl = `${options.url || API_HOST}${options.path}${genQuery(options.query)}`;

  const config: any = {
    method: options.method,
    credentials: options.credentials || Credentials,
    headers: {
      ...options.headers,
      SESSION: instance.session,
    }
  };

  // application/json
  if (options.headers && options.headers['Content-Type'] === 'application/json') {
    config.body = JSON.stringify(options.data);
  }

  // application/x-www-form-urlencoded
  if (options.headers && options.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
    const searchParams = Object.keys(options.data).map((key) => {
      return `${encodeURIComponent(key)}=${encodeURIComponent(options.data[key])}`;
    }).join('&');
    config.body = searchParams;
  }

  if (options.upload) {
    if (options.data instanceof FormData) {
      config.body = options.data;
    } else {
      console.error('上传服务中，data必须是FormData')
      return;
    }
  }

  return abortablePromise(fetch(requestUrl, config))
    .then(response => checkStatus(response, options.toast));
}

const request = {
  get: (opts: IRequestOptions) => {
    return fetchRequest({
      ...opts,
      method: 'GET',
      headers: {
        Accept: 'application/json',
        ...opts.headers,
      }
    });
  },
  post: (opts: IRequestOptions) => {
    return fetchRequest({
      ...opts,
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...opts.headers,
      }
    });
  },
  postForm: (opts: IRequestOptions) => {
    return fetchRequest({
      ...opts,
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        ...opts.headers,
      }
    });
  },
  delete: (opts: IRequestOptions) => {
    return fetchRequest({
      ...opts,
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        ...opts.headers,
      }
    });
  },
  put: (opts: IRequestOptions) => {
    return fetchRequest({
      ...opts,
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...opts.headers,
      }
    });
  },
  upload: (opts: IRequestOptions) => {
    return fetchRequest({
      ...opts,
      method: 'POST',
      headers: {
        Accept: 'application/json',
        ...opts.headers,
      },
      upload: true
    })
  }
};

export default request;
