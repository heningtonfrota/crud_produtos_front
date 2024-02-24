import AuthTemplate from "@/layouts/AuthTemplate.vue";
import DefaultTemplate from "@/layouts/DefaultTemplate.vue";
import HomeAdmin from "@/pages/admin/HomeAdmin.vue";
import AuthPage from "@/pages/auth/AuthPage.vue";

export default [
    {
        path: '/',
        component: AuthTemplate,
        children: [
            {
                path: '',
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
                path: '',
                component: HomeAdmin,
                name: 'admin.home',
            }
        ]
    }
];
