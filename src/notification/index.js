import ons from 'onsenui';
const { notification } = ons;

const alert = function (message, callback) {
  notification.alert(message, {
    callback: callback || (() => { })
  });
}

const toast = function (message, callback) {
  if (window.plugins && window.plugins.toast) {
    window.plugins.toast.showWithOptions(
      {
        message,
        duration: "short",
        position: "bottom",
        addPixelsY: -200
      }
    );
    return;
  }
  notification.toast(message, {
    callback: callback || (() => { }),
    timeout: 2500
  });
}

const prompt = function (message, callback) {
  notification.prompt(message)
    .then(function (v) {
      if (callback)
        callback(v);
    });
}

const confirm = function (message, callback) {
  notification.confirm(message).then(ok => {
    ok && callback && callback();
  });
}

export {
  alert,
  toast,
  prompt,
  confirm
}