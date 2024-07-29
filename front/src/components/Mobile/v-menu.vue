<template>
    <div class="v-menu">
        <div class="v-menu-container">
            <h2><img src="../../assets/logo.png" width="50" height="30" alt="">Меню</h2>
            <div class="v-menu-item">
                <router-link class="v-item-link" to="/orders">Мои заказы</router-link>
                <div class="v-line"></div>
                <router-link class="v-item-link" @click.prevent="submit('POD-Системы')" to="/catalog/POD-Системы">POD-Cистемы</router-link>
                <div class="v-line"></div>
                <router-link class="v-item-link" @click.prevent="submit('Liquids')" to="/catalog/Liquids">Жидкости</router-link>
                <div class="v-line"></div>
                <router-link class="v-item-link" @click.prevent="submit('Odnorazki')" to="/catalog/Odnorazki">Одноразки</router-link>
                <div class="v-line"></div>
                <router-link class="v-item-link" @click.prevent="submit('Hookahs')" to="/catalog/Hookahs">Кальяны</router-link>
                <div class="v-line"></div>
                <router-link class="v-item-link" @click.prevent="submit('Tobacco')" to="/catalog/Tobacco">Табак и уголь</router-link>
                <div class="v-line"></div>
                <router-link class="v-item-link" @click.prevent="submit('POD_accessories')" to="/catalog/POD_accessories">Комплектующие к POD</router-link>
                <div class="v-line"></div>
                <router-link class="v-item-link" @click.prevent="submit('Accessories_hookah')" to="/catalog/Accessories_hookah">Комплектующие к Кальяну</router-link>
                <div class="v-line"></div>
                <router-link class="v-item-link" @click.prevent="submit('Accessories')" to="/catalog/Accessories">Аксессуары</router-link>
                <div class="v-line"></div>
                <router-link class="v-item-link" to="/about">О нас</router-link>
                <div class="v-line"></div>
                <router-link class="v-item-link" to="/guarante">Обмен и возврат</router-link>
                <div class="v-line"></div>
                <router-link class="v-item-link" to="/contact">Контакты</router-link>
                <div class="v-line"></div>
                <router-link class="v-item-link" to="/privacy">Политика конфиденциальности</router-link>
                <div class="v-line"></div>
            </div>
        </div>
    </div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'

export default {
    computed: mapGetters(["allCard",'allCatalog']),
    methods: {
        ...mapActions(['fetchCatalog', "fetchFilter"]),
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
h2 {
    display: flex;
    align-items: center;
    padding: 20px;
}

.v-menu {
    position: fixed;
    background: #ffffff;
    width: 270px;
    height: 100%;
    z-index: 9999;
    top: 0;
    right: 0;
    display: grid;
}

.v-menu-container {
    position: absolute;
    right: 0px;
    overflow-y: scroll;
    height: 400px;
}

.v-menu-item {
    display: grid;
    margin: 20px 0px;
}

.v-item-link {
    color: #000;
    transition: .3s;
    font-weight: bold;
    padding: 10px 20px;
    text-decoration: none;
}

.v-item-link:hover {
    text-decoration:double;
    background: #dbdbdb;
}

.v-line {
    width: 100%;
    height: 1px;
    background: #dbdbdb;
}

.v-menu-card {
    padding-left: 20px;
}
</style>