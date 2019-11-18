<template>
  <v-app>
    <!-- PC -->
    <v-app-bar v-if="$vuetify.breakpoint.mdAndUp" app color="white">
      <img src="logo.png" width="75" class="ml-5" style="cursor: pointer" @click="$router.push({path:'/'})" />
      <v-spacer></v-spacer>
      <v-btn text to="/" class="black--text">Home</v-btn>
      <v-btn text to="/news" class="black--text">News</v-btn>
      <v-btn text to="/season" class="black--text">Season</v-btn>
      <v-btn text to="/community" class="black--text">Community</v-btn>
      <v-btn text to="/map" class="black--text">Map</v-btn>
      <v-btn v-if="!user" text to="/signin" color="primary">Sign In</v-btn>
      <v-toolbar-items>
        <header-avatar v-if="user"></header-avatar>
      </v-toolbar-items>
    </v-app-bar>
    <!-- Mobile -->
    <v-app-bar v-if="$vuetify.breakpoint.mdAndDown" app color="white">
      <v-app-bar-nav-icon @click.stop="drawer=!drawer"></v-app-bar-nav-icon>
      <a style="font-size: 20px; font-weight: 600" @click="$router.push({path:'/'})">야구와구</a>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-icon v-if="!user" color="black" icon size="28" @click="$router.push({ path: '/signin' })">mdi-lock</v-icon>
        <header-avatar v-if="user"></header-avatar>
      </v-toolbar-items>
    </v-app-bar>
    <!-- Content -->
    <v-content>
      <nuxt />
    </v-content>
    <!-- Chat -->
    <f-button></f-button>
    <!-- Mobile Drawer -->
    <v-navigation-drawer v-if="$vuetify.breakpoint.mdAndDown" v-model="drawer" app>
      <v-list>
        <v-list-item-group v-model="selectedIndex" color="primary lighten-1">
          <v-list-item v-for="(menu, i) in menus" :key="i" @click="$router.push({path: menu.path})">
            <v-list-item-icon>
              <v-icon v-text="menu.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="menu.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-app>
</template>

<script>
  import HeaderAvatar from "~/components/Header/HeaderAvatar";
  import FButton from "~/components/FButton/FButton";

  export default {
    components: {
      HeaderAvatar, FButton
    },
    data() {
      return {
        menus: [
          { text: 'Home', icon: 'mdi-home', path:"/" },
          { text: 'News', icon: 'mdi-newspaper', path:"/news" },
          { text: 'Season', icon: 'mdi-information-outline', path:"/season" },
          { text: 'Community', icon: 'mdi-account-group', path:"/Community" },
          { text: 'Map', icon: 'mdi-map-marker-outline', path:"/Map" },
        ],
        selectedIndex: 0,
        drawer: false,
      }
    },
    computed: {
      user() {
        return this.$store.state.users.user;
      },
    },
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