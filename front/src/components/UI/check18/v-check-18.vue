<template>
    <div class="v-check-18-back" v-if="open == true">
        <div class="v-check-18">
            <div class="v-close" @click.prevent="no()">✖</div>
            <h2>Вам уже есть 18 лет?</h2>
            <p>Продукция, представленная на сайте, предназначена для лиц, достигших 18-летнего возраста</p>
            <div class="v-check-18-btn">
                <button class="v-btn-no" @click.prevent="no()">Нет</button>
                <button class="v-btn-yes" @click.prevent="yes()">Да</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            open: true
        }
    },

    mounted() {
        let check = sessionStorage.getItem("check_18")
        if(check == "true") {
            this.open = false
        } else {
            this.open = true
            document.body.style.overflow = "hidden"
        }
    },

    methods: {
        yes() {
            sessionStorage.setItem("check_18", true)
            this.open = false
            document.body.style.overflow = "scroll"
        },

        no() {
            location.href = "https://yandex.ru"
        }
    },
}
</script>

<style scoped>
.v-check-18-back {
    position: fixed;
    width: 100%;
    height: 100%;
    background: #a7a7a728;
    z-index: 99999;
    top: 0px;
}

.v-check-18 {
    background: #fff;
    position: absolute;
    width: 500px;
    height: 230px;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    text-align: center;
    border-radius: 12px;
    top: 100px;
}

h2 {
    margin-top: 30px;
    font-size: 28px;
}

p {
    font-size: 17px;
    margin: 20px 20px;
}

.v-check-18-btn > button {
    padding: 5px 25px;
    border-radius: 40px;
    margin: 0px 20px;
    border: 0px;
    font-size: 18px;
    cursor: pointer;
}

.v-btn-yes {
    background: #8F00FF;
    color: #fff;
}


.v-close {
    position: absolute;
    right: 20px;
    top: 15px;
    background: #e4e4e4;
    padding: 10px 15px;
    border-radius: 60px;
    cursor: pointer;
    font-size: 14px;
}

@media (max-width: 1400px) {
    .v-check-18  {
        width: 280px;
        height: 200px;
    }

    .v-close {
        padding: 3px 7px;
        font-size: 10px;
    }

    h2 {
        margin-top: 30px;
        font-size: 17px;
    }

    p {
        font-size: 13px;
        margin: 20px 20px;
    }

    .v-check-18-btn > button {
        font-size: 14px;
    }
}

</style>