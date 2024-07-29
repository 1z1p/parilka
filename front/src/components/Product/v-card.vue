<template>
    <div class="v-card">
        <div class="v-card-inner">
            <div class="v-card-image">
                <img class="v-card-image-product" width="552" height="552" :src="dataCard.image" alt="">
            </div>

            <div class="v-card-data">
                <h2 class="v-data-name">{{dataCard.name}} </h2>
                <p class="v-data-article">Арт. {{dataCard.article}}</p>
                <h3 class="v-data-price">{{dataCard.price}} ₽</h3>
                <div class="v-data-line">
                    <div class="v-line-inner" v-if="Number(dataCard.avail) >= 5">
                        <div
                            v-for="item4 in 5"
                            :key="item4"
                            v-bind:class="{'v-line':(Number(dataCard.avail) >= 5)}"></div>
                    </div>
                    <div class="v-line-inner" v-if="Number(dataCard.avail) == 4">
                        <div
                            v-for="item4 in 4"
                            :key="item4"
                            v-bind:class="{'v-line':(Number(dataCard.avail) == 4)}"
                            ></div>
                    </div>
                    <div class="v-line-inner" v-if="Number(dataCard.avail) == 3">
                        <div
                            v-for="item4 in 3"
                            :key="item4"
                            v-bind:class="{
                            'v-active-medium':(Number(dataCard.avail) == 3)}"
                            ></div>
                    </div>
                    <div class="v-line-inner" v-if="Number(dataCard.avail) == 2">
                        <div
                            v-for="item4 in 2"
                            :key="item4"
                            v-bind:class="{'v-active-medium':(Number(dataCard.avail) == 2)}"></div>
                    </div>
                    <div class="v-line-inner" v-if="Number(dataCard.avail) == 1">
                        <div
                            v-for="item4 in 1"
                            :key="item4"
                            v-bind:class="{'v-active-min':(Number(dataCard.avail) == 1)}"
                            ></div>
                    </div>
                    <div class="v-line-inner">
                        <div 
                            class="v-no-product" 
                            v-if="Number(dataCard.avail) == 0">Товара нет в наличии</div>
                    </div>
                    <p v-if="Number(dataCard.avail) >= 4">много</p>
                    <p v-if="Number(dataCard.avail) == 3">Средне</p>
                    <p v-if="Number(dataCard.avail) == 2">Средне</p>
                    <p v-if="Number(dataCard.avail) == 1">Мало</p>
                </div>
                <div v-if="dataCard.shop">
                    <a @click.prevent="shop = !shop" href="#" class="v-data-nal">Наличие в  магазинах</a>
                </div>
                <Shop 
                    class="v-shop"
                    v-if="shop == true" 
                    :data="dataCard.shop" />
                <div class="v-data-btn-container">
                    <button 
                        @click.prevent="addCart(dataCard.categories_id, dataCard.id)" 
                        type="submit" 
                        class="v-data-btn"
                        v-bind:class="{'v-disabled':(Number(dataCard.avail) == 0)}"
                        :disabled="Number(dataCard.avail) == 0">Добавить в корзину</button>

                    <!-- <button 
                        class="v-data-btn" 
                        @click.prevent="notify = true"
                        v-if="Number(dataCard.avail) == 0">Уведомить о наличии</button> -->
                    <Notify :nameProduct="dataCard.name" v-if="Number(dataCard.avail) == 0" />
                </div>

                <div class="v-line-gray"></div>
                <InfoShop
                    title="Самовывоз"
                    class="v-mobile-card"
                    image="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFdSURBVHgB1VPtUcJAEN2gBVDClRArMFcBWIF0EGMDWoAjWIFQgVoB6SCxAlICFqDxPbLB87jEOMMfdmZnv9/s7e6JHJGirsBc6jHE9EvE0B6JlBB5JtG2q2YUcj5KnUJswNeOm3qB2J0MJSajqwJs5LBbA94MAkTilMn6xNYXgxPHHmtO4tefe3aKd9+nmIt2tgZXCvIMYTGzCnoGnd3lbrE/swRAKyo1QCGeUEwAC/sNfKN5BEncF/wC006q1saaLyFeHXsBnlDXjTI3DAbaekEmm9ZAVxPwuxM3WrOn/cyyZk4lBws937lEXmDnAPnQrixzH7AoiNK/OX9mq92LG3AeqeWxnjU3d8HhMwZ7Dv9C/iLc0FI3FyTGwMtQ7OAH3Eo0g4hDh6m+WH622g+mZDGjmQtInT6oV13/s++jG4g1j/gTW46abmw7t3+BOYCFNCfQCzSI9G/GctL0DdFxh50eQgXfAAAAAElFTkSuQmCC"
                    text_shop="САМОВЫВОЗ ИЗ МАГАЗИНА"
                 />
                <div class="v-line-gray"></div>
                <InfoShop
                    class="v-mobile-card"
                    title="Гарантия"
                    image="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAVCAYAAABG1c6oAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAF9SURBVHgBrVSBVcJADP1XGaBuUCYQJhAm8DmBOAEygS6glAkoE8gG1g3YwDoBHUCtP5or16O1tY//3r1cesm/5JLGoAVLFCFFqGq+gMn/sg/QggKIKd5kfQF3bfZBTUSRG50BLh3juUZcnvv+xiNbU8y4EkbzToIr7keeT6ZRD+l8Q7nlM9weET6huKfygH6ISbrQLErmV/QESXYOzwFMucD/IZU/d8hLsqibPzKuKW9eqR66xQmUbELx3IEsFTIhNb8Fs3hRDgQsRiIfUK1mxnWt0mLB1IQs18sj52ykpOumxl7ReeukNqUea2r+5RUMGr4vVyj2c5gN9O/oQiYwajz5EcfGElnagUzaRp4kLdtGnfaeYf7BtxzUX+ZiSLKsjNAhPV0fPqKYoR9C2zIVQm4u0B8Tu6mkLD0pDcu8N2eH+Rd5zjtennwCY502G6Y8qyUUSHHsVNZCyXC1v1bGNXbOI1uMRkIfjDqm0VzVxJ19dRigBTojY1XzNvtv6Bl+zY0ko8QAAAAASUVORK5CYII="
                    text_shop="ГАРАНТИЯ 14 ДНЕЙ"
                    text_other="подробнее об условиях"
                    :click="true"
                 />
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import router from '../../router/index';
import InfoShop from "./other/v-info-shop.vue";
import Shop from "./v-card-shop.vue";
import Notify from "./v-card-notify.vue";
import host from '@/config';
import Vue from 'vue';

export default {
    components: {
        InfoShop,
        Shop,
        Notify
    },

    props: {
        dataCard: Object
    },

    data() {
        return {
            number: Number(this.dataCard.avail),
            shop: false,
            len: 0,
            notify: false 
        }
    },

    async mounted() {
        this.contact()
    },

    methods: {
        addCart(categories_id, id) {
            if(categories_id || id) {
                localStorage.setItem(`${categories_id}_${id}`, `{"categories": "${categories_id}","id": "${id}", "num": 1}`)
                router.push("/cart")
            }
        },

        async contact() {
            const result = await axios.get(`${host}/contact`)
            this.data = result.data
        }
    }
}
</script>

<style scoped>
.v-shop {
    margin: 10px 0px;
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

.v-card {
    background: #fff;
    padding: 20px;
    border-radius: 12px;
}

.v-card-inner {
    display: flex;
}

.v-card-image {
    position: relative;
    width: 570px;
}

.v-card-like {
    position: absolute;
    right: 0;
    top: 20px;
}

.v-card-data {
    margin: 20px 40px;
}

.v-data-name {
    font-size: 44px;
    margin: 15px 0px;
}

.v-data-article {
    color: #BEC4C7;
}

.v-data-price {
    font-size: 34px;
    margin: 20px 0px;
    font-weight: 300;
}

.v-data-nal {
    color: #8F00FF;
    margin: 15px 0px;
}

.v-line-inner, .v-data-line {
    display: flex;
    align-items: center;
}

.v-data-line {
    margin: 20px 0px;
}

.v-data-line > p {
    margin-left: 10px;
}

.v-line {
    width: 4px;
    height: 20px;
    border-radius: 12px;
    background: lightgreen;
    margin: 0px 2px;
}

.v-data-btn {
    background: #8F00FF;
    padding: 15px 30px;
    color: #fff;
    border-radius: 50px;
    font-size: 14px;
    text-decoration: none;
    font-size: 16px;
    border: 0px;
    cursor: pointer;
    margin: 5px 0px;
}

.v-disabled {
    background: #daaaff;
}

.v-data-btn-container {
    margin: 20px 0px;
    display: grid;
    width: 230px;
}

.v-line-gray {
    background: #F6F6F6;
    width: 100%;
    height: 2px;
}

@media (max-width: 1400px) {
    .v-card-inner {
        display: grid;
    }

    .v-card-image {
        max-width: 240px;
        margin: 0 auto;

    }

     .v-card-image-product {
        width: 240px;
        height: 240px;
     }

     .v-data-name {
        font-size: 30px;
     }

     .v-card-data, .v-mobile-card {
        text-align: center;
        display: grid;
        justify-content: center;
     }
}

</style>
