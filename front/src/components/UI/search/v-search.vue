<template>
    <div class="v-search">
        <input class="v-search-input" type="text" placeholder="Что вы ищете?" v-model="search">
        <button class="v-search-btn" type="submit" @click.prevent="submit()">
            <div class="v-btn-inner">
                <p>Найти</p>
                <img src="../../../assets/header/search.svg" alt="">
            </div>
        </button>
        <div class="v-search-result" v-if="open == true && allSearch.length != 0 && allSearch[0].categories_id">
            <div v-for="item in 5" :key="item">
                <router-link class="v-dt-route"
                v-if="allSearch[item - 1]"
                @click.prevent="open = false, submitSearch(allSearch[item - 1])"
                :to="'/'+allSearch[item - 1].categories_id+'/'+allSearch[item - 1].id" 
            >
                <p class="v-result-item" v-if="allSearch[item - 1]">
                    <span class="v-item-name">{{allSearch[item - 1].name}}</span> 
                    <p class="v-item-price">{{allSearch[item - 1].price}}₽</p> 
                </p>
            </router-link>
            </div>
            <router-link @click.prevent="open = false" class="v-item-all" :to="'/search_result/'+search">Показать все</router-link>
        </div>

        <div class="v-search-error" @click.prevent="open = false" v-if="open == true && allSearch.length == 0">
            <p>К сожалению, мы не смогли найти подходящие товары по вашему запросу.<br>
            Попробуйте изменить поисковый запрос</p>
        </div>
    </div>
</template>

<script>
import router from '@/router/index'
import axios from 'axios'
import host from '@/config'
import {mapGetters, mapActions} from 'vuex'

export default {
    data() {
        return {
            search: null,
            open: false
        }
    },

    computed: mapGetters(["allSearch", "allCard"]),
    methods: {
        ...mapActions(["fetchSearch", "fetchCard", "fetchCard"]),
        async submit() {
            await this.fetchSearch({
                search: this.search,
            })
            this.open = true
        },

        async submitSearch(params) {
            console.log(params.categories_id)
            if(params.categories_id == undefined || params.id == undefined) {} else {
                this.fetchCard({
                    categories: params.categories_id,
                    id: params.id,
                })
            }
        },

        async fetch() {
            console.log(this.allSearch.categories_id)
            if(this.allSearch.categories_id == undefined || this.allSearch.categories_id == null || this.allSearch.id == 0) {} else {
                this.fetchCard({
                    categories: this.allSearch.categories_id,
                    id: this.allSearch.id,
                })
                router.push(`/${this.allSearch.categories_id}/${this.allSearch.id}`)
            }
        }
    }
}
</script>

<style scoped>
.v-dt-route {
    color: #000;
    text-decoration: none;
}

.v-item-all {
    color: #000;
    font-size: 18px;
    position: absolute;
    bottom: 10px;
}

.v-search {
    position: relative;
}

.v-search-result {
    position: absolute;
    background: #fff;
    width: 580px;
    height: 210px;
    padding: 10px;
    border-radius: 12px;
    z-index: 999999;
}

.v-search-error {
    position: absolute;
    background: #fff;
    width: 580px;
    padding: 10px;
    border-radius: 12px;
    z-index: 999999;
}

.v-result-item {
    margin: 10px 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 18px;
}

.v-search-input {
    width: 523px;
    height: 55px;
    border-radius: 50px;
    padding-left: 10px;
    margin: 0px 30px;
    background: #EAECEE;
    border: 0px;
    outline: none;
}

.v-search-btn {
    background: #8F00FF;
    width: 130px;
    height: 55px;
    color: #fff;
    border-radius: 50px;
    font-size: 16px;
    border: 0px;
    cursor: pointer;
}

.v-btn-inner {
    display: flex;
    justify-content: center;
    align-items: center;
}

.v-btn-inner > p {
    margin: 0px 10px;
}

@media (max-width: 1400px) {
    .v-search {
        margin-top: 20px;
    }

    .v-search-input {
        width: 190px;
        height: 30px;
        margin: 0px 10px;
    }

    .v-search-btn {
        width: 80px;
        height: 30px;
        font-size: 13px;

    }

    .v-btn-inner > img {
        width: 10px;
        height: 10px;
        display: none;
    }

    .v-search-result {
        width: 280px;
    }

    .v-result-item {
        font-size: 12px;
    }

    .v-item-all {
        font-size: 12px;
        float: left;
        margin: 20px;
    }

    .v-search-error {
        width: 250px;
    }

    .v-item-name {
        font-size: 10px;
        text-align: left;
    }
}
</style>