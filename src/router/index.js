import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/home', component: () => import('@/views/home/index'),hidden:true},
  { path: '/users/auth', component: () => import('@/views/users/LoginUser'),hidden:true},
  { path: '/users/add', component: () => import('@/views/users/CreateUser'),hidden:true},
  { path: '/users', component: Layout, hidden:true, children: [{path: ':id', name: 'User Edit', component: () => import('@/views/users/EditUser')}]},
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },


  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    },
    {
      path: '/result/:text',
      name: 'result',
      component: () => import('@/views/dashboard/result'),
      hidden: true
    },
    ]
  },
  {
    path: '/materials',
    component: Layout,
    redirect: '/materials/list',
    name: 'Material',
    meta: {title: 'Materials', icon: 'materials'},
    children: [
      {
        path: 'add',
        name: 'AddMaterial',
        component: () => import('@/views/materials/CreateMaterial'),
        meta: { title: 'Add',icon:'add'}
      },
      {
        path: 'list',
        name: 'ListMaterial',
        component: () => import('@/views/materials/ListMaterial'),
        meta: { title: 'All', icon:'list'}
      },
      {
        path: 'edit/:id',
        name: 'Edit',
        component: () => import('@/views/materials/EditMaterial'),
        hidden: true
      },
      {
        path: 'show/:id',
        name: 'Show',
        component: () => import('@/views/materials/ShowMaterial'),
        hidden: true
      },
    ]
    
  },

  
  
  {
    path: '/books',
    component: Layout,
    redirect: '/books/add',
    name: 'Books',
    meta: { title: 'Books', icon: 'el-icon-edit' },
    children: [
      {
        path: 'add',
        name: 'Add',
        component: () => import('@/views/books/CreateBook'),
        meta: { title: 'Add', icon: 'el-icon-edit' }
      },
      {
        path: 'list',
        name: 'Listar',
        component: () => import('@/views/books/ListBook'),
        meta: { 
          title: 'List',
          icon: 'List' 
        }
      },
      {
        path: 'edit/:id',
        name: 'Edit',
        component: () => import('@/views/books/EditBook'),
        hidden: true
      },
    ]
  },

  {
    path: '/reserve',
    component: Layout,
    redirect: '/reserve/list',
    name: 'Reserve',
    meta: { title: 'Reserve', icon: 'el-icon-edit' },
    children: [
      {
        path: 'list',
        name: 'Listar Reservas',
        component: () => import('@/views/reserve/ListReservations'),
        meta: { 
          title: 'Reservations',
          icon: 'List Reservations' 
        }
      },
    ]
  },
 
  {
    path: '/fines',
    component: Layout,
    redirect: '/fines/list',
    name: 'Fines',
    meta: { title: 'Fines', icon: 'el-icon-edit' },
    children: [
      {
        path: 'list',
        name: 'List Fines',
        component: () => import('@/views/fines/ListFines'),
        meta: { 
          title: 'Fines',
          icon: 'List Fines' 
        }
      },
    ]
  },

  {
    path: '/loans',
    component: Layout,
    redirect: '/loans/list',
    name: 'Loans',
    meta: { title: 'Loans', icon: 'el-icon-edit' },
    children: [
      {
        path: 'list',
        name: 'Listing',
        component: () => import('@/views/loans/ListLoan'),
        meta: { 
          title: 'Loans',
          icon: 'List Loan' 
        },
        hidden: false
      },
      {
        path: 'create/:bookId',
        name: 'Create',
        component: () => import('@/views/loans/NewLoan'),
        hidden: true
      },
    ]
  }, 

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
