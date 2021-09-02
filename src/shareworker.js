// 端口集合
const ports = []

onconnect = function(e) {
  var port = e.ports[0];
  ports.push(port)
  
  port.addEventListener('message', function(e) {

    console.log('SharedWorker', port, ports, e);

    if(e.data === 'destory') {
      ports.forEach((item, index) => {
        if(item === port) {
          ports.splice(index, 1)
        }
      });
      return
    }

    var workerResult = e.data[0] + ' * ' + e.data[1] +  ' = ' + (e.data[0] * e.data[1]);
    // port.postMessage(workerResult);

    // 每个端口都推送下消息
    ports.forEach(item => {
      item.postMessage(workerResult);
    });
  });

  port.start(); // Required when using addEventListener. Otherwise called implicitly by onmessage setter.
}
