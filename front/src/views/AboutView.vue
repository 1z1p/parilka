<template>
  <div class="v-about">
    <div class="v-container">
      <Crumb title="Наша компания" />
      <h2>О нас</h2>
      <div class="v-about-card">
        <h3>Наша компания</h3>
        <p align="justify">Компания PARilka – это сеть магазинов электронных сигарет и кальянов, где всегда можно купить только качественные товары по самым низким ценам. 
        Мы ценим своих клиентов, и Вы всегда можете рассчитывать на внимание со стороны наших сотрудников, а также, помощь при выборе устройства или вкусной жидкости. А по-настоящему широкий ассортимент – гарантия того, что здесь каждый сможет найти что-то для себя.</p>
        <h3> Всегда большой выбор</h3>
        <p align="justify"> parilka56.ru – это полноценный интернет-магазин с актуальными ценами и информацией о наличии товаров. В нем всегда можно найти все для вейпинга и кальяна, не выходя из дома.
        Широкий каталог включает оригинальные бокс-моды, стартовые наборы, популярные POD-системы, а также все комплектующие и аксессуары.</p>
        <div class="v-btn">
          <router-link class="v-about-btn" to="/">Перейти в каталог</router-link>
        </div>
        <h3>Узнавайте первыми обо всех новинках!</h3>
        <p align="justify">Мы тщательно отбираем лучшие товары и помогаем сделать правильный выбор. Ассортимент магазина постоянно расширяется, где каждый девайс или атомайзер имеет
        развернутое описание и подробный список характеристик.</p>
        <h3>Мы всегда открыты для Вас!</h3>
        <p align="justify">Удобная навигация по сайту сделает поиск максимально удобным, а отзывчивый персонал всегда будет рад Вам помочь.</p>
        <div class="v-btn">
          <router-link class="v-about-btn" to="/contact">Наши контакты</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Crumb from "../components/Crumb/v-crumb.vue";

export default {
    components: {
        Crumb
    }
}
</script>

<style scoped>
.v-about {
    margin-bottom: 50px;
}

.v-about-card {
  background: #fff;
  padding: 5px 40px;
  border-radius: 12px;
}

h2 {
    font-size: 40px;
    margin: 20px 0px;
    font-weight: 300;
}

h3 {
    font-weight: 300;
    font-size: 30px;
    margin-top: 35px;
}

p {
    color: #ACB0B3;
    margin: 20px 0px;
}

.v-btn {
  margin: 40px 0px;
}

.v-about-btn {
    background: #8F00FF;
    padding: 15px 30px;
    color: #fff;
    border-radius: 50px;
    font-size: 14px;
    text-decoration: none;
}

@media (max-width: 1400px) {
  h2 {
    margin-left: 10px;
  }
}
</style>