import AuthTemplate from "@/layouts/AuthTemplate.vue";
import DefaultTemplate from "@/layouts/DefaultTemplate.vue";
import AuthPage from "@/pages/auth/AuthPage.vue";
import HomeAdmin from "@/pages/admin/HomeAdmin.vue";
import ListUsers from "@/pages/admin/users/ListUsers.vue";

export default [
    {
        path: '/',
        component: AuthTemplate,
        children: [
            {
                path: '/',
                component: AuthPage,
                name: 'auth'
            }
        ]
    },
    {
        path: '/admin',
        component: DefaultTemplate,
        children: [
            {
                path: 'users',
                component: ListUsers,
                name: 'admin.users',
            },
            {
                path: '',
                component: HomeAdmin,
                name: 'admin.home',
            },
        ]
    }
];
