import Home from './compoents/home.vue'
import Cat from './compoents/cat.vue'
import User from './compoents/user.vue'
import News from './compoents/news.vue'
import omment from './compoents/comment.vue'
export const routes =[
    {path:'/',component:Home},
    {path:'/cat',component:Cat},
    {path:'/news',component:News},
    {path:'/user',component:User},
    {path:'/user/:id',component:omment}
]