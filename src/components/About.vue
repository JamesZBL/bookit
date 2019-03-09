<template id="about">
  <v-ons-page>
    <Title title=""/>
    <div class="wrapper">
      <div class="head" style="box-shadow: #00cdff 0px 0px 20px 0px;">
        <img class="avatar" :src="avatar"/>
        <span class="username">{{username}}</span>
        <div class="float">
          
        </div>
      </div>
      <v-ons-list class="menus">
        <v-ons-list-item @click="onClickCategory" modifier="chevron" tappable>分类管理</v-ons-list-item>
      </v-ons-list>
      <mt-button class="btn" @click="onClickLogout" v-if="authenticated" size="large" type="danger">退出登录</mt-button>
    </div>
  </v-ons-page>
</template>

<script>
import Title from '@/components/Title';
import { MessageBox } from 'mint-ui';
export default {
  name: 'About',
  components: {
    Title,
  },
  data() {
    return {
      authenticated: true,
      username: '毛聪明',
      avatar: 'https://storage.live.com/users/0x77cd9ac5fe438898/myprofile/expressionprofile/profilephoto:UserTileStatic/p?ck=1&ex=720&fofoff=1&sid=3B6A542688A3626C01A8593C898D6307',
    }
  },

  methods: {
    onClickLogout() {
      
      this.$ons.notification.confirm('确定要退出登录吗?')
      .then((ok) => {
        if(ok) {

        }
      });
    },

    onClickCategory() {
      this.$router.push('/category');
    }
  },
}
</script>

<style scoped>
  .head {
    height: 105px;
    background: linear-gradient(#26a2ff, #00cdff);
    color: white;
    margin-bottom: 4px;
    position: fixed;
    z-index: 1;
    width: 100%;
    padding: 20px 0;
    width: 100%;
  }

  .avatar {
    min-width: 60px;
    height: 60px;
    display: inline-block;
    margin-left: 20px;
    border-radius: 50%;
  }

  .username {
    margin-bottom: 50px;
    display: inline-block;
    margin-left: 10px;
    font-weight: 1000;
  }

  .float {
    color: black;
    z-index: 3;
    background-color: white;
    height: 70px;
    width: 86%;
    top: 200px;
    box-shadow: rgba(1,1,1,0.1) 0px 2px 10px 2px;
    border-radius: 5px;
    margin: auto;
    padding: 10px;
  }

  .list-cells {
    margin-bottom: 15px;
  }

  .menus {
    padding-top: 220px;
  }

  .btn {
    margin: auto;
    margin-top: auto;
    width: 92%;
    margin-top: 10px;
  }
</style>