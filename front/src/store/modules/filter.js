import host from '../../config'
import axios from 'axios'

export default {

    state: {
        filter: []
    },

    mutations: {
        updateFilter(state, filter) {
            state.filter = filter
        }
    },

    actions: {
        async fetchFilter(context, categories) {
            const filter = await axios.get(`${host}/filter`, {
                params: {
                    categories: categories.categories
                }
            })
            context.commit('updateFilter', filter.data)
        },
    },

    getters: {
        allFilter(state) {
            return state.filter
        }
    }
}