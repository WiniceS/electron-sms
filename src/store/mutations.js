'use strict';
import * as types from './mutation-type';

const mutations = {
  [types.SET_WINHEIGHT](state, height) {
    state.winHeight = height;
  },
  [types.SET_USERINFO](state, userInfo) {
    state.userInfo = userInfo;
  }
};
export default mutations;