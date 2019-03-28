import ons from 'onsenui';
const { notification } = ons;

const alert = function (message, callback) {
  notification.alert(message, {
    callback: callback || (() => { })
  });
}

const toast = function (message, callback) {
  notification.toast(message, {
    callback: callback || (() => { }),
    timeout: 2000
  });
}

const prompt = function (message, callbak) {
  notification.prompt(message)
    .then(function (v) {
      if (callbak)
        callbak(v);
    });
}

export {
  alert,
  toast,
  prompt
}