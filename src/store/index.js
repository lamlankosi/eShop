import { createStore } from 'vuex'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
// import { applyToken } from 'service/AuthenticateUser.js'
// import { useCookies } from 'vue3-cookies'
import axios from 'axios'

// const {cookies } = useCookies()
const apiURL = 'http://localhost:3001/'
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
    async recentProducts(context){
      try{
        const {results, msg } = await (await axios.get(`${apiURL}product/recent`)).data
                  // //second option
        // const res = await axios.get(`${apiURL}products/recent`)
        // const {results, msg} = await res.data
        if(results) {
          context.commit('setRecentProducts', results)
        } else {
          toast.error(`${msg}`, {
            autoClose:200
          })
        }
      } catch(e) {
        toast.error(`${e.message}`,{
            autoClose: 2000
          })
      }
    }
  },
  modules: {
  }
})
