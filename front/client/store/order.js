export const state = () => ({
  partners: [],
  teams: [
    { name: '대전이글스파크', src: 'https://yaguwagu.s3.ap-northeast-2.amazonaws.com/client/img/field/hanwha.jpg', initial: 'hanwha' },
    { name: '광주챔피언스필드', src: 'https://yaguwagu.s3.ap-northeast-2.amazonaws.com/client/img/field/kia.jpg', initial: 'kia' },
    { name: '수원위즈파크', src: 'https://yaguwagu.s3.ap-northeast-2.amazonaws.com/client/img/field/suwon.jpg', initial: 'suwon' },
    { name: '사직야구장', src: 'https://yaguwagu.s3.ap-northeast-2.amazonaws.com/client/img/field/sajig.jpg', initial: 'sajig' },
    { name: '고척스카이돔', src: 'https://yaguwagu.s3.ap-northeast-2.amazonaws.com/client/img/field/gocheok.jpg', initial: 'gocheok' },
    { name: '잠실야구장', src: 'https://yaguwagu.s3.ap-northeast-2.amazonaws.com/client/img/field/jamsil.jpg', initial: 'jamsil' },
    { name: '대구라이온즈파크', src: 'https://yaguwagu.s3.ap-northeast-2.amazonaws.com/client/img/field/lions.jpg', initial: 'lions' },
    { name: '창원NC파크', src: 'https://yaguwagu.s3.ap-northeast-2.amazonaws.com/client/img/field/changwon.jpg', initial: 'changwon' },
    { name: '문학구장', src: 'https://yaguwagu.s3.ap-northeast-2.amazonaws.com/client/img/field/munhag.jpg', initial: 'munhag' },
  ],
});
export const mutations = {
  loadPartners(state, payload) {
    state.partners = payload;
  },
}

export const actions = {
  async loadPartners({ commit }) {
    try {
      const res = await this.$axios.get(`${process.env.BACK_URL}/partner`)
      commit('loadPartners', res.data);
    } catch (err) {
      console.error(err);
    }
  },
  async orderSend({ commit }, payload) {

  }
}