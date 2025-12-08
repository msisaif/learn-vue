export default [
    {
        path: 'blog',
        component: () => import('@/views/AdminBlogListView.vue'),
    },
    {
        path: 'blog/create',
        component: () => import('@/views/AdminBlogCreateView.vue'),
    },
    {
        path: 'blog/edit/:id',
        component: () => import('@/views/AdminBlogEditView.vue'),
    }
];
