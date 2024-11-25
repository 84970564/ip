你的流媒体解锁检测脚本和 ChatGPT 检测脚本合并，以便在 Surge 的面板上展示两个功能的结果，我们需要确保所有逻辑在一个脚本中顺畅地运行。以下是合并后的示例代码结构：

/*
 * 由@LucaLin233和@Rabbit-Spec编写，并加入ChatGPT可用性检测
 * 更新日期：2024.06.01
 * 版本：3.1
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
const GPT_URL = "http://chat.openai.com/cdn-cgi/trace";
const SUPPORTED_COUNTRIES = ["T1", "XX", "AL", "DZ", "AD", "AO", "AG", "AR", "AM", "AU", "AT", "AZ", "BS", "BD", "BB", "BE", "BZ", "BJ", "BT", "BA", "BW", "BR", "BG", "BF", "CV", "CA", "CL", "CO", "KM", "CR", "HR", "CY", "DK", "DJ", "DM", "DO", "EC", "SV", "EE", "FJ", "FI", "FR", "GA", "GM", "GE", "DE", "GH", "GR", "GD", "GT", "GN", "GW", "GY", "HT", "HN", "HU", "IS", "IN", "ID", "IQ", "IE", "IL", "IT", "JM", "JP", "JO", "KZ", "KE", "KI", "KW", "KG", "LV", "LB", "LS", "LR", "LI", "LT", "LU", "MG", "MW", "MY", "MV", "ML", "MT", "MH", "MR", "MU", "MX", "MC", "MN", "ME", "MA", "MZ", "MM", "NA", "NR", "NP", "NL", "NZ", "NI", "NE", "NG", "MK", "NO", "OM", "PK", "PW", "PA", "PG", "PE", "PH", "PL", "PT", "QA", "RO", "RW", "KN", "LC", "VC", "WS", "SM", "ST", "SN", "RS", "SC", "SL", "SG", "SK", "SI", "SB", "ZA", "ES", "LK", "SR", "SE", "CH", "TH", "TG", "TO", "TT", "TN", "TR", "TV", "UG", "AE", "US", "UY", "VU", "ZM", "BO", "BN", "CG", "CZ", "VA", "FM", "MD", "PS", "KR", "TW", "TZ", "TL", "GB"];

(async () => {
  let panelResult = {
    title: '流媒体与ChatGPT检测',
    content: '',
    icon: 'play.tv.fill',
    'icon-color': '#FF2D55',
  };

  // 获取流媒体状态
  let [{ region, status }] = await Promise.all([testDisneyPlus()]);
  let streamResults = await Promise.all([check_youtube_premium(), check_netflix()]);
  let disneyResult = formatDisneyStatus(status, region);
  streamResults.push(disneyResult);
  
  //状态
  let gptResult = await checkGptStatus();

  // 整合并显示结果
  panelResult.content = `${streamResults.join('\n')}\n${gptResult}`;
  
  $done(panelResult);
})();

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
  // YouTube Premium检测逻辑
  // (保留现有逻辑)
}

async function check_netflix() {
  // Netflix检测逻辑
  // (保留现有逻辑)
}

async function testDisneyPlus() {
  // Disney+检测逻辑
  // (保留现有逻辑)
}

async function checkGptStatus() {
  return new Promise((resolve) => {
    $httpClient.get(GPT_URL, function (error, response, data) {
      if (error) {
        resolve("ChatGPT 检测失败");
        return;
      }

      let lines = data.split("\n");
      let cf = lines.reduce((acc, line) => {
        let [key, value] = line.split("=");
        acc[key] = value;
        return acc;
      }, {});

      let loc = cf.loc;
      let isSupported = SUPPORTED_COUNTRIES.includes(loc) ? "支持" : "不支持";
      let countryEmoji = getCountryFlagEmoji(loc);

      resolve(`ChatGPT: ${isSupported} (${countryEmoji} ${loc})`);
    });
  });
}

function getCountryFlagEmoji(countryCode) {
  if (countryCode.toUpperCase() == 'TW') {
    countryCode = 'CN';
  }
  const codePoints = countryCode.toUpperCase().split('').map(char => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

### 说明
- **流媒体检测**：保留了你现有的流媒体检测逻辑，通过调用不同的函数检查 Disney+、YouTube Premium 和 Netflix 的解锁情况。
- **ChatGPT 检测**：增加了对 ChatGPT 可用性检测的支持，从指定的 URL 获取 IP 信息，然后根据 IP 判断是否支持 ChatGPT。
- **合并面板显示**：两个功能的结果会被整合到同一面板中显示。

确保你的合并脚本功能代码上传到合适的远程仓库后，验证 Surge 正确指向并获取该脚本。这样面板的配置就能正常显示合并后的结果。