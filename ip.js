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

(async () => {
  let panel_result = {
    title: titlediy || '流媒体解锁检测',
    content: '',
    icon: 'play.tv.fill',
    'icon-color': '#FF2D55',
  }

  // 运行所有检测
  let [{ region, status }, youtube_result, netflix_result, chatgpt_result] = await Promise.all([
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
  panel_result.content = [youtube_result, netflix_result, disney_result, chatgpt_result].join('\n')

  // 发送结果
  $done(panel_result)
})()

async function check_youtube_premium() {
  // YouTube Premium 检测代码（保持不变）
  // ...（此处省略，保持原有代码不变）
}

async function check_netflix() {
  // Netflix 检测代码（保持不变）
  // ...（此处省略，保持原有代码不变）
}

async function testDisneyPlus() {
  // Disney+ 检测代码（保持不变）
  // ...（此处省略，保持原有代码不变）
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
      let gpt, iconUsed, iconCol;
      if (l !== -1) {
        gpt = "ChatGPT: ✔️";
        iconUsed = icon || undefined;
        iconCol = iconColor || undefined;
      } else {
        gpt = "ChatGPT: ✖️";
        iconUsed = iconerr || undefined;
        iconCol = iconerrColor || undefined;
      }

      // 更新面板图标和颜色
      if (iconUsed) panel_result.icon = iconUsed;
      if (iconCol) panel_result['icon-color'] = iconCol;

      resolve(`${gpt}   区域: ${loc}`);
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