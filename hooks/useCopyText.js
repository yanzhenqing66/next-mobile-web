const useCopyText = (node) => {
  return new Promise((resolve, reject) => {
    const copyDOM = document.querySelector(node)
    if (copyDOM.innerHTML !== '') {
      //创建一个range
      const range = document.createRange()
      //清楚页面中已有的selection
      window.getSelection().removeAllRanges()
      // 选中需要复制的节点
      range.selectNode(copyDOM)
      window.getSelection().addRange(range) // 执行选中元素
      const successful = document.execCommand('copy') // 执行 copy 操作
      if (successful) {
        resolve('Copy succeeded')
      } else {
        reject('Please select copy content')
      }
      // 移除选中的元素
      window.getSelection().removeAllRanges();
    } else {
      reject('Please select copy content')
    }
  })

}

export default useCopyText