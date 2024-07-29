<template>
    <div class="v-cart">
        <div class="v-container">
            <router-link class="v-cart-back" to="/">
                <img src="../assets/cart/array.svg" alt="">
                <p>Вернуться к покупкам</p>
            </router-link>
            <h2>Корзина</h2>
            
            <div class="v-cart-inner" v-if="Status == true">
                <div class="v-cart-calc v-mobile">
                    <div class="v-cart-product-number">
                        <h3>{{Product.length}} товара на сумму</h3>
                        <h3>{{Balance}}₽</h3>
                    </div>
                    <div class="v-cart-line"></div>
                    <div class="v-cart-product-number">
                        <h2>Итого</h2>
                        <h2>{{Balance}}₽</h2>
                    </div>
                </div>
                <div class="v-cart-left">
                    <div class="v-cart-side">
                        <CartProduct  
                            v-for="item in Product.length"
                            :data="Product[item - 1]"
                            :infoNumber="Product[item - 1]" 
                            :key="item"
                            ref="cartproduct"/>
                    </div>
                    <div class="v-cart-delivery">
                        <Delivery />
                    </div>

                    <div class="v-cart-map">
                        <Map ref="markdowndetails" :dataShop="Product" :message="message" />
                    </div>

                    <div class="v-cart-pay">
                        <Pay />
                    </div>

                    <div class="v-cart-form">
                         <form>
                            <div class="v-forms">
                                <h2>4 Покупатель</h2>
                                <p class="v-form-text">Укажите свои данные, чтобы быть в курсе изминений статуса заказа.<br>
                                Персональные данные обрабатываются в соответствии с <router-link to="/privacy" class="v-form-privacy">политикой конфиденциальности</router-link></p>
                                <div class="v-form">
                                    <div>
                                        <input type="text" v-bind:class="{'v-active': message == 'form'}" placeholder="Имя (Обязательно)" minlength="3" pattern="[А-Яа-яЁё]" v-model="firstname" required>
                                        <input type="text" v-bind:class="{'v-active': message == 'form'}" placeholder="Фамилия (Обязательно)" minlength="3" pattern="[А-Яа-яЁё]" v-model="lastname" required>
                                    </div>
                                    <div>
                                        <input type="email" placeholder="E-mail (Не обязательно)" v-model="email">
                                        <input type="text" v-mask="['7(###) ###-##-##']" class="phone" placeholder="Телефон (Обязательно)" v-bind:class="{'v-active': message == 'form'}" v-model="phone" required>
                                        
                                    </div>
                                    <input type="text" placeholder="Ник в Телеграмме (Не обязательно)" v-model="telegram">
                                    <textarea name="" id="" cols="30" rows="10" placeholder="Комментарий (Не обязательно)" v-model="comment"></textarea>
                                </div>
                            </div>
                            <div class="v-form-btn">
                                <button @click.prevent="submit()">Оформления заказа</button>
                                <div class="v-form-data" v-bind:class="{'v-active': message == 'checkdata'}">
                                    <input type="checkbox" v-model="checkdata" class="v-form-checkbox" required>
                                    <p class="v-form-text">Я принимаю условия хранения и обработки данных</p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <div class="v-cart-calc v-pc">
                    <div class="v-cart-product-number">
                        <h3>{{Product.length}} товара на сумму</h3>
                        <h3>{{Balance}}₽</h3>
                    </div>
                    <div class="v-cart-line"></div>
                    <div class="v-cart-product-number">
                        <h2>Итого</h2>
                        <h2>{{Balance}}₽</h2>
                    </div>
                </div>
            </div>
            <div class="v-cart-error" v-if="Status == false">
                <div class="v-cart-error-container">
                    <p class="v-cart-text-error">Корзина пуста. Загляните в каталог, там много интересного</p>
                    <router-link to="/" type="submit" class="v-cart-btn-error">Перейти в каталог</router-link>
                </div>
            </div>
        </div>
        <Check 
            v-if="message == 'good'"
            :code="Form.code_order"
            :product="product"
            :balance="Balance"
            :shop="shop"
        />
    </div>
</template>

<script>
import CartProduct from '../components/Cart/v-cart-product.vue'
import Delivery from '../components/Cart/v-cart-delivery.vue'
import Map from '../components/Cart/v-cart-map.vue'
import Pay from '../components/Cart/v-cart-pay.vue'
import Check from '../components/Cart/v-cart-check.vue'
import axios from 'axios'
import host from '@/config'
import {mapGetters, mapActions, mapMutations} from 'vuex'
import {mask} from 'vue-the-mask'

export default {
    directives:{mask},
    components: {
        CartProduct,
        Delivery,
        Map,
        Pay,
        Check,
    },
    data() {
        return {
            firstname: "",
            lastname: "",
            email: "",
            phone: "",
            telegram: "",
            comment: "",
            message: "",
            form: "",
            product: [],
            checkdata: "",
            phone: '',
        }
    },
    computed: mapGetters(["Balance", "Product", "Form", "Status"]),

    async mounted() {
        await this.VerifyCart()
        this.fetchBalance()
        window.scrollBy({
            top: -window.pageYOffset,
            left: 0
        });

        let number = []
        for (let index = 0; index < this.Product.length; index++) {
            const element = this.Product[index];
            let obj = JSON.parse(localStorage.getItem(`${element.categories_id}_${element.id}`))
            number.push(obj.num)
        }
        let product_number = Math.max.apply(null, number)
        console.log(product_number)
        await this.updateMap(product_number)
    },

    methods: {
        ...mapMutations(["updateStatus", "updateCartClear", "updateMap"]),
        async VerifyCart() {
            let product = []
            
            for (let index = 0; index < localStorage.length; index++) {
                let element = localStorage.getItem(localStorage.key(index)) 
                try {
                    if(JSON.parse(element).categories == undefined) {} else {
                        product.push(JSON.parse(element).categories)
                    }
                } catch (error) {
                    
                }                
            }


            if(product.length == 0) {
                this.updateStatus({status: false})
            } else {
                this.updateStatus({status: true})
            }
        },

        ...mapActions(["fetchBalance", "fetchForm"]),

        async submit() {
            let product = []
            await this.fetchBalance()
            if(this.$refs.markdowndetails.contacts.length == 0) {
                this.message = "map"
            } else if(this.firstname == "" || this.lastname == "" || this.phone == "") {
                this.message = "form"
            } else if(this.checkdata == "") {
                this.message = "checkdata"
            } else {
                this.message = "good"
                for (let index = 0; index < this.Product.length; index++) {
                    const name = this.Product[index].name;
                    const num = this.Product[index].num;
                    product.push({"name": name, "num": num})
                }
                this.product = product
                this.shop = this.$refs.markdowndetails.contacts
                this.fetchForm({
                    firstname: this.firstname,
                    lastname: this.lastname,
                    email: this.email,
                    phone: this.phone,
                    telegram: this.telegram,
                    comment: this.comment,
                    map: this.$refs.markdowndetails.contacts,
                    product: JSON.stringify(product),
                    balance: this.Balance,
                    chatid: this.$refs.markdowndetails.contacts
                })
            }
        }
    }
}
</script>

<style scoped>
.v-active {
    border: 2px solid red;
}

.v-cart-calc {
    width: 410px;
}

.v-cart-product-number {
    display: flex;
    justify-content: space-between;
    margin: 10px 0px;
}

.v-cart-product-number > h2 {
    font-size: 33px;
    margin: 20px 0px;
}

.v-cart-product-number > h3 {
    font-size: 22px;
    font-weight: 300;
}

.v-cart-line {
    width: 100%;
    height: 2px;
    background: #c7c7c7;
}

.v-cart-left > div {
    margin-bottom: 20px;
    max-width: 920px;
    width: 920px;
}

.v-cart-side {
    background: #fff;
    border-radius: 12px;
    padding: 40px;
}

.v-cart-inner {
    display: flex;
    justify-content: space-between;
}

.v-cart-back {
    text-decoration: none;
    color: #ACB0B3;
    display: flex;
    margin-top: 50px;
}

.v-cart-back > img {
    margin-right: 20px;
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

.v-forms {
    background: #fff;
    border-radius: 12px;
    padding: 40px;
    width: 920px;
}

h2 {
    margin-bottom: 20px;
}

.v-form-text {
    color: #8F00FF;
    font-size: 18px;
    margin: 20px 0px;
}

.v-card-form {
    border: 2px solid #F6F6F6;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 400px;
}

.v-text {
    margin: 10px 0px;
    color: #ACB0B3;
}

.v-form-privacy {
    color: #8F00FF;
    text-decoration-line: dashed;
}

.v-form {
    display: flex;
    flex-direction: column;
}

.v-form > div {
    display: flex;
    justify-content: space-between;
}

.v-form > div > input {
    width: 430px;
}

input {
    height: 44px;
    border-radius: 50px;
    border: 0px;
    background: #F6F6F6;
    padding-left: 10px;
    margin: 8px 0px;
    outline: none;
}

textarea {
    border-radius: 40px;
    padding-left: 30px;
    padding-top: 20px;
    margin: 20px 0px;
    background: #F6F6F6;
    border: 0px;
    outline: none;
    max-width: 890px;
    max-height: 240px;
    min-width: 890px;
    min-height: 240px;
}

.v-form-btn {
    text-align: center;
    margin-top: 45px;
}

button {
    background: #ad41ff;
    padding: 15px 50px;
    color: #fff;
    border-radius: 50px;
    font-size: 14px;
    text-decoration: none;
    font-size: 16px;
    border: 0px;
    cursor: pointer;
}

.v-form-data {
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
}

.v-form-checkbox {
    width: 20px;
    height: 20px;
    margin-right: 10px;
    border-radius: 20px;
    border: 0px;
    border: 2px solid #8F00FF;
}

.v-pc {
    display: block;
}

.v-mobile {
    display: none;
}

@media (max-width: 1400px) {
    .v-pc {
        display: none;
    }

    .v-mobile {
        display: block;
    }

    .v-cart-calc {
        width: 300px;
    }

    .v-cart-back {
        margin-left: 10px;
    }

    .v-cart-error {
        max-width: 350px;
    }

    h2 {
        margin-left: 10px;
    }

    .v-cart-inner {
        display: grid;
        justify-content: center;
        text-align: center;
    }

    .v-cart-left {
        display: grid;
        justify-content: center;
        text-align: center;
    }

    .v-cart-left > div {
        max-width: 290px;
        width: 290px;
    }

    .v-cart-side {
        padding: 15px;
        margin-bottom: 20px;
    }

    .v-forms {
        width: 300px;
        padding: 15px;
    }

    .v-forms > h2 {
        font-size: 30px;
    }

    .v-form > div {
        display: grid;
    }

    .v-form > div > input, .v-form > input {
        width: 280px;
    }

    textarea {
        max-width: 280px;
        max-height: 240px;
        min-width: 280px;
        min-height: 240px;
        padding-left: 20px;
        padding-top: 20px;
    }

    .v-form-btn {
        width: 300px;
        padding: 15px;
    }
}
</style>