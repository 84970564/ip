为了将这两个脚本合并，我们将提供一个完整的合并脚本，其中包含流媒体解锁检测和 ChatGPT 可用性检测的功能。新的脚本需要将两个功能结合在一个结果面板中，并通过参数自定义显示图标和颜色。

以下是合并后的示例脚本：

/*
 * 合并流媒体解锁检测与 ChatGPT 可用性检测脚本
 */

const STREAM_HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36',
    'Accept-Language': 'en',
};

// ChatGPT URL 和支持的国家代码
const GPT_URL = "http://chat.openai.com/cdn-cgi/trace";
const SUPPORTED_COUNTRIES = ["T1", "XX", "AL", "DZ", "AD", "AO", "AG", "AR", "AM", "AU", "AT", "AZ", "BS", "BD", "BB", "BE", "BZ", "BJ", "BT", "BA", "BW", "BR", "BG", "BF", "CV", "CA", "CL", "CO", "KM", "CR", "HR", "CY", "DK", "DJ", "DM", "DO", "EC", "SV", "EE", "FJ", "FI", "FR", "GA", "GM", "GE", "DE", "GH", "GR", "GD", "GT", "GN", "GW", "GY", "HT", "HN", "HU", "IS", "IN", "ID", "IQ", "IE", "IL", "IT", "JM", "JP", "JO", "KZ", "KE", "KI", "KW", "KG", "LV", "LB", "LS", "LR", "LI", "LT", "LU", "MG", "MW", "MY", "MV", "ML", "MT", "MH", "MR", "MU", "MX", "MC", "MN", "ME", "MA", "MZ", "MM", "NA", "NR", "NP", "NL", "NZ", "NI", "NE", "NG", "MK", "NO", "OM", "PK", "PW", "PA", "PG", "PE", "PH", "PL", "PT", "QA", "RO", "RW", "KN", "LC", "VC", "WS", "SM", "ST", "SN", "RS", "SC", "SL", "SG", "SK", "SI", "SB", "ZA", "ES", "LK", "SR", "SE", "CH", "TH", "TG", "TO", "TT", "TN", "TR", "TV", "UG", "AE", "US", "UY", "VU", "ZM", "BO", "BN", "CG", "CZ", "VA", "FM", "MD", "PS", "KR", "TW", "TZ", "TL", "GB"];

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

// 主检测函数
(async () => {
    let panelResult = {
        title: titlediy ? titlediy : '服务检测',
        content: '检测中，请稍候...',
        icon: icon ? icon : 'questionmark.circle',
        'icon-color': iconColor ? iconColor : '#336FA9',
    };

    try {
        // 检测流媒体
        let streamResult = await checkStreamUnlock();
        // 检测GPT
        let gptResult = await checkGptStatus();

        // 合并检测结果
        panelResult.content = streamResult + '\n' + gptResult;
    } catch (error) {
        panelResult.content = '检测出现错误：' + error;
    }

    $done(panelResult);
})();

// 检测流媒体解锁功能
async function checkStreamUnlock() {
    let results = [];
    let disneyResult = await testDisneyPlus();
    results.push(getDisneyText(disneyResult.status, disneyResult.region));
    results.push(await check_youtube_premium());
    results.push(await check_netflix());
    return results.join('\n');
}

// 获取 Disney 状态文字描述
function getDisneyText(status, region) {
    switch (status) {
        case STATUS_COMING:
            return `Disney+: 即将登陆~ ${region.toUpperCase()}`;
        case STATUS_AVAILABLE:
            return `Disney+: 已解锁 ➟ ${region.toUpperCase()}`;
        case STATUS_NOT_AVAILABLE:
            return `Disney+: 未支持 🚫`;
        case STATUS_TIMEOUT:
            return `Disney+: 检测超时 🚦`;
        default:
            return `Disney+: 检测错误`;
    }
}

// YouTube Premium 解锁检测
async function check_youtube_premium() {
    let youtubeCheckResult = 'YouTube: ';
    try {
        let region = await new Promise((resolve, reject) => {
            let option = { url: 'https://www.youtube.com', headers: STREAM_HEADERS };
            $httpClient.get(option, function (error, response, data) {
                if (error || response.status !== 200) {
                    reject('Error');
                    return;
                }
                
                if (data.includes('Premium is not available in your country')) {
                    resolve('Not Available');
                    return;
                }
                
                let re = /"countryCode":"(.*?)"/gm;
                let match = re.exec(data);
                resolve(match ? match[1] : 'US');
            });
        });

        youtubeCheckResult += (region === 'Not Available') ? '不支持解锁' : `已解锁 ➟ ${region.toUpperCase()}`;
    } catch (error) {
        youtubeCheckResult += '检测失败，请刷新面板';
    }
    
    return youtubeCheckResult;
}

// Netflix 解锁检测
async function check_netflix() {
    let netflixCheckResult = 'Netflix: ';
    try {
        let region = await checkNetflixRegion(81280792);  // 使用某个Netflix影片ID检测

        if (region === 'Not Found') {
            region = await checkNetflixRegion(80018499);
            if (region === 'Not Found') throw 'Not Available';
            netflixCheckResult += `仅解锁自制剧 ➟ ${region.toUpperCase()}`;
        } else {
            netflixCheckResult += `已完整解锁 ➟ ${region.toUpperCase()}`;
        }
    } catch (error) {
        netflixCheckResult += (error === 'Not Available') ? '该节点不支持解锁' : '检测失败，请刷新面板';
    }

    return netflixCheckResult;
}

async function checkNetflixRegion(filmId) {
    return new Promise((resolve, reject) => {
        let option = { url: `https://www.netflix.com/title/${filmId}`, headers: STREAM_HEADERS };
        $httpClient.get(option, function (error, response, data) {
            if (error || response.status === 403) {
                reject('Not Available');
            } else if (response.status === 404) {
                resolve('Not Found');
            } else if (response.status === 200) {
                let url = response.headers['x-originating-url'];
                let region = url.split('/')[3].split('-')[0];
                resolve(region === 'title' ? 'US' : region);
            } else {
                reject('Error');
            }
        });
    });
}

// GPT 可用性检测
async function checkGptStatus() {
    return new Promise((resolve, reject) => {
        $httpClient.get(GPT_URL, function (error, response, data) {
            if (error) {
                return reject('GPT检测失败');
            }

            let lines = data.split("\n");
            let cf = lines.reduce((acc, line) => {
                let [key, value] = line.split("=");
                acc[key] = value;
                return acc;
            }, {});

            let loc = cf.loc || '未知';
            let isSupported = SUPPORTED_COUNTRIES.includes(loc) ? "支持✅" : "不支持❌";
            let countryEmoji = getCountryFlagEmoji(loc);
            let resultText = `GPT: ${isSupported} (${countryEmoji} ${loc})`;

            resolve(resultText);
        });
    });
}

// 获取国家国旗 Emoji 的函数
function getCountryFlagEmoji(countryCode) {
    if (countryCode.toUpperCase() == 'TW') {
        countryCode = 'CN';
    }
    const codePoints = countryCode.toUpperCase().split('').map(char => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
}

// Disney+检测代码逻辑
async function testDisneyPlus() {
    try {
        let { region, cnbl } = await Promise.race([testHomePage(), timeout(7000)]);
        let { countryCode, inSupportedLocation } = await Promise.race([getLocationInfo(), timeout(7000)]);
        
        region = countryCode ?? region;

        if (inSupportedLocation === false || inSupportedLocation === 'false') {
            return { region, status: STATUS_COMING };
        } else {
            return {: STATUS_AVAILABLE };
        }
    } catch (error) {
        console.log("Disney+检测错误: " + error);
        return { status: handleDisneyError(error) };
    }
}

function handleDisneyError(error) {
    if (error === 'Not Available') return STATUS_NOT_AVAILABLE;
    if (error === 'Timeout') return STATUS_TIMEOUT;
    return STATUS_ERROR;
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
        };

        $httpClient.post(opts, function (error, response, data) {
            if (error) {
                reject('Error');
                return;
            }

            if (response.status !== 200) {
                reject('Not Available');
                return;
            }

            data = JSON.parse(data);
            if (data?.errors) {
                reject('Not Available');
                return;
            }

            let { session: { inSupportedLocation, location: { countryCode } } } = data?.extensions?.sdk;
            resolve({ inSupportedLocation, countryCode });
        });
    });
}

function testHomePage() {
    return new Promise((resolve, reject) => {
        let opts = {
            url: 'https://www.disneyplus.com/',
            headers: {
                'Accept-Language': 'en',
                'User-Agent': UA,
            },
        };

        $httpClient.get(opts, function (error, response, data) {
            if (error) {
                reject('Error');
                return;
            }
            if (response.status !== 200 || data.includes('Sorry, Disney+ is not available in your region.')) {
                reject('Not Available');
                return;
            }

            let match = data.match(/Region: ([A-Za-z]{2})[\s\S]*?CNBL: ([12])/);
            if (!match) {
                resolve({ region: '', cnbl: '' });
                return;
            }

            let region = match[1];
            let cnbl = match[2];
            resolve({ region, cnbl });
        });
    });
}

function timeout(delay = 5000) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('Timeout');
        }, delay);
    });
}

### 说明

1. **脚本参数处理**：允许通过参数自定义图标和颜色，确保在 Surge 中通过 `$argument` 传入。
2. **流媒体解锁检测**：包括对 Disney+、YouTube Premium 和 Netflix 的检测功能。
3. **GPT 检测功能**：基于 IP 检测 ChatGPT 是否可用，并显示国别和状态信息。
4. **错误处理**：增加了错误日志和提示，以便于调试和识别问题。

这个合并后的脚本整合多个检测，适合在你指定的环境中应用。确保 URL 可访问和服务器响应无误。