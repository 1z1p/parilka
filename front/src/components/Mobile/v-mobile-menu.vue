<template>
    <div>
        <div class="v-mobile-menu">
            <div class="v-mobile-inner">
                <router-link to="/" class="v-mobile-item">
                    <img src="../../assets/home.png" width="27" height="27" alt="">
                    <p>Домой</p>
                </router-link>
                <router-link to="/cart" class="v-mobile-item">
                    <img src="../../assets/grocery-store.png" width="27" height="27" alt="">
                    <p>Корзина</p>
                </router-link>
                <div @click="menu = !menu" class="v-mobile-item">
                    <img src="../../assets/menu.png" width="27" height="27" alt="">
                    <p>Меню</p>
                </div>
            </div>
        </div>
        <div class="v-menu-params">
            <Menu class="v-mobile v-menu-z" @click.prevent="menu = false" v-if="menu == true" />
            <button v-if="menu == true" @click.prevent="menu = false" class="v-menu-close">✖</button>
        </div>
    </div>
</template>

<script>
import Menu from './v-menu.vue'

export default {
    data() {
        return {
            menu: false
        }
    },

    components: {
        Menu
    }
}
</script>

<style scoped>
.v-mobile, .v-mobile-menu {
    display: none;
}

@media (max-width: 1400px) {
    .v-menu-params {
        position: relative;
    }

    .v-menu-close {
        position: fixed;
        right: 20px;
        top: 20px;
        border: 0px;
        background: #fff;
        z-index: 9999;
    }

    .v-menu-z {
        z-index: 9998;
    }

    .fa {
        font-size: 28px;
    }

    .v-mobile, .v-mobile-menu {
        display: block;
    }

    .v-mobile-menu {
        position: fixed;
        bottom: 0;
        width: 100%;
        background: #fff;
        z-index: 9999;
    }

    .v-mobile-item {
        color: #000;
        text-align: center;
        text-decoration: none;
        cursor: pointer;
    }

    .v-mobile-inner {
        display: flex;
        justify-content: space-around;
        padding: 30px 0px;
    }
}
</style>