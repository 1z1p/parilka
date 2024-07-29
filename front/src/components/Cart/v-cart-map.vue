<template>
    <div class="v-map" v-bind:class="{'v-active': message == 'map'}">
        <h2>Самовывоз из магазина</h2>
        <div v-if="error == 'error'">
            <h3 class="v-position">Выбранные позиции нельзя забрать с одной точки<br>
                (Вы можете изменить свой выбор или оформить несколько заказов с разных точек)</h3>
        </div>
        <h3 style="color: red" v-if="message == 'map'">Выберите магазин</h3>
        <div class="v-map-inner" v-bind:class="{'v-blur': error == 'error'}">
            <form class="v-maps-office">
                <p class="v-office-shop" v-if="dataShop">
                    Найден {{len + 1}} магазин
                </p>
                <div class="v-office-item-contact" v-for="item in data.length" :key="item">
                    <div class="v-office-item-data" v-if="dataShop">
                       <div class="v-item-inner-shop" v-if="JSON.parse(dataShop[0].shop)[item - 1]">
                            <div v-if="JSON.parse(dataShop[0].shop)[item - 1].shop == data[item - 1].adress">
                                <div class="v-item-data">
                                    <img src="../../assets/header/map.png" alt="">
                                    <p>{{data[item - 1].adress}}</p>
                                </div>
                                <p>{{data[item - 1].time}}</p>
                                <h3>{{data[item - 1].phone}}</h3>
                            </div>
                            <div v-if="JSON.parse(dataShop[0].shop)[item - 1].shop == data[item - 1].adress">
                                <div 
                                    class="v-item-radio"
                                    v-for="itemShop in dataShop.length" 
                                    :key="itemShop">

                                    <p>{{JSON.parse(dataShop[itemShop - 1].shop)[item - 1].number}} шт</p>
                                    <input
                                        class="input"
                                        name="3" 
                                        id="18"
                                        :value="data[item - 1].chatid"
                                        v-model="contacts"
                                        type="radio"
                                        :disabled="JSON.parse(dataShop[itemShop - 1].shop)[item - 1].number < Maps">
                                </div>
                            </div>
                       </div>
                       <div class="v-item-inner-shop" v-else>
                            <div>
                                <div class="v-item-data">
                                    <img src="../../assets/header/map.png" alt="">
                                    <p>{{data[item - 1].adress}}</p>
                                </div>
                                <p>{{data[item - 1].time}}</p>
                                <h3>{{data[item - 1].phone}}</h3>
                            </div>
                            <div class="v-item-radio">
                                <p>0 шт</p>
                                <input 
                                    name="3" 
                                    id="18"
                                    :value="item.chatid"
                                    type="radio"
                                    disabled>
                            </div>
                       </div>
                    </div>
                    <div class="v-office-line" v-if="JSON.parse(dataShop[0].shop)[item - 1].shop == data[item - 1].adress"></div>
                </div>
            </form>
            <div class="v-map-iframe">
                <div class="v-contact-map"></div>
                <!-- <div style="position:relative;overflow:hidden;"><a href="https://yandex.ru/maps/48/orenburg/?utm_medium=mapframe&utm_source=maps" style="color:#eee;font-size:12px;position:absolute;top:0px;">Оренбург</a><a href="https://yandex.ru/maps/48/orenburg/?ll=55.096955%2C51.768199&utm_medium=mapframe&utm_source=maps&z=11" style="color:#eee;font-size:12px;position:absolute;top:14px;">Яндекс Карты — транспорт, навигация, поиск мест</a><iframe src="https://yandex.ru/map-widget/v1/?ll=55.096955%2C51.768199&z=11" width="440" height="470" frameborder="1" allowfullscreen="true" style="position:relative;"></iframe></div> -->
            </div>
            <div class="v-map-iframe-mobile">
                <div style="position:relative;overflow:hidden;"><a href="https://yandex.ru/maps/48/orenburg/?utm_medium=mapframe&utm_source=maps" style="color:#eee;font-size:12px;position:absolute;top:0px;">Оренбург</a><a href="https://yandex.ru/maps/48/orenburg/?ll=55.096955%2C51.768199&utm_medium=mapframe&utm_source=maps&z=11" style="color:#eee;font-size:12px;position:absolute;top:14px;">Яндекс Карты — транспорт, навигация, поиск мест</a><iframe src="https://yandex.ru/map-widget/v1/?ll=55.096955%2C51.768199&z=11" width="300" height="300" frameborder="1" allowfullscreen="true" style="position:relative;"></iframe></div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import host from '@/config'
import {mapGetters, mapActions, mapMutations} from 'vuex'

export default {
    data() {
        return {
            data: [],
            contacts: [],
            len: 0,
            maps_number: 0,
            product_number: 0,
            error: ""
        }
    },
    mounted() {
        this.contact()
        this.updateBlock()
        this.map()
    },

    async updated() {
        let input = document.querySelectorAll(".input")
        let n = 0
        for (var i = 0; i < input.length; i++) {
            if(input[i].disabled == true) {
                n += 1
            }    
        }
        if(n >= 6) {
            this.error = "error"
        } else {
            this.error = ""
        }

        let number = []
        for (let index = 0; index < this.dataShop.length; index++) {
            const element = this.dataShop[index];
            let obj = JSON.parse(localStorage.getItem(`${element.categories_id}_${element.id}`))
            number.push(obj.num)
        }
        this.product_number = Math.max.apply(null, number)
        this.updateMap(this.product_number)
    },

    computed: mapGetters(["Maps", "numShop"]),

    methods: {
        ...mapMutations(["updateMap"]),
        async map() {
            const result = await axios.get(`${host}/maps`,{
                params: {
                    id: 3
                }
            })
            const map = document.querySelector(".v-contact-map")
            map.innerHTML = result.data.maps
        },

        updateBlock() {
            let number = []
            for (let index = 0; index < this.dataShop.length; index++) {
                const element = this.dataShop[index];
                let obj = JSON.parse(localStorage.getItem(`${element.categories_id}_${element.id}`))
                number.push(obj.num)
            }
            this.product_number = Math.max.apply(null, number)
            this.updateMap(this.product_number)

            let input = document.querySelectorAll(".input")
            let n = 0
            for (var i = 0; i < input.length; i++) {
                if(input[i].disabled == true) {
                    n += 1
                }    
            }

            if(n >= 6) {
                this.error = "error"
            } else {
                this.error = ""
            }
        },

        async contact() {
            const result = await axios.get(`${host}/contact`)
            this.data = result.data
            console.log(this.data)
            if(this.dataShop) {
                
                for (let index = 0; index < result.data.length; index++) {
                    const element = result.data[index - 1];
                    if(element == undefined) {} else {
                        if(JSON.parse(this.dataShop[0].shop)[index - 1].shop == element.adress) {
                            this.len += 1
                        }
                    }
                }

            }
        }
    },

    props: {
        message: String,
        dataShop: Object
    }
}
</script>

<style scoped>
.v-false {
    display: none;
}

.v-blur {
    filter: blur(20px);
}

.v-position {
    margin-top: 20px;
    color: red;
    font-size: 29px;
}

.v-item-radio:not(:first-child) {
    display: none;
}

.v-item-radio {
    display: flex;
    align-items: center;
}

.v-item-radio > p {
    margin: 0px 10px;
}

.v-item-inner-shop {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 340px;
}

.v-maps-office {
    overflow-x: hidden;
}

.v-active {
    border: 2px solid red;
}

.v-map {
    background: #fff;
    border-radius: 12px;
    padding: 40px;
    width: 920px;
}

h2 {
    margin-bottom: 20px;
}

.v-maps-office {
    height: 500px;
    overflow-y: scroll;
}

.v-map-inner {
    display: flex;
    justify-content: space-between;
}

.v-office-inner {
    display: flex;
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
    align-items: center;
}

.v-office-shop, .v-office-item > p {
    color: #ACB0B3;
}

.v-office-item-data {
    margin: 20px 0px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    width: 400px;
}

input[type='radio'] {
    width: 30px;
    height: 30px;
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
    align-items: center;
    margin: 12px 0px;
}

.v-item-data > p {
    font-size: 18px;
    font-weight: 600;
}

.v-map-iframe {
    display: block;
}

.v-map-iframe-mobile {
    display: none;
}

@media (max-width: 1400px) {
    .v-map-iframe {
        display: none;
    }

    .v-map-iframe-mobile {
        display: block;
    }

    .v-map {
        padding: 15px;
        width: 300px;
    }


    .v-map-inner {
        display: grid;
    }

    .v-office-item-data {
        width: 300px;
    }

    .v-office-item-data {
        width: 280px;
    }

    .v-maps-office {
        margin-bottom: 20px;
    }
}

</style>