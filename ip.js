/*
 * 由@LucaLin233编写，@Rabbit-Spec修改
 * 更新日期：2024.06.01，版本：3.1
 * ChatGPT 状态检测由@keywos wuhu@wuhu_zzz
 */

const REQUEST_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36',
  'Accept-Language': 'en',
};

// 状态常量
const STATUS_COMING = 2; // 即将登陆
const STATUS_AVAILABLE = 1; // 支持解锁
const STATUS_NOT_AVAILABLE = 0; // 不支持解锁
const STATUS_TIMEOUT = -1; // 检测超时
const STATUS_ERROR = -2; // 检测异常

const UA = REQUEST_HEADERS['User-Agent'];

// ChatGPT 位置检查 URL 和支持列表
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

// 主函数
(async () => {
  // 初始化面板结果
  let panel_result = {
    title: titlediy ? titlediy : '服务检测',
    content: '',
    icon: icon ? icon : 'play.tv.fill',
    'icon-color': iconColor ? iconColor : '#FF2D55',
  };

  // 检测流媒体解锁
  let [{ region, status }] = await Promise.all([testDisneyPlus()]);
  let stream_result = await Promise.all([check_youtube_premium(), check_netflix()]);

  // 整合内容
  let disney_result = formatDisneyStatus(status, region);
  stream_result.push(disney_result);
  panel_result['content'] = stream_result.join('\n');

  // 检测 ChatGPT 可用性
  checkChatGPT(result => {
    panel_result['content'] += '\n' + result;
    $done(panel_result);
  });
})();

// 流媒体检测函数和格式化函数
function formatDisneyStatus(status, region) {
  if (status == STATUS_COMING) {
    return "Disney+: 即将登陆~" + region.toUpperCase();
  } else if (status == STATUS_AVAILABLE) {
    return "Disney+: 已解锁 ➟ " + region.toUpperCase();
  } else if (status == STATUS_NOT_AVAILABLE) {
    return "Disney+: 未支持 🚫";
  } else if (status == STATUS_TIMEOUT) {
    return "Disney+: 检测超时 🚦";
  }
}

async function check_youtube_premium() {
  // YouTube Premium检测代码…
}

async function check_netflix() {
  // Netflix检测代码…
}

async function testDisneyPlus() {
  // Disney+检测代码…
}

function checkChatGPT(callback) {
  // 发送 HTTP 请求获取所在地信息
  $httpClient.get(url, function(error, response, data) {
    if (error) {
      callback("ChatGPT: 检测失败");
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
      gpt = "GPT: ✔️   区域: " + loc;
 else {
      gpt = "GPT: ✖️   区域: " + loc;
    }

    callback(gpt);
  });
}

function getCountryFlagEmoji(countryCode) {
  if (countryCode.toUpperCase() == 'TW') {
    countryCode = 'CN';
  }
  const codePoints = countryCode.toUpperCase().split('').map(char => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}