import api from "./api";
export const GetData = (params) =>
  api({
    url: "categories/",
    method: "GET",
    params,
  });
export const AddS = (data) =>
  api({
    url: "categories/",
    method: "POST",
    data,
  });
export const GetDataS = () =>
  api({
    url: "categories/",
    method: "GET",
  });
// 根据ID拿到参数
export const GetCC = (params) =>
  api({
    url: "categories/" + params.id + "/attributes",
    method: "GET",
    params,
  });
// 更新参数
export const SetUp = (data) =>
  api({
    url: "categories/" + data.cid + "/attributes/" + data.id,
    method: "PUT",
    data,
  });
// 添加
export const ADDUp = (data) =>
  api({
    url: "categories/" + data.id + "/attributes/",
    method: "POST",
    data,
  });
// 添加
export const AddSSS = (data) =>
  api({
    url: "goods",
    method: "POST",
    data,
  });
export const GGG = (params) =>
  api({
    url: "goods",
    method: "GET",
    params,
  });
