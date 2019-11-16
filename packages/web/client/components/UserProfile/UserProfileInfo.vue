<template>
  <v-card class="overflow-hidden mb-5" color="white">
    <v-toolbar flat color="primary accent-2" height="50">
      <v-toolbar-title class="ml-1 white--text"><span style="font-size: 20px">프로필 정보</span></v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-list color="white">
      <v-list-item three-line>
        <v-list-item-avatar size="100"><v-img :src="user.profileUrl" /></v-list-item-avatar>
        <v-list-item-content>
          <div class="mb-4">
            <div class="font-weight-bold">{{ user.username }}</div>
            <div class="body-2">{{ user.email }}</div>
          </div>
          <v-list-item-title class="headline font-weight-medium mb-1">{{ user.team }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider class="mt-0 mb-0" />
    <v-card-actions>
      <v-btn color="white">#쓴 글 확인</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    props: {
      user: {
        type: Object,
        required: true
      }
    }
  }
</script>