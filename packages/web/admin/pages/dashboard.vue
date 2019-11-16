<template>
  <div>
    Dashboard
  </div>
</template>

<script>
  import * as d3 from 'd3';

  export default {
    data() {
      return {

      }
    },
    created() {
      (async () => {
        const res = this.$axios.get()
        const data = await d3.json()
      })();
    },
  };
</script>
