<template>
  <swiper class="mySwiper">
    <swiper-slide><img src="../assets/Sport/Lionel-Messi.png" alt=""></swiper-slide>
    <swiper-slide><img src="../assets/Sport/messi-cup.jpg" alt=""></swiper-slide>
    <swiper-slide><img src="../assets/Sport/messi.jpg" alt=""></swiper-slide>
    <swiper-slide><img src="../assets/Sport/messiAndronaldo.jpg" alt=""></swiper-slide>
  </swiper>
</template>

<script setup>
import { watch } from "vue";
import { useNewsStore } from '@/store/News'
import { storeToRefs } from 'pinia';

  // Import Swiper Vue.js components
  import { Swiper, SwiperSlide } from 'swiper/vue';

  // Import Swiper styles
  import 'swiper/css';


const newsStore = useNewsStore()
const { getAllImageNews, currentLang } = storeToRefs(newsStore)
const newsDetail = (id) => {
  newsStore.getSingleNews(id)
}

watch(currentLang, () => {
  if (currentLang.value == 'fa') {
    newsStore.getImageNewsFa()
  } else {
    newsStore.getImageNews()
  }
})
newsStore.getImageNews()


</script>
<style scoped>



.swiper {
  width: 100%;
  height: 100%;
}
.mySwiper{
  height: 40%
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  /* background: #fff; */

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}







.textLeft {
  text-align: left;
}

.textRight {
  text-align: right;
}

/* slider */
.v-carousel {
  margin-top: 15px;
  margin-bottom: 45px;
}

.devcarousel {
  justify-content: center;
  background-color: rgb(250 207 57 / 63%);
  width: 100%;
  height: 55px;
  transform: translateY(28rem);
}

a {
  /* position: absolute; */
  text-decoration: none;
}
</style>