import { createStore } from 'vuex'
import filter from './modules/filter'
import card from './modules/card'
import search from './modules/search'
import all_card from './modules/all_card'
import balance from './modules/balance'
import Form from './modules/Form'

export default createStore({
  modules: {
    card,
    filter,
    search,
    all_card,
    balance,
    Form
  }
})

