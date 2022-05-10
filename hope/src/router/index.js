import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
Vue.use(VueRouter);

const routes = [{
        path: "/",
    },
    {
        path: "/about",
        name: "about",
        component: () =>
            import ("../views/AboutView.vue"),
    },
    {
        path: "/login",
        meta: {
            flag: true,
        },
        component: () =>
            import ("../views/Login"),
    },
    {
        path: "/home",
        name: "home",
        children: [{
                path: "/users",
                component: () =>
                    import ("../views/users"),
            },
            {
                path: "/roles",
                component: () =>
                    import ("../views/rights/roles.vue"),
            },
            {
                path: "/rights",
                component: () =>
                    import ("../views/rights"),
            },

            {
                path: "/goods",
                component: () =>
                    import ("../views/goods"),
            },
            {
                path: "/music",
                component: () =>
                    import ("../views/music"),
            },
            {
                path: "/params",
                component: () =>
                    import ("../views/goods/params.vue"),
            },
            {
                path: "/add",
                component: () =>
                    import ("../views/goods/add.vue"),
            },
            {
                path: "/categories",
                component: () =>
                    import ("../views/goods/categories.vue"),
            },
            {
                path: "/orders",
                component: () =>
                    import ("../views/orders"),
            },
            {
                path: "/reports",
                component: () =>
                    import ("../views/reports"),
            },
        ],
        component: () =>
            import ("../views/HomeView.vue"),
    },
];

const router = new VueRouter({
    routes,
});
router.beforeEach((to, from, next) => {
    let flag = to.meta.flag;
    console.log(router);
    if (flag) {
        next();
    } else {
        if (sessionStorage.getItem("token")) {
            next();
        } else {
            next("/login");
        }
    }
});
export default router;