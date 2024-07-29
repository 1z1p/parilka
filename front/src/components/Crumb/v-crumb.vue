<template>
    <div class="v-crumb">
        <p><router-link class="v-crumb-link" to="/">Главная</router-link> / <span class="v-crumb-list">{{title}}</span></p>
    </div>
</template>

<script>
export default {
    props: {
        title: String
    }
}
</script>

<style scoped>
.v-crumb {
    margin: 30px 0px;
}

.v-crumb > p {
    color: #BEC4C7;
}

.v-crumb-link {
    color: #BEC4C7;
    text-decoration: none;
}

.v-crumb-link, .v-crumb-list {
    margin: 0px 15px;
}
</style>