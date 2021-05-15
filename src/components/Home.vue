<template>
  <div class="container">
  <div class="row justify-content-around mt-5">
    <div class="col-sm-12 col-md-6 col-lg-4">
      <div class="form-group">
        <label>From</label>
         <autocomplete v-debounce:1000ms='search' :list="filteredList" v-model="searchDataFrom" />
      </div>
    </div>
    <div class="col-sm-12 col-md-6 col-lg-4">
     <div class="form-group">
        <label>To</label>
        <autocomplete v-debounce:1000ms='search' :list="filteredList" v-model="searchDataTo" />
     </div>
    </div>
  
    <div class="col-sm-12 col-md-6 col-lg-4"> 
      <div class="form-group">
        <label>Passanger</label>
        <input type="number" 
        v-model="passenger"
       min="1" max="10"  class="form-control" >
      </div>
    </div>
    <div class="col-sm-12 col-md-6 col-lg-4">
        <a-date-picker
          class="mt-4"
          v-model="startValue"
          :disabled-date="disabledStartDate"
        
          placeholder="Depart"
          @openChange="handleStartOpenChange"
          size='large' 
        />
      <!-- <b-form-datepicker v-model="departVal" :date-disabled-fn="dateDisabled" locale="en"></b-form-datepicker> -->
    </div>
     <div class="col-sm-12 col-md-6 col-lg-4">
     
        <a-date-picker 
         class="mt-4"
         v-model="endValue"
         :disabled-date="disabledEndDate"
       
         placeholder="Return"
         :open="endOpen"
         @openChange="handleEndOpenChange"
         size='large' 
        />
      <!-- <b-form-datepicker v-model="returnVal" :date-disabled-fn="dateDisabled" locale="en"></b-form-datepicker> -->
     
    </div>
    <div class="col-sm-12 col-md-6 col-lg-4">
      <button type="button" @click="searchFlights" class="btn btn-lg btn-primary mt-4" >Search</button>
    </div>
  </div>
  <div class="row">
    <div class="col-12">
    <a-list
    class="demo-loadmore-list"
    
    item-layout="horizontal"
    :data-source="flights"
  >
    
    <a-list-item slot="renderItem" slot-scope="item">

      <a-list-item-meta
        :description="'From '+searchDataFrom.name +'('+searchDataFrom.code+')' +' to '+ searchDataTo.name +'('+searchDataTo.code+')'+',it will cost $ '+item.perkm+'/km'"
      >
        <a slot="title" href="#">Price: {{ item.price }}$</a>
        <a-avatar
          slot="avatar"
          :size="64"
          src="https://image.flaticon.com/icons/png/512/68/68395.png"
        />
      </a-list-item-meta>
    </a-list-item>
  </a-list>
    </div>
  </div>
 </div>
</template>

<script>
import Autocomplete from './Autocomplete.vue';
import moment from 'moment';
import moduleFlightsResManagement from "@/store/flights-res-management/moduleFlightsResManagement.js";
import modulePlacesResManagement from "@/store/places-res-management/modulePlacesResManagement.js";

export default {
  name: 'Home',
  props: {
    msg: String
  },

  components: { Autocomplete },
  data() {
     return{
       searchDataFrom:'',
       searchDataTo:'',
       flights:[],
       filteredList:[],
       filterInput: null,
       list:[],
       value: '',
       passenger:null,
       startValue: null,
       endValue: null,
       endOpen: false,
       distance:null,
       }    
  },
   watch: {
    startValue(val) {
      console.log('startValue', val);
    },
    endValue(val) {
      console.log('endValue', val);
    },
  },
   computed: {
    
  },
    created() {
    if (!modulePlacesResManagement.isRegistered) {
      this.$store.registerModule(
        "PlacesResManagement",
        modulePlacesResManagement
      );
      modulePlacesResManagement.isRegistered = true;
    }
      if (!moduleFlightsResManagement.isRegistered) {
      this.$store.registerModule(
        "FlightsResManagement",
        moduleFlightsResManagement
      );
      moduleFlightsResManagement.isRegistered = true;
    }
    },
  methods:{
    disabledStartDate(startValue) {
      const endValue = this.endValue;
      if (!startValue || !endValue) {
        return false;
      }
      return startValue.valueOf() > endValue.valueOf();
    },
    disabledEndDate(endValue) {
      const startValue = this.startValue;
      if (!endValue || !startValue) {
        return false;
      }
      return startValue.valueOf() >= endValue.valueOf();
    },
    handleStartOpenChange(open) {
      if (!open) {
        this.endOpen = true;
      }
    },
    handleEndOpenChange(open) {
      this.endOpen = open;
    },
      dateDisabled(ymd, date) {
        // Disable weekends (Sunday = `0`, Saturday = `6`) and
        // disable days that fall on the 13th of the month
        const weekday = date.getDay()
        const day = date.getDate()
        // Return `true` if the date should be disabled
        return weekday < this.departVal || weekday === this.departVal || day === this.departVal
      },
     search(city) {
      this.filteredList = [];
      this.$store
        .dispatch(
          "PlacesResManagement/fetchPlaces",
          city
        )
        .then((resp) => {
        
          resp.data.locations.forEach(element => {
         
            this.filteredList.push({name:element.city.name, code:element.code,location:element.location})
        });
        })
        .catch((err) => {
          console.error(err);
        });
    },
   async searchFlights(){
     const getFormData = object => Object.entries(object).reduce((fd, [ key, val ]) => {
  if (Array.isArray(val)) {
    val.forEach(v => fd.append(key, v))
  } else {
    fd.append(key, val)
  }
  return fd
}, new FormData());
     await this.$store.dispatch("PlacesResManagement/measureDistance",
          getFormData({longFrom:this.searchDataFrom.location.lon,latFrom:this.searchDataFrom.location.lat,longTo:this.searchDataTo.location.lon,latTo:this.searchDataTo.location.lat})
        ).then(res=>{
          this.distance=res.data|0;
        })
      this.flights=[];
      let data={
        from:this.searchDataFrom.code,
        to:this.searchDataTo.code,
        passenger:this.passenger,
        depart:moment(this.startValue).format('DD/MM/YYYY'),
        return:moment(this.endValue).format('DD/MM/YYYY')
      }
      this.$store.dispatch("FlightsResManagement/fetchFlights", data).then((res)=>{
        res.data.data.forEach(y=>{
         this.flights.push({date:y.date,price:y.price,perkm:parseFloat(this.distance/y.price).toFixed(2)}) 
        }) 
      }).catch((err)=>{console.error(err);})
    },
     handleInput(e) {
      this.filterInput = e
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.demo-loadmore-list {
  min-height: 350px;
}
</style>
