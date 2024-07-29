<template>
    <div class="v-filter">
        <div class="v-filter-container">
            <div class="v-filter-name">
                <h3>{{data.name}}</h3>
                <img @click.prevent="menu = false" v-if="menu == true" src="../../../assets/catalog/array.svg" class="v-filter-array" />
                <img @click.prevent="menu = true" v-if="menu == false" src="../../../assets/catalog/array.svg" class="v-filter-array trs" />
            </div>
            <div v-if="menu == true">
                <div class="v-filter-box" 
                    v-for="item in JSON.parse(data.params).length" 
                    :key="item">
                    <input 
                    type="radio" 
                    name="gender" 
                    id="gender_Female"
                    v-model="params"
                    @click.prevent="datav(JSON.parse(data.params)[item - 1])"
                    :value="JSON.parse(data.params)[item - 1]">
                    <p>{{JSON.parse(data.params)[item - 1]}}</p>
                </div>
                <!-- <button class="v-filter-btn" type="submit">Показать еще 21</button> -->
            </div>
        </div>
        <div class="v-line"></div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            menu: true,
            params: []
        }
    },
    
    props: {
        data: Object
    }
}
</script>

<style scoped>
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