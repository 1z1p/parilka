<template>
    <div class="v-catalog">
        <div class="v-catalog-container">
            <div class="v-catalog-logo">
                <h2> {{allCatalog.categories_name}} </h2>
                <img :src="allCatalog.image" alt="">
            </div>
            <CatalogMain />
        </div>
    </div>
</template>

<script>
import CatalogMain from '../components/Catalog/v-catalog-main.vue'
import {mapGetters, mapActions} from 'vuex'

export default {
    components: {
        CatalogMain
    },

    computed: mapGetters(["allCatalog"]),
    methods: mapActions(["fetchCatalog", "fetchFilter"]),
    async mounted() {
        this.fetchCatalog({
            categories: this.$route.params.categories,
        })

        this.fetchFilter({
            categories: this.$route.params.categories
        })
    }
}
</script>

<style scoped>
.v-catalog-container {
    max-width: 1429px;
    margin: 0 auto;
}

.v-catalog-logo {
    position: relative;
    margin-bottom: 40px;
}

.v-catalog-logo > h2 {
    position: absolute;
    left: 50px;
    top: 50px;
    font-size: 54px;
}

@media (max-width: 1400px) {
    .v-catalog-logo {
        max-width: 340px;
        margin: 0 auto;
    }

    .v-catalog-logo > h2 {
        font-size: 24px;
        top: 0px;
        left: 0px;
    }

    .v-catalog-logo > img {
        width: 340px;
        margin-top: 34px;
    }
}
</style>