<template>
  <div>
      <input class="box" v-model="input" @input="handleInput">
      <div class="bordered" v-if="input && !setIn">
          <ul>
              <li v-for="(item, i) in list" :key="i" @click="setInput(item)">{{ item.name +'  '+'airport '+'('+item.code+')' }}</li>
          </ul>
      </div>
 </div>
  
</template> 
<script>
export default {
    props: ['list'],
    data() {
      return {
        input: null,
        setIn:false
      }
    },
   methods: {
    handleInput(e) {
      this.$emit('input', e.target.value)
      this.setIn=false;
    },
    setInput(value) {
      this.input = value.name+' ('+value.code+')';
      this.$emit('input', value);
      this.setIn =true;
    }
  },
   
}
</script>
<style>
.box{
    width: 100%;
}
.bordered {
  border: 1px solid black;
  display: block;
}
ul{
    list-style-type: none;
    margin:0;
    padding: 0;
}
ul li {
  cursor: pointer;
}

ul li:hover {
  background: rgba(0, 0, 0, 0.3)
}
</style>