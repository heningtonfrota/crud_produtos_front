import AuthTemplate from "@/layouts/AuthTemplate.vue";
import DefaultTemplate from "@/layouts/DefaultTemplate.vue";

import AuthPage from "@/pages/auth/AuthPage.vue";
import ProductsPage from "@/pages/admin/product/ProductsPage.vue";
import UsersPage from "@/pages/admin/users/UsersPage.vue";

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
        component: UsersPage,
        name: 'admin.users',
      },
      {
        path: 'products',
        component: ProductsPage,
        name: 'admin.product',
      },
    ]
  }
];
