import { call, put } from 'redux-saga/effects';
import camelCase from 'lodash.camelcase';
import snakeCase from 'lodash.snakecase';

export function modifyObjectKeys(object, modify) {
  // If the passed in object is not an object, return it.
  if (
    object === undefined
    || object === null
    || (typeof object !== 'object' && !Array.isArray(object))
  ) {
    return object;
  }

  if (Array.isArray(object)) {
    return object.map(value => modifyObjectKeys(value, modify));
  }

  // Otherwise, process all its keys.
  const result = {};
  Object.entries(object).forEach(([key, value]) => {
    result[modify(key)] = modifyObjectKeys(value, modify);
  });
  return result;
}

export function camelCaseObject(object) {
  return modifyObjectKeys(object, camelCase);
}

export function snakeCaseObject(object) {
  return modifyObjectKeys(object, snakeCase);
}

export function convertKeyNames(object, nameMap) {
  const transformer = key => (nameMap[key] === undefined ? key : nameMap[key]);

  return modifyObjectKeys(object, transformer);
}

export function keepKeys(data, whitelist) {
  const result = {};
  Object.keys(data).forEach((key) => {
    if (whitelist.indexOf(key) > -1) {
      result[key] = data[key];
    }
  });
  return result;
}

/**
 * A higher order helper function to create a redux-saga generator function
 *
 * it handles the boilerplate of making a call to an API
 * and dispatching the appropriate actions.
 */
export function createFetchHandler(routine, apiCall) {
  return function* handleFetch() {
    try {
      yield put(routine.request());
      const result = yield call(apiCall);
      yield put(routine.success(result));
    } catch (error) {
      yield put(routine.failure(error));
    } finally {
      yield put(routine.fulfill());
    }
  };
}
