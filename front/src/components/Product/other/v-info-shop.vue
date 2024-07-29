<template>
     <div class="v-data-shop">
            <h3> {{title}} </h3>
            <div class="v-shop-data">
                <img width="20" height="20" :src="image" alt="">
                <div>
                    <h4> {{text_shop}} </h4>
                    <p v-if="!click"> {{text_other}} </p>
                    <router-link class="v-shop-link" to="/guarante" v-if="click== true"> {{text_other}} </router-link>
                </div>
            </div>
        </div>
</template>

<script>
export default {
    props: {
        title: String,
        image: String,
        text_shop: String,
        text_other: String,
        click: String
    }
}
</script>


<style scoped>
.v-data-shop {
    margin: 20px 0px;
}

.v-shop-data {
    display: flex;
    margin: 20px 0px;
}

.v-data-shop > h3, .v-shop-data > div > h4 {
    font-weight: 300;
}

.v-shop-data > img {
    margin-right: 10px;
}

.v-shop-data > div > p {
    color: #BEC4C7;
    margin: 10px 0px;
}

.v-shop-link {
    text-decoration: none;
    color: #BEC4C7;
    margin: 10px 0px;
}
</style>