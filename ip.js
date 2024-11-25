const REQUEST_HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36',
    'Accept-Language': 'en',
}

// 状态常量定义
const STATUS_COMING = 2
const STATUS_AVAILABLE = 1
const STATUS_NOT_AVAILABLE = 0
const STATUS_TIMEOUT = -1
const STATUS_ERROR = -2

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36'

// ChatGPT 相关
let url = "http://chat.openai.com/cdn-cgi/trace";
let tf = ["T1","XX","AL","DZ","AD","AO","AG","AR","AM","AU","AT","AZ","BS","BD","BB","BE","BZ","BJ","BT","BA","BW","BR","BG","BF","CV","CA","CL","CO","KM","CR","HR","CY","DK","DJ","DM","DO","EC","SV","EE","FJ","FI","FR","GA","GM","GE","DE","GH","GR","GD","GT","GN","GW","GY","HT","HN","HU","IS","IN","ID","IQ","IE","IL","IT","JM","JP","JO","KZ","KE","KI","KW","KG","LV","LB","LS","LR","LI","LT","LU","MG","MW","MY","MV","ML","MT","MH","MR","MU","MX","MC","MN","ME","MA","MZ","MM","NA","NR","NP","NL","NZ","NI","NE","NG","MK","NO","OM","PK","PW","PA","PG","PE","PH","PL","PT","QA","RO","RW","KN","LC","VC","WS","SM","ST","SN","RS","SC","SL","SG","SK","SI","SB","ZA","ES","LK","SR","SE","CH","TH","TG","TO","TT","TN","TR","TV","UG","AE","US","UY","VU","ZM","BO","BN","CG","CZ","VA","FM","MD","PS","KR","TW","TZ","TL","GB"];
let tff = ["plus","on"];

// 处理 argument 参数
let titlediy, icon, iconerr, iconColor, iconerrColor;
if (typeof $argument !== 'undefined') {
  const args = $argument.split('&');
  for (let i = 0; i < args.length; i++) {
    const [key, value] = args[i].split('=');
    if (key === 'title') {
      titlediy = value;
    } else if (key === 'icon') {
      icon = value;
    } else if (key === 'iconerr') {
      iconerr = value;
    } else if (key === 'icon-color') {
      iconColor = value;
    } else if (key === 'iconerr-color') {
      iconerrColor = value;
    }
  }
}

// 添加IP检测函数
async function getIpInfo() {
  return new Promise((resolve) => {
    $httpClient.get('http://ip-api.com/json', function(error, response, data) {
      if (error) {
        resolve({country: '未知', city: '未知'});
      } else {
        let info = JSON.parse(data);
        resolve({country: info.country, city: info.city});
      }
    });
  });
}

(async () => {
  let panel_result = {
    title: titlediy || 'IP信息及流媒体解锁检测',
    content: '',
    icon: icon || 'play.tv.fill',
    'icon-color': iconColor || '#FF2D55',
  }

  // 运行所有检测
  let [ipInfo, { region, status }, youtube_result, netflix_result, chatgpt_result] = await Promise.all([
    getIpInfo(),
    testDisneyPlus(),
    check_youtube_premium(),
    check_netflix(),
    check_chatgpt()
  ])

  // 处理 Disney+ 结果
  let disney_result = ""
  if (status == STATUS_COMING) {
    disney_result = "Disney+: 即将登陆~" + region.toUpperCase()
  } else if (status == STATUS_AVAILABLE) {
    disney_result = "Disney+: 已解锁 ➟ " + region.toUpperCase()
  } else if (status == STATUS_NOT_AVAILABLE) {
    disney_result = "Disney+: 未支持 🚫 "
  } else if (status == STATUS_TIMEOUT) {
    disney_result = "Disney+: 检测超时 🚦"
  }

  // 组合所有结果
  panel_result.content = `IP: ${ipInfo.country} ${ipInfo.city}\n${chatgpt_result}\n${youtube_result}\n${netflix_result}\n${disney_result}`

  // 发送结果
  $done(panel_result)
})()

async function check_youtube_premium() {
  let inner_check = () => {
    return new Promise((resolve, reject) => {
      let option = {
        url: 'https://www.youtube.com/premium',
        headers: REQUEST_HEADERS,
      }
      $httpClient.get(option, function (error, response, data) {
        if (error != null || response.status !== 200) {
          reject('Error')
          return
        }

        if (data.indexOf('Premium is not available in your country') !== -1) {
          resolve('Not Available')
          return
        }

        let region = ''
        let re = new RegExp('"countryCode":"(.*?)"', 'gm')
        let result = re.exec(data)
        if (result != null && result.length === 2) {
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

  let youtube_check_result = 'YouTube: '

  await inner_check()
    .then((code) => {
      if (code === 'Not Available') {
        youtube_check_result += '不支持解锁'
      } else {
        youtube_check_result += '已解锁 ➟ ' + code.toUpperCase()
      }
    })
    .catch((error) => {
      youtube_check_result += '检测失败，请刷新面板'
    })

  return youtube_check_result
}

async function check_netflix() {
  let inner_check = (filmId) => {
    return new Promise((resolve, reject) => {
      let option = {
        url: 'https://www.netflix.com/title/' + filmId,
        headers: REQUEST_HEADERS,
      }
      $httpClient.get(option, function (error, response, data) {
        if (error != null) {
          reject('Error')
          return
        }

        if (response.status === 403) {
          reject('Not Available')
          return
        }

        if (response.status === 404) {
          resolve('Not Found')
          return
        }

        if (response.status === 200) {
          let url = response.headers['x-originating-url']
          let region = url.split('/')[3]
          region = region.split('-')[0]
          if (region == 'title') {
            region = 'us'
          }
          resolve(region)
          return
        }

        reject('Error')
      })
    })
  }

  let netflix_check_result = 'Netflix: '

  await inner_check(81280792)
    .then((code) => {
      if (code === 'Not Found') {
        return inner_check(80018499)
      }
      netflix_check_result += '已完整解锁 ➟ ' + code.toUpperCase()
      return Promise.reject('BreakSignal')
    })
    .then((code) => {
      if (code === 'Not Found') {
        return Promise.reject('Not Available')
      }

      netflix_check_result += '仅解锁自制剧 ➟ ' + code.toUpperCase()
      return Promise.reject('BreakSignal')
    })
    .catch((error) => {
      if (error === 'BreakSignal') {
        return
      }
      if (error === 'Not Available') {
        netflix_check_result += '该节点不支持解锁'
        return
      }
      netflix_check_result += '检测失败，请刷新面板'
    })

  return netflix_check_result
}

async function testDisneyPlus() {
  try {
      let { region, cnbl } = await Promise.race([testHomePage(), timeout(7000)])
      console.log(`homepage: region=${region}, cnbl=${cnbl}`)
      let { countryCode, inSupportedLocation } = await Promise.race([getLocationInfo(), timeout(7000)])
      console.log(`getLocationInfo: countryCode=${countryCode}, inSupportedLocation=${inSupportedLocation}`)
      
      region = countryCode ?? region
      console.log( "region:"+region)
      // 即将登陆
      if (inSupportedLocation === false || inSupportedLocation === 'false') {
        return { region, status: STATUS_COMING }
      } else {
        // 支持解锁
        return { region, status: STATUS_AVAILABLE }
      }
      
    } catch (error) {
      console.log("error:"+error)
      
      // 不支持解锁
      if (error === 'Not Available') {
        console.log("不支持")
        return { status: STATUS_NOT_AVAILABLE }
      }
      
      // 检测超时
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
        console.log('getLocationInfo: ' + data)
        reject('Not Available')
        return
      }

      data = JSON.parse(data)
      if(data?.errors){
        console.log('getLocationInfo: ' + data)
        reject('Not Available')
        return
      }

      let {
        token: { accessToken },
        session: {
          inSupportedLocation,
          location: { countryCode },
        },
      } = data?.extensions?.sdk
      resolve({ inSupportedLocation, countryCode, accessToken })
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

function check_chatgpt() {
  return new Promise((resolve) => {
    $httpClient.get(url, function(error, response, data) {
      if (error) {
        console.error(error);
        resolve("ChatGPT: 检测失败");
        return;
      }

      let lines = data.split("\n");
      let cf = lines.reduce((acc, line) => {
        let [key, value] = line.split("=");
        acc[key] = value;
        return acc;
      }, {});
      
      let loc = getCountryFlagEmoji(cf.loc) + cf.loc;

      // 判断 ChatGPT 是否支持该国家/地区
      let l = tf.indexOf(cf.loc);
      let gpt;
      if (l !== -1) {
        gpt = "ChatGPT: ✅ 支持";
      } else {
        gpt = "ChatGPT: ❌ 不支持";
      }

      resolve(`${gpt} ${loc}`);
    });
  });
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

这个修改后的脚本整合了以下功能：

1. IP 信息检测
2. ChatGPT 可用性检测
3. YouTube Premium 解锁检测
4. Netflix 解锁检测
5. Disney+ 解锁检测

主要变化：

1. 添加了 `getIpInfo` 函数来获取 IP 信息。
2. 在主异步函数中同时运行所有