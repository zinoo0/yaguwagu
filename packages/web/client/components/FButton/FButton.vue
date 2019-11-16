<template>
  <div>
    <v-btn v-if="!open" style="background-color: #015aff; width: 100px; height: 52px; border-radius: 50px; position: fixed; bottom: 20px; right: 20px;" @click="onOpenChat"><v-icon size="27" color="white">mdi-forum-outline</v-icon><span class="ml-1" style="color: white; font-size: 17px">채팅</span></v-btn>
    <v-card v-if="open"  width="350" style="position: fixed; bottom: 20px; right: 13px;">
      <v-tabs v-model="tab">
        <!-- Tab -->
        <v-tab>구단</v-tab>
        <v-tab>채팅</v-tab>
        <v-tab>알림</v-tab>
        <v-spacer></v-spacer>
        <v-icon class="mr-3" @click="onDisableChat">mdi-close</v-icon>
        <!-- 구단 -->
        <v-tab-item>
          <div class="chat_list">
            <div v-for="(team, index) in teams" :key="index">
              <a @click="selTeam(team.initial, index)">
                <v-container>
                  <v-img :src="team.src" style="float: left; width: 11%;"></v-img>
                  <div class="chat_ib">
                    <h5>{{ team.name }}<span class="chat_date">Dec 25</span></h5>
                    <p>현재 순위: *</p>
                    <v-divider class="mb-1 mt-1"></v-divider>
                  </div>
                </v-container>
              </a>
            </div>
          </div>
        </v-tab-item>
        <!-- 채팅 -->
        <v-tab-item>
          <f-button-chat :key="key"></f-button-chat>
        </v-tab-item>

        <!-- 알림 -->
        <v-tab-item>
          <div style="height: 330px">
            <v-container>
              알림이 없습니다.
            </v-container>
          </div>
        </v-tab-item>        
      </v-tabs>
    </v-card>
  </div>
</template>

<script>
  import FButtonChat from '~/components/FButton/FButtonChat';

  export default {
    components: {
      FButtonChat
    },
    data() {
      return {
        tab: 0,
        open: false,
        initial: '',
        key: 0,
      }
    },
    computed: {
      user() {
        return this.$store.state.users.user;
      },
      teams() {
        return this.$store.state.chat.teams;
      }
    },
    methods: {
      onOpenChat() {
        if(this.user) {
          this.open = true;
        } else {
          alert("로그인이 필요한 작업입니다.");
        }
      },
      onDisableChat() {
        this.open = false;
      },
      selTeam(initial, index) {
        this.key = index;
        this.$store.commit('chat/selTeam', initial);
        this.tab = 1;
      },

    }
  }
</script>

<style scoped>
  .chat_list {
    height: 330px;
    overflow-y: scroll;
  }
  .chat_ib h5{ font-size:15px; color:#464646; margin:0 0 8px 0;}
  .chat_ib h5 span{ font-size:13px; float:right;}
  .chat_ib p{ font-size:14px; color:#989898; margin:auto}
  .chat_ib {
    float: left;
    padding: 0 0 0 15px;
    width: 88%;
  }
</style>