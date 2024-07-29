<template>
    <div class="v-contact">
        <div class="v-container">
            <Crumb title="Контакты" />
            <h2>Контакты</h2>

            <div class="v-contact-office">
                <h2 class="v-office-name">Контакты для связи</h2>
                <div class="v-office-inner">
                    <div class="v-office-item">
                        <img src="../assets/contact/outbox.svg" alt="">
                        <h3><a href="#">parilka56@mail.ru</a></h3>
                        <p>Техническая поддержка</p>
                    </div>
                    <div class="v-office-item">
                        <img src="../assets/contact/icon.svg" alt="">
                        <h3>8 (999) 109-42-14</h3>
                        <p>Для поставщиков и партнеров</p>
                    </div>
                </div>
            </div>

            <div class="v-contact-maps">
                <h2>Магазины</h2>
                <div class="v-maps-inner">
                    <div class="v-maps-office">
                        <p class="v-office-shop">Найден {{data.length}} магазин</p>
                        <div class="v-office-item-data" v-for="item in data.length" :key="item">
                            <div class="v-item-data">
                                <img src="../assets/header/map.png" alt="">
                                <p>{{data[item - 1].adress}}</p>
                            </div>
                            <p>{{data[item - 1].time}}</p>
                            <h3>{{data[item - 1].phone}}</h3>
                            <div class="v-office-line" ></div>
                        </div>
                    </div>
                    <div class="v-contact-map"></div>
                    <div class="v-contact-map-mobile">
                        <div style="position:relative;overflow:hidden;"><a href="https://yandex.ru/maps/48/orenburg/search/Parilka/?utm_medium=mapframe&utm_source=maps" style="color:#eee;font-size:12px;position:absolute;top:0px;">Parilka в Оренбурге</a><a href="https://yandex.ru/maps/48/orenburg/?utm_medium=mapframe&utm_source=maps" style="color:#eee;font-size:12px;position:absolute;top:14px;">Оренбург</a><iframe src="https://yandex.ru/map-widget/v1/?ll=55.115688%2C51.800461&mode=search&sll=55.096955%2C51.768199&sspn=0.623474%2C0.282880&text=%D0%97%D1%84%D0%BA%D1%88%D0%B4%D0%BB%D1%84&z=12" width="300" height="200" frameborder="1" allowfullscreen="true" style="position:relative;"></iframe></div>
                    </div>
                </div>
            </div>  
        </div>
    </div>
</template>

<script>
import Crumb from "../components/Crumb/v-crumb.vue";
import axios from 'axios';
import host from '../config'

export default {
    components: {
        Crumb
    },

    data() {
        return {
            data: [],

        }
    },

    mounted() {
        this.map()
        this.contact()
    },

    methods: {
        async map() {
            const result = await axios.get(`${host}/maps`,{
                params: {
                    id: 2
                }
            })
            const map = document.querySelector(".v-contact-map")
            map.innerHTML = result.data.maps
        },

        async contact() {
            const result = await axios.get(`${host}/contact`)

            let data = []

            for (let index = 0; index < result.data.length; index++) {
                const element = result.data[index];
                if(element == undefined) {} else {
                    if (element.adress.includes('закрыто')) {} else {
                        data.push(element)
                    }
                }                
            }

            this.data = data

        }
    },
}
</script>

<style scoped>
h2 {
    font-size: 40px;
    margin: 20px 0px;
    font-weight: 300;
}

.v-maps-office {
    overflow-y: scroll;
    height: 550px;
}

.v-contact-office, .v-contact-maps {
    background: #fff;
    padding: 50px 60px;
    border-radius: 12px;
    margin: 20px 0px;
}

.v-office-inner {
    display: flex;
    align-items: center;
}

.v-office-item {
    margin-right: 120px;
}

.v-office-item > h3 {
    margin: 10px 0px;
}

a {
    color: #8F00FF;
}

.v-maps-inner {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
}

.v-office-shop, .v-office-item > p {
    color: #ACB0B3;
}

.v-office-item-data {
    margin: 20px 0px;
}

.v-office-item-data > h3 {
    margin: 8px 0px;
}


.v-office-line {
    width: 450px;
    height: 2px;
    background: #F6F6F6;
}

.v-item-data {
    display: flex;
    margin: 12px 0px;
    align-items: center;
}

.v-item-data > p {
    font-size: 18px;
    font-weight: 600;
}

.v-contact-map {
    display: block;
}

.v-contact-map-mobile {
    display: none;
}

@media (max-width: 1400px) {
    .v-contact-map {
        display: none;
    }

    .v-contact-map-mobile {
        display: block;
        margin-top: 20px;
    }
    h2 {
        font-size: 29px;
        margin-left: 10px;
    }

    .v-office-inner {
        display: grid;
        justify-content: center;
        text-align: center;
    }

    .v-office-name {
        text-align: center;
    }

    .v-office-item {
        margin-right: 0px;
    }

    .v-maps-inner {
        display: grid;
    }

    .v-office-item-data {
        width: 300px;
    }

    .v-office-line {
        width: 200px;
    }
}
</style>