<template>
  <div>
    Dashboard
    <v-btn @click="fetchData">button</v-btn>
  </div>
</template>

<script>
  import * as d3 from 'd3';

  export default {
    data() {
      return {
        res: null
      }
    },
    created() {
      (async () => {
        this.res = await this.$axios.get('http://localhost:9091/order');
      })();
    },
    methods: {
      async fetchData() {
        const data = await d3.json('{"hi": 1}');
        console.log(data)
      }
    }
  };
</script>