<template>
  <div>
    <Snowf
      v-if="temp.weather.toLowerCase().includes('snow')"
      :amount="80"
      :size="5"
      :speed="1.5"
      :wind="0"
      :opacity="0.8"
      :swing="1"
      :image="null"
      :zIndex="null"
      :resize="true"
      color="#fff"
    />
  
    <div :class="bgType.color + ' vh-100 '">
      <b-container class="">
        <b-row>
          <b-col class="md-offset-2 pt-5">
            <div class="form">
              <b-input-group>
                <b-input v-model="search" placeholder="Search city"> </b-input>
                <b-input-group-append>
                  <b-button variant="warning" @click="getCity()"
                    >Search</b-button
                  >
                </b-input-group-append>
              </b-input-group>
            </div>
            <b-card class="card-trans mt-2">
              <b-container>
                <b-row>
                  <b-col>
                   
                    <h2>{{ name }}</h2>
                    <img
                      :src="
                        'https://openweathermap.org/img/wn/' +
                        temp.icon +
                        '@4x.png'
                      "
                      alt=""
                      v-if="temp.icon != ''"
                    />
                  </b-col>
                  <b-col>
                    <h1>Today</h1>
                    <h2>Current {{ temp.temp }} °C</h2>
                    <h2>Pressure {{ temp.pressure }} atm</h2>
                    <h2>Max Temp. {{ temp.max }} °C</h2>
                    <h2>Min Temp. {{ temp.min }} °C</h2>
                  </b-col>
                </b-row>
              </b-container>
            </b-card>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
import Snowf from "vue-snowf";

import Moment from "moment";
export default {
  name: "App",
  components: {
    Snowf,
  
  },
  data() {
    return {
      search: "",
      name: "",
      location: {
        lat: 0,
        long: 0,
      },
      time: {
        hour: 0,
      },
      bgType: {
        color: "morning",
        textColor: "",
      },
      temp: {
        feels: 0,
        humidity: 0,
        pressure: 0,
        temp: 0,
        max: 0,
        min: 0,
        weather: "",
        icon: "",
        wind: {
          speed: 0,
        },
      },
    };
  },
  methods: {
    getCity() {
      this.axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${this.search}&type=hour&appid=a8c2d20a160ab0902eceadb53e107cce&units=metric`

          // `https://api.openweathermap.org/data/2.5/weather?lat=15.3459&lon=63.2621&appid=a8c2d20a160ab0902eceadb53e107cce&units=metric`
        )
        .then((result) => {
          console.log(result);
          this.name = result.data.name;
          this.temp.feels = result.data.main.feels_like;
          this.temp.humidity = result.data.main.humidity;
          this.temp.pressure = result.data.main.pressure;
          this.temp.temp = result.data.main.temp;
          this.temp.max = result.data.main.temp_max;
          this.temp.min = result.data.main.temp_min;
          this.temp.weather = result.data.weather[0].main;
          // this.temp.weather = 'snow';
          console.log(this.temp.weather.toLowerCase().includes("cloud"));
          console.log(this.temp.weather.toLowerCase().includes("rain"));
          this.temp.icon = result.data.weather[0].icon;
          this.temp.wind.speed = result.data.wind.speed;
   
let date=new Date(result.data.dt*1000+(result.data.timezone*1000));
     
       
          console.log("date",date)
          this.time.hour = date.getHours();
          // this.time.hour = 21;
          console.log(this.time.hour);
          if (this.time.hour > 4 && this.time.hour < 12) {
            console.log("morning");
            this.bgType.color = "morning";
          } else if (this.time.hour >= 12 && this.time.hour < 18) {
            console.log("afternoon");
            this.bgType.color = "afternoon";
          } else {
            this.bgType.color = "evening";
          }
        });
    },
  },
  created() {
    this.$getLocation({ enableHighAccuracy: false }).then((coordinates) => {
      console.log(coordinates);
      this.location.lat = coordinates.lat;
      this.location.long = coordinates.lng;
      this.axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${this.location.lat}&lon=${this.location.long}&appid=a8c2d20a160ab0902eceadb53e107cce&units=metric`
          // `https://api.openweathermap.org/data/2.5/weather?lat=15.3459&lon=63.2621&appid=a8c2d20a160ab0902eceadb53e107cce&units=metric`
        )
        .then((result) => {
          console.log(result);

          this.name = result.data.name;
          this.temp.feels = result.data.main.feels_like;
          this.temp.humidity = result.data.main.humidity;
          this.temp.pressure = result.data.main.pressure;
          this.temp.temp = result.data.main.temp;
          this.temp.max = result.data.main.temp_max;
          this.temp.min = result.data.main.temp_min;
          this.temp.weather = result.data.weather[0].main;
          
          // this.temp.weather = 'snow';
          console.log(this.temp.weather.toLowerCase().includes("cloud"));
          console.log(this.temp.weather.toLowerCase().includes("rain"));
          this.temp.icon = result.data.weather[0].icon;
          this.temp.wind.speed = result.data.wind.speed;
          let date = new Date();
          let time = Moment(result.data.df);
          console.log(time.format());
          this.time.hour = date.getHours();
          // this.time.hour = 21;
          console.log(this.time.hour);
          if (this.time.hour > 4 && this.time.hour < 12) {
            console.log("morning");
            this.bgType.color = "morning";
          } else if (this.time.hour >= 12 && this.time.hour < 18) {
            console.log("afternoon");
            this.bgType.color = "afternoon";
          } else {
            this.bgType.color = "evening";
          }
        });
    });
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/vendors/bootstrap-vue/index";

.morning {
  background-color: #b7e2f3;
}
.afternoon {
  background-color: #87ceeb;
}
.evening {
  background-color: #131862;
  // color: white;
}
.card-trans {
  background: rgba(255, 255, 255, 0.4) !important;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8.5px);
  -webkit-backdrop-filter: blur(8.5px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  z-index: 100;
}
</style>
