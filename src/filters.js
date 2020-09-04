import Vue from 'vue'

const numToThousands = function (value = 0) {
  const numArr = value.toString().split('.')
  let intPart = numArr[0]
  let floatPart = numArr.length > 1 ? numArr[1] : ''

  // 处理整数部分
  let intResult = ''
  let floatResult = ''
  while (intPart.length > 3) {
    intResult = ',' + intPart.slice(-3) + intResult
    intPart = intPart.slice(0, intPart.length - 3)
  }
  if (intPart) { intResult = intPart + intResult }

  // 处理小数部分
  if (floatPart === '') {
    floatResult = '.00'
  } else {
    floatResult = floatPart.slice(0, 2)
    if (floatResult.length === 1) {
      floatResult = '.' + floatResult + '0'
    } else {
      floatResult = '.' + floatResult
    }
  }

  // 防止出现 -,966,123,222 的问题
  let total = intResult + floatResult
  if (total.charAt(0) === '-' && total.charAt(1) === ',') {
    total = '-' + total.substring(2)
  }

  return total
}

const numToThousandsRound = function (value = 0) {
  const numArr = value.toString().split('.')
  let intPart = numArr[0]

  // 处理整数部分
  let intResult = ''
  let floatResult = ''
  while (intPart.length > 3) {
    intResult = ',' + intPart.slice(-3) + intResult
    intPart = intPart.slice(0, intPart.length - 3)
  }
  if (intPart) { intResult = intPart + intResult }

  // 防止出现 -,966,123,222 的问题
  let total = intResult + floatResult
  if (total.charAt(0) === '-' && total.charAt(1) === ',') {
    total = '-' + total.substring(2)
  }

  return total
}

Vue.filter('numToMyriad', (value = 0) => {
  if (String(value).length < 5) {
    return value
  } else {
    let result = parseFloat(value / 10000).toFixed(1)
    return result + ' W'
  }
})

Vue.filter('numToThousands', numToThousands)
Vue.filter('numToThousandsRound', numToThousandsRound)
