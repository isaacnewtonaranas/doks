const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Home.vue') },
      { path: 'home', name: 'home', component: () => import('pages/Home.vue') },
      {
        path: 'analytics',
        name: 'analytics',
        component: () => import('pages/Analytics.vue'),
      },
      {
        path: 'settings',
        name: 'settings',
        component: () => import('pages/Settings.vue'),
      },
      { path: 'doks', component: () => import('pages/Doks.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue'),
  },
]

export default routes
