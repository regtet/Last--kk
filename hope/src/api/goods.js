import req from "./request";
export function login(data) {
    return req({ url: "/login", method: "POST", data });
}
export function getData(data) {
    return req({ url: "/menus", method: "GET" });
}
export function getTable(params) {
    return req({ url: "/goods", method: "GET", params }); //不对不对，有区别有区别
}
export function add(data) {
    return req({ url: "/goods", method: "POST", data });
}
export function del(data) {
    // return req({ url: "goods/" + data.goods_id, method: "DELETE", data });
    return req({ url: "goods/" + data.goods_id, method: "DELETE", data });
}
export function updE(data) {
    // return req({ url: "goods/" + data.goods_id, method: "DELETE", data });
    return req({ url: "goods/" + data.goods_id, method: "PUT", data });
}
export function upSta(data) {
    console.log(data);
    return req({
        url: "goods/" + data.goods_id + "/state/" + data.type,
        method: "PUT",
    });
}

export function FindTagID(data) {
    console.log(data);
    return req({
        url: "goods/" + data.goods_id,
        method: "GET",
    });
}
export function FindUID(data) {
    return req({
        url: "goods/" + data.goods_id + "/role",
        method: "PUT",
        data,
    });
}
export function GetReports() {
    return req({
        url: "reports/type/1",
        method: "GET",
    });
}
export function Categories() {
    return req({
        url: "categories",
        method: "GET",
    });
}

export function CanShu(params) {
    return req({
        url: "/categories/" + params.id + "/attributes",
        method: "GET",
        params,
    });
}
export function goodS(data) {
    return req({
        url: "/goods",
        method: "POST",
        data,
    });
}