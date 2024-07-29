<template>
    <div class="v-delivery">
        <h2>3 Оплата</h2>
        <div class="v-card-delivery">
            <div class="v-card-text">
                <h3>При получении</h3>
                <p class="v-text">Наличными или картой при получении</p>
            </div>
            <img class="v-tick" src="../../assets/cart/tick.png" alt="">
        </div>
    </div>
</template>

<style scoped>
.v-tick {
    background: #8F00FF;
    padding: 7px;
    border-radius: 70px;
}

.v-delivery {
    background: #fff;
    border-radius: 12px;
    padding: 40px;
    width: 920px;
}

h2 {
    margin-bottom: 20px;
}

.v-delivery-text {
    color: #8F00FF;
    font-size: 18px;
    margin: 20px 0px;
}

.v-card-delivery {
    border: 2px solid #F6F6F6;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 400px;
}

.v-text {
    margin: 10px 0px;
    color: #ACB0B3;
}

@media (max-width: 1400px) {
    .v-delivery {
        width: 300px;
        padding: 15px;
    }

    .v-card-delivery {
        width: 240px;
    }
}
</style>