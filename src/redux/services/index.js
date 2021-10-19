import agent from "./agent"

import moment, { Moment } from "moment";
import qs from "qs";
const convert = (item) => {
  return JSON.stringify(item).replace(/\"([^(\")"]+)\":/g, "$1:");
};
export default {
  get: (token, url, item) => {
    return agent(token).get(url, {
      params: item,
      paramsSerializer: (params) => {
        const newParams = Object.keys(params).reduce(
          (a, b) =>
            params[b]
              ? params[b] instanceof moment
                ? {
                    ...a,
                    [b]: moment(params[b]).utc().format(),
                  }
                : { ...a, [b]: params[b] }
              : a,
          {}
        );
        return qs.stringify(newParams, { arrayFormat: "repeat" });
      },
    });
  },
  post: (token, url, item, params) => {
    return agent(token).post(url, item, { params: params });
  },
  patch: (token, url, item) => {
    return agent(token).patch(url, item);
  },
  put: (token, url, item) => {
    return agent(token).put(url, item);
  },
  delete: (token, url, data) => {
    return agent(token).delete(url, { data });
  },
  upload: (token, url, item) => {
    let data = new FormData();
    data.append("file", item.file, item.file.fileName);
    return agent(token).post(url, data, {
      "Content-Type": "multipart/form-data",
    });
    // fetch(`${process.env.BACKEND_URI}/${url}`, {
    //   method: "POST",
    // headers:
    // {

    //   accept: "application/json",
    //   "Content-Type": "multipart/form-data",
    //   Authorization: `Bearer ${token}`,
    // },
    //   body: data,
    // });
  },
};
