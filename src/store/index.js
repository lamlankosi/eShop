import { createStore } from 'vuex'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
// import { applyToken } from 'service/AuthenticateUser.js'
// import { useCookies } from 'vue3-cookies'
import axios from 'axios'

// const {cookies } = useCookies()
const apiURL = 'https://eshop-k701.onrender.com/'
export default createStore({
  state: {
    users: null,
    user: null,
    products: null,
    recentProducts: null,  
    product: null,
  },
  getters: {
  },
  mutations: {
    setUsers(state, value) {
      state.users = value
    },
    setUser(state, value) {
      state.user = value
    },
    setProducts(state, value) {
      state.products = value
    },
    setRecentProducts(state, value) {
      state.recentProducts = value
    },
    setProduct(state, value) {
      state.product = value
    },
  },
  actions: {
    async fetchProducts(context) {
      try{
        const {result, msg} = await (await axios.get(`${apiURL}product`)).data
        if (result) {
          context.commit('setProducts', result)
        } else {
          toast.error(`${msg}`, {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER
          })
        }
      } catch(e) {
        toast.error(`${e.message}`,{
          autoClose: 2000
        })
      }
    },
    async recentProducts(context){
      try{
        const {result, msg } = await (await axios.get(`${apiURL}product/recent`)).data
                  // //second option
        // const res = await axios.get(`${apiURL}products/recent`)
        // const {result, msg} = await res.data
        if(result) {
          context.commit('setRecentProducts', result)
        } else {
          toast.error(`${msg}`, {
            autoClose:2000,
            position: toast.POSITION.TOP_CENTER
          })
        }
      } catch(e) {
        toast.error(`${e.message}`,{
            autoClose: 2000,
            position: toast.POSITION.TOP_CENTER
          })
      }
    },
    async fetchProduct(context, id) {
      try{
        const {result, msg } = await (await axios.get(`${apiURL}product/${id}`)).data
        if(result) {
          context.toast.commit('setProduct', result)
        } else {
          toast.error(`${msg}`, {
            autoClose:2000,
            position: toast.POSITION.TOP_CENTER
          })
        }
      } catch(e){
      
      }
    }
    // async addAProduct(context, payload){
    //   try{
    //     const {msg} = await (await axios.get(`${apiURL}/add`, payload)).data
    //     if(msg){
    //       toast.success(`$l
    //         `)
    //     }
    //   } catch (e) {
        
    //   }
    // }
  },
  modules: {
  }
})
