<template>
  <v-carousel hide-delimiters cycle progress="orange">
    <!-- <v-lazy  :options="{ threshold: 1 }"
      transition="scale-transition"> -->
      <v-carousel-item  v-for="news in getAllImageNews" :key="news.id" :lazy-src="news.img" :src="news.img" cover>
        <div class="devcarousel" :class="{'devcarouselFa' : currentLang=='fa'}">
          <router-link @click="newsDetail(news.id)" :to="{ name: 'NewsDescription', params: { id: news.id } }">
            <v-card-title class="maro text-black">{{ news.subTitle }}</v-card-title>
          </router-link>
        </div>
      </v-carousel-item>
    <!-- </v-lazy> -->
  </v-carousel>
</template>

<script setup>
import { watch } from "vue";
import { useNewsStore } from '@/store/News'
import { storeToRefs } from 'pinia';

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
.devcarouselFa{
  text-align: right;
}

a {
  /* position: absolute; */
  text-decoration: none;
}
</style>