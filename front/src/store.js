import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
//进行接口暴露 暴露一个stroe仓库的对象 这个对象是Vuex的Store仓库的实例对象
export const store =new Vuex.Store({
    //state的取值是用this.$store.state.xxx，我们使用 只进行数据设置
    state:{//state是Vuex仓库的一个状态内容
       login:false //我们需要一个login的状态 。以辨别用户是否登入
    },
    //getters是数据执行的地方
    getters:{
        login:state=>{
            return state.login
        }
    },
    //mutations是vuex中唯一执行数据修改的地方
    //mutations只支持同步的数据变化操作，它不支持异步的数据变化操作
    mutations:{
       
        checklogin:(state,payload)=>{
            // console.log(payload);
            state.login=payload
        }
    },
    //所以 我们可以通过actions进行异步的处理，利用actions进行调用mutations的方法来进行数据的修改  程序会先执行actions 在执行mutations
    actions:{
       
        checklogin:({commit},payload)=>{
            commit('checklogin',payload)//commit调用mutations的方法
         }
    }
})