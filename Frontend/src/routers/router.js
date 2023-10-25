import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import Homepage from '../pages/Homepage.vue'
import Formpage from '../pages/Formpage.vue'
import WelcomePage from '../pages/WelcomePage.vue'
import Registerpage from '../pages/Registerpage.vue'
import Loginpage from '../pages/Loginpage.vue'
import Approvalpage from '../pages/Approvalpage.vue'
import Reservationpage from '../pages/Reservationpage.vue'
import Reservationform from '../pages/Reservationform.vue'
import { useCounterStore } from '../stores/counter'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/welcome',
      name: 'welcome',
      component: WelcomePage
    },
    {
      path: '/',
      name: 'home',
      component: Homepage
    },
    {
      path: '/form',
      name: 'form',
      component: Formpage
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: Formpage
    },
    {
      path: '/register',
      name: 'register',
      component: Registerpage
    },
    {
      path: '/login',
      name: 'login',
      component: Loginpage
    },
    {
      path: '/Reservation',
      name: 'Reservation',
      component: Reservationpage
    },
    {
      path: '/formReservation',
      name: 'formReservation',
      component: Reservationform
    },
    {
      path: '/editReservation/:id',
      name: 'editReservation',
      component: Reservationform
    },
    {
      path: '/approval',
      name: 'approval',
      component: Approvalpage
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const counterStore = useCounterStore();
  const isLogin = counterStore.isLogin;
  const isAdmin = counterStore.isAdmin;
  if (
    !isLogin &&
    (to.name !== 'login' && to.name !== 'register' && to.name !== 'welcome')
  ) {
    return next({ name: 'login' })
  }

  if (
    isLogin &&
    (to.name == 'login' || to.name == 'register' || to.name == 'welcome')
  ) {
    return next(router.go(-1))
  }

  if (!isAdmin) {
    if (to.name === 'approval') {
      return next(router.go(-1));
    }
  }

  next()
})

export default router
