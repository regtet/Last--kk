import req from "./request";

export function getTable(params) {
    return req({ url: "/orders", method: "GET", params }); //不对不对，有区别有区别
}
export function add(data) {
    return req({ url: "/orders", method: "POST", data });
}
export function del(data) {
    // return req({ url: "orders/" + data.id, method: "DELETE", data });
    return req({ url: "orders/" + data.id, method: "DELETE", data });
}
export function updE(data) {
    // return req({ url: "orders/" + data.id, method: "DELETE", data });
    return req({ url: "orders/" + data.id, method: "PUT", data });
}
export function upSta(data) {
    console.log(data);
    return req({
        url: "orders/" + data.id + "/state/" + data.type,
        method: "PUT",
    });
}

export function FindTagID(data) {
    console.log(data);
    return req({
        url: "orders/" + data.id,
        method: "GET",
    });
}
export function FindUID(data) {
    return req({
        url: "orders/" + data.id + "/role",
        method: "PUT",
        data,
    });
}
export function dizhi(data) {
    return req({
        url: `/kuaidi/${1106975712662}`,
        method: "GET",
        data,
    });
}