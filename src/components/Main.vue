<template>
  <div>
    <mt-tab-container v-model="tabId">
      <mt-tab-container-item id="t1">
        <Record/>
      </mt-tab-container-item>
      <mt-tab-container-item id="t2">
        <Analyse/>
      </mt-tab-container-item>
      <mt-tab-container-item id="t3">
        <Book/>
      </mt-tab-container-item>
      <mt-tab-container-item id="t4">
        <About/>
      </mt-tab-container-item>
    </mt-tab-container>
    <mt-tabbar v-model="tabId">
      <mt-tab-item id="t1">
      <img slot="icon" src="../assets/transaction.svg"/>
      明细
      </mt-tab-item>
      <mt-tab-item id="t2">
      <img slot="icon" src="../assets/piechart.svg"/>
      图表
      </mt-tab-item>
      <mt-tab-item id="t3">
      <img slot="icon" src="../assets/wallet.svg"/>
      账本
      </mt-tab-item>
      <mt-tab-item id="t4">
      <img slot="icon" src="../assets/user.svg"/>
      我的
      </mt-tab-item>
    </mt-tabbar>
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
      tabId: 't1',
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
