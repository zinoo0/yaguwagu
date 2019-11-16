<template>
  <v-container>
    <user-profile-info :user="user"></user-profile-info>
    <user-profile-update></user-profile-update>
    <user-profile-danger></user-profile-danger>
  </v-container>
</template>

<script>
  import UserProfileInfo from '~/components/UserProfile/UserProfileInfo';
  import UserProfileUpdate from '~/components/UserProfile/UserProfileUpdate';
  import UserProfileDanger from '~/components/UserProfile/UserProfileDanger';

  export default {
    components: {
      UserProfileInfo, UserProfileUpdate, UserProfileDanger
    },
    computed: {
      user() {
        return this.$store.state.users.user;
      }
    },
    middleware: 'authenticated'
  }
</script>