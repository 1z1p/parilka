<template>
    <div class="v-product-card">
        <router-link :to="'/'+data.categories_id+'/'+data.id">
            <img class="v-prodcut-card-image" :src="data.image" width="200" height="200" alt="">
        </router-link>
        <div class="v-line-inner" v-if="Number(data.avail) >= 5">
            <div
                    v-for="item4 in 5"
                    :key="item4"
                    v-bind:class="{'v-line':(Number(data.avail) >= 5)}"></div>
        </div>
        <div class="v-line-inner" v-if="Number(data.avail) == 4">
            <div
                v-for="item4 in 4"
                :key="item4"
                v-bind:class="{'v-line':(Number(data.avail) == 4)}"
                ></div>
        </div>
        <div class="v-line-inner" v-if="Number(data.avail) == 3">
            <div
                v-for="item4 in 3"
                :key="item4"
                v-bind:class="{
                'v-active-medium':(Number(data.avail) == 3)}"
                ></div>
        </div>
        <div class="v-line-inner" v-if="Number(data.avail) == 2">
            <div
                v-for="item4 in 2"
                :key="item4"
                v-bind:class="{'v-active-medium':(Number(data.avail) == 2)}"></div>
        </div>
        <div class="v-line-inner" v-if="Number(data.avail) == 1">
            <div
                v-for="item4 in 1"
                :key="item4"
                v-bind:class="{'v-active-min':(Number(data.avail) == 1)}"
                ></div>
        </div>
        <div class="v-line-inner">
            <div 
                class="v-no-product" 
                v-if="Number(data.avail) == 0">Товара нет в наличии</div>
        </div>
        <h3 class="v-card-name">{{data.name}}</h3>
        <h2 class="v-card-price">{{data.price}}₽</h2>
        <button class="v-card-btn" 
            @click.prevent="addCart(data.categories_id, data.id)" 
            type="submit" 
            v-bind:class="{'v-disabled':(Number(data.avail) == 0)}"
            :disabled="Number(data.avail) == 0">В корзину</button>
    </div>
</template>

<script>
import router from '@/router/index'

export default {
    props: {
        data: Object
    },

    methods: {
        addCart(categories_id, id) {
            if(categories_id || id) {
                localStorage.setItem(`${categories_id}_${id}`, `{"categories": "${categories_id}","id": "${id}", "num": 1}`)
                router.push("/cart")
            }
        }
    }
}
</script>

<style scoped>
.v-no-product {
    color: lightcoral;
    font-size: 13px;
    margin: 7px 0px;
}

.v-active-min {
    width: 4px;
    height: 20px;
    border-radius: 12px;
    background: red;
    margin: 0px 2px;
}

.v-active-medium {
    width: 4px;
    height: 20px;
    border-radius: 12px;
    background: orange;
    margin: 0px 2px;
}

.v-prodcut-card-image {
    transition: .3s;
}

.v-prodcut-card-image:hover {
    width: 210px;
    height: 210px;
}

.v-product-card {
    margin: 20px 50px;
    text-align: center;
    text-decoration: none;
    width: 250px;
}

.v-card-name {
    font-size: 19px;
    color: #848484;
    margin: 10px 0px;
    font-weight: 400;
}

.v-card-price {
    font-size: 25px;
    color: #000;
    margin: 10px 0px;
}

.v-card-btn {
    background: #8F00FF;
    padding: 15px 50px;
    color: #fff;
    border-radius: 50px;
    text-decoration: none;
    font-size: 14px;
    border: 0px;
    cursor: pointer;
}

.v-disabled {
    background: #daaaff;
}

.v-line-inner {
    display: flex;
    align-items: center;
    margin: 10px 0px;
    justify-content: right;
}

.v-line {
    width: 4px;
    height: 20px;
    border-radius: 12px;
    background: lightgreen;
    margin: 0px 2px;
}
</style>