export default {
  routes: [
    {
      path: '/',
      component: '@/layouts/BasicLayout',
      // component: '@/layouts/TestB',
      routes: [
        { path: '/option', component: '@/pages/Brand/index' },
        { path: '/option2', component: '@/pages/Brand/components/option2' },
        {
          path: '/commodityattributes',
          component: '@/pages/commodityattributes/index',
        },
        {
          path: '/industryclassification',
          component: '@/pages/industryclassification/index',
        },
        { path: '/commodityEntry', component: '@/pages/commodityEntry/index' },
        { path: '/addCommodity', component: '@/pages/addcommodity/index' },
      ],
    },
  ],
};
