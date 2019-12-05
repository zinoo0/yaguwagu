<template>
  <div>
    <div class="title">업체 등록</div>
    <v-row>
      <v-col cols="12" md="6">
        <v-text-field v-model="name" label="이름"></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field v-model="phone" label="전화번호"></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field v-model="time" label="운영시간"></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-file-input v-model="mainImageFile" multiple label="메인 이미지"></v-file-input>
      </v-col>
      <v-col cols="12" md="6">
        <v-file-input v-model="menuImageFile" multiple label="메뉴 이미지"></v-file-input>
      </v-col>
      <v-col cols="12" md="6">
        <v-dialog v-model="menuDialog" width="500">
          <template v-slot:activator="{ on }">
            <v-text-field label="메뉴 등록" v-on="on"></v-text-field>
          </template>
          <v-card>
            <v-card-title>
              메뉴
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field v-model="menuInputName" label="메뉴 이름"></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field v-model="menuInputPrice" label="메뉴 가격" @keyup.enter="onSubmitMenu"></v-text-field>
                </v-col>
              </v-row>
              <div v-for="(menu, index) in menuList" :key="index">
                <v-icon @click="onCancelMenuItem(index)">mdi-close</v-icon> {{ menu.name }} {{ menu.price }}
              </div>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="onRegisterMenu">등록</v-btn>
              <v-btn @click="menuDialog = false">완료</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
      <v-btn block @click="onClickDone">완료</v-btn>
    </v-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        name: '',
        phone: '',
        time: '',
        mainImageFile: null,
        menuImageFile: null,
        menuDialog: false,
        menuInputName: '',
        menuInputPrice: '',
        menuList: [],
      }
    },
    methods: { 
      onRegisterMenu() {
        this.menuList.push({ name:  this.menuInputName, price: this.menuInputPrice });
        this.menuInputName = '';
        this.menuInputPrice = '';
      },
      onCancelMenuItem(index) {
        this.menuList.splice(index, 1);
      },
      async onClickDone() {
        // Base64 형태로 변환할 배열 미리 선언
        let mainImageList = [];
        let menuImageList = [];

        // Promise를 리턴하는 File Reader 생성
        const fileRead = (file) => {
          const reader = new FileReader();
          return new Promise((resolve, reject) => {
            reader.onerror = () => {
              reader.abort();
              reject('error');
            };
            reader.onload = () => {
              resolve(reader.result);
            }
            reader.readAsDataURL(file);
          });
        }

        // Menu Image File Read
        this.menuImageFile.forEach(async (file) => {
          menuImageList.push({
            fileName: file.name,
            fileType: file.type,
            base64Data: await fileRead(file)
          });
        });

        // Main Image File Read
        this.mainImageFile.forEach(async (file, index) => {
          mainImageList.push({
            fileName: file.name,
            fileType: file.type,
            base64Data: await fileRead(file)
          });
          if(index === this.mainImageFile.length-1) {
            await this.$axios.post(`${process.env.BACK_URL}/partner/`, {
              name: this.name,
              phone: this.phone,
              time: this.time,
              mainImages: mainImageList,
              menuImages: menuImageList,
              menus: this.menuList
            });
            alert('저장 성공');
          }
        });
      }
    }
  }
</script>