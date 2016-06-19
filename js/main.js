const API_KEY = 'e83069c1024287af18c8bcebb48cc63b'
const API_URL = 'http://api.openweathermap.org/data/2.5/weather?lat='
// http://api.openweathermap.org/data/2.5/weather?lat=' + this.ip.lat +
// '&lon=' + this.ip.lon + '&APPID=' + API_KEY

new Vue({
  el: '#app',

  created: function (){
    this.$http.get('http://ip-api.com/json/', function(data, status, request) {
      this.$set('ip', data)
    }).then(function(data, status, request){
      this.$http.get(API_URL+this.ip.lat+'&lon='+this.ip.lon+'&APPID='+API_KEY, function(data, status, request){
        this.$set('location', data)
      })
    }).catch(function(data, status){
        this.$log(data, status)
    })
  },

  data: {
    ip: [],
    location: [],
    changeTemp: false
  },
  methods: {
    switchTemp: function (){
      if(this.changeTemp) {
        this.changeTemp = false
      }
      else {
        this.changeTemp = true
      }

    }
  },
  computed: {
    icon: function(){
      return 'wi-owm-'+this.location.weather[0].id
    },
    wind: function() {
      return 'towards-' + (this.location.wind.deg).toFixed(0) +'-deg'
    },
    backgroundColor: function(){
      let celsius = (this.location.main.temp -  273.15).toFixed(0)
      if(celsius < 10) {
        return '#44AAD6'
      }
      else if (celsius < 16) {
        return '#1B64A6'
      }
      else if (celsius < 24 ) {
        return '#EEA252'
      }
      else if (celsius < 32 && celsius > 32) {
        return '#E45C26'
      }
      else {
        return '#C4C4B8'
      }
    }
  },

})

Vue.filter('kelvinToCelsius', function (value) {
  // here `input` === `this.userInput`
  return (value - 273.15).toFixed(0) + ' C°'
})
Vue.filter('kelvinToF', function (value) {
  // here `input` === `this.userInput`
  return (value * 9/5 - 459.67).toFixed(0) + ' °F'
})
