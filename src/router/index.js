import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/auth/Login.vue')
        },
        {
            path: '/',
            name: 'dashboard',
            component: () => import('../views/Dashboard.vue')
        },
        {
            path: '/chapters',
            name: 'chapters',
            component: () => import('../views/chapter/Index.vue')
        },
        {
            path: '/chapters/add',
            name: 'chapters.create',
            component: () => import('../views/chapter/Create.vue')
        },
        {
            path: '/chapters/:id/edit',
            name: 'chapters.edit',
            component: () => import('../views/chapter/Edit.vue')
        },
        {
            path: '/sentences',
            name: 'sentences',
            component: () => import('../views/sentence/Index.vue')
        },
        {
            path: '/sentences/add',
            name: 'sentences.create',
            component: () => import('../views/sentence/Create.vue')
        },
        {
            path: '/sentences/:id/edit',
            name: 'sentences.edit',
            component: () => import('../views/sentence/Edit.vue')
        },
        {
            path: '/words',
            name: 'words',
            component: () => import('../views/word/Index.vue')
        },
        {
            path: '/words/add',
            name: 'words.create',
            component: () => import('../views/word/Create.vue')
        },
        {
            path: '/words/:id/edit',
            name: 'words.edit',
            component: () => import('../views/word/Edit.vue')
        },
        {
            path: '/languages',
            name: 'languages',
            component: () => import('../views/language/Index.vue')
        },
        {
            path: '/admins',
            name: 'admins',
            component: () => import('../views/admin/Index.vue')
        },
        {
            path: '/admin-roles',
            name: 'roles',
            component: () => import('../views/admin-role/Index.vue')
        },
        {
            path: '/countries',
            name: 'countries',
            component: () => import('../views/country/Index.vue')
        },
        {
            path: '/users',
            name: 'users',
            component: () => import('../views/user/Index.vue')
        },
        {
            path: '/users/create',
            name: 'users.create',
            component: () => import('../views/user/Create.vue')
        },
        {
            path: '/users/:id/edit',
            name: 'users.edit',
            component: () => import('../views/user/Edit.vue')
        },
        {
            path: '/pages',
            name: 'pages',
            component: () => import('../views/page/Index.vue')
        },
        {
            path: '/pages/add',
            name: 'pages.create',
            component: () => import('../views/page/Create.vue')
        },
        {
            path: '/pages/:id/edit',
            name: 'pages.edit',
            component: () => import('../views/page/Edit.vue')
        },
        {
            path: '/blogs',
            name: 'blogs',
            component: () => import('../views/blog/Index.vue')
        },
        {
            path: '/blogs/add',
            name: 'blogs.create',
            component: () => import('../views/blog/Create.vue')
        },
        {
            path: '/blogs/:id/edit',
            name: 'blogs.edit',
            component: () => import('../views/blog/Edit.vue')
        },
        {
            path: '/change-password',
            name: 'password.change',
            component: () => import('../views/Password.vue')
        },
    ]
});

router.beforeEach((to, from, next) => {
    if (to.name !== 'login') {
        if (localStorage.getItem('token')) {
            next();
        } else {
            next({ name: 'login' });
        }
    } else {
        if (localStorage.getItem('token')) {
            next({ name: 'dashboard' });
        } else {
            next();
        }
    }
});

export default router;