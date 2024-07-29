<template>
    <div class="v-catalog-sidebar">
        <div class="v-catalog-header-inner">
            <img src="../../assets/catalog/filter.svg" alt="">
            <p class="filter_btn" @click.prevent="filter_menu = !filter_menu">Свернуть фильтр</p>
        </div>
        <div v-if="filter_menu == true" class="v-sidebar-background">
            <div class="v-sidebar-container">
                <div class="v-sidebar-new v-sidebar-all">
                    <input type="checkbox" name="" id="" v-model="params['new']">
                    <p>Новинка</p>
                </div>
                <div class="v-sidebar-sale v-sidebar-all">
                    <input type="checkbox" v-model="params['sale']" name="" id="">
                    <p>Товар со скидкой</p>
                </div>
            </div>
            <div class="v-line"></div>
            <div class="v-sidebar-container">
                <div class="v-sidebar-nal">
                    <p class="v-sidebar-all-product">Все товары</p>
                    <input type="checkbox" id="switch" v-model="params['avail']" /><label for="switch">Toggle</label>
                    <p class="v-sidebar-avail">В наличии</p>
                </div>
            </div>
            <div class="v-line"></div>

            <div class="v-range-slider">
                <h3>Цена:</h3>
                <div class="v-range-input" @change="sortPriceRange(min,max)">
                    <div>
                        <p>От:</p>
                        <input type="number" placeholder="0" v-model="min">
                    </div>
                    <div>
                        <p>До:</p>
                        <input type="number" placeholder="10000"  v-model="max">
                    </div>
                </div>
                <div class="v-range" @change="sortPriceRange(min,max)">
                   <input 
                        type="range" 
                        min="0" 
                        max="10000" 
                        step="10" 
                        v-model.number="min"
                        @change="setRangeSlider()">
                   <input 
                        type="range" 
                        min="0" 
                        max="10000" 
                        step="10" 
                        v-model.number="max"
                        @change="setRangeSlider()">
                </div>
                <p class="v-size"></p>
            </div>

            <div class="v-line"></div>
            <div v-for="item in allFilter.length" :key="item">
                <div class="v-filter">
                    <div class="v-filter-container">
                        <div class="v-filter-name">
                            <h3>{{allFilter[item - 1].name}}</h3>
                            <img @click.prevent="menu = false" v-if="menu == true" src="../../assets/catalog/array.svg" class="v-filter-array" />
                            <img @click.prevent="menu = true" v-if="menu == false" src="../../assets/catalog/array.svg" class="v-filter-array trs" />
                        </div>
                        <div v-if="menu == true">
                            <div class="v-filter-box" 
                                v-for="item2 in JSON.parse(allFilter[item - 1].params).length" 
                                :key="item2">
                                <input 
                                    type="checkbox" 
                                    v-model="check" 
                                    id="gender_Female"
                                    :value="JSON.parse(allFilter[item - 1].params)[item2 - 1]">
                                <p>{{JSON.parse(allFilter[item - 1].params)[item2 - 1]}}</p>
                            </div>
                        </div>
                    </div>
                    <div class="v-line"></div>
                </div>
            </div>
            <div class="v-sidebar-btn">
                <button type="submit" @click.prevent="data()" class="v-btn-success">Применить</button>
                <button type="submit" @click.prevent="reset()" class="v-btn-reset">Сбросить фильтр</button>
            </div>
        </div>
    </div>
</template>

<script>
import Filter from "./filter/v-sidebar-filter.vue";
import {mapGetters, mapActions, mapMutations} from 'vuex'
import router from '@/router';

export default {
    components: {
        Filter
    },

    data() {
        return {
            params: [],
            menu: true,
            check: [],
            filter_menu: true,
            min: 0,
            max: 10000
        }
    },


    computed: mapGetters(["allFilter", "allCard"]),
    methods: {
        setRangeSlider() {
            if(this.min > this.max) {
                let tmp = this.max
                this.max = this.min
                this.min = tmp
            }
        },


        async sortPriceRange(min,max) {
            this.fetchFilterSortPrice({
                categories: this.$route.params.categories,
                min: min,
                max: max,
            })
        },
        ...mapActions(["fetchFilterCatelog", "fetchFilterSortPrice"]),
        ...mapMutations(["updatePage"]),
        async data() {
            let cate = ["new", "sale", "avail"];
            let sdd = []
            for (let index = 0; index < this.check.length; index++) {
                const element = this.check[index];
                sdd.push(element)
            }

            let query = {"brand": JSON.stringify(sdd).replace(/[\[\]]+/g,'')}

            for (let index = 0; index < cate.length; index++) {
                const element = cate[index];
                if(this.params.avail == true) {
                    query["avail"] = 1
                }
                
                else if(this.params.sale == true) {
                    query["sale"] = 1
                }
                
                else if(this.params.new == true) {
                    query["new"] = 1
                }  
            }

            this.updatePage(1)

            this.fetchFilterCatelog({
                categories: this.$route.params.categories,
                params: query
            })
        },

        async reset() {
            this.fetchFilterCatelog({
                categories: this.$route.params.categories
            })
            this.check = []
        }
    }
}
</script>

<style scoped>
@import url(./range-slider.css);
.filter_btn {
    cursor: pointer;
}

#switch{
  height: 0;
  width: 0;
  visibility: hidden;
}

label {
  cursor: pointer;
  text-indent: -9999px;
  width: 35px;
  height: 20px;
  background: grey;
  display: block;
  border-radius: 100px;
  position: relative;
}

label:after {
  content: '';
  position: absolute;
  top: 5px;
  left: 2px;
  width: 10px;
  height: 10px;
  background: #fff;
  border-radius: 90px;
  transition: 0.3s;
}

input:checked + label {
  background: #bada55;
}

input:checked + label:after {
  left: calc(100% - 5px);
  transform: translateX(-100%);
}

label:active:after {
  width: 20px;
}

.v-catalog-header-inner {
    display: flex;
    margin: 10px;
}

.v-catalog-header-inner > img {
    margin: 0px 20px;
}

.v-sidebar-background {
    width: 320px;
    background: #fff;
    border-radius: 12px;
    padding-bottom: 25px;
}

.v-sidebar-container {
    padding: 20px 40px;
}

.v-sidebar-all {
    display: flex;
    margin: 15px 0px;
}

.v-sidebar-all > input {
    margin-right: 10px;
    width: 18px;
    height: 18px;
}

.v-sidebar-nal {
    display: flex;
    justify-content: space-between;
}

.v-sidebar-all-product {
    color: #ACB0B3;
}

.v-line {
    width: 100%;
    height: 2px;
    background: #F6F6F6;
}

.v-sidebar-btn {
    display: grid;
    justify-content: center;
    margin-top: 40px;
}

.v-sidebar-btn button {
    margin: 10px 0px;
}

.v-btn-success {
    background: #8F00FF;
    padding: 15px 30px;
    color: #fff;
    border-radius: 50px;
    text-decoration: none;
    font-size: 16px;
    border: 0px;
    cursor: pointer;
    width: 200px;
}

.v-btn-reset {
    background: #fff;
    border: 0px;
    font-size: 16px;
    color: #8F00FF;
    font-weight: 600;
    cursor: pointer;
}

.v-filter-container {
    padding: 20px;
}

.v-filter-name {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;
}

.v-filter-array {
    cursor: pointer;
}

.trs {
    transform: rotate(180deg);
}

.v-filter-box {
    display: flex;
    margin: 20px 0px;
}

.v-filter-box > input {
    margin-right: 10px;
    width: 18px;
    height: 18px;
}

.v-filter-btn {
    border: 0px;
    background: #fff;
    font-size: 16px;
    color: #8F00FF;
    border-bottom: 2px dashed #8F00FF;
    cursor: pointer;
}

.v-line {
    width: 100%;
    height: 2px;
    background: #F6F6F6;
}

</style>