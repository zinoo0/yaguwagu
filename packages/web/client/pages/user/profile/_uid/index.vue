<template>
  <v-container>
    <user-profile-info v-if="user" :user="user"></user-profile-info>  
  </v-container>
</template>

<script>
  import UserProfileInfo from '~/components/UserProfile/UserProfileInfo';

  export default {
    components: {
      UserProfileInfo
    },
    fetch({ store, params }){
      store.dispatch('users/loadProfile', { uid: params.uid });
    },
    computed: {
      user() {
        return this.$store.state.users.profile;
      }
    }
  }
</script>