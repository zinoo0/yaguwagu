<template>
  <v-container>
    <v-row justify="center">
      <img src="/logo.png" width="130" />
    </v-row>
    <v-text-field label="Email Address"></v-text-field>
    <v-text-field label="Password"></v-text-field>
    <v-row justify="center">
      <v-btn color="primary">SIGN IN</v-btn>
    </v-row>
    <br>
    <v-container>
      <v-row justify="center" class="mb-2">
        <v-btn class="facebook" width="225" @click="signInWithFacebook"></v-btn>
      </v-row>
      <v-row justify="center" class="mb-2">
        <v-btn class="google" width="225" @click="signInWithGoogle"></v-btn>
      </v-row>
      <v-row justify="center">
        <v-btn class="github" width="225" @click="signInWithGithub"></v-btn>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
  export default {
    methods: {
      async signInWithGoogle() {
        const provider = new this.$firebase.auth.GoogleAuthProvider();
        this.$firebase.auth().languageCode = 'ko';
        await this.$firebase.auth().signInWithPopup(provider)
      },
      async signInWithFacebook() {
        const provider = new this.$firebase.auth.FacebookAuthProvider();
        this.$firebase.auth().languageCode = 'ko';
        await this.$firebase.auth().signInWithPopup(provider)
      },
      async signInWithGithub() {
        const provider = new this.$firebase.auth.GithubAuthProvider();
        this.$firebase.auth().languageCode = 'ko';
        await this.$firebase.auth().signInWithPopup(provider)
      },
    }
  }
</script>

<style scoped>
  .facebook {
    background: url('https://yaguwagu.s3.ap-northeast-2.amazonaws.com/client/img/signin/facebook.png'); background-size: cover;
  }
  .google {
    background: url('https://yaguwagu.s3.ap-northeast-2.amazonaws.com/client/img/signin/google.png'); background-size: cover;
  }
  .github {
    background: url('https://yaguwagu.s3.ap-northeast-2.amazonaws.com/client/img/signin/github.png'); background-size: cover;
  }    
</style>