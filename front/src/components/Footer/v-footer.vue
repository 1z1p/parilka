<template>
    <div class="v-footer">
        <div class="v-container">
            <div class="v-footer-inner">
                <div class="v-footer-item">
                    <h3>8 (999) 109-42-14</h3>
                    
                    <div class="v-footer-social">
                        <h3>Мы в соцсетях</h3>
                        <div>
                            <a href="https://vk.com/parilka.oren" target="_blank"><img src="../../assets/footer/4_f.svg" alt=""></a>
                            <a href="https://t.me/PARilka56" target="_blank"><img src="../../assets/footer/5_f.svg" alt=""></a>
                        </div>
                    </div>
                    <a class="v-footer-email" href="#">parilka56@mail.ru</a>
                    <p class="v-footer-email">Для поставщиков и партнеров</p>
                </div>
                <div class="v-footer-item">
                    <h3>Интернет-магазин</h3>
                    <router-link class="v-item-link" @click.prevent="submit('POD-Системы')" to="/catalog/POD-Системы">POD-Cистемы</router-link>
                    <router-link class="v-item-link" @click.prevent="submit('Liquids')" to="/catalog/Liquids">Жидкости</router-link>
                    <router-link class="v-item-link" @click.prevent="submit('Odnorazki')" to="/catalog/Odnorazki">Одноразки</router-link>
                    <router-link class="v-item-link" @click.prevent="submit('Hookahs')" to="/catalog/Hookahs">Кальяны</router-link>
                    <router-link class="v-item-link" @click.prevent="submit('Tobacco')" to="/catalog/Tobacco">Табак и уголь</router-link>
                    <router-link class="v-item-link" @click.prevent="submit('POD_accessories')" to="/catalog/POD_accessories">Комплектующие к POD</router-link>
                    <router-link class="v-item-link" @click.prevent="submit('Accessories_hookah')" to="/catalog/Accessories_hookah">Комплектующие к Кальяну</router-link>
                    <router-link class="v-item-link" @click.prevent="submit('Accessories')" to="/catalog/Accessories">Аксессуары</router-link>
                </div>
                <div class="v-footer-item">
                    <h3>Покупателю</h3>
                    <router-link class="v-item-link" to="/about">О нас</router-link>
                    <router-link class="v-item-link" to="/guarante">Обмен и возврат</router-link>
                    <router-link class="v-item-link" to="/contact">Контакты</router-link>
                    <router-link class="v-item-link" to="/privacy">Политика конфиденциальности</router-link>
                </div>
                <div class="v-footer-back">
                    <h3 class="v-footer-18">18+</h3>
                    <p class="v-footer-text">Мы не продаем товары<br>
                    лицам моложе 18 лет</p>
                </div>
            </div>
            <div class="v-inner">
                <p class="v-footer-text">© 2023 Интернет-магазин «PARilka».<br>
                Все права защищены.</p>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {

    computed: mapGetters(["allCard",'allCatalog']),
    methods: {
        ...mapActions(['fetchCatalog', "fetchFilter"]),
        async submit(categories) {
            this.fetchCatalog({
                categories: categories,
            })
            this.fetchFilter({
                categories: categories,
            })
        }
    },
}
</script>

<style scoped>
.v-footer {
    background: #212121;
    width: 100%;
    padding-top: 40px;
    padding-bottom: 20px;
}

.v-footer-inner {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin: 25px 0px;
}

.v-footer-back {
    display: flex;
    align-items: center;
}

.v-footer-18 {
    background: #292929;
    width: 55px;
    height: 55px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 80px;
    margin: 0px 10px;
}

.v-footer-text {
    color: #fff;
}

.v-footer-item {
    display: grid;
}

.v-footer-item > h3 {
    color: #fff;
    margin-bottom: 10px;
}

.v-footer-social {
    margin: 20px 0px;
}

.v-footer-social > h3 {
    color: #BEC4C7;
    margin-bottom: 10px;
}

.v-footer-social > div > a {
    margin-right: 20px;
}

.v-footer-email {
    color: #BEC4C7;
    margin: 2px 0px;
}

.v-item-link {
    color: #BEC4C7;
    margin: 5px 0px;
    text-decoration: none;
    font-weight: 550;
}

@media (max-width: 1400px) {
    .v-footer-inner {
        display: grid;
        justify-content: center;
    }

    .v-footer-item, .v-footer-back {
        display: none;
    }
}
</style>