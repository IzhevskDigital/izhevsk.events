<template>
  <v-app dark>
    <v-app-bar app>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-content>
      <router-view/>
    </v-content>
    <v-footer app>
      <span>&nbsp;Izhevk IT Community&nbsp;&copy;&nbsp;2020</span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import HelloWorld from '@/components/HelloWorld.vue';
import { Component, Vue } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
const namespace: string = 'counter';


@Component({
  components: { HelloWorld },
})
export default class App extends Vue {
  private title: string = 'События в Ижевске и Удмуртии';

  private async created() {
    let startDate = new Date();
    let endDate = new Date(startDate.getTime() + 30*86400*1000);
    await this.$store.dispatch('EventsDB/fetchAll', {startDate: startDate, endDate: endDate} );
  }

}  

</script>
