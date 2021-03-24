<template>
<div>
    <v-container>
        <v-row>
        <v-col
          cols="12"
          sm="4"
        >
        <v-text-field
            v-model="search"
            label="Search..."
            clearable
          ></v-text-field>
        </v-col>
        <v-col
            style="margin-left: 250px; margin-top: 30px;">
            USD balance: {{usd}}
        </v-col>
        </v-row>
    </v-container>
  <v-simple-table style="background-color: lightyellow">
    <template v-slot:default>
      <thead>
        <tr style="border-bottom: 2pt solid grey">
          <th>Coin</th>
          <th>Price</th>
          <th>24H Change</th>
          <th>Action</th>
          <th>Action</th>
          <th>Balance</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(coin, i) in filterCoins" :key="i">
          <td><img :src="coin.image" height="35px" /> {{ coin.name }}</td>
          <td>${{ coin.current_price }}</td>
          <td
            :style="{
              color: coin.price_change_percentage_24h < 0 ? 'red' : 'green',
            }"
          >
            {{ coin.price_change_percentage_24h }}%
          </td>
          <td>
              <button v-on:click="buy(i, coin.name)" style="float: left; margin-right: 5px" class="btn btn-warning rounded-pill">Buy</button>
              <range-slider ref="rangeSliderBuy" :max="coin.maxToBuy" style="margin-top: 9px"></range-slider>
          </td>
          <td>
              <button v-on:click="sell(i, coin.name)" style="float: left; margin-right: 5px" class="btn btn-warning rounded-pill">Sell</button>
              <range-slider ref="rangeSliderSell" :max="coin.maxToSell" style="margin-top: 9px"></range-slider>
          </td>
          <td>
              {{coin.maxToSell}}
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
  </div>
</template>

<script>
import { getToken, auth } from "../utils";
import RangeSlider from './RangeSlider';

export default {
  name: "Trade",
  components: {RangeSlider},
  data: () => ({
    usd: 0,
    coins: [],
    search: ''
  }),
  created() {
    this.setMyProperty();
  },
  methods: {
    buy(i, name) {
        this.$axios.put('api/buy', {name, num: this.$refs.rangeSliderBuy[i].value}, getToken())
        .then(() => {
            this.setMyProperty();
            this.resetRangeSliders();
        })
        .catch(({response}) => {
            auth(response);
            console.log("Error in buy: ", response.data);
        });
    },
    sell(i, name) {
        this.$axios.put('api/sell', {name, num: this.$refs.rangeSliderSell[i].value}, getToken())
        .then(() => {
            this.setMyProperty();
            this.resetRangeSliders();
        })
        .catch(({response}) => {
            auth(response);
            console.log("Error in sell: ", response.data);
        });
    },
    resetRangeSliders() {
        const f = slider => {
            slider.value = 0;
        };

        this.$refs.rangeSliderBuy.forEach(f);
        this.$refs.rangeSliderSell.forEach(f);
    },
    setMyProperty() {
      this.$axios
        .all([
          this.$axios.get("api/my_property", getToken()),
          this.$axios.get("api/coins_data", getToken()),
        ])
        .then((responses) => {
          this.usd = responses[0].data.usd;

          const myCoins = responses[0].data.coins;
          const coinsDataArr = responses[1].data.coins;
          const coinsDataObj = coinsDataArr.reduce((o, c) => {
            o[c.name] = c;
            return o;
          }, {});

          this.coins = coinsDataArr.map((c) => {
            c.maxToBuy = this.usd / coinsDataObj[c.name].current_price;
            c.maxToSell = myCoins[c.name] || 0;
            return c;
          });
        })
        .catch(({response}) => {
            auth(response);
            console.log("Error in setMyProperty: ", response.data);
        });
    }
  },
  computed: {
      filterCoins() {
          return this.coins.filter(coin => {
              if (!this.search) return true;
              return coin.name.toLowerCase().includes(this.search.toLowerCase());
          });
      }
  }
};
</script>
