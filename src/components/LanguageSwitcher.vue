<template>
  <select @change="switchLanguage">
    <option v-for="sLocale in supportedLocales" :key="`locale-${sLocale}`" :value="sLocale"
      :selected="locale === sLocale">
      <span> {{ t(`locale.${sLocale}`) }}</span>
    </option>
  </select>

</template>

<script setup>
import { useI18n } from 'vue-i18n'
import Tr from "@/i18n/translation"

import { useNewsStore } from '@/store/News'
import { storeToRefs } from 'pinia';

const newsStore = useNewsStore()

const { t, locale } = useI18n()
const supportedLocales = Tr.supportedLocales

const switchLanguage = async (event) => {
  const newLocale = event.target.value
  await Tr.switchLanguage(newLocale)

  // if (newLocale === 'en') {
  //   newsStore.getNews()
  // } else if (newLocale === 'fa') {
  //   newsStore.getNewsFa()
  // }
}
// console.log(localStorage.getItem('user-locale'));

</script>