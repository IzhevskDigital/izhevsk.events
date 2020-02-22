<template>
  <v-row>
    <v-col class="py-0 my-auto">
      <v-sheet height="64" class="d-flex">
        <v-toolbar flat>
          <v-btn outlined class="mr-4" @click="setToday">Сегодня</v-btn>
          <v-btn fab text small @click="prev"><v-icon small>mdi-chevron-left</v-icon></v-btn>
          <v-btn fab text small @click="next"><v-icon small>mdi-chevron-right</v-icon></v-btn>
          <v-toolbar-title>{{ title }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-menu bottom right>
            <template v-slot:activator="{ on }">
              <v-btn outlined v-on="on"><span>{{ typeToLabel[type] }}</span><v-icon right>mdi-menu-down</v-icon></v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'day'"><v-list-item-title>День</v-list-item-title></v-list-item>
              <v-list-item @click="type = 'week'"><v-list-item-title>Неделя</v-list-item-title></v-list-item>
              <v-list-item @click="type = 'month'"><v-list-item-title>Месяц</v-list-item-title></v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>
      <v-sheet>
        <v-calendar
          ref="calendar"
          v-model="focus"
          :events="events"
          :event-color="getEventColor"
          :now="today"
          :type="type"
          :event-overlap-mode="mode"
          :weekdays = "[1, 2, 3, 4, 5, 6, 0]"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
          @change="updateRange"
        ></v-calendar>
        <v-menu v-model="selectedOpen" :close-on-content-click="false" :activator="selectedElement" offset-x>
            <v-card class="mx-auto" max-width="434" tile>
              <v-toolbar align="top">
                <v-btn icon>
                  <v-icon>mdi-heart</v-icon>
                </v-btn>
                <v-toolbar-title><a :href="selectedEvent.url">{{selectedEvent.name}}</a></v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon text color="secondary" @click="selectedOpen = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-toolbar>
              <a :href="selectedEvent.url">
                <v-img height="100%" :src='selectedEvent.poster_image' >            
                </v-img>
              </a>
              <v-row align="end" class="fill-height" >
                <v-col class="py-0">
                  <v-list-item color="rgba(0, 0, 0, .4)" dark>
                    <v-list-item-content>
                      <v-list-item-title class="title">{{selectedEvent.name}}</v-list-item-title>
                      <v-list-item-subtitle>{{selectedEvent.details}}</v-list-item-subtitle>                      
                    </v-list-item-content>
                  </v-list-item>
                </v-col>                
              </v-row>
            </v-card>
        </v-menu>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>

  import { Event } from '../models/TimePad/Event';


  export default {
    data: () => ({
      mode: 'column',
      today: null,
      focus: '',
      type: 'month',
      typeToLabel: {
        month: 'Месяц',
        week: 'Неделя',
        day: 'День'
      },
      start: null,
      end: null,
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      events: [],
      colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
      names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
    }),
    computed: {
      title () {
        const { start, end } = this
        if (!start || !end) {
          return ''
        }

        const startMonth = this.monthFormatter(start)
        const endMonth = this.monthFormatter(end)
        const suffixMonth = startMonth === endMonth ? '' : endMonth

        const startYear = start.year
        const endYear = end.year
        const suffixYear = startYear === endYear ? '' : endYear

        const startDay = start.day + this.nth(start.day)
        const endDay = end.day + this.nth(end.day)

        switch (this.type) {
          case 'month':
            return `${startMonth} ${startYear}`
          case 'week':
            return `${startMonth} ${startDay} ${startYear} - ${suffixMonth} ${endDay} ${suffixYear}`
          case 'day':
            return `${startMonth} ${startDay} ${startYear}`
        }
        return ''
      },
      monthFormatter () {
        return this.$refs.calendar.getFormatter({
          timeZone: 'UTC', month: 'long',
        })
      },
    },
    mounted () {
      this.$refs.calendar.checkChange()
    },
    methods: {
      viewDay ({ date }) {
        this.focus = date
        this.type = 'day'
      },
      getEventColor (event) {
        return event.color
      },
      setToday () {
        this.focus = this.today
      },
      prev () {
        this.$refs.calendar.prev()
      },
      next () {
        this.$refs.calendar.next()
      },
      showEvent ({ nativeEvent, event }) {
        const open = () => {
          this.selectedEvent = event
          this.selectedElement = nativeEvent.target
          setTimeout(() => this.selectedOpen = true, 10)
        }

        if (this.selectedOpen) {
          this.selectedOpen = false
          setTimeout(open, 10)
        } else {
          open()
        }

        nativeEvent.stopPropagation()
      },
      updateRange ({ start, end }) {
        const events = []
        const min = new Date(`${start.date}T00:00:00`)
        const max = new Date(`${end.date}T23:59:59`)

        this.$store.dispatch('EventsDB/fetchAll', {startDate: min, endDate: max} ).then(()=>{
          for (let i = 0; i < this.$store.state.EventsDB.values.length; i++) {
            let event = this.$store.state.EventsDB.values[i]
            let startDate = new Date(event.starts_at);
            if (startDate>min && startDate<max){
              console.log(event.poster_image);
              events.push({
                name: event.name,
                poster_image: event.poster_image?event.poster_image.default_url: '',
                url: event.url || '#',
                start: this.formatDate(startDate, true),
                end: this.formatDate(event.ends_at || new Date(startDate.getTime()+30*60*1000), true),
                color: this.colors[this.rnd(0, this.colors.length - 1)],
                details: event.description_short || event.name
              })
            }
          }        
          this.start = start
          this.end = end
          this.events = events
        });
      },
      nth (d) {
        return d > 3 && d < 21
          ? 'th'
          : ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'][d % 10]
      },
      rnd (a, b) {
        return Math.floor((b - a + 1) * Math.random()) + a
      },
      formatDate (a, withTime) {
        return withTime
          ? `${a.getFullYear()}-${a.getMonth() + 1}-${a.getDate()} ${a.getHours()}:${a.getMinutes()}`
          : `${a.getFullYear()}-${a.getMonth() + 1}-${a.getDate()}`
      },
    },
  }
</script>
