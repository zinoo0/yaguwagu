<template>
  <div>
    <v-row>
      <v-col cols="12" md="2"></v-col>
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title>
          <v-row justify="center">
            <span style="font-family: Jua, sans-serif; font-size: 25px">{{ store.name }}</span>
          </v-row>      
          </v-card-title>
          <v-img :src="store.mainImages[selectedIndex].url">
            <v-icon size="50" color="white" style="top: 50%; position: absolute" @click="beforeImage">mdi-chevron-left</v-icon>
            <v-icon size="50" color="white" style="top: 50%; right:0%; position: absolute" @click="nextImage">mdi-chevron-right</v-icon>
          </v-img>
          <v-container>
            <v-row justify="center">
              <v-icon>mdi-phone</v-icon>{{ store.phone }}
              <v-icon class="ml-5">mdi-clock</v-icon>{{ store.time }}
            </v-row>
          </v-container>
          <v-container>
            <v-tabs grow>
              <v-tab>메뉴</v-tab>
              <v-tab>주문</v-tab>
              <v-tab-item>
                <div v-for="(menu, index) in store.menuImages" :key="index">
                  <v-img :src="menu.url" class="mb-5"></v-img>
                </div>
              </v-tab-item>
              <v-tab-item>
                <v-container>
                  <v-card>
                    <v-card-title>
                      <v-row justify="center">
                        메뉴 선택
                      </v-row>
                    </v-card-title>
                    <v-card-text class="black--text">
                      <div v-for="(item, index) in menus" :key="index">
                        <v-icon @click="selMenu(item, index)">mdi-plus</v-icon>{{ item.name }} {{ item.price }}
                      </div>
                    </v-card-text>
                    <v-card-title>
                      <v-row justify="center">
                        장바구니
                      </v-row>
                    </v-card-title>
                    <v-card-text class="black--text">
                      <div v-for="(item, index) in selectedMenus" :key="index">
                        <v-icon @click="delMenu(index)">mdi-minus</v-icon>{{ item.name }} {{ item.price }}
                      </div>
                    </v-card-text>
                    <v-card-title>
                      <v-row justify="center">
                      좌석 번호
                      </v-row>
                    </v-card-title>
                    <v-card-text class="black--text">
                      <v-text-field v-model="seatInfo"></v-text-field>
                    </v-card-text>                    
                    <v-card-text class="black--text"> 
                      <v-btn text block color="primary" @click="onClickOrder">결제</v-btn>
                    </v-card-text>                    
                  </v-card>
                </v-container>
              </v-tab-item>
            </v-tabs>
          </v-container>
        </v-card>
      </v-col>
      <v-col cols="12" md="2"></v-col>
    </v-row>
  </div>
</template>

<script>
  import { db } from '~/plugins/firebase';

  export default {
    data() {
      return {
        selectedIndex: 0,
        selectedMenus: [],
        menus: [],
        seatInfo: '',
      }
    },    
    computed: {
      store() {
        return this.$store.state.order.partners[this.$route.params.store];
      },
      orderRes() {
        return this.$store.state.order.orderRes;
      }
    },
    firestore() {
      return {
        parterOrder: db.collection(`partnerOrder`).orderBy("orderId"),
      }
    },
    created() {
      this.store.menus.forEach((element, index) => {
        this.$set(this.menus, index, element);
      });
    },
    methods: {
      nextImage() {
        if(this.selectedIndex === this.store.mainImages.length - 1) {
          this.selectedIndex = 0;
        } else{
          this.selectedIndex += 1;
        }
      },
      beforeImage() {
        if(this.selectedIndex === 0) {
          this.selectedIndex = this.store.mainImages.length - 1;
        } else{
          this.selectedIndex -= 1;
        }
      },
      selMenu(item, index) {
        this.selectedMenus.unshift(item);
      },
      delMenu(index) {
        this.selectedMenus.splice(index, 1)
      },      
      async onClickOrder() {
        try {
          await this.$axios.post(`${process.env.BACK_URL}/order`, {
            menu: this.selectedMenus,
            seat: this.seatInfo
          });
          const id = this.parterOrder[this.parterOrder.length-1].orderId + 1;
          db.collection('partnerOrder').doc(id.toString()).set({ orderId: id, done: false });

          this.$router.push({ path: '/' });
          alert('주문이 성공적으로 완료돼었습니다.');
        } catch(err) {
          console.error(err);
        }
      }
    }
  }
</script>