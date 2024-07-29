<template>
    <div class="v-catalog-main">
        <div class="v-catalog-inner">
            <CatalogSideBar />      
            <CatalogProduct />
        </div>        
    </div>
</template>

<style scoped>

.v-catalog-main {
    margin-bottom: 20px;
}

.v-catalog-inner {
    display: flex;
    justify-content: space-between;
}

@media (max-width:1400px) {
    .v-catalog-inner {
        display: grid;
        justify-content: center;
    }
}

</style>

<script>
import CatalogProduct from "./v-catalog-product.vue";
import CatalogSideBar from "./v-catalog-sidebar.vue";

export default {
    components: {
        CatalogProduct,
        CatalogSideBar
    }
}
</script>