import {take, put, call, fork} from 'redux-saga/effects';
import * as types from '../actions/actionTypes';
import {loginSuccess, loginFailure} from '../actions/loginActions';
import {Alert} from 'react-native';

const loginData = {
  token: 'my secret token',
  user: {
    name: 'feitico',
    email: 'user@gmail.com',
  },
};

function loginCall({email, password}) {
  return new Promise((resolve, reject) => {
    if (email === 'user@gmail.com') {
      resolve(loginData);
    } else {
      Alert.alert('Thông báo đăng nhập', 'wrong email or password');
      reject({status: 'wrong email or password'});
    }
  });
}

function* watchLoginRequest() {
  while (true) {
    const {email, password} = yield take(types.LOGIN.REQUEST);

    try {
      const payload = {
        email,
        password,
      };
      const response = yield call(loginCall, payload);

      yield put(loginSuccess(response));
      console.log('SAGA LOGIN SUCCESS: ', response);
    } catch (err) {
      console.log('SAGA LOGIN ERR: ', err);
      yield put(loginFailure(err.status));
    }
  }
}

export default function* root() {
  yield fork(watchLoginRequest);
}
