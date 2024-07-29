<template>
    <button 
        class="v-data-btn" 
        @click.prevent="notify = true"
        >Уведомить о наличии</button>
    <div class="v-notify" v-if="notify == true">
        <div class="v-notify-inner">
            <div class="v-close" @click.prevent="notify = false">✖</div>
            <h2>Уведомить о наличии</h2>
            <input v-model="phone" v-mask="['#(###) ###-##-##']" type="text" placeholder="Номер телефона">
            <input v-model="name" type="text" placeholder="Имя">
            <button class="v-data-btn" @click.prevent="submit()">Отправить</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import host from '@/config'
import {mask} from 'vue-the-mask'

export default {
    directives:{mask},
    props: {
        nameProduct: String
    },

    data() {
        return {
            notify: false,
            phone: "",
            name: "",
        }
    },

    methods: {
        async submit() {
            await axios.get(`${host}/notify`, {
                params: {
                    phone: this.phone,
                    name: this.name,
                    product: this.nameProduct,
                }
            })
            this.notify = false
            alert("Уведомление отправлено")
        }
    }
}
</script>

<style scoped>
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

.v-notify {
    position: fixed;
    width: 100%;
    height: 100%;
    background: #a7a7a728;
    z-index: 99999;
    top: 0px;
    left: 0px;
}

.v-notify-inner {
    background: #fff;
    position: absolute;
    width: 500px;
    height: 230px;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    text-align: center;
    border-radius: 12px;
    top: 100px;
    display: flex;
    flex-direction: column;
    padding: 20px;
}

.v-notify-inner > input {
    height: 35px;
    font-size: 16px;
    padding-left: 5px;
    margin: 10px 0px;
    border: 0px;
    border-bottom: 1px solid #000;
    outline: none;
}

.v-notify-inner > button {
    margin-top: 30px;
}

.v-close {
    position: absolute;
    right: 20px;
    top: 15px;
    background: #e4e4e4;
    padding: 10px 15px;
    border-radius: 60px;
    cursor: pointer;
    font-size: 14px;
}

@media (max-width: 1400px) {
    .v-notify-inner  {
        width: 280px;
        height: 200px;
    }

    h2 {
        font-size: 14px;
    }

    .v-notify-inner > input {
        font-size: 14px;
    }

    .v-close {
        padding: 3px 7px;
        font-size: 10px;
    }
}

</style>