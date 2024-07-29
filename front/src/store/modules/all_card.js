import host from '../../config'
import axios from 'axios'

export default {

    state: {
        card: [],
        cardInfo: [],
    },

    mutations: {
        updateCard(state, card) {
            state.card = card
        },
        updateCardInfo(state, cardInfo) {
            state.cardInfo = cardInfo
        }
    },

    actions: {
        async fetchCard(context, categories) {
            const res = await axios.get(`${host}/all_product`, {
                params: {
                    categories: categories.categories,
                    id: categories.id
                }
            })
           
            let dataCard = {
                "image": res.data.image,
                "name": res.data.name,
                "article": res.data.article,
                "price": res.data.price,
                "categories_id": res.data.categories_id,
                "id": res.data.id,
                "avail": res.data.avail,
                "shop": res.data.shop,
            }

            let dataInfo = {
                "gabar": res.data.gabar,
                "cartriter": res.data.cartriter,
                "function": res.data.function,
                "complect": res.data.complect,
            }

            context.commit('updateCard', dataCard)
            context.commit('updateCardInfo', dataInfo)
        },
    },

    getters: {
        Card(state) {
            return state.card
        },
        CardInfo(state) {
            return state.cardInfo
        }
    }
}