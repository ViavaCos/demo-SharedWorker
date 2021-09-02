/**
 * Chrome浏览器打开 chrome://inspect/#workers 可以inspect SharedWorker的控制台
 */

 function generateSharedWorker(data){
    // SharedWorker(url, name)  name不一样的话, 会创建不同的SharedWorker
    var myWorker = new SharedWorker("shareworker.js", 'multiply');
  
    myWorker.port.start()
  
    myWorker.port.postMessage(data)
  
    myWorker.port.onmessage = function(e) {
      console.log('first:', e);
    }
  
    // 页面刷新或关闭前 销毁端口
    window.addEventListener('beforeunload', () => {
      myWorker.port.postMessage('destory')
    })
  }