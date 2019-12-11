<template>
  <div>
    <!-- 게시글 작성 다이얼로그 -->
    <div class="float-right">
      <v-dialog v-model="dialog" width="900px">
        <v-card>
          <v-card-title>
            <span class="headline">
              게시글 작성
              <v-col class="d-flex" cols="16" sm="8">
                <v-select
                  :items="team"
                  label="구단 선택"
                  min-width="10"
                  outlined
                  v-model="board.line"
                  item-text="text"
                  item-value="value"
                  @change="lineChanged()"
                ></v-select>
              </v-col>
            </span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="제목" v-model="board.title"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="작성자" v-model="board.human"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-textarea
                  outlined
                  name="input-7-8"
                  v-model="board.contents"
                  required
                  label="작성하시오"
                  rows="25"
                ></v-textarea>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
            <v-btn color="blue darken-1" text @click="add();">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- 게시글 작성 버튼 -->
    </div>
    <div style="clear: both;">
      <v-carousel cycle hide-delimiters-background show-arrows-on-hover height="250">
        <v-carousel-item v-for="(item,i) in items" :key="i" :src="item.src"></v-carousel-item>
      </v-carousel>
      <!--왼쪽 사이드 -->
      <v-row>
        <v-col cols="12" md="2">
          <br><br><br>
          <v-list-item @click="realyagu()">
            <img src="https://ifh.cc/g/wn4U0.jpg" width="160" height="102" />
          </v-list-item>
          <br />
          <v-list-item @click="realyagu()">
            <img src="https://ifh.cc/g/FL171.png" width="160" height="88" />
          </v-list-item>
          <br />
          <v-list-item @click="sinrim()">
            <img
              src="https://www.runrun.co.kr/wp-content/uploads/2019/05/%EB%A7%A4%EC%9E%A5%EB%93%B1%EB%A1%9D-%EC%8B%A0%EB%A6%BC123%EB%B3%B4%EB%93%9C%EC%B9%B4%ED%8E%98-%EC%84%B8%EB%A1%9C900-658x1024.jpg"
              width="160"
              height="248"
            />
          </v-list-item>
        </v-col>
        <!-- 게시글목록 테이블 및 간략정보  -->
        <v-col cols="12" md="6">
          <v-btn class="ma-2" tile outlined color="indigo lighten-3" @click="dialog=true">
            <v-icon left>mdi-pencil</v-icon>글쓰기
          </v-btn>
          <v-data-table
            :headers="headers"
            :items="boards"
            :items-per-page="15"
            class="#C5CAE9"
            @click:row="select"
            item-key="no"
          >
            <template
              v-slot:item.reportingDate="{ item }"
            >{{ $moment(item.reportingDate).format('YY-MM-DD HH:mm')}}</template>
            <template v-slot:item.line="{ item }">{{ getLineText(item.line) }}</template>
            <v-list>{{board.title}}</v-list>
          </v-data-table>
        </v-col>
        <!-- 시즌 순위 -->
        <v-col cols="12" md="4">
          <v-card max-width="400">
            <v-card-title>
              <v-col>
                <p class="text-start">시즌 2019</p>
              </v-col>
            </v-card-title>
            <v-simple-table height="529">
              <thead>
                <th class="text-center">순위</th>
                <th class="text-center" width="20%">팀</th>
                <th class="text-center" width="20%">승</th>
                <th class="text-center" width="20%">패</th>
                <th class="text-center">무</th>
                <th class="text-center" width="30%">승률</th>
              </thead>
              <tbody class="text-center">
                <tr v-for="(item, index) in rankings" :key="index">
                  <td>{{ item.id }}</td>
                  <td class="text-left">{{ item.team }}</td>
                  <td>{{ item.victory }}</td>
                  <td>{{ item.defeat }}</td>
                  <td>{{ item.draw }}</td>
                  <td>{{ item.odds }}</td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-card>
        </v-col>
      </v-row>
      <!-- 상세 게시글 다이얼로그 -->
      <v-dialog v-model="dialog2" width="900px">
        <template v-slot:activator="{ on }"></template>
        <v-card>
          <v-card-title class="boardtitle">
            <span class="headline">
              <p class="font-weight-red"></p>
            </span>
          </v-card-title>
          <v-card-text text color="deep-purple accent-4">
            <v-container>
              <v-list-item
                width="90%"
                cellpadding="5"
                color="#0D47A1"
                cellspacing="0"
                border="3"
                align="center"
                style="border-collapse:collapse; border:3px gray solid;   border-radius:15px 50px 30px;"
              >
                <v-col>
                  <p class="headline text-start">{{selectedboard.title}}</p>
                </v-col>
                <v-col>&nbsp;&nbsp;작성시간:&nbsp;&nbsp;{{ $moment(selectedboard.reportingDate).format('YY-MM-DD HH:mm')}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;조회수:&nbsp;&nbsp;&nbsp;{{selectedboard.count}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;작성자: &nbsp;&nbsp;&nbsp;{{selectedboard.human}}</v-col>
              </v-list-item>
              <br />
              <br />
              <v-row>
                <v-card
                  width="100%"
                  height="600px"
                  cellpadding="5"
                  cellspacing="0"
                  border="3"
                  mg="1"
                  style="border-collapse:collapse; border:1px gray solid;"
                >{{selectedboard.contents}}</v-card>
              </v-row>
              <br />
              <!-- 뉴스 넣을란  -->
              <!-- 뉴스 첫번째 칸 -->
              <v-container
                id="scroll-target"
                class="overflow-y-auto"
                width="90%"
                cellpadding="5"
                color="#7E57C2"
                cellspacing="0"
                border="3"
                align="center"
                style="border-collapse:collapse; border:2px gray solid;"
              >
                <v-row style="height: 150px">
                  <v-card>
                    <v-list-item
                      width="90%"
                      cellpadding="5"
                      color="#7E57C2"
                      cellspacing="0"
                      border="3"
                      align="center"
                      style="border-collapse:collapse; border-bottom:2px gray solid;"
                      v-for="(news, index) in newsList"
                      :key="index"
                      @click="selectnews(index)"
                    >
                      <v-list>
                        <span>
                          <img :src=" news.thumbnail" width="90" height="61" />
                        </span>
                        <span calss="subtitle-2">{{news.title}}</span>
                      </v-list>
                      <v-list class="sub_info_area">
                        <span class="sub_group">
                          <span class="provider">{{ news.sourceName}}</span>
                        </span>
                        <span class="sub_group">
                          <span class="date">{{ news.date}}</span>
                          <span class="time">{{ news.time}}</span>
                        </span>
                      </v-list>
                    </v-list-item>
                  </v-card>
                </v-row>
              </v-container>
            </v-container>
            <br />
            <!-- 댓글 입력창 및 클릭란 -->
            <v-container>
              <v-row>
                <v-textarea
                  class="mx-1"
                  label="입력하세요."
                  color="blue-grey lighten-4"
                  auto-grow
                  outlined
                  rows="1"
                  row-height="5"
                  v-model="comment"
                ></v-textarea>
                <v-btn
                  color="indigo"
                  outlined
                  class="ma-1"
                  width="40"
                  height="50"
                  @click="comment2"
                >저장</v-btn>
              </v-row>
            </v-container>
            <!-- 댓글 확인하는란 -->
            <v-list-item v-for="(comment, index) in comments" :key="index" :max-width="900">
              <v-card width="900">
                <v-list-item>
                  &nbsp;&nbsp; {{ $moment(comment.reportingDate).format('YY-MM-DD HH:mm') }}
                  <v-spacer></v-spacer>
                  <v-menu right>
                    <template v-slot:activator="{ on }">
                      <v-card-actions>
                        <v-btn icon v-on="on">
                          <v-icon>mdi-dots-vertical</v-icon>
                        </v-btn>
                      </v-card-actions>
                    </template>
                    <!-- 삭제 할 댓글의 배열과 배열의 위치 -->
                    <v-list>
                      <v-list-item>
                        <v-btn text @click="del0(comment.id)">Remove</v-btn>
                      </v-list-item>
                      <v-list-item>
                        <v-btn text @click="edit0(comment)">Edit</v-btn>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </v-list-item>
                <!-- 댓글 -->
                <v-card-text>{{comment.comment}}</v-card-text>
                <v-card-actions>
                  <v-btn class="ma-2" text icon color="blue lighten-2" @click="like(index)">
                    <v-icon size="20">mdi-thumb-up-outline</v-icon>
                  </v-btn>
                  <div v-if="hide">{{comments[index].commentcount}}</div>
                  <v-btn class="ma-2" text icon color="red lighten-2" @click="nolike(index)">
                    <v-icon size="20">mdi-thumb-down-outline</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-list-item>
            <v-btn block @click="paging()" v-if="pageinghide">더보기</v-btn>
          </v-card-text>
          <!-- 상세 게시글 삭제 및 수정 버튼 -->
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn color="blue darken-1" text @click="edit">Edit</v-btn>
            <v-btn color="blue darken-1" text @click="del">Delete</v-btn>
            <v-btn color="blue darken-1" text @click="dialog2 = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!--Edit 수정화면 열기-->
      <v-dialog v-model="dialog3" width="900px">
        <template v-slot:activator="{ on }"></template>
        <v-card>
          <v-card-title>
            <span class="headline">게시글</span>
            <v-col class="d-flex" cols="16" sm="3">
              <v-select
                :items="team"
                label="구단 선택"
                min-width="10"
                outlined
                v-model="edittingboard.line"
              ></v-select>
            </v-col>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="edittingboard.title"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field v-model="edittingboard.human"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-textarea outlined name="input-7-8" v-model="edittingboard.contents" rows="25"></v-textarea>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn color="blue darken-1" text @click="edit">Edit</v-btn>
            <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            <v-btn color="blue darken-1" text @click="dialog3 = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- comment 수정화면 열기 -->
      <v-dialog v-model="dialog4" v-if="dialog4" persistent max-width="600px">
        <v-card>
          <v-card-text color="primary">
            <v-text-field class="ma-0 pa-0" v-model="edittingcomment.comment"></v-text-field>
          </v-card-text>
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn color="blue darken-1" text @click="dialog4 = false">Close</v-btn>
            <v-btn color="blue darken-1" text @click="save0()">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import moment from "moment";
import VueMomentJS from "vue-momentjs";

Vue.use(VueMomentJS, moment);

import VueCarousel from "vue-carousel";
Vue.use(VueCarousel);
import { Carousel, Slide } from "vue-carousel";

export default {
  data: () => ({
    items: [
      {
        src:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNK8jrIrk7T_4VCYASGQlJlTSeBnmSDFrzY6IJvAJTXzHD-3Zmfw&s"
      },
      {
        src:
          "https://imgblog.ncsoft.net/wp-content/uploads/2019/05/03135005/%EC%95%BC%EA%B5%AC-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EB%B6%84%EC%84%9D-20_%EB%A6%AC%EB%89%B4%EC%96%BC-%EB%B8%94%EB%A1%9C%EA%B7%B8-%EC%8D%B8%EB%84%A4%EC%9D%BC-1024x536.jpg"
      },
      {
        src:
          "https://www.chevrolet.co.kr/httpobject/images/2015-baseball/index/visual5.jpg"
      },
      {
        src:
          "https://t2.daumcdn.net/thumb/R720x0/?fname=http://t1.daumcdn.net/brunch/service/user/30m2/image/leLwYDrRv6LAisl8NFe58XWPJsU.jpg"
      }
    ],
    dataURL: "http://ec2-13-209-6-54.ap-northeast-2.compute.amazonaws.com:1225/community",
    no: 1,
    pageSize: 10,
    count: 1,
    commentcount: 1,
    pageinghide: false,
    hide: false,
    dialog4: false, //수정 다이얼로그
    dialog2: false,
    dialog3: false,
    dialog: false, // 다이얼로그 보여주기 여부
    selectedboard: {}, // 선택 데이터 객체
    edittingboard: {}, // 수정할 객체
    edittingcomment: {}, //수정할 댓글
    saveboard: {}, //수정 후 저장할 객체
    newsList: [],
    rankings: [],
    headers: [
      { text: "글 번호", align: "left", value: "no" },
      { text: "line", value: "line" },
      { text: "제목", value: "title" },
      { text: "작성자", value: "human" },
      { text: "작성시간", value: "reportingDate" },
      { text: "조회수", value: "count" }
    ],
    team: [
      { text: "두산", value: "OB" },
      { text: "한화", value: "HH" },
      { text: "LG", value: "LG" },
      { text: "기아", value: "HT" },
      { text: "KT위즈", value: "KT" },
      { text: "삼성", value: "SS" },
      { text: "롯데", value: "LT" },
      { text: "NC", value: "NC" },
      { text: "키움", value: "WO" },
      { text: "SK", value: "SK" }
    ],
    boards: [],
    board: {}, // 추가 데이터 객체
    comments: [],
    comment: "",
    components: {
      Carousel,
      Slide
    },
    //comment: '' = 문자열인데 길이가 0
    //comment: null = 내용이 비어있다
    //[] = 배열
    //{} = 객체
  }),
  methods: {
    getLineText(value) {
      const result = this.team.filter(line => line.value == value);
      let text = value;
      if (result.length > 0) {
        text = result[0].text;
      }
      return text;
    },
    lineChanged() {
      console.log(this.board.line);
    },
    // 게시글 추가
    add() {
      this.board.reportingDate = new Date().getTime();
      this.$axios
        .post("http://ec2-13-209-6-54.ap-northeast-2.compute.amazonaws.com:1225/community/boards",this.board)
        .then(result => {
          this.boards.push(JSON.parse(JSON.stringify(result.data)));
          this.board = {};
          this.dialog = false;
        });
    },
    //댓글 추가
    comment2() {
      if (this.comment != "") {
        this.$axios
          .post("http://ec2-13-209-6-54.ap-northeast-2.compute.amazonaws.com:1225/community/boards/comments", {
            comment: this.comment,
            boardNo: this.selectedboard.no,
            reportingDate: new Date().getTime()
          })
          .then(result => {
            this.comments.unshift(result.data);
            // this.comments = result.data.content;
            // this.comments = result.data.comment;
            this.comment = "";
            this.hide = false;
            console.log(this.comments);
            // this.select();
          });
      } else {
        return;
      }
    },
    //선택 게시글 및 댓글 불러오기 &선택 게시글의 구단 뉴스 불러오기
    select(row) {
      this.selectedboard = row;
      this.selectedboard.count += 1;
      this.dialog2 = true;
      this.$axios
        .get(
          `http://ec2-13-209-6-54.ap-northeast-2.compute.amazonaws.com:1225/community/boards/${
            this.selectedboard.no
          }/comments/${0}/${10}`
        )
        .then(result => {
          this.comments = result.data;
          //this.comments = result.data.reverse();
          console.log(this.comments.length);
          if (this.comments.length >= 10) {
            this.pageinghide = true;
          } else {
            this.pageinghide = false;
          }
        });

      this.$axios
        .get(
          `http://ec2-13-209-6-54.ap-northeast-2.compute.amazonaws.com:1225/community/boards/news/${this.selectedboard.line}`
        )
        .then(result => {
          this.newsList = JSON.parse(result.data).newsListModel.newsList;
          //console.log(this.newsList);
        });
      this.$axios
        .put("http://ec2-13-209-6-54.ap-northeast-2.compute.amazonaws.com:1225/community/boards", this.selectedboard)
        .then(() => {});
      //console.log(this.selectedboard.no);
    },
    // 선택 뉴스 페이지로 이동
    selectnews(index) {
      window.open(
        `https://m.sports.naver.com/news.nhn?oid=${this.newsList[index].oid}&aid=${this.newsList[index].aid}`
      );
      //console.log(this.newsList[index]);
      //console.log(this.newsList[index].oid);
      //console.log(this.newsList[index].aid);
    },
    // 게시글 삭제
    del() {
      this.$axios
        .delete(
          `http://ec2-13-209-6-54.ap-northeast-2.compute.amazonaws.com:1225/community/boards/${this.selectedboard.no}`
        )
        .then(() => {
          var index = this.boards.indexOf(this.selectedboard);
          this.boards.splice(index, 1);
          this.dialog2 = false;
        });
    },
    // 댓글 삭제
    del0(id, index) {
      console.log(this.comment.id, index);
      this.$axios
        .delete(`http://ec2-13-209-6-54.ap-northeast-2.compute.amazonaws.com:1225/community/boards/comments/${id}`)
        .then(() => {
          this.comments.splice(index, 1);
          // this.resetComment();
        });
    },

    //페이징 처리
    paging() {
      this.pageSize += 10;
      this.$axios
        .get(
          `http://ec2-13-209-6-54.ap-northeast-2.compute.amazonaws.com:1225/community/boards/${
            this.selectedboard.no
          }/comments/${0}/${this.pageSize}`
        )
        .then(result => {
          this.comments = result.data;
          console.log(this.comment);
          console.log(this.comments.length);
          console.log(this.pageSize);
          if (this.comments.length >= this.pageSize) {
            this.pageinghide = true;
          } else {
            this.pageinghide = false;
          }
        });
    },

    // 게시글 수정
    edit() {
      this.edittingboard = JSON.parse(JSON.stringify(this.selectedboard));
      this.dialog2 = false;
      this.dialog3 = true;
    },
    // 게시글 수정 후 저장
    save() {
      this.$axios
        .put("http://ec2-13-209-6-54.ap-northeast-2.compute.amazonaws.com:1225/community/boards", this.edittingboard)
        .then(() => {
          var index = this.boards.indexOf(this.selectedboard);
          this.$set(
            this.boards,
            index,
            JSON.parse(JSON.stringify(this.edittingboard))
          );
          this.dialog3 = false;
        });
    },
    // 댓글 수정
    edit0(comment) {
      console.log(this.comment);
      this.edittingcomment = comment;
      this.dialog4 = true;
    },
    // 댓글 수정 후 저장
    save0() {
      this.$axios
        .put(
          "http://ec2-13-209-6-54.ap-northeast-2.compute.amazonaws.com:1225/community/boards/comments",
          this.edittingcomment
        )
        .then(() => {
          this.dialog4 = false;
          console.log(this.edittingcomment);
          this.resetComment();
        });
    },

    //댓글 따봉 카운트 -
    nolike(index) {
      this.hide = true;
      this.commentcount = this.comments[index].commentcount -= 1;
      this.$axios
        .put(
          "http://ec2-13-209-6-54.ap-northeast-2.compute.amazonaws.com:1225/community/boards/comments",
          this.comments[index]
        )
        .then(result => {
          console.log(this.commentcount);
          this.commentcount = result.data;
        });
    },
    //댓글 따봉 카운트 +
    like(index) {
      this.hide = true;
      this.commentcount = this.comments[index].commentcount += 1;
      this.$axios
        .put(
          "http://ec2-13-209-6-54.ap-northeast-2.compute.amazonaws.com:1225/community/boards/comments",
          this.comments[index]
        )
        .then(result => {
          console.log(this.commentcount);
          this.commentcount = result.data;
        });
    },
    sinrim() {
      window.open("https://www.spacecloud.kr/space/10494");
    },
    realyagu() {
      window.open("http://www.realyagu.com/store/");
    }
  },
  // 게시글 및 뉴스 목록 부르기
  created() {
    this.boards = [];
    this.$axios
      .get("http://ec2-13-209-6-54.ap-northeast-2.compute.amazonaws.com:1225/community/boards", {})
      .then(result => {
        this.boards = result.data.reverse();
      });
    this.$axios
      .get("http://ec2-13-209-6-54.ap-northeast-2.compute.amazonaws.com:1225/community/ranking", {})
      .then(result => {
        this.rankings = result.data.reverse();
        console.log(this.rankings);
        console.log(this.boards);
      });
  }
};
</script>
<style>
.example-slide {
  align-items: center;
  background-color: #666;
  color: #999;
  display: flex;
  font-size: 1.5rem;
  justify-content: center;
  min-height: 10rem;
}
table {
  width: 100%;
  border-top: 1px solid #546e7a;
  border-collapse: collapse;
}
th,
td {
  border-bottom: 1px solid #546e7a;
  padding: 10px;
}
</style>
