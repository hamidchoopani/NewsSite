import { defineStore } from 'pinia'
import axios from 'axios'
// axios.defaults.baseURL='https://api.coingecko.com/api/v3'
export const useCryptoCurrencyStore = defineStore('CryptoCurrencyStore', {
    state: () => ({
        cryptoCurrency:[],
        loading:true
    }),
    getters: {

    },
    actions:{
        getCryptoCurrency(){
            axios('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false')
            .then(res=>{
                this.cryptoCurrency=res.data
                this.loading=false
            //   res.data.coins.forEach(element => {
            //     this.cryptoCurrency.push(element.item)
            //   });
                // res.data.coins.map(data=>{
                //   allcrypto.value=data
                //   console.log(data);
                // })
              console.log(res.data);
            })
        }
    }
})