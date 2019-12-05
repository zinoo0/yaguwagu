<template>
  <div>
    <v-img src="https://yaguwagu.s3.ap-northeast-2.amazonaws.com/client/img/index/ball.png" height="500">
      <div class="text-center mt-9">
        <div class="display-3 mb-5 yagu-font" style="color: white">야구와구</div>
        <div class="title mb-5" style="color: white">야구장 매점에서 좌석까지 찾아가는 배달 서비스</div>
      </div>
    </v-img>
    <v-container>
      <v-row>
        <v-col v-for="(team, index) in teams" :key="index" cols="12" md="4">
          <v-card color="blue-grey darken-4">
            <v-img 
              :src="team.src" 
              class="white--text align-end" style="cursor: pointer"
              @click="$router.push({path: `/${team.initial}`})">
              <v-card-text style="font-size: 20px"></v-card-text>
            </v-img>
            <v-card-text>
              <div class="title font-weight-bold white--text">{{ team.name }}</div>
              <div class="subtitle-1 font-weight-bold white--text">구장 선택</div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
  export default {
    computed: {
      teams() {
        return this.$store.state.order.teams;
      }
    }
  }
</script>

<style scoped>
  .yagu-font {
    font-family: 'Bebas Neue';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: local('Bebas Neue Regular'), local('BebasNeue-Regular'), url(https://fonts.gstatic.com/s/bebasneue/v1/JTUSjIg69CK48gW7PXoo9Wdhyzbi.woff2) format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
</style>