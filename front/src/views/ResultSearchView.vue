<template>
    <div class="v-container">
        <h2 class="v-result-name">Результат поиска</h2>
        <div class="v-catalog-background">
            <div class="v-catalog-product-inner">
                <h2 v-if="allSearch"></h2>
                <ProductCard
                    v-for="item in allSearch.length"
                    :data="allSearch[item - 1]"  
                    :key="item"
                />
                <div class="v-catalog-error" v-if="allSearch.length == 0">
                    <h2>Товар не найден!</h2>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import ProductCard from "../components/Catalog/card/v-product-card.vue";

export default {
    components: {
        ProductCard
    },

    computed: mapGetters(["allSearch", "allCard"]),

    methods: {
        ...mapActions(["fetchSearch"]),
    },

    async mounted() {
        await this.fetchSearch({
            search: this.$route.params.params,
        })
    },
}
</script>

<style scoped>
.v-result-name {
    font-size: 40px;
    margin: 20px 0px;
    font-weight: 300;
}

.v-catalog-product-inner {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    justify-content: left;
}

.v-catalog-error {
    padding: 20px;
}

.v-catalog-background {
    max-width: 1070px;
    width: 1070px;
    margin: 40px auto;
    background: #fff;
    border-radius: 12px;
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