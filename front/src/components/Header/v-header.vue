<template>
    <div class="v-header">
        <div class="v-container">
        </div>
        <div class="v-line"></div>
        <div class="v-header-background">
            <div class="v-container">
                <div class="v-header-main v-inner v-mobile">
                    <router-link to="/"><img class="v-header-logo" src="../../assets/logo.png" alt=""></router-link>
                    <Search class="v-header-search" />
                    <Cart class="v-header-cart" />
                </div>
            </div>
        </div>
        <div class="v-header-menu">
            <div class="v-container">
                <div class="v-menu-inner">
                    <router-link class="v-nav-link" @click.prevent="submit('POD-Системы')" to="/catalog/POD-Системы">POD-СИСТЕМЫ</router-link>
                    <router-link class="v-nav-link" @click.prevent="submit('Liquids')" to="/catalog/Liquids">ЖИДКОСТИ</router-link>
                    <router-link class="v-nav-link" @click.prevent="submit('Odnorazki')" to="/catalog/Odnorazki">ОДНОРАЗКИ</router-link>
                    <router-link class="v-nav-link" @click.prevent="submit('Hookahs')" to="/catalog/Hookahs">КАЛЬЯНЫ</router-link>
                    <router-link class="v-nav-link" @click.prevent="submit('Accessories')" to="/catalog/Accessories">АКССЕСУАРЫ</router-link>
                    <router-link class="v-nav-link" to="/contact">КОНТАКТЫ</router-link>
                    <router-link class="v-nav-link" to="/orders">МОИ ЗАКАЗЫ</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Search from "../UI/search/v-search.vue";
import Cart from "../UI/cart/v-cart.vue";
import {mapGetters, mapActions} from 'vuex'

export default {
    components: {
        Search,
        Cart
    },

    computed: mapGetters(["allCard","allCatalog"]),
    methods: {
        ...mapActions(["fetchCatalog", "fetchFilter"]),
        async submit(categories) {
            this.fetchCatalog({
                categories: categories,
            })

            this.fetchFilter({
                categories: categories,
            })
        }
    },
}
</script>

<style scoped>
.v-header {
    margin: 15px 0px;
}

.v-line {
    width: 100%;
    height: 1px;
    background: #EAECEE;
}

.v-header-info {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 15px 0px;
}

.v-elem {
    margin: 0px 20px;
    display: flex;
    align-items: center;
}

.v-header-text {
    margin: 0px 9px;
}

.v-header-select {
    border: 0px;
    padding-right: 10px;
    outline: none;
    background: #F6F6F6;
}

.v-header-background {
    background: #fff;
}

.v-header-main {
    padding: 30px 0px;
}

.v-header-menu {
    background: #8F00FF;
    padding: 25px 0px;
}

.v-menu-inner {
    display: flex;
    justify-content: space-around;
}

.v-nav-link {
    color: #fff;
    text-decoration: none;
    transition: .3s;
}

.v-nav-link:hover {
    color: #acacac;
}

@media (max-width: 1400px) {
    .v-header-menu, .v-header-cart, .v-elem-mobile{
        display: none;
    }

    .v-mobile {
        justify-content: center;
    }

    .v-header-main {
        display: grid;
        text-align: center;
    }
}
</style>