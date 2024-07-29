<template>
  <div class="v-home">
    <div class="v-home-container">
      <div class="v-home-catalog">
        <div class="v-home-catalog-inner">
          <router-link to="/catalog/Liquids" class="v-catalog-item">
            <img src="../assets/catalog/1.svg" alt="">
            <h3>Жидкости</h3>
          </router-link>
          <router-link to="/catalog/POD-Системы" class="v-catalog-item">
            <img src="../assets/catalog/2.svg" alt="">
            <h3>POD-Системы</h3>
          </router-link>
          <router-link to="/catalog/Odnorazki" class="v-catalog-item">
            <img src="../assets/catalog/3.svg" alt="">
            <h3>Одноразки</h3>
          </router-link>
          <router-link to="/catalog/Hookahs" class="v-catalog-item">
            <img src="../assets/catalog/4.svg" alt="">
            <h3>Кальяны</h3>
          </router-link>
        </div>
        <div class="v-home-catalog-inner">
          <router-link to="/catalog/Tobacco" class="v-catalog-item">
            <img src="../assets/catalog/5.svg" width="266" height="266" alt="">
            <h3>Табак и уголь</h3>
          </router-link>
          <router-link to="/catalog/POD_accessories" class="v-catalog-item">
            <img src="../assets/catalog/6.svg" width="266" height="266" alt="">
            <h3>Комплектующие к POD</h3>
          </router-link>
          <router-link to="/catalog/Accessories_hookah" class="v-catalog-item">
            <img src="../assets/catalog/7.svg" width="266" height="266" alt="">
            <h3>Комплектующие к кальяну</h3>
          </router-link>
          <router-link to="/catalog/Accessories" class="v-catalog-item">
            <img src="../assets/catalog/8.svg" width="266" height="266" alt="">
            <h3>Аксессуары</h3>
          </router-link>
        </div>
      </div>
      <NewProduct title="Новинки" all="Смотреть все" array="left" class="v-new-product-home" />
      <div class="v-home-info">
        <div class="v-home-inner">
          <div class="v-info-item">
            <img src="../assets/info/1.svg" alt="">
            <div class="v-info-data">
              <h3>Расположение магазинов</h3>
              <p>У нас магазины расположенные в каждом<br> 
              районе города. Мы стараемся быть ближе к<br>
              нашим клиентам, чтобы радовать их<br>
              приятными покупками</p>

            </div>
          </div>
          <div class="v-info-item">
            <img src="../assets/info/2.svg" alt="">
            <div class="v-info-data">
              <h3>Огромный выбор!</h3>
              <p>Грамотно подобранный каталог<br>
              товаров дает возможность не искать<br>
              необходимые товары, а купить все в<br>
              одном месте по выгодной цене</p>
            </div>
          </div>
          <div class="v-info-item">
            <img src="../assets/info/3.svg" alt="">
            <div class="v-info-data">
              <h3>Мы заботимся о вас</h3>
              <p>В наших магазинах можно не только<br>
              найти все для парения, мы также,<br>
              готовы оказать любую<br>
              квалифицированную помощь при<br>
              выборе или обслуживании Вашего<br>
              устройства.</p>
            </div>
          </div>
        </div>
      </div>
      <div class="v-home-map"></div>
      <div class="v-home-map-mobile">
        <div style="position:relative;overflow:hidden;"><a href="https://yandex.ru/maps/48/orenburg/search/Parilka/?utm_medium=mapframe&utm_source=maps" style="color:#eee;font-size:12px;position:absolute;top:0px;">Parilka в Оренбурге</a><a href="https://yandex.ru/maps/48/orenburg/?utm_medium=mapframe&utm_source=maps" style="color:#eee;font-size:12px;position:absolute;top:14px;">Оренбург</a><iframe src="https://yandex.ru/map-widget/v1/?display-text=Parilka&ll=55.243786%2C51.847002&mode=search&sctx=ZAAAAAgBEAAaKAoSCYMXfQVpjEtAEfPoRlhU4klAEhIJaAQb178r9D8RRmCsb2By3T8iBgABAgMEBSgKOABAjooGSAFiEmxldG9fdl9nb3JvZGU9dHJ1ZWoCcnWdAc3MTD2gAQCoAQC9AacjwPTCARz72rif0gS9qvSz%2BQL6lYCRjAHLpqfdS5HjwpEs6gEA8gEA%2BAEAggIaKChjaGFpbl9pZDooMjk5NTA0OTg0OTgpKSmKAgCSAgCaAgxkZXNrdG9wLW1hcHM%3D&sll=55.243786%2C51.847002&sspn=1.260681%2C0.459298&text=%7B%22text%22%3A%22Parilka%22%2C%22what%22%3A%5B%7B%22attr_name%22%3A%22chain_id%22%2C%22attr_values%22%3A%5B%2229950498498%22%5D%7D%5D%7D&z=11" width="300" height="200" frameborder="1" allowfullscreen="true" style="position:relative;"></iframe></div>
      </div>
    </div>
  </div>
</template>

<script>
import NewProduct from "../components/NewProduct/v-new-product.vue";
import axios from 'axios'
import host from '../config'

export default {
  components: {
    NewProduct
  },

  mounted() {
    this.map()
    window.scrollBy({
        top: -window.pageYOffset,
        left: 0
    });
  },

  methods: {
    async map() {
      const result = await axios.get(`${host}/maps`,{
        params: {
          id: 1
        }
      })
      const map = document.querySelector(".v-home-map")
      map.innerHTML = result.data.maps
    }
  },
}
</script>

<style scoped>
.v-home-catalog, .v-home-container {
  max-width: 1300px;
  margin: 50px auto;
}

.v-home-catalog-inner {
  display: flex;
  justify-content: space-between;
  margin: 20px 0px;
}

.v-catalog-item {
  text-align: center;
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  text-decoration: none;
  transition: .3s;
}

.v-catalog-item > h3 {
  color: #000;
}

.v-catalog-item:hover {
  background: #d8d8d8;
}

.v-home-inner {
  display: flex;
  justify-content: space-around;
}

.v-home-info {
  background: #fff;
  padding: 20px;
  border-radius: 12px;
}

.v-info-item {
  display: flex;
  align-items: flex-start;
  margin-top: 30px;
}

.v-info-item > img {
  margin-right: 20px;
}

.v-info-data > h3 {
  margin-bottom: 20px;
}

.v-home-map {
  text-align: center;
  margin: 20px 0px;
  display: block;
}

.v-home-map-mobile {
  display: none;
}

@media (max-width: 1400px) {
    .v-home-map {
      display: none;
    }

    .v-home-map-mobile {
      display: block;
      text-align: center;
      margin: 20px 0px;
    }

    .v-home-catalog-inner {
        display: flex;
        flex-wrap: wrap;
        align-content: flex-start;
        margin: 0px 30px;
    }

    .v-catalog-item {
        margin: 20px 20px;
    }

    .v-home-inner {
      display: grid;
    }

    .v-new-product-home {
      margin: 0px 20px;
    }

    .v-home-info {
      margin: 30px 0px;
    }

    iframe {
      margin: 0px 20px;
    }

    .v-home-catalog-inner {
        justify-content: center;
    }
}

@media (max-width: 740px) {
    .v-home-catalog-inner {
        justify-content: center;
    }
}
</style>