import { createRouter, createWebHistory } from 'vue-router';
import store from "../store/index";

const routes = [
  {
    path: '/login',
    name: 'login',
    props: true,
    meta:{
      layout: 'visitorLayout',
      title: 'Login',
      fullScreen: true,
      requiresAuth: false
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/visitors/Login.vue')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    props: true,
    meta:{
      layout: 'mainLayout',
      requiresAuth: true,
      title: 'Dashboard',
      fullScreen: true
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/authorized/Dashboard.vue')
  },
  {
    path: '/client-control',
    name: 'client-control',
    props: true,
    meta:{
      layout: 'mainLayout',
      requiresAuth: true,
      title: 'client-control',
      isMasterTrue: false,
      fullScreen: true
    },
    component: () => import('../views/authorized/client-control/ClientControl.vue'),
    children: [
      {
        path: 'create-client',
        name: 'client-control-create-client',
        requiresAuth: true,
        component: () => import('../views/authorized/client-control/Account.vue'),
      },
      {
        path: 'edit-client',
        name: 'client-control-edit-client',
        requiresAuth: true,
        component: () => import('../views/authorized/client-control/Edit.vue'),
      },
      {
        path: 'list',
        name: 'client-control-list',
        component: () => import('../views/authorized/client-control/mainList.vue'),
        children: [
          {
            path: '',
            name: 'list-page',
            component: () => import('../views/authorized/client-control/List.vue'),
          },
          {
            path: 'detail',
            name: 'client-control-list-detail',
            component: () => import('../views/authorized/client-control/ClientDetail.vue'),
          },
          {
            path: 'add-user',
            name: 'client-control-add-user',
            component: () => import('../views/authorized/client-control/user/AddUser.vue'),
          },
          {
            path: 'edit-user',
            name: 'client-control-edit-user',
            component: () => import('../views/authorized/client-control/user/EditUser.vue'),
          },
          {
            path: 'view-user',
            name: 'client-control-view-user',
            requiresAuth: true,
            component: () => import('../views/authorized/client-control/user/ViewUser.vue'),
          }
        ]
      },
    ]
  },
  {
    path: '/credit-control',
    name: 'credit-control',
    props: true,
    meta:{
      layout: 'mainLayout',
      requiresAuth: true,
      isMasterTrue: false,
      title: 'credit-control',
      fullScreen: true
    },
    component: () => import('../views/authorized/credit-control/CreditControl.vue'),
    children: [
        {
          path: 'credits',
          name: 'credit-control-list',
          component: () => import('../views/authorized/client-control/mainList.vue'),
          children: [
            {
              path: '',
              name: 'credit-list-page',
              component: () => import('../views/authorized/credit-control/List.vue'),
            }
          ]
        },
    ]
  },
  {
    path: '/support',
    name: 'support-control',
    props: true,
    meta:{
      layout: 'mainLayout',
      requiresAuth: true,
      isMasterTrue: false,
      title: 'support-control',
      fullScreen: true
    },
    component: () => import('../views/authorized/support-control/SupportControl.vue'),
    children: [
      {
        path: '',
        name: 'support-control-list',
        component: () => import('../views/authorized/support-control/List.vue'),
      },
      {
        path: ':id/conversation',
        name: 'ticket-conversation',
        component: () => import('../views/authorized/support-control/Conversation.vue'),
      },
    ]
  },
  {
    path: '/financial',
    name: 'financial-control',
    props: true,
    meta:{
      layout: 'mainLayout',
      requiresAuth: true,
      title: 'financial-control',
      fullScreen: true
    },
    component: () => import('../views/authorized/financial-control/FinancialControl.vue'),
    children: [
      {
        path: '',
        name: 'view-deductions',
        // layout: 'mainLayout',
        component: () => import('../views/authorized/financial-control/deductions/listing.vue'),
        requiresAuth: true,
      },
      {
        path: 'create-deduction',
        name: 'create-deduction',
        // layout: 'mainLayout',
        component: () => import('../views/authorized/financial-control/deductions/DistributorAdd.vue'),
        requiresAuth: true,
      },
    ]
  },
  {
    path: '/distributor',
    name: 'distributor-control',
    props: true,
    meta:{
      layout: 'mainLayout',
      requiresAuth: true,
      isMasterTrue: true,
      title: 'distributor-control',
      fullScreen: true
    },
    component: () => import('../views/authorized/distributor-control/DistributorControl.vue'),
    children: [
      {
        path: 'list',
        name: 'distributor-control-list',
        component: () => import('../views/authorized/distributor-control/DistributorList.vue'),
        children: [
          {
            path: '',
            name: 'distributors-list',
            component: () => import('../views/authorized/distributor-control/List.vue'),
          },
          {
            path: 'detail',
            name: 'distributor-control-list-detail',
            component: () => import('../views/authorized/distributor-control/DistributorDetail.vue'),
          },
          {
            path: 'edit',
            name: 'distributor-control-list-edit',
            component: () => import('../views/authorized/distributor-control/EditDistributor.vue'),
          },
        ]
      }
    ]
  },
  {
    // path: "*",
    path: "/:catchAll(.*)",
    name: "notFound",
    redirect: '/login',
    meta: {
      requiresAuth: false
    }
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

/* Default title tag */
const defaultDocumentTitle = 'Psytech Distributor panel'
router.afterEach(to => {
    /* Set document title from route meta */
    if (to.meta && to.meta.title) {
      document.title = `${to.meta.title} — ${defaultDocumentTitle}`
    } else {
      document.title = defaultDocumentTitle
    }
  })

// Meta Handling
router.beforeEach((to, from, next) => {
  const USER_DATA = JSON.parse(localStorage.getItem('userData'))
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!USER_DATA?.authToken) {
      next({
        path: '/login',
      })
      return
    } else {
      if(to.meta.isMasterTrue && USER_DATA?.isMasterPanelUser){
        return next()
      } else if(!to.meta.isMasterTrue && !USER_DATA?.isMasterPanelUser){
          next()
      } else{
       if(to.name != 'dashboard'){
         return next({
           path: '/dashboard',
         })
       }else{
         next()
       }
      }
    }
  } else {
    if (USER_DATA?.authToken) {
      return next({
        path: '/dashboard',
      })
    } else {
      next()
    }
  }
})

export default router
