// A working example of redux-saga usage
import {
  call, put, takeEvery, takeLatest,
} from 'redux-saga/effects';
import NetworkHttpRequest from '../../network/Gateway';
import RootActions from '../actions/RootActions';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchAPI(action : {payload:string}) {
  try {
    const user = yield call(NetworkHttpRequest.get, action.payload);
    yield put({ type: 'USER_FETCH_SUCCEEDED', user });
  } catch (e) {
    yield put({ type: 'USER_FETCH_FAILED', message: e.message });
  }
}


// Starts fetchUser on each dispatched RootActions.ACTION_TEST_SAGA action.
// Allows concurrent fetches of user.

function* mySaga() {
  console.log('ON MY SAGA');
  yield takeEvery(RootActions.ACTION_TEST_SAGA, fetchAPI);
}


// Alternatively you may use takeLatest.
//
// Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
// dispatched while a fetch is already pending, that pending fetch is cancelled
// and only the latest one will be run.

// function* mySaga() {
//  yield takeLatest(RootActions.ACTION_TEST_SAGA, fetchAPI);
// }

export default mySaga;
