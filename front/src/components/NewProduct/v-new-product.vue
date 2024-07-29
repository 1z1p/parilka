<template>
    <div class="v-new-product">
        <div 
            class="v-new-box" 
            v-bind:class="{'v-box-active':(array == 'right')}">
            <h3 class="v-new-name"> {{title}} </h3>
            <!-- <p class="v-new-all" v-if="all"> {{all}} </p> -->
            <!-- <div class="v-new-array" v-if="array == 'left'">
                <img class="v-array-left" src="../../assets/new_product/array.svg" alt="">
                <img class="v-array-right" src="../../assets/new_product/array.svg" alt="">
            </div>
            <div class="v-new-array v-right" v-if="array == 'right'">
                <img class="v-array-left" src="../../assets/new_product/array.svg" alt="">
                <img class="v-array-right" src="../../assets/new_product/array.svg" alt="">
            </div> -->
        </div>

        <div class="v-new-inner">
            <NewProductItem 
                v-for="item in newProduct.length"
                :data="newProduct[item - 1]" 
                :key="item" />
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import NewProductItem from "./v-new-product-item.vue";
import host from '@/config';

export default {
    props: {
        title: String,
        all: String,
        array: String,
    },
    
    components: {
        NewProductItem
    },

    data() {
        return {
            newProduct: {}
        }
    },

    mounted() {
        this.allNewProduct()
    },

    methods: {
        async allNewProduct() {
            const result = await axios.get(`${host}/new_product`,{
                params: {
                    new: 1
                }
            })
            this.newProduct = result.data
        }
    },
}
</script>

<style scoped>
.v-box-active {
    justify-content: space-between;
}

.v-new-product {
    margin: 30px 0px;
}

.v-new-box {
    display: flex;
    align-items: center;
    margin: 20px 0px;
}

.v-right {
    float: right;
}

.v-new-array > img {
    background: #fff;
    padding: 25px;
    border-radius: 80px;
    margin: 0px 10px;
}

.v-array-left {
    transform: rotate(180deg);
    opacity: 0.3;
}

.v-new-name {
    font-size: 44px;
    font-weight: 300;
}

.v-new-all {
    background: #8F00FF;
    padding: 10px 20px;
    border-radius: 52px;
    color: #fff;
    margin: 0px 20px;
}

.v-new-inner {
    display: flex;
    justify-content: space-between;
    overflow-x: scroll;
}

@media (max-width: 1400px) {
    .v-new-name {
        margin-left: 10px;
    }
}
</style>