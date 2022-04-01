const EventBus = {
  // 事件队列
  Queue: {},
  //接收
  // 将接收到的函数放进队列中，但是函数是不触发的
  on(key, fn) {
    //防止重复添加事件队列
    if (!this.Queue[key]) {
      this.Queue[key] = []
    }
    this.Queue[key].push(fn)
  },
  //发送
  emit(key, param) {
    //取出待触发队列
    let Grasp = this.Queue[key]
    if (Grasp) {
      Grasp.forEach(fn => {
        fn(param)
      })
    }
  },
  //销毁
  delete(key) {
    delete this.Queue[key]
  }
}

export default EventBus