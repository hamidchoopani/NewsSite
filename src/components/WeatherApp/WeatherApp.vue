<template>
  <div id="app" :class="typeof weather.main != 'undefined' && weather.main.temp > 18 ? 'warm' : ''">
    <main class="hero">
      <div class="search-box">
        <input type="text" class="search-bar" placeholder="Search Cuntry..." v-model="city" />
        <v-btn icon="mdi-magnify" color="primary" @click="searchCity()"></v-btn>
      </div>
      <div v-if="loading" class="loading">
        <v-progress-circular indeterminate :size="50" color="primary" :width="5"></v-progress-circular>
      </div>
      <div v-else class="weather-wrap" v-if="typeof weather.main != 'undefined'">
        <div class="location-box">
          <div class="location"> {{ weather.name }} , {{ weather.sys.country }}</div>
          <div class="date"> {{ dateBuilder() }}</div>
        </div>
        <div class="weather-box">
          <div class="temp"> {{ Math.round(weather.main.temp) }} °C</div>
          <div class="weather"> {{ weather.weather[0].main }}</div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity"
import { useWeatherStore } from '@/store/Weather'
import { storeToRefs } from 'pinia';

let city = ref('')

const weatherStore = useWeatherStore()

const { weather, loading } = storeToRefs(weatherStore)

const searchCity = () => {
  weatherStore.getWeather(city.value)
  city.value = ''
}

const dateBuilder = () => {
  let d = new Date();
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
</script>

<style scoped>
.hero {
  height: 180px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.loading {
  display: flex;
  justify-content: center;
}

#app {
  width: 900px;
  background-image: url('../../assets/weatherApp/winter.jpg');
  background-size: cover;
  background-position: bottom;
  transition: 0.4s;
}

#app.warm {
  background-image: url('../../assets/weatherApp/Summer.jpg');
}

main {
  min-height: 100vh;
  padding: 25px;

  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.75));
}

.search-box {
  width: 100%;
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.search-box .search-bar {
  display: block;
  width: 90%;
  padding: 15px;

  color: #313131;
  font-size: 20px;

  appearance: none;
  border: none;
  outline: none;
  background: none;

  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 0px 16px 0px 16px;
  transition: 0.4s;
}

.search-box .search-bar:focus {
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.75);
  border-radius: 16px 0px 16px 0px;
}

.location-box .location {
  color: #fff;
  font-size: 32px;
  font-weight: 500;
  text-align: center;
  text-shadow: 1px 3px rgba(0, 0, 0, 0.25);
}

.location-box .date {
  color: #FFF;
  font-size: 20px;
  font-weight: 400;
  font-style: italic;
  text-align: center;
}

.weather-box {
  text-align: center;
}

.weather-box .temp {
  display: inline-block;
  padding: 10px 25px;
  color: #FFF;
  font-size: 102px;
  font-weight: 800;
  text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.25);
  border-radius: 16px;
  margin: 30px 0px;
  box-shadow: 3px 6px rgba(0, 0, 0, 0.25);
}

.weather-box .weather {
  color: #fff;
  font-size: 48px;
  font-weight: 600;
  font-style: italic;
  text-shadow: 3px 6px rgba(0, 0, 0, 0.25);

}
</style>