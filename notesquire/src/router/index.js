import { createRouter, createWebHistory } from 'vue-router'
import Editor from '../views/Editor.vue'
import NoteView from '../views/NoteView.vue'
import NotFound from '../views/404.vue'
import Dashboard from '../views/Dashboard.vue'
import Account from '../views/Account.vue'
import Profile from '../views/Profile.vue'
import EditNote from '../views/EditNote.vue'
import firebase from '@/config/db.js'

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/account',
    name: 'account',
    component: Account,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/new',
    name: 'new',
    component: Editor,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/edit/:id',
    name: 'edit',
    component: EditNote,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/404',
    name: '404',
    component: NotFound,
    meta: {
      forPublic: true
    }
  },
  {
    path: '/@:username',
    name: 'profile',
    component: Profile,
    meta: {
      forPublic: true
    }
  },
  {
    path: '/n/:userName/:noteId',
    name: 'note',
    component: NoteView,
    meta: {
      forPublic: true
    }
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      forPublic: true
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import(/* webpackChunkName: "about" */ '../views/SignUp.vue'),
    meta: {
      forPublic: true
    },
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

//router Guards
router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const forPublic = to.matched.some(record => record.meta.forPublic);
  if (requiresAuth && !currentUser) next('/login');
  else if (forPublic) next();
  else if (!requiresAuth && currentUser && !forPublic) next('/');
  else next();
});
export default router;
