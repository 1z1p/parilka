<template>
    <div class="modal">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title">Заказ оформлен</h3>
            </div>
            <div class="modal-body">    
                <h2>Номер заказа: {{code}} </h2>
                <div class="v-line"></div>
                    <div class="v-check-product">
                        <h2 class="v-check-name">Товар:</h2>
                        <ul>
                            <li class="v-check-item" v-for="item in product" :key="item">{{item.name}} - Колличество: {{item.num}}</li>
                        </ul>
                    </div>
                <div class="v-line"></div>
                <h2>Оплата: {{balance}}₽</h2>
                <button type="submit" class="close" @click.prevent="submit()">На главную</button>
                <button type="submit" class="orders" @click.prevent="orders()">Мои заказы</button>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
import router from '@/router/index'
import {mapMutations} from 'vuex'

export default {
    props: {
        code: String,
        product: Object,
        balance: String,
        shop: String
    },

    methods: {
        ...mapMutations(["updateCartClear"]),
        submit() {
            this.updateCartClear()
            localStorage.clear()
            localStorage.setItem("order", `{"code": "${this.code}", "shop": "${this.shop}", "product": ${JSON.stringify(this.product[0])},"price": "${this.balance}"}`)
            router.push("/")
        },

        orders() {
            this.updateCartClear()
            localStorage.clear()
            localStorage.setItem("order", `{"code": "${this.code}", "shop": "${this.shop}", "product": ${JSON.stringify(this.product[0])},"price": "${this.balance}"}`)
            router.push("/orders")
        },
    },
}
</script>

<style scoped>

.v-check-name {
    margin-bottom: 10px;
}

.v-check-item {
    margin-left: 15px;
    margin-bottom: 4px;
}

.v-line {
    width: 100%;
    height: 1px;
    background: #c8c8c8;
    margin: 15px 0px;
}

.modal {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0,0,0,0.5);
    z-index: 99999;
    opacity: 1;
    -webkit-transition: opacity 200ms ease-in; 
    -moz-transition: opacity 200ms ease-in;
    transition: opacity 200ms ease-in;
    margin: 0;
    padding: 0;
}

.modal-dialog {
    position: relative;
    width: auto;
    margin: 10px;
}
@media (min-width: 576px) {
  .modal-dialog {
      max-width: 500px;
      margin: 30px auto;
  }
}

.modal-content {
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    background-color: #fff;
    -webkit-background-clip: padding-box;
    background-clip: padding-box;
    border: 1px solid rgba(0,0,0,.2);
    border-radius: .3rem;
    outline: 0;
}
@media (min-width: 768px) {
  .modal-content {
      -webkit-box-shadow: 0 5px 15px rgba(0,0,0,.5);
      box-shadow: 0 5px 15px rgba(0,0,0,.5);
  }
}

.modal-header {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    -ms-flex-pack: justify;
    justify-content: space-between;
    padding: 15px;
    border-bottom: 1px solid #eceeef;
}
.modal-title {
    margin-top: 0;
    margin-bottom: 0;
    line-height: 1.5;
    font-size: 1.25rem;
    font-weight: 500;
}

.close, .orders {
    float: right;
    background: #8F00FF;
    padding: 15px 30px;
    color: #fff;
    border-radius: 50px;
    font-size: 14px;
    text-decoration: none;
    font-size: 16px;
    border: 0px;
    cursor: pointer;
    margin-left: 8px;
}

.modal-body {
  position: relative;
    -webkit-box-flex: 1;
    -webkit-flex: 1 1 auto;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    padding: 15px;
    overflow: auto;
}
</style>