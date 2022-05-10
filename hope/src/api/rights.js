import req from "./request";
export function roles(data) {
    return req({ url: "/roles", method: "GET", data });
}
export function Add(data) {
    return req({ url: "/roles", method: "POST", data });
}
export function UpdA(data) {
    return req({ url: "/roles/" + data.id, method: "PUT", data });
}
export function Dell(data) {
    return req({ url: "/roles/" + data.id, method: "DELETE", data });
}
export function GetList(data) {
    return req({ url: "/rights/" + "tree", method: "GET", data });
}
export function GetTree(data) {
    return req({ url: "/rights/" + "list", method: "GET", data });
}
export function SetDa(data) {
    return req({ url: `roles/${data.id}/rights`, method: "POST", data });
}
export function closes(data) {
    return req({
        url: `roles/${data.ee}/rights/${data.e}`,
        method: "DELETE",
        data,
    });
}