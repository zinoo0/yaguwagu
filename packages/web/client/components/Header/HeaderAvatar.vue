<template>
  <v-menu close-on-click offset-x transition="scroll-y-transition">
    <template v-slot:activator="{ on }">
      <v-avatar class="mt-3" size="35" style="cursor: pointer"><v-img :src="user.profileUrl" v-on="on" /></v-avatar>
    </template>
    <v-card>
      <v-list width="350">
        <v-list-item three-line>
          <v-list-item-avatar size="100"><v-img :src="user.profileUrl" /></v-list-item-avatar>
          <v-list-item-content>
            <div class="mb-4">
              <div class="font-weight-bold">{{ user.username }}</div>
              <div class="body-2">{{ user.email }}</div>
            </div>
            <v-list-item-title class="headline font-weight-medium mb-1"><span style="font-family: Jua, cursive;">{{ user.team }}</span></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider class="mt-0 mb-0" />
      <v-card-actions>
        <v-row no-gutters>
          <v-col cols="12" class="mb-1">
            <v-btn outlined block color="primary" @click="$router.push({ path: '/user/profile' })">프로필</v-btn>
          </v-col>
          <v-col cols="12">
            <v-btn block color="primary accent-2" class="white--text" @click="onLogout">로그아웃</v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script>
  export default {
    computed: {
      user() {
        return this.$store.state.users.user;
      }
    },
    methods: {
      onLogout() {
        this.$store.dispatch('users/logOut');
        this.$firebase.auth().signOut();
        this.$router.push({ path: '/' });
        alert('로그아웃 되었습니다.');
      },
    }
  }
</script>