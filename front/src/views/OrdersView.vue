<template>
    <div class="v-orders">
        <div class="v-container">
            <h2>Мои заказы</h2>
            <table class="table" v-if="list == true">
                <thead>
                    <tr>
                        <th class="v-orders-number">Номер заказа</th>
                        <th>Товар</th>
                        <th>Самовывоз</th>
                        <th>Цена</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{{data.code}}</td>
                        <td>{{data.product.name}} - Количество: {{data.product.num}}</td>
                        <td>{{shop}}</td>
                        <td>{{data.price}}₽</td>
                    </tr>
                </tbody>
            </table>
            <div class="v-cart-error" v-if="list == false">
                <div class="v-cart-error-container">
                    <p class="v-cart-text-error">Заказы пусты. Загляните в каталог, там много интересного</p>
                    <router-link to="/" type="submit" class="v-cart-btn-error">Перейти в каталог</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import host from '@/config';

export default {
    data() {
        return {
            list: false,
            data: [],
            shop: ""
        }
    },

    mounted() {
        this.order(),
        this.shops(),
        window.scrollBy({
            top: -window.pageYOffset,
            left: 0
        });
    },

    methods: {
        order() {
            let order = JSON.parse(localStorage.getItem("order"))

            if(order == null) {
                this.list = false
            } else {
                this.list = true
                this.data = order
            }  
        },

        async shops() {
            let res = await axios.get(`${host}/contact`)
            for (let index = 0; index < res.data.length; index++) {
                const element = res.data[index];
                console.log(element)
                if(element.chatid == this.data.shop) {
                    this.shop = element.adress
                    break
                }
            }
        }
    },
}
</script>

<style scoped>
.table {
	width: 100%;
	margin-bottom: 20px;
	border: 1px solid #dddddd;
	border-collapse: collapse; 
}
.table th {
	font-weight: bold;
	padding: 5px;
	background: #efefef;
	border: 1px solid #dddddd;
}
.table td {
	border: 1px solid #dddddd;
	padding: 5px;
}

.v-orders-number {
    width: 240px;
}

h2 {
    font-size: 54px;
    margin: 50px 0px;
    font-weight: 300;
}

.v-cart-error {
    max-width: 943px;
    margin: 0 auto;
    height: 344px;
    background: #fff;
    border-radius: 12px;
    display: grid;
    justify-content: center;
    align-items: center;
}

.v-cart-error-container {
    text-align: center;
}

.v-cart-text-error {
    color: #ACB0B3;
    margin: 20px 0px;
    font-size: 17px;
}

.v-cart-btn-error {
    background: #8F00FF;
    padding: 15px 50px;
    color: #fff;
    border-radius: 50px;
    text-decoration: none;
    font-size: 14px;
    border: 0px;
    cursor: pointer;
}

@media (max-width: 1400px) {
    h2 {
        font-size: 30px;
        margin-left: 5px;
    }

    .table th {
        font-weight: bold;
        font-size: 14px;
    }

    .table td {

        font-size: 14px;
    }

    .v-orders-number {
        width: 100px;
    }
}
</style>