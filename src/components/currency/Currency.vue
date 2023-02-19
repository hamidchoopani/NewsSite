<template><!-- <h1 class="description">
    Crypto Currency
  </h1> -->
    <div v-if="loading">
      <v-progress-circular indeterminate :size="50" color="primary" :width="5"></v-progress-circular>
    </div>
    <table class="containerr" v-else>
      <thead>
        <tr>
          <th class="description">Name</th>
          <th class="description">Last Price</th>
          <th class="description">24h Change</th>
          <th class="description MarketCap">Market Cap</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for=" currency in cryptoCurrency" :key="currency.id">
          <td class="coinname"><img class="imgcurrency" :src="currency.image" />
            <a class="dewq">{{ currency.name }} ({{ currency.symbol }})
            </a>
          </td>
          <td> {{ currencyFormat(currency.current_price) }}</td>

          <td
            :class="{ 'text-red': currency.price_change_percentage_24h < 0, 'text-green': currency.price_change_percentage_24h > 0 }">
            <span v-if="currency.price_change_percentage_24h > 0">
              <v-icon>mdi-trending-up</v-icon>
            </span>
            <span v-else>
              <v-icon>mdi-trending-down</v-icon>
            </span>
            {{ currency.price_change_percentage_24h.toPrecision(3) }}
          </td>
          <td class="btnbuysell">
            {{ currencyFormat(currency.market_cap) }}
          </td>
        </tr>
      </tbody>
    </table>
</template>

<script setup>
import { useCryptoCurrencyStore } from '@/store/CryptoCurrency'
import { storeToRefs } from 'pinia';
import currencyFormat from '@/utilites'
const cryptoCStore = useCryptoCurrencyStore()

const { cryptoCurrency, loading } = storeToRefs(cryptoCStore)

cryptoCStore.getCryptoCurrency()
</script>

<style scoped>
@media screen and (max-width: 460px) {
  .MarketCap {
    display: none;
  }

  .btnbuysell {
    display: none;
  }

}

.text-green {
  color: green;
}

.text-red {
  color: red;
}

/* coni */
.coinname {
  text-align: left;
}

.btnbuysell {
  width: 10px;
}

.dewq {
  position: absolute;
  font: bold;
  transform: translateX(12px);
  transform: translateY(8px);
}

.imgcurrency {
  width: 30px;
  height: 30px;
  padding-right: 5px;
  transform: translateX(-15px);
  transform: translateY(5px);
}

.description {
  margin-top: 50px;
  font-family: 'Vollkorn', serif;
  text-align: center;
  /* color:#ecf0f1; */
  /* text-shadow: 0 0.1em 0.2em #008c8d; */
}

.containerr {
  width: 1200px;
  text-align: center;
}

body {
  /* background: #fafafa url(https://jackrugile.com/images/misc/noise-diagonal.png); */
  /* color: #444; */
  font: 100%/30px "Helvetica Neue", helvetica, arial, sans-serif;
  /* text-shadow: 0 1px 0 #fff; */
}

strong {
  font-weight: bold;
}

em {
  font-style: italic;
}

table {
  /* background: #f5f5f5; */
  border-collapse: separate;
  /* box-shadow: inset 0 1px 0 #fff; */
  font-size: 12px;
  line-height: 24px;
  margin: 30px auto;
  text-align: left;
  width: 800px;
}

th {
  /* background: url(https://jackrugile.com/images/misc/noise-diagonal.png),
    linear-gradient(#777, #444); */
  /* border-left: 1px solid #555; */
  /* border-right: 1px solid #777; */
  /* border-top: 1px solid #555; */
  border-bottom: 1px solid #333;
  /* box-shadow: inset 0 1px 0 #999; */
  /* color: #fff; */
  font-weight: bold;
  padding: 10px 15px;
  position: relative;
  /* text-shadow: 0 1px 0 #000; */
}

th:after {
  content: "";
  display: block;
  height: 25%;
  left: 0;
  margin: 1px 0 0 0;
  position: absolute;
  top: 25%;
  width: 100%;
}

td {
  border-bottom: 1px solid #252525;
  padding: 10px 15px;
  position: relative;
  transition: all 300ms;
}



tbody:hover td {
  color: transparent;
  text-shadow: 0 0 3px #aaa;
}

tbody:hover tr:hover td {
  /* color: #444; */
  text-shadow: 0 1px 0 #fff;
}
</style>