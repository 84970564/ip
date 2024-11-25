// 常量定义
const REQUEST_HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36',
    'Accept-Language': 'en',
}
const STATUS_COMING = 2, STATUS_AVAILABLE = 1, STATUS_NOT_AVAILABLE = 0, STATUS_TIMEOUT = -1, STATUS_ERROR = -2
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36'

// ChatGPT 相关
const url = "http://chat.openai.com/cdn-cgi/trace"
const tf = ["T1","XX","AL","DZ","AD","AO","AG","AR","AM","AU","AT","AZ","BS","BD","BB","BE","BZ","BJ","BT","BA","BW","BR","BG","BF","CV","CA","CL","CO","KM","CR","HR","CY","DK","DJ","DM","DO","EC","SV","EE","FJ","FI","FR","GA","GM","GE","DE","GH","GR","GD","GT","GN","GW","GY","HT","HN","HU","IS","IN","ID","IQ","IE","IL","IT","JM","JP","JO","KZ","KE","KI","KW","KG","LV","LB","LS","LR","LI","LT","LU","MG","MW","MY","MV","ML","MT","MH","MR","MU","MX","MC","MN","ME","MA","MZ","MM","NA","NR","NP","NL","NZ","NI","NE","NG","MK","NO","OM","PK","PW","PA","PG","PE","PH","PL","PT","QA","RO","RW","KN","LC","VC","WS","SM","ST","SN","RS","SC","SL","SG","SK","SI","SB","ZA","ES","LK","SR","SE","CH","TH","TG","TO","TT","TN","TR","TV","UG","AE","US","UY","VU","ZM","BO","BN","CG","CZ","VA","FM","MD","PS","KR","TW","TZ","TL","GB"]

// 参数处理
const params = $argument ? $argument.split('&') : []
const title = params.find(p => p.startsWith('title='))?.split('=')[1] || 'IP信息及流媒体解锁检测'
const icon = params.find(p => p.startsWith('icon='))?.split('=')[1] || 'play.tv.fill'
const color = params.find(p => p.startsWith('color='))?.split('=')[1] || '#FF2D55'

// 主函数
!(async () => {
  try {
    const [ipInfo, disneyPlus, youtube, netflix, chatgpt] = await Promise.all([
      getIpInfo(),
      testDisneyPlus(),
      check_youtube_premium(),
      check_netflix(),
      check_chatgpt()
    ])

    let disney_result = "Disney+: "
    if (disneyPlus.status === STATUS_COMING) {
      disney_result += "即将登陆~" + disneyPlus.region.toUpperCase()
    } else if (disneyPlus.status === STATUS_AVAILABLE) {
      disney_result += "已解锁 ➟ " + disneyPlus.region.toUpperCase()
    } else if (disneyPlus.status === STATUS_NOT_AVAILABLE) {
      disney_result += "未支持 🚫"
    } else if (disneyPlus.status === STATUS_TIMEOUT) {
      disney_result += "检测超时 🚦"
    }

    const content = [
      `IP: ${ipInfo.country} ${ipInfo.city}`,
      chatgpt,
      youtube,
      netflix,
      disney_result
    ].join('\n')

    $done({
      title: title,
      content: content,
      icon: icon,
      'icon-color': color
    })
  } catch (error) {
    $done({
      title: 'Error',
      content: 'Something went wrong: ' + error.message,
      icon: 'xmark.circle.fill',
      'icon-color': '#FF0000'
    })
  }
})()

async function getIpInfo() {
  const response = await $httpClient.get('http://ip-api.com/json')
  const info = JSON.parse(response.body)
  return { country: info.country, city: info.city }
}

async function check_youtube_premium() {
  let inner_check = () => {
    return new Promise((resolve, reject) => {
      let option = { url: 'https://www.youtube.com/premium', headers: REQUEST_HEADERS }
      $httpClient.get(option, function (error, response, data) {
        if (error) return reject('Error')
        if (data.indexOf('Premium is not available in your country') !== -1) {
          return resolve('Not Available')
        }
        let region = ''
        let re = new RegExp('"countryCode":"(.*?)"', 'gm')
        let result = re.exec(data)
        if (result) {
          region = result[1]
        } else if (data.indexOf('www.google.cn') !== -1) {
          region = 'CN'
        } else {
          region = 'US'
        }
        resolve(region)
      })
    })
  }
  
  const code = await inner_check()
  if (code === 'Not Available') {
    return 'YouTube: 不支持解锁'
  } else {
    return 'YouTube: 已解锁 ➟ ' + code.toUpperCase()
  }
}

async function check_netflix() {
  const filmId = 81280792
  const response = await $httpClient.get({ url: 'https://www.netflix.com/title/' + filmId, headers: REQUEST_HEADERS })
  
  if (response.status === 404) {
    return 'Netflix: 无此影片'
  }
  
  if (response.status === 403) {
    return 'Netflix: 不支持解锁'
  }
  
  if (response.status === 200) {
    let url = response.headers['x-originating-url']
    let region = url.split('/')[3]
    region = region.split('-')[0]
    if (region == 'title') {
      region = 'us'
    }
    return 'Netflix: 已完整解锁 ➟ ' + region.toUpperCase()
  }
  
  return 'Netflix: 检测失败'
}

async function testDisneyPlus() {
  try {
    let { region, cnbl } = await Promise.race([testHomePage(), timeout(7000)])
    let { countryCode, inSupportedLocation } = await Promise.race([getLocationInfo(), timeout(7000)])
    
    region = countryCode ?? region
    // console.log(`region:${region}, inSupportedLocation:${inSupportedLocation}`)
    
    if (inSupportedLocation === false || inSupportedLocation === 'false') {
      return { region, status: STATUS_COMING }
    } else {
      return { region, status: STATUS_AVAILABLE }
    }
    
  } catch (error) {
    // console.log("error:", error)
    
    if (error === 'Not Available') {
      return { status: STATUS_NOT_AVAILABLE }
    }
    
    if (error === 'Timeout') {
      return { status: STATUS_TIMEOUT }
    }
    
    return { status: STATUS_ERROR }
  } 
}

function getLocationInfo() {
  return new Promise((resolve, reject) => {
    let opts = {
      url: 'https://disney.api.edge.bamgrid.com/graph/v1/device/graphql',
      headers: {
        'Accept-Language': 'en',
        Authorization: 'ZGlzbmV5JmJyb3dzZXImMS4wLjA.Cu56AgSfBTDag5NiRA81oLHkDZfu5L3CKadnefEAY84',
        'Content-Type': 'application/json',
        'User-Agent': UA,
      },
      body: JSON.stringify({
        query: 'mutation registerDevice($input: RegisterDeviceInput!) { registerDevice(registerDevice: $input) { grant { grantType assertion } } }',
        variables: {
          input: {
            applicationRuntime: 'chrome',
            attributes: {
              browserName: 'chrome',
              browserVersion: '94.0.4606',
              manufacturer: 'apple',
              model: null,
              operatingSystem: 'macintosh',
              operatingSystemVersion: '10.15.7',
              osDeviceIds: [],
            },
            deviceFamily: 'browser',
            deviceLanguage: 'en',
            deviceProfile: 'macosx',
          },
        },
      }),
    }

    $httpClient.post(opts, function (error, response, data) {
      if (error) {
        reject('Error')
        return
      }

      if (response.status !== 200) {
        // console.log('getLocationInfo: ' + data)
        reject('Not Available')
        return
      }

      data = JSON.parse(data)
      if(data?.errors){
        // console.log('getLocationInfo: ' + data)
        reject('Not Available')
        return
      }

      let {
        inSupportedLocation,
        location: { countryCode },
      } = data?.extensions?.sdk
      resolve({ inSupportedLocation, countryCode })
    })
  })
}

function testHomePage() {
  return new Promise((resolve, reject) => {
    let opts = {
      url: 'https://www.disneyplus.com/',
      headers: {
        'Accept-Language': 'en',
        'User-Agent': UA,
      },
    }

    $httpClient.get(opts, function (error, response, data) {
      if (error) {
        reject('Error')
        return
      }
      if (response.status !== 200 || data.indexOf('Sorry, Disney+ is not available in your region.') !== -1) {
        reject('Not Available')
        return
      }

      let match = data.match(/Region: ([A-Za-z]{2})[\s\S]*?CNBL: ([12])/)
      if (!match) {
        resolve({ region: '', cnbl: '' })
        return
      }

      let region = match[1]
      let cnbl = match[2]
      resolve({ region, cnbl })
    })
  })
}

function timeout(delay = 5000) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('Timeout')
    }, delay)
  })
}

async function check_chatgpt() {
  try {
    const response = await $httpClient.get(url)
    let lines = response.body.split('\n')
    let cf = lines.reduce((acc, line) => {
      let [key, value] = line.split('=')
      acc[key] = value
      return acc
    }, {})
    
    let gpt = tf.indexOf(cf.loc) !== -1 ? "✅ 支持" : "❌ 不支持"
    return `ChatGPT: ${gpt} ${getCountryFlagEmoji(cf.loc)}${cf.loc}`
  } catch (error) {
    // console.error(error)
    return "ChatGPT: 检测失败"
  }
}

function getCountryFlagEmoji(countryCode) {
  if (countryCode.toUpperCase() == 'TW') {
    countryCode = 'CN'
  }
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt())
  return String.fromCodePoint(...codePoints)
}