const mainColor = "#26a2ff";
const lightColor = "#21c4ed";

const setMainColor = function () {
  setColor(mainColor);
}

const setLightColor = function () {
  setColor(lightColor);
}

const setColor = function (color) {
  if ("undefined" !== typeof StatusBar)
    StatusBar.backgroundColorByHexString(color);
}

export {
  setMainColor,
  setLightColor,
  setColor
}