import req from "./request";
export function login(data) {
    return req({ url: "/login", method: "POST", data });
}
export function getData(data) {
    return req({ url: "/menus", method: "GET" });
}
export function getTable(params) {
    return req({ url: "/users", method: "GET", params }); //不对不对，有区别有区别
}
export function add(data) {
    return req({ url: "/users", method: "POST", data });
}
export function del(data) {
    // return req({ url: "users/" + data.id, method: "DELETE", data });
    return req({ url: "users/" + data.id, method: "DELETE", data });
}
export function updE(data) {
    // return req({ url: "users/" + data.id, method: "DELETE", data });
    return req({ url: "users/" + data.id, method: "PUT", data });
}
export function upSta(data) {
    console.log(data);
    return req({
        url: "users/" + data.id + "/state/" + data.type,
        method: "PUT",
    });
}

export function FindTagID(data) {
    console.log(data);
    return req({
        url: "users/" + data.id,
        method: "GET",
    });
}
export function FindUID(data) {
    return req({
        url: "users/" + data.id + "/role",
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
export function GETr() {
    return req({
        url: "roles",
        method: "GET",
    });
}