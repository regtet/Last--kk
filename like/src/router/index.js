import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    redirect: 'home'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    children: [
      {
        path: '/users',
        name: 'users',
        meta: {
          name: '用户列表'
        },
        component: () => import('../views/users')
      },
      {
        path: '/stimulate',
        name: 'stimulate',
        component: () => import('../views/stimulate.vue')
      },
      {
        path: '/roles',
        name: 'roles',
        meta: {
          name: '角色列表'
        },
        component: () => import('../views/rights/roles.vue')
      },
      {
        path: '/rights',
        name: 'rights',
        meta: {
          name: '权限列表'
        },
        component: () => import('../views/rights')
      },
      {
        path: '/reports',
        name: 'reports',
        meta: {
          name: '数据报表'
        },
        component: () => import('../views/reports')
      },
      {
        path: '/orders',
        name: 'orders',
        meta: {
          name: '数据报表'
        },
        component: () => import('../views/orders')
      },
      {
        path: '/categories',
        name: 'categories',
        meta: {
          name: '商品分类'
        },
        component: () => import('../views/goods/categories')
      },
      {
        path: '/params',
        name: 'params',
        meta: {
          name: '分类参数'
        },
        component: () => import('../views/goods/params')
      },
      {
        path: '/add',
        name: 'add',
        meta: {
          name: '添加商品'
        },
        component: () => import('../views/goods/add')
      },
      {
        path: '/goods',
        name: 'goods',
        meta: {
          name: '商品列表'
        },
        component: () => import('../views/goods')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login/IndexView.vue')
  }
]
const router = new VueRouter({
    routes,
});
router.beforeEach((to, form, next) => {
    if (sessionStorage.getItem("touken")) {
        next();
    } else {
        if (to.name === 'Login') {
          next()
        } else {
          next('Login')
        }
    }
});
export default router;