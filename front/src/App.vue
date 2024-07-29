<template>
  <Check18 />
  <Header />
  <MobileMenu />
  <router-view class="v-main"/>
  <Footer />
</template>

<style>
* {
  font-family: "Aeroport";
  padding: 0;
  margin: 0;
}

@font-face {
  font-family: "Aeroport";
  src: url("./Aeroport.ttf");
}

 ::-webkit-scrollbar {
    width: 9px;
    background-color: #000;
}

::-webkit-scrollbar-track {
    -webkit-box-shadow:  inset 0 0 4px rgba(0,0,0,0.1);
    background-color: #fff;
}

::-webkit-scrollbar-thumb {
    background-color: #8F00FF;
}

body {
  background: #F6F6F6;
}

.v-container {
  max-width: 1480px;
  margin: 0 auto;
}

.v-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.v-main {
  min-height: calc(100vh - 70px);
}
</style>

<script>
import Header from "./components/Header/v-header.vue";
import Footer from "./components/Footer/v-footer.vue";
import MobileMenu from "./components/Mobile/v-mobile-menu.vue";
import Check18 from "./components/UI/check18/v-check-18.vue";

export default {
  components: {
    Header,
    Footer,
    MobileMenu,
    Check18
  }
}
</script>