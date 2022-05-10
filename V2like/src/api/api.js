import api from './request'
export function LoginApi(data) {
  // 登录
  return api({
    url: 'login',
    method: 'POST',
    data
  })
}
export function GetMenus() {
  // 左侧菜单权限
  return api({
    url: 'menus',
    method: 'GET'
  })
}
export function GetList(params) {
  // 用户列表
  return api({
    url: 'users',
    method: 'GET',
    params
  })
}
export function AddUsers(data) {
  // 添加用户
  return api({
    url: 'users',
    method: 'POST',
    data
  })
}
export function UpArr(data) {
  // 编辑用户
  return api({
    url: 'users/' + data.id,
    method: 'PUT',
    data
  })
}
export function Del(data) {
  // 删除用户
  return api({
    url: 'users/' + data.id,
    method: 'DELETE'
  })
}
export function Search(data) {
  // 搜索用户
  return api({
    url: 'users/' + data.id,
    method: 'GET'
  })
}
export function State(data) {
  // 修改用户状态
  return api({
    url: 'users/' + data.id + '/state/' + data.type,
    method: 'PUT'
  })
}
export function SetUser(data) {
  // 分配用户角色
  return api({
    url: 'users/' + data.id + '/role/',
    method: 'PUT',
    data
  })
}
export function Rights(data) {
  // 所有权限列表
  return api({
    url: 'rights/' + data.type,
    method: 'GET'
  })
}
export function Roles() {
  // 所有角色列表
  return api({
    url: 'roles/',
    method: 'GET'
  })
}
export function AddRoles(data) {
  // 添加角色
  return api({
    url: 'roles/',
    method: 'POST',
    data
  })
}
export function UpdateList(data) {
  // 编辑角色
  return api({
    url: 'roles/' + data.id,
    method: 'PUT',
    data
  })
}
export function DelList(data) {
  // 删除角色
  return api({
    url: 'roles/' + data.id,
    method: 'DELETE'
  })
}
export function SetRoles(data) {
  // 设置角色权限
  return api({
    url: 'roles/' + data.id + '/rights',
    method: 'POST',
    data
  })
}
export function DelRoles(data) {
  // 删除指定权限
  return api({
    url: 'roles/' + data.roleId + '/rights/' + data.rightId,
    method: 'DELETE'
  })
}
export function Reports(data) {
  // 数据报表
  return api({
    url: 'reports/type/1',
    method: 'GET'
  })
}
