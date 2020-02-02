'use strict';

import * as Type from './mutation-type';
import Vue from 'vue';
import Vuex from 'vuex';
import request from 'framework/network/request';

Vue.use(Vuex);

const actions = {
  verifyUser(store, {
    username,
    password
  }) {
    const {
      commit,
      dispatch,
      state
    } = store
    const userInfo = {
      username,
      password
    }
    return request.post('/login/api/login', userInfo, store).then(res => {
      commit(Type.SET_USERINFO, res)
    })
  }
};

export default actions;