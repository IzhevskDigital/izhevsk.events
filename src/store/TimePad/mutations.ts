import axios from 'axios';
import { MutationTree } from 'vuex';
import { EventsState } from './types';
import { Events } from '@/models/TimePad/Events';

export const mutations: MutationTree<EventsState> = {
  fetchAll(state) {
    state.total = state.values.length;
  }
};
