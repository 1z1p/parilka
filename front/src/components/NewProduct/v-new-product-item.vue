<template>
    <div class="v-new-product-box">
        <div class="v-product-inner">
            <div class="v-product-item">
                <router-link :to="'/'+data.categories_id+'/'+data.id"><img :src="data.image" width="171" height="170" alt=""></router-link>
                <div class="v-new-line">
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

                    <div 
                        class="v-no-product" 
                        v-if="Number(data.avail) == 0">Товара нет в наличии</div>
                </div>
                <div class="v-new-name">{{data.name}}</div>
                <div class="v-new-product-btn">
                    <div class="v-product-price">{{data.price}} ₽</div>
                    <button class="v-product-buy"
                    v-bind:class="{'v-disabled':(Number(data.avail) == 0)}" 
                    @click.prevent="addCart(data.categories_id, data.id)"
                    :disabled="Number(data.avail) == 0">
                        <img src="../../assets/new_product/cart.svg" alt="">
                    </button>
                </div>
            </div>  
        </div>
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
.v-line-inner, .v-data-line {
    display: flex;
    align-items: center;
}

.v-no-product {
    color: lightcoral;
    font-size: 13px;
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

.v-new-product-box {
    background: #fff;
    border-radius: 12px;
}

.v-product-inner {
    display: flex;
    justify-content: space-between;
}

.v-product-item {
    width: 180px;
    height: 355px;
    padding: 20px 40px;
    border-right: 2px solid #F6F6F6;
}

.v-new-line {
    display: flex;
    justify-content: right;
    margin: 20px 0px;
}

.v-line {
    width: 4px;
    height: 20px;
    border-radius: 12px;
    background: lightgreen;
    margin: 0px 2px;
}

.v-new-name {
    text-align: center;
}

.v-new-product-btn {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: 40px;
}

.v-product-price {
    font-size: 18px;
    font-weight: 600;
}

.v-product-buy {
    background: #8F00FF;
    padding: 8px 20px;
    border-radius: 52px;
    border: 0px;
}

.v-disabled {
    background: #c578ff;
}
</style>