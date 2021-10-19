import {
  put,
  fork,
  call,
  take,
  takeEvery,
  throttle,
  select,
} from "redux-saga/effects";
import { COMPONENT, API, INTERACT } from "../actions/type";
import Router from "next/router";
import service from "../services";
function* success(data, mType, message, isback, nextpath) {
  yield put({
    type: COMPONENT.SUCCESS,
    data: data,
    message:
      message != null
        ? { type: mType, ...(message === true ? {} : message || {}) }
        : null,
    isback: isback ? true : false,
    nextpath: nextpath,
  });
  yield put({
    type: COMPONENT.COMPLETE,
  });
}
function* complete(data) {
  yield put({
    type: COMPONENT.COMPLETE,
    data: data,
  });
}
function* error(error, nextpath) {
  yield put({
    type: COMPONENT.FAIL,
    data:
      error?.response?.status ||
      error?.response?.data?.detail ||
      error.message ||
      error,
    nextpath: nextpath,
  });
  yield put({
    type: COMPONENT.COMPLETE,
  });
}
function* loading(component, value) {
  yield put({
    type: COMPONENT.LOADING,
    component,
    value,
  });
}
const getToken = (state) => state?.matching?.cognito_session?.idToken?.jwtToken;
/**
 * @desc Get: GET in RestAPI
 * @param uri url of service
 * @param doc document of the project
 * @param id id of object
 * @param context additional text in service
 * @param item
 **/
function* get({ doc, item, id, context, mcs, customService }) {
  const token = yield select(getToken);
  const _uri = `${mcs ? `${mcs.toLowerCase()}/` : ""}${doc
    .toLowerCase()
    .replace(/-/g, "/")
    .replace(/_/g, "-")}${id ? `/${id}` : ""}`;
  const _item = { ...(item || {}), id };
  const _loading = `loading_${doc.toLowerCase().replace(/-/g, "_")}`;
  try {
    yield call(loading, _loading);
    let response = yield call(customService || service.get, token, _uri, _item);
    yield put({
      type: API[mcs][doc]["GET"]["SUCCESS"],
      data: response?.data || response,
    });
    return yield call(complete, _loading);
  } catch (e) {
    console.log(e);
    return yield call(error, e);
  }
}
/**
 * @desc List: GET in RestAPI
 * @param uri url of service
 * @param doc document of the project
 * @param id id of object
 * @param item payload in project
 **/
function* list({ doc, item, id, mcs, props }) {
  const token = yield select(getToken);
  const _uri = `${mcs ? `${mcs.toLowerCase()}/` : ""}${doc
    .toLowerCase()
    .replace(/-/g, "/")
    .replace(/_/g, "-")}${id ? `/${id}` : ""}`;
  const _loading = `loading_${doc.toLowerCase().replace(/-/g, "_")}`;
  try {
    yield fork(loading, _loading);
    let response = yield call(service.get, token, _uri, item);
    yield put({
      type: API[mcs][doc]["LIST"]["SUCCESS"],
      data: response.data.content || response.data.results || response.data,
      isConcat: props?.isConcat,
    });
    return yield fork(complete, _loading);
  } catch (e) {
    console.log(e);
    // yield put({
    //   type: API[mcs][doc]["LIST"]["SUCCESS"],
    //   data: [],
    // });
    yield fork(error, e);
    // yield fork(complete);
    return;
  }
}

/**
 * @desc List: POST in RestAPI
 * @param uri url of service
 * @param doc document of the project
 * @param item payload in project
 * @param id id of object
 * @param isback boolean checking that post function is not back
 * @param router router for react native
 **/
function* post({
  doc,
  item,
  id,
  isback = true,
  nextpath,
  // router,
  mcs,
  customService,
  message,
}) {
  const token = yield select(getToken);
  const _uri = `${mcs ? `${mcs.toLowerCase()}/` : ""}${doc
    .toLowerCase()
    .replace(/-/g, "/")
    .replace(/_/g, "-")}${id ? `/${id}` : ""}`;
  const _loading = `loading_${doc.toLowerCase().replace(/-/g, "_")}`;
  try {
    yield call(loading, _loading);
    let response = yield call(customService || service.post, token, _uri, item);
    yield put({
      type: API[mcs][doc]["POST"]["SUCCESS"],
      data: response?.data || response,
    });
    if (isback || message || nextpath) {
      if (isback) {
        Router.back();
      }
      yield call(success, _loading, "post", message, isback, nextpath);
    } else {
      yield call(complete, _loading);
    }
    return response;
  } catch (e) {
    console.log(e, e?.response?.data);
    yield call(error, e);
    // yield call(complete);
  }
}

/**
 * @desc List: POST in RestAPI
 * @param uri url of service
 * @param doc document of the project
 * @param item payload in project
 * @param id id of object
 * @param isback boolean checking that post function is not back
 * @param router router for react native
 **/
function* upload({
  doc,
  item,
  id,
  isback = false,
  nextpath,
  router,
  mcs,
  customService,
  message,
}) {
  const token = yield select(getToken);
  const _uri = `${mcs ? `${mcs.toLowerCase()}/` : ""}${doc
    .toLowerCase()
    .replace(/-/g, "/")
    .replace(/_/g, "-")}${id ? `/${id}` : ""}`;
  const _loading = `loading_${doc.toLowerCase().replace(/-/g, "_")}`;
  try {
    yield call(loading, _loading);
    let response = yield call(service.upload, token, _uri, item);
    yield put({
      type: API[mcs][doc]["LIST"]["SUCCESS"],
      data: response?.data || response,
    });
    yield call(success, _loading, "post", message);
    return response;
  } catch (e) {
    console.log(e, e?.response?.data);
    yield call(error, e);
    // yield call(complete);
  }
}

/**
 * @desc List: PUT in RestAPI
 * @param uri url of service
 * @param doc document of the project
 * @param item payload in project
 * @param id id of object
 * @param props extra object
 * @param context additional text in service
 **/
function* update({
  doc,
  item,
  id,
  context,
  props = {},
  mcs,
  isback = false,
  message,
  nextpath,
}) {
  const token = yield select(getToken);
  const _uri = `${mcs ? `${mcs.toLowerCase()}/` : ""}${doc
    .toLowerCase()
    .replace(/-/g, "/")
    .replace(/_/g, "-")}${id ? `/${id}` : ""}`;
  const _loading = `loading_${doc.toLowerCase().replace(/-/g, "_")}`;
  try {
    yield call(loading, _loading);
    let response = yield call(service.put, token, _uri, item);
    yield put({
      type: API[mcs][doc]["PUT"]["SUCCESS"],
      data: response.data,
      ...props,
    });
    if (isback || message || nextpath) {
      yield call(success, _loading, "put", message, isback, nextpath);
    } else {
      yield call(complete, _loading);
    }
    return response;
  } catch (e) {
    console.log(e, e?.response?.data);
    yield call(error, e);
    // yield call(complete);
  }
}

/**
 * @desc List: DELETE in RestAPI
 * @param uri url of service
 * @param doc document of the project
 * @param id id of object
 * @param context additional text in service
 **/
function* del({
  doc,
  id,
  mcs,
  deletedList,
  message,
  nextpath,
  isback = false,
}) {
  const token = yield select(getToken);
  const _uri = `${mcs ? `${mcs.toLowerCase()}/` : ""}${doc
    .toLowerCase()
    .replace(/-/g, "/")
    .replace(/_/g, "-")}${id ? `/${id}` : ""}`;
  const _loading = `loading_${doc.toLowerCase().replace(/-/g, "_")}`;
  try {
    yield call(loading, _loading);
    let response = yield call(service.delete, token, _uri, deletedList);
    yield put({
      type: API[mcs][doc]["DEL"]["SUCCESS"],
      data: id || deletedList,
    });
    yield call(success, _loading, "del", message, isback, nextpath);
    // if (isback) {
    //   return Router.back();
    // } else {
    //   return;
    // }
    return;
  } catch (e) {
    console.log(e);

    yield call(error, e);
    // yield call(complete);
  }
}

/**
 * @desc List: GET in RestAPI
 * @param doc document of the project
 **/
function* clear({ doc, mcs }) {
  const token = yield select(getToken);
  try {
    return yield put({
      type: API[mcs][doc]["CLEAR"]["SUCCESS"],
    });
  } catch (e) {
    yield call(error, e);
    // yield call(complete);
  }
}

function* useInternalSaga({ api, doc, item, id, props }) {
  return yield put({
    type: INTERACT[doc][api],
    data: item,
    id,
    props,
  });
}

const useNReduxSaga = {
  list,
  get,
  post,
  update,
  upload,
  del,
  clear,
  success,
  complete,
  error,
  loading,
  useInternalSaga,
};
export default useNReduxSaga;
//Callback
