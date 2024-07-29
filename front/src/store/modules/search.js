import host from '../../config'
import axios from 'axios'

export default {

    state: {
        search: []
    },

    mutations: {
        updateSearch(state, search) {
            state.search = search
        }
    },

    actions: {
        async fetchSearch(context, sea) {
            const search = await axios.get(`${host}/search`, {
                params: {
                    search: sea.search
                }
            })
            if(search == undefined) {} else {
                let data = []
            
                for (let index = 0; index < search.data.length; index++) {
                    const element = search.data[index].avail;
                    const image = search.data[index].image;
                    if(element == 0 || image.indexOf("default.png") >= 0) {
                        data.push(search.data[index])
                    } else if(element >= 1) {
                        data.unshift(search.data[index])
                    }
                }
                context.commit('updateSearch', data)
            }
        },
    },

    getters: {
        allSearch(state) {
            return state.search
        }
    }
}