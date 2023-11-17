import { describe, expect, it } from 'vitest';
import {
  mainReduser,
  setCount,
  setDetailsFlag,
  setItems,
  setMainFlag,
  setPage,
  setValue,
  changeSelect,
} from './slices';
import { planets } from '../components/FakeData/Data';

describe('check actions', () => {
  const initialState = {
    value: '',
    page: 1,
    count: 1,
    perPage: '10',
    mainFlag: false,
    detailsFlag: false,
    items: [],
  };
  it('return initial state when passed empty event', () => {
    const result = mainReduser(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });
  it('change page by "setPage"', () => {
    const action = { type: setPage.type, payload: 2 };
    const result = mainReduser(initialState, action);
    expect(result.page).toEqual(2);
  });
  it('change value by "setValue"', () => {
    const action = { type: setValue.type, payload: 't' };
    const result = mainReduser(initialState, action);
    expect(result.value).toEqual('t');
  });
  it('change mainFlag by "setMainFlag"', () => {
    const action = { type: setMainFlag.type, payload: true };
    const result = mainReduser(initialState, action);
    expect(result.mainFlag).toEqual(true);
  });
  it('change detailsFlag by "setDetailsFlag"', () => {
    const action = { type: setDetailsFlag.type, payload: true };
    const result = mainReduser(initialState, action);
    expect(result.detailsFlag).toEqual(true);
  });
  it('change count by "setCount"', () => {
    const action = { type: setCount.type, payload: 2 };
    const result = mainReduser(initialState, action);
    expect(result.count).toEqual(2);
  });
  it('change items by "setItems"', () => {
    const action = { type: setItems.type, payload: planets };
    const result = mainReduser(initialState, action);
    expect(result.items).toEqual(planets);
  });
  it('change perPage by "changeSelect"', () => {
    const action = { type: changeSelect.type, payload: '5' };
    const result = mainReduser(initialState, action);
    expect(result.perPage).toEqual('5');
  });
});
