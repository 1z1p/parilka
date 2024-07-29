<template>
    <div class="v-catalog-product">
        <div class="v-catalog-header-inner">
            <p class="v-catalog-menu-inner"> 
                <span>Найдено {{allCard.length}} товаров</span> 
                <div class="select-box v-menu-numbers">
                    <div class="select-box__current" style="display: flex; align-items: center;" tabindex="12" @change="usersPerPage = numbers">
                        <span>Показать по: </span>
                        <div class="select-box__value">
                            <input class="select-box__input2" type="radio" v-model="numbers" id="45" :value="18" name="Ben2" checked="checked"/>
                            <p class="select-box__input-text2">18</p>
                        </div>
                        <div class="select-box__value">
                            <input class="select-box__input2" type="radio" v-model="numbers" id="46" :value="32" name="Ben2" />
                            <p class="select-box__input-text2">32</p>
                        </div>
                        <div class="select-box__value">
                            <input class="select-box__input2" type="radio" v-model="numbers" id="47" :value="64" name="Ben2" />
                            <p class="select-box__input-text2">64</p>
                        </div>
                        <img class="select-box__icon" src="http://cdn.onlinewebfonts.com/svg/img_295694.svg" alt="Arrow Icon" aria-hidden="true"/>
                    </div>
                    <ul class="select-box__list">
                        <li>
                        <label class="select-box__option" for="45" aria-hidden="aria-hidden">18</label>
                        </li>
                        <li>
                        <label class="select-box__option" for="46" aria-hidden="aria-hidden">32</label>
                        </li>
                        <li>
                        <label class="select-box__option" for="47" aria-hidden="aria-hidden">64</label>
                        </li>
                    </ul>
                </div>
            </p>
            <div class="select-box">
                <div class="select-box__current" tabindex="1" @change="sortPrice(sort)">
                    <div class="select-box__value">
                    <input class="select-box__input" type="radio" v-model="sort" id="0" value="dd" name="Ben" checked="checked"/>
                    <p class="select-box__input-text">Популярные</p>
                    </div>
                    <div class="select-box__value">
                    <input class="select-box__input" type="radio" v-model="sort" id="1" value="min" name="Ben" />
                    <p class="select-box__input-text">Дешевые</p>
                    </div>
                    <div class="select-box__value">
                    <input class="select-box__input" type="radio" v-model="sort" id="2" value="max" name="Ben" />
                    <p class="select-box__input-text">Дорогие</p>
                    </div>
                    <img class="select-box__icon" src="http://cdn.onlinewebfonts.com/svg/img_295694.svg" alt="Arrow Icon" aria-hidden="true"/>
                </div>
                <ul class="select-box__list">
                    <li>
                    <label class="select-box__option" for="0" aria-hidden="aria-hidden">Популярные</label>
                    </li>
                    <li>
                    <label class="select-box__option" for="1" aria-hidden="aria-hidden">Дешевые</label>
                    </li>
                    <li>
                    <label class="select-box__option" for="2" aria-hidden="aria-hidden">Дорогие</label>
                    </li>
                </ul>
            </div>
        </div>
        <div class="v-catalog-background">
            <div class="v-catalog-product-inner">
                <h2 v-if="allCard"></h2>
                <ProductCard
                    v-for="item in paginatedUsers"
                    :data="item"  
                    :key="item"
                     />
                <div class="v-catalog-error" v-if="allCard.length == 0">
                    <h2>Товар не найден!</h2>
                </div>
            </div>
            <div class="v-product__pagination">
                <paginate
                    :page-count="pages"
                    :page-range="3"
                    :margin-pages="2"
                    :click-handler="pageClick"
                    :prev-text="'<'"
                    :next-text="'>'"
                    :container-class="'pagination'"
                    :page-class="'page-item'"
                >
                </paginate>
            </div>
        </div>
    </div>
</template>

<script>
import ProductCard from "./card/v-product-card.vue";
import {mapGetters, mapActions, mapMutations} from 'vuex'
import Paginate from "vuejs-paginate-next";
export default {
    name: 'Product',
    components: {
        ProductCard,
        Paginate
    },

    data() {
        return {
            usersPerPage: 18,
            pageNumber: 1,
            sort: "",
            numbers: null
        }
    },

    computed: {
        ...mapGetters(["allCard", "Page"]),
        pages() {
            if(this.allCard[0]) {
                return Math.ceil(this.allCard.length / this.usersPerPage)
            }
        },

        paginatedUsers() {
            if(this.allCard[0]) {
                let from = [this.Page - 1] * this.usersPerPage;
                let to = from + this.usersPerPage;

                return this.allCard.slice(from, to);
            }
        }
    },

    methods: {
        ...mapMutations(["updatePage"]),
        pageClick(page) {
            this.updatePage(page);
            window.scrollBy({
                top: -window.pageYOffset + 190,
                left: 0
            });
        },

        sortPrice(sorts) {
            if(sorts == "min") {
                this.allCard.sort((a,b) => a.price - b.price)
            } else if(sorts == "max") {
                this.allCard.sort((a,b) => b.price - a.price)
            } else {
                this.allCard.sort((a,b) => a.name.localeCompare(b.name))
            }
        },
    }
}
</script>

<style scoped>
@import "./bootstrap.css";

.v-menu-select-text {
    position: absolute;
    right: 28px;
    top: 0px;
}

.v-catalog-menu-inner {
    display: flex;
    align-items: center;
}

.v-menu-numbers {
    margin-left: 20px;
    position: relative;
    width: 190px;
}

.v-menu-numbers > span {
    margin-right: 14px;
}

.v-catalog-select {
    position: relative;
}

.v-catalog-select > h3 {
    position: absolute;
    top: 0px;
    left: 5px;
    font-weight: 300;
    font-size: 16px;
    color: #ACB0B3;
}

.v-product__pagination {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 30px;
    padding-bottom: 30px;
    margin-left: 8px;
    margin-right: 8px;
}

.page {
    padding: 6px 10px;
    border: solid 1px #e7e7e7;
    background: #eaeaea;
    font-weight: bold;
    margin: 5px 5px;
    font-size: 15px;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
}

.page:hover {
    background: #959595;
    cursor: pointer;
}

.page__selected {
    background: #959595;
    cursor: pointer;
    color: #fff;
}

.v-catalog-error {
    display: flex;
    justify-content: center;
    text-align: center;
    height: 300px;
    width: 100%;
    margin-top: 50px;
}

.v-catalog-error > h2 {
    color: lightcoral;
}

.v-catalog-header-inner {
    display: flex;
    justify-content: space-between;
    margin: 10px;
}

.v-catalog-header-inner > p {
    color: #ACB0B3;
    font-size: 16px;
}

select {
    border: 0px;
    background: #F6F6F6;
    font-size: 16px;
    color: #ACB0B3;
    outline: none;
    z-index: 3;
}

option {
    outline: none;
    font-size: 20px;
}

.v-catalog-background {
    max-width: 1070px;
    width: 1070px;
    background: #fff;
    border-radius: 12px;
}

.v-catalog-product-inner {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    justify-content: left;
}

@media (max-width: 1400px) {
    .v-catalog-product-inner {
        display: grid;
        justify-content: center;
    }
    .v-catalog-background {
        max-width: 340px;
        margin: 0 auto;
    }

    .v-menu-numbers {
        display: none;
    }

    .v-catalog-menu-inner {
        align-items: center;
    }
}
</style>