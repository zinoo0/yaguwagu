<template>
  <div>
    <!-- 주문이 있을 경우 -->
    <div v-if="orders.length === 0">현재 진행중인 주문이 없습니다.</div>
    <!-- 주문이 없을 경우 -->
    <div v-else>
      <!-- <v-icon @click="onDelete(order.orderId)">mdi-minus</v-icon> {{ order.orderId }} -->
      <v-card v-for="(order, index) in orders" :key="index" color="grey lighten-3">
        <v-card-title class="black--text">주문 도착</v-card-title>
        <v-card-text>
          <div>주문번호: {{ order.orderId }}</div>
          <div>주문이 도착했습니다. 주문 내역을 확인해주세요.</div>
          <div v-if="onArray[index]">
            <div>좌석: {{ orderDetailArrary[index].seat }}</div>
            <div v-for="(menu, index) in orderDetailArrary[index].orderMenu" :key="index">
              <div>메뉴: {{ menu.name }}</div>
              <div>가격: {{ menu.price }}</div>
            </div>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn v-if="!onArray[index]" color="primary" @click="onClickDetail(order.orderId, index)">주문내역 확인</v-btn>
          <v-spacer></v-spacer>
          <v-btn v-if="onArray[index]" color="success">배달 요청</v-btn>
          <v-btn v-if="onArray[index]" color="primary" @click="deleveryDone(order.orderId, index)">배달 완료</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
  import { db } from '~/plugins/firebase';

  export default {
    data() {
      return {
        onArray: [],
        orders: [],
        orderDetailArrary: [],
        time: '',
      }
    },
    firestore() {
      return {
        orders: db.collection('partnerOrder').where("done", "==", false)
      }
    },
    methods: {
      async onClickDetail(orderId, index) {
        try {
          const res = await this.$axios.get(`${process.env.BACK_URL_SPRING}/order/${orderId}`);
          this.$set(this.orderDetailArrary, index, {
            on: true,
            orderMenu: res.data.orderMenu,
            seat: res.data.seat
          });
          this.$set(this.onArray, index, true);
        } catch (err) {
          console.error(err);
        }
      },
      async deleveryDone(orderId, index) {
        try {
          await db.collection('partnerOrder').doc(orderId.toString()).set({ orderId: orderId, done: true });
          this.onArray.splice(index, 1);
          this.orderDetailArrary.splice(index, 1);
        } catch (err) {
          console.error(err);
        }
      }
    }
  }
</script>