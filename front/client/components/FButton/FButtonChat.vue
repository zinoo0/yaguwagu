<template>
  <div>
    <div class="chat_msg">
      <div v-for="(item, index) in chat" :key="index">
        <!-- Incoming Message -->
        <div v-if="!(item.uid === user.uid)">
          <img :src="item.profile_url" class="mt-1 ml-1" style="cursor: pointer; width: 7%" @click="$router.push({ path: `/user/profile/${item.uid}` })" />
          <span class="ml-1">{{ item.username }}</span>
          <p>{{ item.text }}</p>
          <span class="time_date">{{ computeDate(item.createdAt.seconds) }}</span>
        </div>
        <!-- Sent Message -->
        <div v-else class="mb-3 mt-3" style="overflow: hidden">
          <div class="sent_msg">
            <p>{{ item.text }}</p>
            <span class="time_date">{{ computeDate(item.createdAt.seconds) }}</span> 
          </div>
        </div>
      </div>
    </div>
    <v-text-field v-model="text" class="mt-0" hide-details @keyup.enter="sendMessage" />
  </div>
</template>

<script>
  import { db } from '~/plugins/firebase';

  export default {
    data() {
      return {
        chat: [],
        text: '',
      }
    },
    computed: {
      user() {
        return this.$store.state.users.user;
      },
      selectedTeam() {
        return this.$store.state.chat.selectedTeam;
      }
    },
    firestore() {
      return {
        chat: db.collection(`chat_${this.selectedTeam}`).orderBy("createdAt"),
      }
    },
    watch: {
      chat() {
        if(document.getElementsByClassName('chat_msg')[0].scrollHeight - document.getElementsByClassName('chat_msg')[0].scrollTop <= 400) {
          setTimeout(() => {
            document.getElementsByClassName('chat_msg')[0].scrollTo(0, 100000);
          }, 10);
        }
      }
    },
    methods: {
      computeDate(timestamp) {
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const temp = new Date(timestamp * 1000);
        const month = monthNames[temp.getMonth() + 1];
        const date = temp.getDate();
        const hour = (temp.getHours() <= 12) ? temp.getHours() : temp.getHours() - 12;
        const minute = temp.getMinutes();
        return hour + ':' + minute + ' AM | ' + month + ' ' + date;
      },
      sendMessage() {
        db.collection('chat_' + this.selectedTeam).add({
          uid: this.user.uid,
          profile_url: this.user.profileUrl,
          text: this.text,
          createdAt: new Date(Date.now()),
          username: this.user.username
        });
        this.text = '';
      },
    },
  }
</script>

<style scoped>
  .chat_msg {
    height: 286px;
    overflow-y: auto;
  }

  .received_msg {
    display: inline-block;
    padding: 0 0 0 10px;
    vertical-align: top;
    width: 92%;
  }

  .sent_msg {
    float: right;
    width: 46%;
  }

  .sent_msg p {
    background: #05728f none repeat scroll 0 0;
    border-radius: 3px;
    font-size: 14px;
    margin: 0; color:#fff;
    padding: 5px 10px 5px 12px;
    width:100%;
  }

  .time_date {
    color: #747474;
    display: block;
    font-size: 12px;
    margin: 8px 0 0;
  }  
</style>