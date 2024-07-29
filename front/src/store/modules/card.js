import host from '../../config'
import axios from 'axios'

export default {

    state: {
        catalog: [],
        card: [],
        page: 1
    },

    mutations: {
        updateCatalog(state, catalog) {
            state.catalog = catalog
        },
        updateCard(state, card) {
            state.card = card
        },
        updatePage(state, page) {
            state.page = page
        }
    },

    actions: {

        async fetchCatalog(context, categories) {
            context.commit('updatePage', 1)
            const catalog = await axios.get(`${host}/categories`, {
                params: {
                    categories: categories.categories
                }
            })
            context.commit('updateCatalog', catalog.data[0])

            const item = await axios.get(`${host}/categories_product`, {
                params: {
                    categories: categories.categories
                }
            })

            let currentIndex = item.data.length,  randomIndex;
            while (currentIndex != 0) {
              randomIndex = Math.floor(Math.random() * currentIndex);
              currentIndex--;
              [item.data[currentIndex], item.data[randomIndex]] = [
                item.data[randomIndex], item.data[currentIndex]];
            }

            let data = []
            
            for (let index = 0; index < item.data.length; index++) {
                const element = item.data[index].avail;
                const image = item.data[index].image;
                if(element == 0 || image.indexOf("default.png") >= 0) {
                    data.push(item.data[index])
                } else if(element >= 1) {
                    data.unshift(item.data[index])
                }
            }

            context.commit('updateCard', data)
        },

        async fetchFilterCatelog(context, params) {
            const item = await axios.get(`${host}/filter_product?categories=${params.categories}`, {
                params: params.params
            })

            let data = []
            
            for (let index = 0; index < item.data.length; index++) {
                const element = item.data[index].avail;
                const image = item.data[index].image;
                if(element == 0 || image.indexOf("default.png") >= 0) {
                    data.push(item.data[index])
                } else if(element >= 1) {
                    data.unshift(item.data[index])
                }
            }

            context.commit('updateCard', data)
        },

        async fetchFilterSortPrice(context, params) {
            const item = await axios.get(`${host}/sortPrice?categories=${params.categories}`, {
                params: {
                    min: params.min,
                    max: params.max
                }
            })
            context.commit('updateCard', item.data)
        }
    },

    getters: {
        allCatalog(state) {
            return state.catalog
        },
        allCard(state) {
            return state.card
        },
        Page(state) {
            return state.page
        }
    }
}