import { Module } from 'vuex';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { EventsState } from './types';
import { RootState } from '../../store/types';

export const state: EventsState = {
  total: 0,
  values: []
};

const namespaced: boolean = true;
export const EventsDB: Module<EventsState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
