<template>
  <div>
    <v-ons-tabbar :tabs="tabs" :index.sync="activeIndex" animation="none">
    </v-ons-tabbar>
    
  </div>
</template>

<script>
import Analyse from '@/components/Analyse';
import Record from '@/components/Record';
import Book from '@/components/Book';
import About from '@/components/About';
import { TabContainer, TabContainerItem } from 'mint-ui';
import { Tabbar, TabItem } from 'mint-ui';
import { Header } from 'mint-ui';

export default {
  name: 'Main',
  components: {
    Analyse,
    Record,
    Book,
    About,
  },
  data () {
    return {
      activeIndex: 0,
      tabId: 't1',
      tabs: [
        {
          icon: 'ion-home',
          label: '明细',
          badge: '',
          key: 'record',
          page: Record,
        },{
          icon: 'ion-home',
          label: '图表',
          badge: '',
          key: 'analyse',
          page: Analyse,
        },
        {
          icon: 'ion-home',
          label: '账本',
          badge: '',
          key: 'book',
          page: Book,
        },{
          icon: 'ion-home',
          label: '我的',
          badge: '99+',
          key: 'about',
          page: About,
        },
      ]
    }
  },

  methods: {
    
  },

  watch: {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
