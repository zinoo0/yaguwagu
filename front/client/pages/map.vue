<template>
  <v-container>
    <naver-maps :mapOptions="mapOptions" :height="400" @load="onMapLoaded">
      <naver-marker
        v-for="(mark, index) in items" :key="index" 
        :lat="mark.y" :lng="mark.x" 
        @click="onMarkerClick(mark)" 
      />
    </naver-maps>
    <v-card>
      <v-card-title>
        <v-text-field 
          v-model="search"
          autofocus single-line hide-details
          prepend-icon="mdi-magnify" label="도로명주소, 지번주소, 영어주소로 검색" color="primary"
        ></v-text-field>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="items"
        :items-per-page="5"
        :search="search"
        class="elevation-1"
        item-key="seq"
        @click:row="onClickTableRow"
      >
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        // Map
        mapOptions: {
          lat: 37.5125,
          lng: 127.074,
          zoom: 11,
        },
        map: null,

        // Table
        headers: [
          {text: '도로명주소', align: 'left', sortable: false, value: 'roadAddress'},
          {text: '지번주소', align: 'left', sortable: false, value: 'jibunAddress'},  
          {text: '영어주소', align: 'left', sortable: false, value: 'englishAddress'},
        ],
        items: [],
        selectedField: {},
        search : '',
      }
    },
    computed: {
      fieldInfo() {
        return this.$store.state.map.fieldInfo;
      }
    },
    created() {
      (async () => {
        const res = await this.$axios.get(`${process.env.BACK_URL}/map`);
        for(let mark of res.data) {
          mark.x = parseFloat(mark.x);
          mark.y = parseFloat(mark.y);
        }
        this.items = res.data;
      })();
    },
    methods: {
      onMapLoaded(map) {
        if(navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((pos) => {
            map.panTo({ x: pos.coords.longitude, y: pos.coords.latitude });
          });
        }
        this.map = map;
      },
      onClickIcon() {
        if(this.isDetail) this.isDetail = false; 
      },
      onClickTableRow(param){
        this.map.setCenter(param.y, param.x);
      },
    }
  }
</script>