<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" fixed app>
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Admin</v-toolbar-title>
      <v-spacer />
    </v-app-bar>
    <!-- Content -->
    <v-content>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-content>
    <!-- Footer -->
    <v-footer fixed app>
      <span>&copy; 2019 Yaguwagu Administrator Page</span>
    </v-footer>
  </v-app>
</template>

<script>

export default {
  data () {
    return {
      drawer: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Dashboard',
          to: '/dashboard'
        },
        {
          icon: 'mdi-account',
          title: 'User',
          to: '/user'
        },
        {
          icon: 'mdi-domain',
          title: 'Partner',
          to: '/partner'
        }
      ],
    }
  },
};
</script>
