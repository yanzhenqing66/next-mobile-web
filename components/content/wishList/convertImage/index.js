import style from './convertImage.module.scss'

function ConvertImage ({first, second, third, fourth}) {

  return (
    <ul className={style.convert_image}>
      <li className={style.first}>{first}</li>
      <li className={style.second}>{second}</li>
      <li className={style.third}>
        <div className={style.top}>{third}</div>
        <div className={style.bottom}>{fourth}</div>
      </li>
    </ul>
  )
}

export default ConvertImage


// 生成快照
  // const convertToImage = (container, options = {}) => {
  //   // 设置放大倍数
  //   const scale = window.devicePixelRatio;

  //   // 传入节点原始宽高
  //   const _width = container.offsetWidth;
  //   const _height = container.offsetHeight;

  //   let { width, height } = options;
  //   width = width || _width;
  //   height = height || _height;

  //   // html2canvas配置项
  //   const ops = {
  //     scale,
  //     // width,
  //     // height,
  //     useCORS: true,
  //     allowTaint: false,
  //     ...options
  //   };

  //   return html2canvas(container, ops).then(canvas => {
  //     // 返回图片的二进制数据
  //     return canvas.toDataURL("image/png");
  //   });
  // }

  // const getImgs = async () => {
  //   // 调用函数，取到截图的二进制数据，对图片进行处理（保存本地、展示等）
  //   const ele = document.querySelector('#wishLay')
  //   const imgBlobData = await convertToImage(ele)
  //   setImgData(imgBlobData)
  // }

  // useEffect(() => {
  //   getImgs()
  // }, [])