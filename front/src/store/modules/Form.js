import host from '../../config'
import axios from 'axios'
import router from '@/router/index'

export default {

    state: {
        code: [],
    },

    mutations: {
        updateStatus(state, status) {
            state.status = status
        }
    },

    actions: {
        async fetchForm(context, params) {
            try {
                const res = await axios.get(`${host}/orders`, {
                    params: {
                        firstname: params.firstname,
                        lastname: params.lastname,
                        email: params.email,
                        phone: params.phone,
                        telegram: params.telegram,
                        comment: params.comment,
                        shop: params.map,
                        product: params.product,
                        price: params.balance,
                        pay: "Самовывоз",
                    }
                })

                if(!res.data[0].code_order) {
                    router.push("/")
                    alert("Ошибка оформления заказа!")
                    alert("Попробуйте еще раз!")
                }

                const bot = await axios.get(`${host}/bot`, {
                    params: {
                        chatid: params.chatid,
                        code: res.data[0].code_order,
                        product: params.product,
                        price: params.balance,

                        firstname: params.firstname,
                        lastname: params.lastname,
                        email: params.email,
                        phone: params.phone,
                        telegram: params.telegram,
                        comment: params.comment,
                    }
                })
                context.commit('updateStatus', res.data[0])
            } catch (error) {
                context.commit('updateStatus', res.data[0])
            }
        },
    },

    getters: {
        Form(state) {
            return state.status
        }
    }
}