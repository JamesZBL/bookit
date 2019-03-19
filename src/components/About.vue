<template id="about">
  <v-ons-page>
    <c-title title/>
    <div class="wrapper">
      <div class="about-head" style="box-shadow: #00cdff 0px 0px 20px 0px;">
        <img class="avatar" :src="avatar">
        <div class="head-right">
          <div class="head-first">
            <span class="username">{{user.username}}</span>
          </div>
          <span class="email">{{user.email}}</span>
        </div>
        <div class="check" @click="onClickUserCheck">
          <v-ons-icon style="color:white;" icon="md-edit"></v-ons-icon>
          <span class="check-text">签到</span>
          <span class="check-filler"></span>
        </div>
        <div class="about-float">
          <v-ons-row>
            <v-ons-col>
              <div class="float-col">
                <span class="float-value">{{stats.check_count}}</span>
                <span class="float-label">已连续打卡</span>
              </div>
            </v-ons-col>
            <v-ons-col>
              <div class="float-col">
                <span class="float-value">{{stats.day}}</span>
                <span class="float-label">总记账天数</span>
              </div>
            </v-ons-col>
            <v-ons-col>
              <div class="float-col">
                <span class="float-value">{{stats.record_count}}</span>
                <span class="float-label">总记账笔数</span>
              </div>
            </v-ons-col>
          </v-ons-row>
        </div>
      </div>
      <v-ons-list class="menus">
        <v-ons-list-item
          v-for="(i,index) in list"
          :key="index"
          @click="onClickLink(i.path)"
          modifier="chevron"
          tappable
        >
          <div class="left">
            <v-ons-icon :style="{color:i.color}" :icon="i.icon"></v-ons-icon>
          </div>
          <div class="center">
            <span>{{i.name}}</span>
          </div>
        </v-ons-list-item>
      </v-ons-list>
      <v-btn
        class="btn btn-logout"
        @click="onClickLogout"
        v-if="authenticated"
        color="error"
        large
      >退出登录</v-btn>
    </div>
    <v-ons-dialog cancelable :visible.sync="dialogVisible">
      <img v-if="check.checked_today" class="modal-icon" src="@/assets/happy.svg" alt>
      <img v-if="!check.checked_today" class="modal-icon" src="@/assets/cool.svg" alt>
      <p class="modal-title" style="text-align: center">{{check_modal_title}}</p>
      <p class="modal-subtitle" style="text-align: center">你已连续签到 {{check.total_day}} 天</p>
    </v-ons-dialog>
  </v-ons-page>
</template>

<script>
import { MessageBox } from "mint-ui";
export default {
  name: "About",
  data() {
    return {
      authenticated: true,
      user: {
        username: "摆码王子",
        email: "maocongming@gmail.com"
      },
      avatar:
        "https://storage.live.com/users/0x77cd9ac5fe438898/myprofile/expressionprofile/profilephoto:UserTileStatic/p?ck=1&ex=720&fofoff=1&sid=3B6A542688A3626C01A8593C898D6307",
      stats: {
        day: 71,
        record_count: 22,
        check_count: 18
      },
      check: {
        total_day: 18,
        checked_today: true
      },
      dialogVisible: false,
      list: [
        {
          icon: "md-widgets",
          name: "分类管理",
          path: "/settings/category",
          color: "#86cbff"
        },
        {
          icon: "md-lock-outline",
          name: "密码修改",
          path: "/settings/password",
          color: "#8783ff"
        },
        {
          icon: "md-help",
          name: "帮助",
          path: "/settings/help",
          color: "#ffc182"
        },
        {
          icon: "md-mood",
          name: "关于",
          path: "/settings/aboutapp",
          color: "#ff83c7"
        }
      ]
    };
  },

  methods: {
    onClickLogout() {
      this.$ons.notification.confirm("确定要退出登录吗?").then(ok => {
        if (ok) {
          this.$router.replace("/signin");
        }
      });
    },

    onClickUserCheck() {
      this.dialogVisible = true;
    },

    onClickLink(path) {
      this.$router.push(path);
    }
  },

  computed: {
    check_modal_title() {
      return this.check.checked_today ? "已经签过了哦" : "签到成功";
    }
  }
};
</script>

<style scoped>
.about-head {
  height: 150px;
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
  margin-left: 40px;
  border-radius: 50%;
}

.username {
  font-weight: 1000;
}

.about-float {
  color: black;
  z-index: 3;
  background-color: white;
  height: 90px;
  width: 86%;
  top: 200px;
  box-shadow: rgba(1, 1, 1, 0.1) 0px 2px 10px 2px;
  border-radius: 5px;
  margin: auto;
  padding: 10px;
  margin-top: 20px;
}

.list-cells {
  margin-bottom: 15px;
}

.menus {
  padding-top: 220px;
}

.float-label {
  display: block;
  font-size: 12px;
  margin: auto;
  text-align: center;
  line-height: 28px;
  color: #757575;
}

.float-value {
  display: block;
  font-size: 20px;
  text-align: center;
  line-height: 40px;
  color: #486482;
}

.head-right {
  display: inline-block;
  position: absolute;
  padding-left: 15px;
  width: 60%;
}

.email {
  font-size: 14px;
}

.head-first {
  display: block;
}

.check {
  position: absolute;
  right: -10px;
  top: 24px;
  background-color: #0094ef;
  border-radius: 20px;
  box-shadow: #009dfe 0 3px 3px;
  font-size: 14px;
  padding: 5px;
  padding-left: 14px;
}

.check-filler {
  display: inline-block;
  width: 20px;
}

.check-text {
  margin-left: 2px;
}

.modal-icon {
  display: block;
  margin: auto;
  max-width: 60px;
  margin-top: 20px;
}

.modal-title {
  font-size: 20px;
}

.modal-subtitle {
  color: #7b7b7b;
}

.list-item__left {
  padding: 12px 14px 12px 10px;
}

.btn-logout {
  top: 10px;
}
</style>