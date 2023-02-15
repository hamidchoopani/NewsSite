import { defineStore } from 'pinia'
import axios from 'axios'
export const useWeatherStore = defineStore('weatherStore', {
    state: () => ({
        apiKey: '3ae2ddee592f59218a601e06df3a1abd',
        weather: '',
        
    }),
    getters: {

    },
    actions: {
        getWeather(city) {
            axios(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${this.apiKey}`)
                .then((res) => {
                    if (res.data.cod == 200) {
                        this.weather = res.data;
                        console.log(this.weather);
                    }
                    else if (res.data.cod == 404) {
                        alert('Não foi possível encontrar a cidade em questão. 😿')
                        return
                    }
                })
        }
    }
})