<template>
    <div class="v-crumb">
        <p>
            <router-link class="v-crumb-link" to="/">Главная</router-link> 
            / 
            <router-link :to="'/catalog/'+categories" class="v-crumb-list" v-if="categories == 'Liquids'">Жидкости</router-link> 
            <router-link :to="'/catalog/'+categories" class="v-crumb-list" v-if="categories == 'POD-Системы'">POD-Системы</router-link> 
            <router-link :to="'/catalog/'+categories" class="v-crumb-list" v-if="categories == 'Odnorazki'">Одноразки</router-link> 
            <router-link :to="'/catalog/'+categories" class="v-crumb-list" v-if="categories == 'Hookahs'">Кальяны</router-link> 
            <router-link :to="'/catalog/'+categories" class="v-crumb-list" v-if="categories == 'Tobacco'">Табак и уголь</router-link> 
            <router-link :to="'/catalog/'+categories" class="v-crumb-list" v-if="categories == 'POD_accessories'">Комплектующие к POD</router-link> 
            <router-link :to="'/catalog/'+categories" class="v-crumb-list" v-if="categories == 'Accessories_hookah'">Комплектующие к кальяну</router-link> 
            <router-link :to="'/catalog/'+categories" class="v-crumb-list" v-if="categories == 'Accessories'">Аксессуары</router-link> 
            / 
            <span class="v-crumb-list">{{title}}</span></p>
    </div>
</template>

<script>
import axios from 'axios'
import host from '@/config'

export default {
    props: {
        title: String,
        categories: String
    },
}
</script>

<style scoped>
.v-crumb {
    margin: 30px 0px;
}

.v-crumb > p {
    color: #BEC4C7;
}

.v-crumb-link {
    color: #BEC4C7;
    text-decoration: none;
}

.v-crumb-link, .v-crumb-list {
    margin: 0px 15px;
    text-decoration: none;
    color: #BEC4C7;
}

@media (max-width: 1400px) {
    .v-crumb {
        font-size: 12px;
    }

    .v-crumb-link, .v-crumb-list {
        margin: 0px 3px;
    }

    .v-crumb {
        margin-left: 5px;
    }
}
</style>