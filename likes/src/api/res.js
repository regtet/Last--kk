import api from "./api";
export const CaiDan = (params) =>
  api({
    url: "menus",
    method: "GET",
  });
export const Login = (params) =>
  api({
    url: "login",
    method: "post",
    params,
  });
export const User = () =>
  api({
    url: "roles",
    method: "get",
  });
export const Delete = (e, ee) =>
  api({
    url: "roles/" + e + "/rights/" + ee,
    method: "DELETE",
  });
export const Add = (data) =>
  api({
    url: "roles",
    method: "POST",
    data,
  });
export const SSS = (data) =>
  api({
    url: "roles/" + data.id,
    method: "PUT",
    data,
  });
export const Del = (id) =>
  api({
    url: "roles/" + id,
    method: "DELETE",
  });
export const Tree = (id) =>
  api({
    url: "rights/" + "tree",
    method: "GET",
  });
