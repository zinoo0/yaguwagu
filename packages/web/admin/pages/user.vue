<template>
  <v-data-table :headers="headers" :items="users" sort-by="email" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat color="transparent">
        <v-toolbar-title>User List</v-toolbar-title>        
      </v-toolbar>
    </template>
  </v-data-table>
</template>

<script>
  export default {
    data() {
      return {
        dialog: false,
        headers: [
          { text: 'Uid', value: 'uid' },
          { text: 'Email', value: 'email' },
          { text: 'Username', value: 'username', width: '100' },
          { text: 'Team', value: 'team', width: '150' },
          { text: 'Profile url', value: 'profileUrl' },
          { text: 'Created at', value: 'createdAt' },
        ],
        users: [],
      }
    },
    created() {
      (async () => {
        const res = await this.$axios.get(`${process.env.BACK_URL}/user`);
        this.users = res.data;
      })();
    },
  }
</script>