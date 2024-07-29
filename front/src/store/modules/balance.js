import host from '../../config'
import axios from 'axios'

export default {

    state: {
        product: [],
        balance: 0,
        id: [],
        status: false,
        mapNumber: 1,
        numShop: []
    },

    mutations: {
        updateProduct(state, product) {
            state.product = product
        },

        updateBalance(state, balance) {
            state.balance = balance
        },

        updateId(state, id) {
            state.id = id
        },

        updateStatus(state, status) {
            state.status = status.status
        },

        updateMap(state, params) {
            state.mapNumber = params
        },

        updateDeleteProduct(state, params) {
            let ff = state.product

            for (let index = 0; index < state.id.length; index++) {
                const element = state.id[index];
                if(element == `${params[2]}_${params[1]}`) {
                    state.product = ff
                    state.balance -= params[0]
                    localStorage.removeItem(`${params[2]}_${params[1]}`)
                    // console.log(state.id)
                    this.dispatch("fetchBalance");
                }
            }

            if(state.product.length == 0) {
                state.status = false
            }
        },

        updateCartClear(state) {
            // localStorage.clear()
            state.product = []
            state.balance = 0
            state.status = false
            // localStorage.setItem("order", `{"code": ${},"product": ${},"price": ${}}`)
        }
    },

    actions: {
        async fetchBalance(context) {
            let balance = 0
            let product = []
            let id = []

            for (let index = 0; index < localStorage.length; index++) {
                let element = localStorage.getItem(localStorage.key(index)) 
                try {
                    if(JSON.parse(element).categories == undefined) {} else {
                        const result = await axios.get(`${host}/cart_product`,{
                            params: {
                                id: JSON.parse(element).id,
                                categories: JSON.parse(element).categories,
                            }
                        })
                        result.data[0].num = JSON.parse(element).num
        
                        product.push(result.data[0])
                        balance += Number(result.data[0].price * result.data[0].num)
                        id.push(localStorage.key(index))
                    }
                } catch (error) {
                    
                }     
            }
            context.commit('updateProduct', product)
            context.commit('updateId', id)
            context.commit('updateBalance', balance)
        },
    },

    getters: {
        Product(state) {
            return state.product
        },

        Balance(state) {
            return state.balance
        },

        Status(state) {
            return state.status
        },

        Maps(state) {
            return state.mapNumber
        },

        numShop(state) {
            return state.numShop
        }
    }
}