import api from "./request";
export function GetGoods(params) {
  // 登录
  return api({
    url: 'goods',
    method: 'GET',
    params
  })
}
export function GetCategories(params) {
  // 获取
  return api({
    url: 'categories',
    method: 'GET',
    params
  })
}
export function AddCategories(data) {
  // 添加分类
  return api({
    url: 'categories',
    method: 'POST',
    data
  })
}
export function SetCategories(data) {
  // 编辑分类
  return api({
    url: 'categories/' + data.id,
    method: 'PUT',
    data
  })
}
export function DelCategories(id) {
  // 删除分类
  return api({
    url: 'categories/' + id,
    method: 'DELETE'
  })
}
export function StateCategories(params) {
  // 参数列表
  return api({
    url: 'categories/' + params.id + '/attributes',
    method: 'GET',
    params
  })
}
export function AddStateCategories(data) {
  // 参数列表
  return api({
    url: 'categories/' + data.id + '/attributes',
    method: 'POST',
    data
  })
}
export function UpdateStateCategories(data) {
  // 编辑属性
  return api({
    url: 'categories/' + data.cid + '/attributes/' + data.id,
    method: 'PUT',
    data
  })
}
export function DelStateCategories(data) {
  // 删除属性
  console.log(data)
  return api({
    url: 'categories/' + data.cid + '/attributes/' + data.id,
    method: 'DELETE'
  })
}
export function AddsCategories(data) {
  // 添加商品
  return api({
    url: 'goods/',
    method: 'POST',
    data
  })
}
export function UpSetCategories(data) {
  // 修改商品
  return api({
    url: 'goods/' + data.goods_id * 1,
    method: 'PUT',
    data
  })
}
export function DelState(data) {
  // 删除商品
  return api({
    url: 'goods/' + data,
    method: 'DELETE'
  })
}
export function Search(data) {
  // 搜索商品
  return api({
    url: 'goods/' + data.id,
    method: 'GET'
  })
}