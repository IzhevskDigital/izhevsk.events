import { ActionTree } from 'vuex';
import axios from 'axios';
import { EventsState } from './types';
import { RootState } from '../../store/types';
import { Events } from '@/models/TimePad/Events';

export const actions: ActionTree<EventsState, RootState> = {
  async fetchAll({ commit, state }, {startDate, endDate}) {
    try {
      const response = await axios.get<Events>('https://api.timepad.ru/v1/events?limit=100&skip=0&sort=%2Bid&cities=%D0%98%D0%B6%D0%B5%D0%B2%D1%81%D0%BA&access_statuses=public&moderation_statuses=featured%2Cshown%2Cnot_moderated&starts_at_min=' + startDate.toISOString() + '&starts_at_max=' + endDate.toISOString());
      state.total = response.data.total;
      state.values = response.data.values as Event[];
      commit('fetchAll');
    } catch (e) {
      console.debug(e);
//      this.showError = true;
//      this.errorMessage = `Error while loading weather forecast: ${e.message}.`;
    }
  }
};
