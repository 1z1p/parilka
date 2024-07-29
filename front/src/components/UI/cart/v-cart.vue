<template>
    <div class="v-cart">
        <div class="v-cart-inner">
            <router-link to="/cart" class="v-cart-item v-cart-btn">
                <img src="../../../assets/header/cart.svg" alt="">
            </router-link>
            <div class="v-cart-item">
                <p>Сумма</p>
                <h3>{{Balance}}₽</h3>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
    computed: mapGetters(["Balance"]),
    methods: mapActions(["fetchBalance"]),
    async mounted() {
        this.fetchBalance()
    },
}
</script>

<style scoped>
.v-cart-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.v-cart-item {
    margin: 0px 20px;
}

.v-cart-brand > p {
    color: #8F00FF;
    font-weight: 700;
}

.v-cart-btn {
    cursor: pointer;
}
</style>