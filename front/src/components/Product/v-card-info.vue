<template>
    <div class="v-card-other">
        <div class="v-card-slice">
            <h3 v-bind:class="{'v-card-active':(slice == false)} ">О товаре</h3>
            <!-- <h3 v-bind:class="{'v-card-active':(slice == true)} ">Наличие в магазинах <span class="v-card-shop-number">27</span></h3> -->
        </div>
        <div class="v-card-info">
            <h2>О товаре</h2>
            <div class="v-info-item">
                <h4>Внешний вид. Габариты</h4>
                <p align="justify">{{dataInfo.gabar}}</p>
            </div>
            <div class="v-info-item">
                <p align="justify">{{dataInfo.cartriter}}</p>
            </div>
            <div class="v-info-item">
                <h4>Управление и функционал</h4>
                <p align="justify">{{dataInfo.function}}</p>
            </div>
            <div class="v-info-item">
                <h4>Комплектация:</h4>
                <div v-if="dataInfo.complect">
                    <p>{{dataInfo.complect}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            slice: true
        }
    },

    props: {
        dataInfo: Object
    },
}
</script>

<style scoped>
.v-card-other {
    margin: 7ch 0px;
}

.v-card-slice {
    display: flex;
    justify-content: center;
    margin-bottom: 15px;
}

.v-card-active {
    color: #ACB0B3;
}

.v-card-slice > h3 {
    margin: 0px 40px;
    font-weight: 300;
    font-size: 22px;
    position: relative;
    cursor: pointer;
}

.v-card-shop-number {
    background: #ACB0B3;
    font-size: 14px;
    padding: 5px;
    border-radius: 60px;
    color: #fff;
    position: absolute;
    top: -10px;
    right: -35px;
}

.v-card-info {
    background: #fff;
    padding: 60px 60px;
    border-radius: 12px;
}

h2 {
    font-size: 44px;
    font-weight: 300;
}

.v-info-item {
    margin: 20px 0px;
}

.v-info-item > h4 {
    margin-bottom: 14px;
}

.v-info-item > p {
    line-height: 30px;
}

.v-info-item > div {
    line-height: 30px;
}
</style>