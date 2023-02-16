import { createRouter, createWebHistory } from "vue-router";
import Home from '@/components/Home.vue'
import ContactUs from '@/components/ContactUs.vue'
import SignIn from '@/components/user/SignIn.vue'
import SignUp from '@/components/user/SignUp.vue'
import currency from '@/components/currency/Currency.vue'
import NewsDescription from '@/components/NewsDescription.vue'
import WeatherApp from '@/components/WeatherApp/WeatherApp.vue'
import Notfount from '@/views/PageNotFount.vue'

function lazyLoad(view) {   
  return () => import(`@/components/${view}.vue`);
}
const routes =[
    // { path: "/", name: "Home", component: Home },
    { path: "/", name: "Home", component: lazyLoad("Home") },
    
    { path: "/SignIn", name: "SignIn", component: SignIn },
    { path: "/SignUp", name: "SignUp", component: SignUp },
    { path: "/NewsDescription/:id", name: "NewsDescription", component: NewsDescription },
    { path: "/currency", name: "currency", component: currency },
    { path: "/weatherapp", name: "weatherapp", component: WeatherApp },
    { path: "/ContactUs", name: "ContactUs", component: ContactUs },
    { path: "/:pathMatch(.*)", name: "Notfount", component:Notfount },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    scrollBehavior(to, from, savedPosition) {
      // always scroll to top
      return { top: 0 };
    },
  });
  
  export default router;