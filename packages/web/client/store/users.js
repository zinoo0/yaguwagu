export const state = () => ({
  user: null,
  field: null,
  profile: null,
});

export const mutations = {
  setMe(state, payload) {
    state.user = payload;
  },
  updateUser(state, payload) {
    state.user.username = payload.username;
    state.user.phone = payload.phone;
    state.user.team = payload.team;
  },
  loadProfile(state, payload) {
    state.profile = payload;
  }
}
export const actions = {
  async logIn({ commit }, payload) {
    try {
      const res = await this.$axios.post(`${process.env.BACK_URL}/user/login`, {
        accessToken: payload.accessToken,
        username: payload.displayName,
        email: payload.email,
        phone: payload.phoneNumber,
        profileUrl: payload.photoURL,
        uid: payload.uid
      })
      const data = res.data;
      data.accessToken = payload.accessToken;
      data.uid = payload.uid;
      commit('setMe', data);
    } catch (err) {
      console.error(err);
    }
  },
  async logOut({ commit, state }) {
    try {
      await this.$axios.put(`${process.env.BACK_URL}/user/logout`, { uid: state.user.uid })
      commit('setMe', null);
    } catch (err) {
      console.error(err);
    }
  },
  async loadProfile({ commit }, payload) {
    try {
      const res = await this.$axios.get(`${process.env.BACK_URL}/user/profile/${payload.uid}`)
      commit('loadProfile', res.data);
    } catch (err) {
      console.error(err);
    }
  },
  async updateUser({ commit }, payload) {
    try {
      const res = await this.$axios.put(`${process.env.BACK_URL}/user/update`, {
        username: payload.username,
        phone: payload.phone,
        uid: payload.uid,
        team: payload.team
      });
      commit('updateUser', res.data);
    } catch (err) {
      console.error(err);
    }
  },
  async delUser({ commit }, payload) {
    try {
      await this.$axios.delete(`${process.env.BACK_URL}/user/delete?uid=${payload.uid}`)
      commit('setMe', null);
    } catch (err) {
      console.error(err);
    }
  }
}