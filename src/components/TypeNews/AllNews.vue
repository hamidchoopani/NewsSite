<template>

    <div class="btnTypeNews">
        <v-btn v-if="currentLang=='en'" class="text-orange mr-5" variant="text" @click="allNews()">All News</v-btn>
        <v-btn v-else class="text-orange mr-5" variant="text" @click="allNews()">همه ی خبر ها</v-btn>
        <v-btn class="text-orange mr-5" variant="text" v-for="newsType in allNewsType" :key="newsType.Typeid">
            <div color="orange" @click="NewsTypeFilter(newsType.title)">{{ newsType.title }}</div>
        </v-btn>
    </div>
    <v-divider></v-divider>
    <v-progress-circular v-if="loading" indeterminate :size="50" color="primary" :width="5"></v-progress-circular>

    <v-container v-else>
        <div class="Newslayout">
            <v-btn variant="text" v-bind:class="{ 'active': layout == 'grid' }" v-on:click="layout = 'grid'" icon>
                <v-icon>mdi-apps</v-icon>
                <v-tooltip activator="parent" location="top">Grid</v-tooltip>
            </v-btn>

            <v-btn class="ml-2" variant="text" :class="{ 'active': layout == 'list' }" v-on:click="layout = 'list'"
                icon>
                <v-icon>mdi-view-list</v-icon>
                <v-tooltip activator="parent" location="top">List</v-tooltip>
            </v-btn>
        </div>

        <!-- <div v-if="AllNews.length">hamid</div>
        <div v-else>hoshyar</div> -->
        <div v-if="AllNews.length">
            <v-row v-if="layout == 'list'" class="listTR" no-gutters>
                <v-progress-circular v-if="loading" indeterminate :size="50" color="primary"
                    :width="5"></v-progress-circular>
                <v-col v-else class="pa-2" cols="12" sm="4" v-for="news in AllNews" :key="news.id">
                    <!-- class="mx-auto" max-width="400" :lazy-src="n.img"-->
                    <v-card darkcard class="listTC">
                        <v-img class="align-end text-white listTI" height="200" :src="news.img" :lazy-src="news.img"
                            aspect-ratio="1" cover>
                            <!-- <v-card-title>Top 10 Australian beaches</v-card-title> -->
                        </v-img>
                        <div class="changeP" :class="{ 'textLeft': currentLang=='en', 'textRight': currentLang=='fa' }">
                            <v-card-subtitle class="pt-4">
                                {{ news.subTitle }}
                            </v-card-subtitle>

                            <v-card-text>
                                {{ news.title }}
                            </v-card-text>

                            <!-- <router-link :to="{ name: 'DescriptionNews', params: { id: n.id } }"> -->
                            <router-link @click="newsDetail(news.id)"
                                :to="{ name: 'NewsDescription', params: { id: news.id } }">
                                <v-card-actions class="DescriptionForList">
                                    <v-btn variant="outlined" color="orange">
                                        Description
                                    </v-btn>
                                </v-card-actions>
                            </router-link>
                        </div>
                    </v-card>
                </v-col>
            </v-row>

            <v-row v-if="layout == 'grid'" no-gutters>
                <v-progress-circular v-if="loading" indeterminate :size="50" color="primary"
                    :width="5"></v-progress-circular>

                <v-col v-else class="pa-2" cols="12" sm="4" v-for="news in AllNews" :key="news.id">
                    <!-- class="mx-auto" max-width="400" -->
                    <v-card darkcard>

                        <v-img class="align-end text-white" height="200" :src="news.img" aspect-ratio="1" cover
                            :lazy-src="news.img">

                            <!-- <v-card-title>Top 10 Australian beaches</v-card-title> -->
                        </v-img>
                        <div :class="{ 'textLeft': currentLang=='en', 'textRight': currentLang=='fa' }">

                            <v-card-subtitle class="pt-4">
                                {{ news.subTitle }}
                            </v-card-subtitle>

                            <v-card-text>
                                {{ news.title }}
                            </v-card-text>

                            <router-link v-if="currentLang=='en'" @click="newsDetail(news.id)"
                                :to="{ name: 'NewsDescription', params: { id: news.id } }"
                                :class="{ 'btnLeft': currentLang=='en' }">
                                <v-card-actions>
                                    <v-btn color="orange">
                                        Description
                                    </v-btn>
                                </v-card-actions>
                            </router-link>
                            <router-link v-else @click="newsDetail(news.id)"
                                :to="{ name: 'NewsDescription', params: { id: news.id } }"
                                :class="{ 'btnRight': currentLang=='fa' }">
                                <v-card-actions>
                                    <v-btn color="orange">
                                         توضیحات بیشتر
                                    </v-btn>
                                </v-card-actions>
                            </router-link>
                        </div>
                    </v-card>
                </v-col>
            </v-row>

            <v-divider></v-divider>
            <div class="text-center">
                <v-pagination v-model="page" :length="pagesCount" rounded="circle"
                    @click="pageination(page)"></v-pagination>
            </div>
        </div>
        <div v-else>
            <v-alert closable title="No news found" text="The news you searched for was not found" type="warning"
                variant="outlined"></v-alert>
        </div>
    </v-container>

</template> 

<script setup>
import { ref, watch } from 'vue';
import { useNewsStore } from '@/store/News'
import { storeToRefs } from 'pinia';

let layout = ref('grid');

const newsStore = useNewsStore()

const { AllNews, page, pagesCount, loading, allNewsType, currentLang } = storeToRefs(newsStore)

newsStore.getNews()
newsStore.getNewsType()
watch(currentLang, () => {
    if (currentLang.value == 'en') {
        newsStore.getNewsType()
    } else {
        newsStore.getNewsTypeFa()
    }
})
const newsDetail = (id) => {
    newsStore.getSingleNews(id)
}


const pageination = (value) => {
    newsStore.getNews(value)
}

const NewsTypeFilter = (newsType) => {
    newsStore.allNewsTypeFilter(newsType)
    
}
const allNews = () => {
    if(currentLang.value == 'en'){
        newsStore.getAllNewsbyfilterBtn()
    }else{
        newsStore.getAllNewsbyfilterBtnFa()
    }
}



</script>



<style scoped>
@font-face {
    font-family: iranSans;
    src: url('@/assets/font/IRANSans.ttf');
}

* {
    font-family: iranSans;
}

.textLeft{
  text-align: left;
}
.textRight{
  text-align: right;
}
.btnLeft{
    display: flex;
    justify-content: left;
}
.btnRight{
    display: flex;
    justify-content: right;
}

.v-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(370px, 320px));
    grid-gap: 1rem;
}

.v-col{
    width: auto;
    height: 416px !important;
}
@media (min-width: 600px) {
    .v-col-sm-4 {
        flex: 0 0 33.3333333333% !important;
        max-width: 100% !important;
    }
}

.changeP {
    display: grid;
    align-items: center;
    width: 66%;
}

.DescriptionForList {
    justify-content: end;
}

.listTI {
    max-width: 400px;
}

.listTC {
    display: flex;
    justify-content: space-between;
    text-align: left;
}

.listTR {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(700px, 1fr));
    grid-gap: 1rem;
}

a {
    text-decoration: none;
}

.Newslayout {
    display: flex;
    flex-direction: row;
    justify-content: end;
    margin: 10px;
}

.v-divider {
    margin-top: 15px;
}

.card {
    grid-gap: 15px 0;
}

@media screen and (max-width: 407px) {
    .btnTypeNews {
        display: grid;
    }
}

.btnTypeNews {
    margin-top: 70px;
}
</style>