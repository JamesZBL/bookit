<template id="about">
  <div class="scroll">
    <c-title title></c-title>
    <div class="wrapper">
      <div class="about-head" style="box-shadow: #00cdff 0px 0px 20px 0px;">
        <img class="avatar" :src="avatar" v-if="avatarValid">
        <img class="avatar" src="@/assets/avatar.png" v-else>
        <form ref="form" class="form">
          <input ref="file" type="file" name="avatar" accept="image/*" @change="onFileChange">
        </form>
        <div class="head-right">
          <div class="head-first" @click="onClickNickName">
            <span class="username">{{user.nickName}}</span>
          </div>
          <span class="email">{{user.email}}</span>
        </div>
        <div class="check" @click="onClickUserCheck">
          <v-ons-icon style="color:white;" icon="md-edit"></v-ons-icon>
          <span class="check-text">签到</span>
        </div>
      </div>
      <div class="about-float">
        <v-container grid-list-md text-xs-center>
          <v-layout row wrap>
            <v-flex xs4>
              <span class="float-value">{{stats.check_count}}</span>
              <span class="float-label">已连续打卡</span>
            </v-flex>
            <v-flex xs4>
              <span class="float-value">{{stats.day}}</span>
              <span class="float-label">总记账天数</span>
            </v-flex>
            <v-flex xs4>
              <span class="float-value">{{stats.record_count}}</span>
              <span class="float-label">总记账笔数</span>
            </v-flex>
          </v-layout>
        </v-container>
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
            <v-ons-icon :style="{color:i.color}" :icon="i.icon" class="item-icon"></v-ons-icon>
          </div>
          <div class="center">
            <span>{{i.name}}</span>
          </div>
        </v-ons-list-item>
      </v-ons-list>
      <v-btn class="btn btn-logout" @click="onClickLogout" color="error" large round>退出登录</v-btn>
    </div>
    <v-ons-dialog cancelable :visible.sync="dialogVisible">
      <img v-if="check.checked_today" class="modal-icon" src="@/assets/happy.svg" alt>
      <img v-else class="modal-icon" src="@/assets/cool.svg" alt>
      <p class="modal-title" style="text-align: center">{{check_modal_title}}</p>
      <p class="modal-subtitle" style="text-align: center">你已连续签到 {{stats.check_count}} 天</p>
    </v-ons-dialog>
  </div>
</template>

<script>
import axios from "@/request";
import { prompt, alert, toast } from "@/notification";
import config from "@/config";
export default {
  name: "about",
  data() {
    return {
      check: {
        checked_today: true
      },
      dialogVisible: false,
      list: [
        {
          icon: "md-eye",
          name: "显示设置",
          path: "/settings/display",
          color: "#86f4ff"
        },
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

  computed: {
    user() {
      return this.$store.state.profile.user;
    },
    stats() {
      return this.$store.state.profile.stats;
    },
    check_modal_title() {
      return this.check.checked_today ? "今天签过了哦" : "签到成功";
    },
    avatar() {
      return `${config.fileBaseURL}${this.user.avatar}`;
    },
    avatarValid() {
      const { avatar } = this.user;
      return undefined != avatar && null != avatar;
    },
    loaded() {
      return this.$store.state.loaded.about;
    }
  },

  activated() {
    this.loadIfNeeded();
  },

  mounted() {
    this.loadIfNeeded();
  },

  methods: {
    onClickLogout() {
      this.$ons.notification.confirm("确定要退出登录吗?").then(ok => {
        if (ok) {
          this.$router.replace("/signin");
          this.$store.commit("setCurrentPage", "");
          this.$store.commit("resetAll");
          localStorage.removeItem("token");
        }
      });
    },

    onClickUserCheck() {
      axios.post("/check-in").then(({ data }) => {
        this.check.checked_today = !!!data;
        this.dialogVisible = true;
        this.loadCheckStatistics();
      });
    },

    onClickLink(path) {
      this.$router.push(path);
    },

    loadIfNeeded() {
      if (!this.loaded) {
        this.loadData();
        this.$store.commit("setLoaded", "about");
      }
    },

    loadData() {
      this.loadProfile();
      this.loadCheckStatistics();
      this.loadRecordStats();
    },

    loadProfile() {
      axios.get("/profile").then(({ data }) => {
        this.$store.commit("setUser", data);
      });
    },

    loadCheckStatistics() {
      axios.get("/check-in/sum").then(({ data }) => {
        this.$store.commit("setStats", {
          check_count: data
        });
      });
    },

    loadRecordStats() {
      axios.get("/record/sum/days").then(({ data }) => {
        this.$store.commit("setStats", {
          day: data
        });
      });
      axios.get("/record/sum/counts").then(({ data }) => {
        this.$store.commit("setStats", {
          record_count: data
        });
      });
    },

    onClickNickName() {
      const _this = this;
      prompt("请输入新的昵称，不多于6个字符", function(v) {
        const value = v && v.trim();
        if (!value || value.length > 6) {
          alert("无效的昵称");
          return false;
        }
        _this.updateNickName(value);
      });
    },

    updateNickName(nickName) {
      axios
        .put("/profile/nick-name", {
          nickName
        })
        .then(({ data }) => {
          this.$store.commit("setUser", data);
          toast("修改成功");
        });
    },

    onFileChange() {
      const file = this.$refs.file.files[0];
      if (!file) return;
      const formData = new FormData();
      formData.set("avatar", file);
      axios({
        method: "put",
        url: "/profile/avatar",
        data: formData,
        config: { headers: { "Content-Type": "multipart/form-data" } }
      }).then(({ data: { avatar } }) => {
        this.$store.commit("setUserAvatar", avatar);
      });
    }
  }
};
</script>

<style scoped>
.about-head {
  background: linear-gradient(#26a2ff, #00cdff);
  height: 155px;
  color: white;
  margin-bottom: 4px;
  width: 100%;
  padding: 20px 0;
  width: 100%;
  overflow: hidden;
}

.about-float {
  position: absolute;
  background-color: white;
  height: 90px;
  width: 86%;
  box-shadow: rgba(1, 1, 1, 0.1) 0px 2px 10px 2px;
  border-radius: 5px;
  margin: auto;
  margin-top: 20px;
  top: 90px;
  left: 7%;
}

.avatar {
  width: 60px;
  height: 60px;
  display: inline-block;
  margin-left: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px rgba(0, 255, 255, 0.35) solid;
}

.username {
  font-weight: 1000;
}

.list-cells {
  margin-bottom: 15px;
}

.menus {
  margin-top: 60px;
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
  font-family: "Lato", Arial, Helvetica, sans-serif;
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
  right: 0;
  top: 12px;
  background-color: #0094ef;
  box-shadow: rgba(0, 0, 0, 0.24) 0 3px 8px;
  font-size: 14px;
  padding: 5px;
  padding-left: 14px;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  padding-right: 14px;
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
  margin-top: 10px;
}

.modal-subtitle {
  color: #7b7b7b;
}

.btn-logout {
  top: 10px;
}

.container.grid-list-md .layout .flex {
  padding: 0 !important;
}

.form {
  position: absolute;
  float: left;
  left: 0;
  top: 10px;
  width: 70px;
  margin-left: 35px;
  height: 80px;
  opacity: 0;
}

.form > input {
  display: block;
  width: 100%;
  height: 100%;
}
</style>