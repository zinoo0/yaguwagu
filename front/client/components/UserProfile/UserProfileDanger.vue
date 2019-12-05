<template>
  <v-card class="overflow-hidden mb-5" color="white">
    <v-toolbar flat height="50" color="error accent-2">
      <v-toolbar-title class="ml-1 font-weight-light white--text"><span style="font-family: Jua, cursive; font-size: 20px">위험</span></v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-dialog v-model="dialog" max-width="330">
      <template v-slot:activator="{ on }">
        <v-container>
          <v-row justify="center">
            <v-btn color="white" v-on="on">탈퇴</v-btn> 
          </v-row>
        </v-container>
      </template>
      <v-card>
        <v-card-title class="headline">정말로 삭제하시겠습니까?</v-card-title>
        <v-card-text>위험: 개인정보를 모두 잃을 수 있습니다.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">아니오</v-btn>
          <v-btn color="green darken-1" text @click="delUser">네</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>  
</template>

<script>
  export default {
    data() {
      return {
        dialog: false,
      }
    },
    computed: {
      user() {
        return this.$store.state.users.user;
      }
    }    ,
    methods: {
      delUser() {
        this.$store.dispatch('users/delUser', {
          uid: this.user.uid
        });
        this.dialog = false;
        this.$router.push({ path: '/' });
        this.$firebase.auth().signOut();        
        alert('정상적으로 회원 탈퇴되었습니다.');
      },
    }    
  }
</script>

<style>

</style>