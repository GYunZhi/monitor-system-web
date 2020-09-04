// 深拷贝，仅适用于 json 数据
const deepClone = function (src) {
  return JSON.parse(
    JSON.stringify(src)
  )
}

// 处理数据
const numToMyriad = function (value) {
  let newValue
  if (!value && value !== 0) {
    newValue = '暂无'
  } else {
    newValue = Number(value) ? Number(value) : 0
  }
  if (value >= 10000) {
    newValue = (value / 10000).toFixed(1) + 'W'
  }
  return newValue
}

// 通过文件后缀，返回文件类型
const getFileType = function (suffixType = '') {
  let lowerType = suffixType.toLowerCase()
  let images = ['bmp', 'jpg', 'jpeg', 'png', 'tiff', 'gif']
  let doc = ['doc', 'docx']
  let excel = ['xls', 'xlsx']
  let ppt = ['ppt', 'pptx']
  let pdf = ['pdf']
  let zip = ['zip', 'rar']
  let video = ['rm', 'rmvb', 'mov', 'dat', 'wmv', 'avi', 'flv', 'mp4']
  let audio = ['mp3', 'awv', 'wma']
  if ($.inArray(lowerType, images) !== -1) {
    return 'image'
  } else if ($.inArray(lowerType, doc) !== -1) {
    return 'doc'
  } else if ($.inArray(lowerType, excel) !== -1) {
    return 'excel'
  } else if ($.inArray(lowerType, ppt) !== -1) {
    return 'ppt'
  } else if ($.inArray(lowerType, pdf) !== -1) {
    return 'pdf'
  } else if ($.inArray(lowerType, zip) !== -1) {
    return 'zip'
  } else if ($.inArray(lowerType, video) !== -1) {
    return 'video'
  } else if ($.inArray(lowerType, audio) !== -1) {
    return 'audio'
  } else {
    return ''
  }
}

// 文件下载
const downloadFile = function downloadFile (response) {
  let elemIF = document.createElement('iframe')
  elemIF.src = response
  elemIF.style.display = 'none'
  document.body.appendChild(elemIF)
}

// Blob 文件下载
const downloadBlobFile = function downloadBlobFile (response) {
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    // IE 模式
    window.navigator.msSaveOrOpenBlob(new Blob([response.data]), response.headers.name)
  } else {
    // NOE-IE 模式
    let url = window.URL.createObjectURL(new Blob([response.data]))
    let link = document.createElement('a')
    link.style.display = 'none'
    link.href = url
    link.setAttribute('download', decodeURI(response.headers.name))
    document.body.appendChild(link)
    link.click()
    link.remove()
    window.URL.revokeObjectURL(url)
  }
}

// 参数为null时，转换为空字符串
const transformParams = function transformParams (params) {
  for (let key in params) {
    if (params[key] === null) {
      params[key] = ''
    }
  }
}

// 转换url
const transform = function transform (url, params) {
  if (typeof params === 'object') {
    let p = JSON.parse(JSON.stringify(params))
    for (let key in p) {
      let index = url.indexOf(`{${key}}`)
      if (index > -1) {
        url = url.replace(`{${key}}`, p[key])
        delete p[key]
      }
    }
    return { url }
  }
  return { url, params }
}

export {
  deepClone,
  numToMyriad,
  getFileType,
  downloadFile,
  downloadBlobFile,
  transformParams,
  transform
}
