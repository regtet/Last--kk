import req from "./request";
export function categories(params) {
    return req({ url: "/categories", method: "GET", params });
}
export function cateAdd(data) {
    return req({ url: "/categories", method: "POST", data });
}
export function cateSSS(data) {
    return req({ url: "/categories/" + data.id, method: "PUT", data });
}
export function DEL(params) {
    return req({
        url: "/categories/" + params.id + "/" + "attributes",
        method: "DELETE",
        params,
    });
}
export function DDA(data) {
    return req({
        url: "/categories/" + data.id + "/" + "attributes",
        method: "POST",
        data,
    });
}