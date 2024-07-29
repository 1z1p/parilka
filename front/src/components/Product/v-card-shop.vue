<template>
    <div v-if="data">
        <div v-for="item in dataCon.length" :key="item" class="v-shop-inner">
            <div v-if="dataCon[item - 1].adress == JSON.parse(data)[item - 1].shop">
                <img src="../../assets/header/map.png" alt="">
                <p class="v-small">{{JSON.parse(data)[item - 1].shop}} 
                    - 
                    <span
                        v-if="JSON.parse(data)[item - 1].number > 10">больше 10шт.</span>
                    <span 
                    v-else>{{ JSON.parse(data)[item - 1].number }}шт.</span></p>
            </div>
        </div>    
    </div>
</template>

<script>
import axios from 'axios'
import host from '@/config'

export default {
    props: {
        data: toString
    },

    data() {
        return {
            dataCon: []
        }
    },

    mounted() {
        this.contact()
    },

    methods: {
        async contact() {
            const result = await axios.get(`${host}/contact`)
            this.dataCon = result.data
        }
    }
}
</script>

<style scoped>
.v-shop-inner > div {
    display: flex;
    align-items: center;
    margin: 4px 0px;
}

@media (max-width: 1000px) {
    .v-small {
        font-size: 13.5px;
    }
}
</style>