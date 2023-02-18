<template>
  <v-progress-circular v-if="loading" indeterminate :size="50" color="primary" :width="5"></v-progress-circular>
  <section id="blog" v-else>
    <div class="blog-box">
      <div class="blog-image">

        <v-breadcrumbs>
          <v-icon class="pr-2" size="small" icon="mdi-call-split"></v-icon>
          <router-link :to="{ name: 'Home' }">
            <span class="pr-2 news">News</span>
          </router-link>
          <span class="pr-2">/</span>
          <span class="text-grey">Description</span>
        </v-breadcrumbs>

        <img class="dew" :src="newsDetail.img" alt="Blog" />
        <span class="d-flex">count like</span>
        <v-btn @click="likeNews" :disabled="!checkuser" class="ma-60 maoro" variant="text" icon="mdi-thumb-up"
          color="blue-lighten-2"></v-btn>
        <v-btn class="like text-green mr-7" variant="plain">{{ countLike }}</v-btn>
        <v-btn class="dislike text-red" variant="plain">{{ countDislike }}</v-btn>
        <v-btn @click="dislikeNews" :disabled="!checkuser" class="ma-2 maoro" variant="text" icon="mdi-thumb-down"
          color="red-lighten-2"></v-btn>
        <v-chip-group selected-class="text-primary" column>
          <v-chip v-for="tag in newsDetail.tag" :key="tag">
            <span @click="filterByTag(tag)">{{ tag }}</span>
          </v-chip>
        </v-chip-group>

      </div>
      <v-divider vertical></v-divider>
      <div class="blog-details">
        <h4>{{ newsDetail.subTitle }}</h4>
        <p>{{ newsDetail.title }}</p>
        <p>{{ newsDetail.description }}</p>
        <p>Source: <a href="https://edition.cnn.com/">{{ newsDetail.source }}</a></p>
        <!-- <a href="#">Continue reading</a> -->
      </div>
    </div>
  </section>

  <!-- comments -->

  <NewsComment />
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router';
import { useNewsStore } from '@/store/News'
import { storeToRefs } from 'pinia';
import NewsComment from "./NewsComment.vue";
import { useAccountStore } from '@/store/AccountUser'
import router from '@/router/routes'

let clicked = ref(false)
clicked.value = localStorage.getItem('colorIcon');
const route = useRoute();
const NewsId = route.params.id;

const newsStore = useNewsStore()
const userStore = useAccountStore()

const { newsDetail, loading, countLike, countDislike, currentLang } = storeToRefs(newsStore)

const { checkuser } = storeToRefs(userStore)

newsStore.getSingleNews(NewsId)

newsStore.getNewsComments(NewsId)

newsStore.getLikeComment(NewsId)

newsStore.getDislikeComment(NewsId)
const filterByTag = (tag) => {
  if (currentLang.value == 'en'){
    newsStore.filterNewsByTag(tag)
  }else{
    newsStore.filterNewsByTagFa(tag)
  }
}

watch(currentLang, () => {
  if (currentLang.value == 'fa') {
    console.log(NewsId);
    newsStore.getSingleNewsFa(NewsId)
  } else {
    newsStore.getSingleNews(NewsId)
  }
})

const likeNews = () => {
  newsStore.likeTheNews(NewsId)
}
const dislikeNews = () => {
  newsStore.disLikeTheNews(NewsId)
}

</script>


<style scoped>
/* new  */
@import url("https://fonts.googleapis.com/css2?family=Caudex&display=swap");

* {
  font-family: "Caudex", serif;
}

a {
  text-decoration: none;
}

.v-divider {
  padding: 0 10px;
}

#blog {
  padding: 5rem 2rem;
}

.like {
  cursor: pointer;
}

.dislike {
  cursor: pointer;
}

#blog .blog-box {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  width: 100%;
  position: relative;
  padding-bottom: 6rem;
}

#blog .blog-box .blog-image {
  width: 50%;
}

#blog .blog-box .blog-image img {
  width: 100%;
  -o-object-fit: cover;
  object-fit: cover;
}

#blog .blog-box h1 {
  position: absolute;
  top: -7.5rem;
  left: 0;
  font-size: 5rem;
  font-weight: 500;
  color: #4cb0b0;
}

#blog .blog-details {
  width: 50%;
  padding: 0 0 0 3rem;
}

#blog .blog-details a {
  text-decoration: none;
  position: relative;
  background-image: -webkit-gradient(linear,
      left top,
      right top,
      from(red),
      to(blue));
  background-image: linear-gradient(90deg, red, blue);
  background-size: 0% 3px;
  background-repeat: no-repeat;
  background-position: left bottom;
  -webkit-transition: background-size 300ms ease;
  transition: background-size 300ms ease;
}

#blog .blog-details a:hover {
  background-size: 100% 3px;
}

#blog .blog-details a:hover::after {
  background-image: -webkit-gradient(linear,
      left top,
      right top,
      from(red),
      to(blue));
  background-image: linear-gradient(90deg, red, blue);
  background-size: 0% 3px;
  background-repeat: no-repeat;
  background-position: left bottom;
  -webkit-transition: background-size 300ms ease;
  transition: background-size 300ms ease;
  background-size: 100% 3px;
}

@media screen and (max-width: 992px) {
  #blog .blog-box {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
  }

  #blog .blog-box .blog-image {
    width: 100%;
    padding: 0;
  }

  #blog .blog-details {
    width: 100%;
    padding: 0;
  }
}

.blog-details p {
  padding-bottom: 20px;
  padding-top: 20px;
}

.maoro {
  transform: translateX(-10px);
}
</style>