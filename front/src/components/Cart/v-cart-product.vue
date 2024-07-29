<template>
    <div class="v-cart-product">
        <div class="v-product-inner">
            <img :src="data.image" width="200" height="200" alt="">
            <h3 class="v-product-name">{{data.name}}</h3>
            <div class="v-product-sh">
                <span class="minus" @click.prevent="minus()">-</span>
                <span class="v-number">{{number}}</span>
                <span class="plus" @click.prevent="plus()">+</span>
            </div>
            <h3 class="v-product-price">{{data.price}}₽</h3>
            <div class="v-product-close" @click.prevent="submit([data.price, data.id, data.categories_id])">✖</div>
        </div>
        <div class="v-product-line"></div>
    </div>
</template>

<script>
import {mapMutations, mapGetters, mapActions} from 'vuex'

export default {
    props: {
        data: Object,
        infoNumber: Object,
    },

    data() {
        return {
            number: 1,
            avail: 1
        }
    },

    computed: mapGetters(["Balance", "Product"]),

    mounted() {
        let obj = JSON.parse(localStorage.getItem(`${this.data.categories_id}_${this.data.id}`))
        this.number = obj.num
        this.updateNumber()
    },

    updated() {
        let obj = JSON.parse(localStorage.getItem(`${this.data.categories_id}_${this.data.id}`))
        this.number = obj.num
        // this.updateMap(this.number)
    },

    methods: {
        ...mapMutations(["updateDeleteProduct", "updateBalance", "updateMap", "updateNumShop"]),
        submit(balance) {
            let obj = JSON.parse(localStorage.getItem(`${this.data.categories_id}_${this.data.id}`))
            this.number = obj.num
            this.updateDeleteProduct(balance)
            this.updateMap(this.number)
        },

        plus() {
            if(this.avail > this.number) {
                this.number += 1
                let balance = this.Balance
                balance += Number(this.data.price)
                this.updateMap(this.number)
                this.updateBalance(balance)
            }
            localStorage.setItem(`${this.data.categories_id}_${this.data.id}`, `{"categories": "${this.data.categories_id}","id": "${this.data.id}","num": ${this.number}}`)
        },

        minus() {
            if(this.number >= 2) {
                this.number -= 1
                let balance = this.Balance
                balance -= Number(this.data.price)
                this.updateMap(this.number)
                this.updateBalance(balance)
            }
            localStorage.setItem(`${this.data.categories_id}_${this.data.id}`, `{"categories": "${this.data.categories_id}","id": "${this.data.id}","num": ${this.number}}`)
        },

        updateNumber() {
            if(this.infoNumber) {
                let number = []

                JSON.parse(this.infoNumber.shop).forEach(element => {
                    number.push(element.number)
                });

                this.avail = Math.max.apply(null, number);
            }
        }
    }
}
</script>

<style scoped>
.minus, .plus {
    cursor: pointer;
}

.v-cart-product {
    position: relative;
    width: 920px;
}

.v-product-inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    
}

.v-product-name, .v-product-price {
    font-size: 20px;
}

.v-product-sh {
    border: 2px solid #F6F6F6;
    font-size: 28px;
    padding: 10px 20px;
    border-radius: 80px;
}

.v-number {
    padding: 0px 30px;
}

.v-product-close {
    position: absolute;
    right: 0px;
    top: 10px;
    color: #878787;
    cursor: pointer;
}

.v-product-line {
    border-bottom: 1px solid #F6F6F6;
}

@media (max-width: 1400px) {
    .v-cart-product {
        width: 290px;
    }

    .v-product-inner {
        display: grid;
        text-align: center;
        justify-content: center;
        max-width: 200px;
        margin: 0 auto;
    }

    .v-product-inner > h3 {
        margin: 20px 0px;
    }

    .v-product-like {
        display: none;
    }

    .v-product-close {
        right: 20px;
    }
}
</style>