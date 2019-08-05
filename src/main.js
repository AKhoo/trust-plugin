import { show } from './views/popover';

function app() {
  // Default config
  let configurations = {};

  // All methods that were called up to now and stored in queue need to be
  // called now
  let globalObject = window[window['Trust-Widget']];
  let queue = globalObject.q;

  if (queue) {
    for (var i = 0; i < queue.length; i++) {
      const { id } = extendObject(configurations, queue[i][1]);
      show(id);
    }
  }
}

function extendObject(a, b) {
  for (var key in b) {
    if (b.hasOwnProperty(key)) {
      a[key] = b[key];
    }
  }

  return a;
}

app();
