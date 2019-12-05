<template>
  <v-card class="overflow-hidden mb-5" color="white">
    <v-toolbar flat color="primary accent-2" height="50">
      <v-toolbar-title class="ml-1 white--text"><span style="font-size: 20px">프로필 수정</span></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-icon v-if="isEditing" color="white" @click="isEditing = !isEditing">mdi-close</v-icon>
      <v-icon v-else color="white" @click="isEditing = !isEditing">mdi-pencil</v-icon>
    </v-toolbar>
    <v-card-text>
      <v-form ref="form" v-model="valid">
        <v-text-field v-model="username" :disabled="!isEditing" :rules="nameRules" :placeholder="user.username" label="이름"></v-text-field>
        <v-text-field v-model="phone" :disabled="!isEditing" :rules="phoneRules" :placeholder="user.phone" label="전화번호"></v-text-field>
        <v-autocomplete v-model="team" :disabled="!isEditing" :items="teams" :rules="teamRules" :placeholder="user.team" color="white" item-text="name" label="팬 소속"></v-autocomplete>
      </v-form>
    </v-card-text>
    <v-divider class="mt-0 mb-0"></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn :disabled="!isEditing" color="white" @click="updateUser">Save</v-btn>
    </v-card-actions>
  </v-card>  
</template>

<script>
  export default {
    data() {
      return {
        teams: [
          { name: '두산 베어스 팬' },
          { name: '한화 이글스 팬' },
          { name: '키움 히어로즈 팬' },
          { name: '기아 타이거즈 팬' },
          { name: 'KT WIZ 팬' },
          { name: 'LG 트윈스 팬' },
          { name: '롯데 자이언츠 팬' },
          { name: 'NC 다이노스 팬' },
          { name: '삼성 라이온즈 팬' },
          { name: 'SK 와이번스 팬' },
        ],
        nameRules: [
          v => !!v || '이름은 필수입니다.',
        ],
        phoneRules: [
          v => !!v || '전화번호는 필수입니다.',
        ],
        teamRules: [
          v => !!v || '팀은 필수입니다.',
        ],        
        isEditing: false,
        valid: false,        
        username: '',
        phone: '',
        team: '',
      }
    },
    computed: {
      user() {
        return this.$store.state.users.user;
      }
    },    
    created() {
      this.username = this.user.username;
      this.phone = this.user.phone;
      this.team = this.user.team;
    },
    methods: {
      updateUser() {
        if(this.$refs.form.validate()) {
          this.$store.dispatch('users/updateUser', {
            username: this.username,
            phone: this.phone,
            uid: this.user.uid,
            team: this.team,
            accessToken: this.user.accessToken
          });
          alert('프로필 업데이트에 성공했습니다.');
        }
        this.isEditing = false;
      }
    }
  }
</script>