<template>
  <div>
    <c-title title="关于" back/>
    <div>
      <img src="@/assets/bookit.png" class="banner" alt>
      <p class="appname">Bookit</p>
      <p class="version">{{buildVersion}}</p>
      <p class="copyright">Copyright 2019 MAO RU NAN</p>
    </div>
  </div>
</template>

<script>
import Config from "@/build";
export default {
  data() {
    return {
      buildVersion: Config.buildVersion
    };
  }
};
</script>

<style scoped>
.appname {
  text-align: center;
  line-height: 60px;
  font-size: 28px;
  font-weight: 700;
  color: #343233;
}

.banner {
  max-width: 100px;
  margin: auto;
  margin-top: auto;
  display: block;
  margin-top: 120px;
}

.version {
  text-align: center;
  color: #808080;
}

.copyright {
  position: absolute;
  bottom: 0;
  width: 100%;
  font-size: 14px;
  color: #999999;
  text-align: center;
  line-height: 100px;
}
</style>