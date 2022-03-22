import Vue from 'vue'
import VueRouter from 'vue-router'
import PublicRoutes from './public'
import RouteRoutes from './routes'

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  mode: '',
  // scrollBehavior: () => ({ y: 0 }),
  routes: RouteRoutes.concat(PublicRoutes)
})

export default router
