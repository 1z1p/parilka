import host from '../../config'
import axios from 'axios'

export default {

    state: {
        data_filter: []
    },

    mutations: {
        updateDataFilter(state, data_filter) {
            state.data_filter = data_filter
        }
    },

    actions: {
    },

    getters: {
        paramsFilter(state) {
            return state.data_filter
        }
    }
}