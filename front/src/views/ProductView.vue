<template>
    <div class="v-product">
        <div class="v-container">
            <CrumbProduct 
                :categories="Card.categories_id" 
                :title="Card.name" />
            <Card 
                :dataCard="Card"
            />
            <CardInfo
                :dataInfo="CardInfo"
            />
            <NewProduct 
                title="Вас могут заинтересовать"
                array="right"/>
            
        </div>
    </div>
</template>

<script>
import CrumbProduct from "../components/Crumb/v-crumb-product.vue";
import Card from "../components/Product/v-card.vue";
import NewProduct from "../components/NewProduct/v-new-product.vue";
import CardInfo from "../components/Product/v-card-info.vue";
import axios from "axios";
import router from "../router/index";
import host from "../config";
import {mapGetters, mapActions} from 'vuex'

export default {
    computed: mapGetters(["Card", "CardInfo"]),
    methods: mapActions(["fetchCard"]),
    data() {
        return {
            name_categories: ""
        }
    },

    updated() {
        document.title = this.Card.name
    },

    async mounted() {
        this.fetchCard({
            categories: this.$route.params.categories,
            id: this.$route.params.id,
        })
        window.scrollBy({
            top: -window.pageYOffset,
            left: 0
        });

        router.beforeEach((to, from, next) => {
            document.title = this.Card.name;
            next();
        });
    },

    components: {
        CrumbProduct,
        Card,
        NewProduct,
        CardInfo
    }
}
</script>
