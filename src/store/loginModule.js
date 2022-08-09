import myAxios from '@/api/instance';

const SAVE_USER = 'SAVE_USER';
const login = {
  namespaced: true,
  state: () => ({
    user: {},
  }),
  getters: {},
  mutations: {
    [SAVE_USER](state, payload) {
      state.user = payload;
    },
  },
  actions: {
    // 获取用户的个人信息的
    getUserInfo: function (store) {
      myAxios.get('user').then((res) => {
        // console.log(res);
        store.commit(SAVE_USER, res.data);
      });
    },
  },
};
export default login;
