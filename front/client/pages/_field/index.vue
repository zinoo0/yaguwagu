<template>
  <v-container>
    <v-row>
      <v-col v-for="(store, index) in partners" :key="index" col="12" md="6">
        <v-card>
          <v-img :src="store.mainImages[selectedIndex[index]].url">
            <v-icon size="50" color="white" style="top: 50%; position: absolute" @click="beforeImage(store.mainImages, index)">mdi-chevron-left</v-icon>
            <v-icon size="50" color="white" style="top: 50%; right:0%; position: absolute" @click="nextImage(store.mainImages, index)">mdi-chevron-right</v-icon>
          </v-img>
          <v-container>
            <v-row justify="center">
              <span style="font-family: Jua, sans-serif; font-size: 25px">{{ store.name }}</span>
            </v-row>
          </v-container>
          <v-card-actions>
            <v-btn text block color="primary" style="font-family: Jua, sans-serif; font-size: 19px" @click="orderMenu(index)">주문하기</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        selectedIndex: [],
      }
    },
    fetch({ store }) {
      store.dispatch('order/loadPartners');
    },
    computed: {
      partners() {
        this.$store.state.order.partners.forEach(() => {
          this.selectedIndex.push(0);
        });
        return this.$store.state.order.partners;
      }
    },
    methods: {
      nextImage(mainImages, index) {
        if(this.selectedIndex[index] === mainImages.length - 1) {
          this.$set(this.selectedIndex, index, 0);
        } else{
          this.$set(this.selectedIndex, index, this.selectedIndex[index]+=1);
        }
      },
      beforeImage(mainImages, index) {
        if(this.selectedIndex[index] === 0) {
          let temp = mainImages.length - 1;
          this.$set(this.selectedIndex, index, temp);
        } else{
          this.$set(this.selectedIndex, index, this.selectedIndex[index]-=1);
        }
      },
      orderMenu(index) {
        this.$router.push({ path: this.$route.path + '/' + index })
      }
    }
  }
</script>