import  Vue from "vue"
import  VueRouter from 'vue-router'
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)

//首页
import  index from '../components/index'
//写文字
import book from  '../components/book.vue'


var router=new VueRouter({
    routes:[
        {
            path:"",
            redirect:"/index/blog"
        },
        {
            path: "/index",
            component:index,
            children:[
                {
                    path:"/index/blog",
                    component:()=>import("../components/body/blog.vue")
                },

                {
                    path:"/index/updateUser",
                    component:()=>import("../components/body/user/updateUser.vue")

                },
                {
                    path: "/index/user",
                    component:()=>import("../components/body/user.vue"),
                    children:[
                        {
                            path:"/index/user/collect",
                            component:()=>import('../components/body/user/collect.vue')
                        },
                        {
                            path: "/index/user/dongtai",
                            component: () => import('../components/body/user/dongtai.vue')
                        },
                        {
                            path: "/index/user/depo",
                            component: () => import('../components/body/user/depo.vue')
                        }
                    ]
                },
                {
                    path:"/index/book/:id",
                    component:()=>import('../components/body/showBook.vue')
                },
                {
                    path:"/index/putBook/:id",
                    component:()=>import("../components/putBook.vue")
                }
            ]
        },
        {
            path:'/book',
            component:book
        },

    ],
    mode:"history"
})
export default router