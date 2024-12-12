{
  "id": "iRingo.app.sub",
  "name": " iRingo (iOS 17)",
  "author": "@VirgilClyne",
  "description": "解锁完整的 Apple功能和集成服务",
  "icon": "https://avatars.githubusercontent.com/u/182791244?s=200&v=4",
  "repo": "https://github.com/NSRingo",
  "apps": [
    {
      "id": "iRingo.Weather",
      "name": "🌤 天气",
      "descs_html": [
        "请参照<a href=\"https://NSRingo.github.io/guide/Weather/weather\">🌤 天气</a>的使用说明进行配置",
        "填写完成后别忘点击此页面底端右下角的\"保存\"。",
        "查询速度:\"私有API+城市\" > \"私有API+观测站\" > \"公共API+观测站\"",
        "定位精度:\"观测站\" > \"城市\""
      ],
      "keys": [
        "@iRingo.Weather.Settings",
        "@iRingo.Weather.Caches"
      ],
      "settings": [
        {
          "id": "@iRingo.Weather.Settings.Switch",
          "name": "总功能开关",
          "val": true,
          "type": "boolean",
          "desc": "是否启用此APP修改"
        },
        {
          "id": "@iRingo.Weather.Settings.NextHour.Switch",
          "name": "[未来一小时降水强度] 修改开关",
          "val": true,
          "type": "boolean",
          "desc": "修改未来一小时降水强度"
        },
        {
          "id": "@iRingo.Weather.Settings.NextHour.Source",
          "name": "[未来一小时降水强度] 数据源",
          "val": "www.weatherol.cn",
          "type": "radios",
          "items": [
            {
              "key": "www.weatherol.cn",
              "label": "气象在线"
            },
            {
              "key": "api.caiyunapp.com",
              "label": "彩云天气（专业套餐及以上）"
            }
          ],
          "desc": "气象在线与彩云天气的数据源相同，但不支持简体中文以外的语言。"
        },
        {
          "id": "@iRingo.Weather.Settings.AQI.Switch",
          "name": "[空气质量] 修改开关",
          "val": true,
          "type": "boolean",
          "desc": "修改空气质量"
        },
        {
          "id": "@iRingo.Weather.Settings.AQI.Targets",
          "name": "[空气质量] 需要修改的标准",
          "val": [
            "HJ6332012"
          ],
          "type": "checkboxes",
          "desc": "选中的空气质量标准会被替换。请注意各国监测的污染物种类可能有所不同，转换算法或API未必适合当地。",
          "items": [
            {
              "key": "CA.AQHI",
              "label": "加拿大（CA AQHI）"
            },
            {
              "key": "FR.ATMO",
              "label": "法国（FR ATMO）"
            },
            {
              "key": "UBA",
              "label": "德国（UBA）"
            },
            {
              "key": "NAQI",
              "label": "印度（NAQI）"
            },
            {
              "key": "EU.EAQI",
              "label": "意大利（EU EAQI）"
            },
            {
              "key": "ICARS",
              "label": "墨西哥（ICARS）"
            },
            {
              "key": "NL.LKI",
              "label": "荷兰（NL LKI）"
            },
            {
              "key": "SG.NEA",
              "label": "新加坡（SG NEA）"
            },
            {
              "key": "KR.CAI",
              "label": "韩国（KR CAI）"
            },
            {
              "key": "ES.MITECO",
              "label": "西班牙（ES MITECO）"
            },
            {
              "key": "DAQI",
              "label": "英国（DAQI）"
            },
            {
              "key": "EPA_NowCast",
              "label": "美国（及日本）（EPA NowCast）"
            },
            {
              "key": "HJ6332012",
              "label": "中国（HJ 633—2012）"
            }
          ]
        },
        {
          "id": "@iRingo.Weather.Settings.AQI.Local.Switch",
          "name": "[空气质量] 本地替换",
          "val": true,
          "type": "boolean",
          "desc": "使用本地替换算法，将Apple数据转换为特定标准"
        },
        {
          "id": "@iRingo.Weather.Settings.AQI.Local.Standard",
          "name": "[空气质量] 本地替换算法",
          "val": "WAQI_InstantCast",
          "type": "selects",
          "desc": "本地替换时使用的算法",
          "items": [
            {
              "key": "WAQI_InstantCast",
              "label": "WAQI InstantCast"
            }
          ]
        },
        {
          "id": "@iRingo.Weather.Settings.AQI.Source",
          "name": "[空气质量] 数据源",
          "val": "www.weatherol.cn",
          "type": "radios",
          "items": [
            {
              "key": "Local",
              "label": "仅使用Apple数据"
            },
            {
              "key": "www.weatherol.cn",
              "label": "气象在线"
            },
            {
              "key": "api.caiyunapp.com",
              "label": "彩云天气"
            },
            {
              "key": "api.waqi.info",
              "label": "The World Air Quality Project"
            }
          ],
          "desc": "空气质量数据源"
        },
        {
          "id": "@iRingo.Weather.Settings.AQI.Comparison.Switch",
          "name": "[空气质量] 对比昨日空气质量",
          "val": true,
          "type": "boolean",
          "desc": "与昨日空气质量指数进行对比"
        },
        {
          "id": "@iRingo.Weather.Settings.AQI.Comparison.Source",
          "name": "[空气质量] 对比昨日空气质量数据源",
          "val": "Local",
          "type": "radios",
          "items": [
            {
              "key": "Local",
              "label": "仅使用缓存数据"
            },
            {
              "key": "api.caiyunapp.com",
              "label": "彩云天气（个人套餐及以上）"
            },
            {
              "key": "api.waqi.info",
              "label": "The World Air Quality Project (非常慢)"
            }
          ],
          "desc": "对比昨日空气质量数据源"
        },
        {
          "id": "@iRingo.Weather.Settings.Map.AQI",
          "name": "[开发中] [空气质量地图] 修改开关",
          "val": false,
          "type": "boolean",
          "desc": "[开发中]修改空气质量地图"
        },
        {
          "id": "@iRingo.Weather.Settings.APIs.WeatherOL.HTTPHeaders",
          "name": "[气象在线] HTTP请求头",
          "val": "{ \"Content-Type\": \"application/json\" }",
          "type": "text",
          "placeholder": "{ \"Content-Type\": \"application/json\" }",
          "desc": "请求气象在线API时使用的HTTP请求头"
        },
        {
          "id": "@iRingo.Weather.Settings.APIs.ColorfulClouds.HTTPHeaders",
          "name": "[彩云天气] HTTP请求头",
          "val": "{ \"Content-Type\": \"application/json\" }",
          "type": "text",
          "placeholder": "{ \"Content-Type\": \"application/json\" }",
          "desc": "请求彩云天气API时使用的HTTP请求头"
        },
        {
          "id": "@iRingo.Weather.Settings.APIs.ColorfulClouds.Token",
          "name": "[彩云天气] 彩云天气令牌",
          "val": "",
          "type": "text",
          "placeholder": "ABcdef1g2hiJklmN",
          "desc": "彩云天气API令牌"
        },
        {
          "id": "@iRingo.Weather.Settings.APIs.ColorfulClouds.ForceCNForAQI",
          "name": "[彩云天气] 强制使用国标AQI（空气质量）",
          "val": false,
          "type": "boolean",
          "desc": "作为空气质量数据源时，强制使用国标AQI"
        },
        {
          "id": "@iRingo.Weather.Settings.APIs.ColorfulClouds.ForceCNForComparison",
          "name": "[彩云天气] 强制使用国标AQI（对比昨日空气质量）",
          "val": false,
          "type": "boolean",
          "desc": "作为对比昨日空气质量数据源时，强制使用国标AQI"
        },
        {
          "id": "@iRingo.Weather.Settings.APIs.WAQI.HTTPHeaders",
          "name": "[WAQI] HTTP请求头",
          "val": "{ \"Content-Type\": \"application/json\" }",
          "type": "text",
          "placeholder": "{ \"Content-Type\": \"application/json\" }",
          "desc": "请求WAQI API时使用的HTTP请求头"
        },
        {
          "id": "@iRingo.Weather.Settings.APIs.WAQI.Token",
          "name": "[WAQI] WAQI令牌",
          "val": "",
          "type": "text",
          "placeholder": "123456789123456789abcdefghijklmnopqrstuv",
          "desc": "WAQI API令牌"
        }
      ],
      "author": "@VirgilClyne",
      "repo": "https://github.com/NSRingo/Weather",
      "icons": [
        "https://developer.apple.com/assets/elements/icons/weather/weather-128x128.png",
        "https://developer.apple.com/assets/elements/icons/weather/weather-128x128.png"
      ]
    },
    {
      "id": "iRingo.Location",
      "name": "📍 定位",
      "descs_html": [
        "请参照<a href=\"https://NSRingo.github.io/guide/GeoServices/location\">📍 定位</a>的使用说明进行配置",
        "影响功能范围包括但不限于“地图”、“Apple News”、“指南针”等"
      ],
      "keys": [
        "@iRingo.Location.Settings",
        "@iRingo.Location.Caches"
      ],
      "settings": [
        {
          "id": "@iRingo.Location.Settings.PEP.GCC",
          "name": "[地区检测] 地理国家或地区代码",
          "val": "US",
          "type": "selects",
          "items": [
            {
              "key": "AUTO",
              "label": "🇺🇳自动（跟随地区检测结果）"
            },
            {
              "key": "CN",
              "label": "🇨🇳中国大陆"
            },
            {
              "key": "HK",
              "label": "🇭🇰中国香港"
            },
            {
              "key": "TW",
              "label": "🇹🇼中国台湾"
            },
            {
              "key": "SG",
              "label": "🇸🇬新加坡"
            },
            {
              "key": "US",
              "label": "🇺🇸美国"
            },
            {
              "key": "JP",
              "label": "🇯🇵日本"
            },
            {
              "key": "AU",
              "label": "🇦🇺澳大利亚"
            },
            {
              "key": "GB",
              "label": "🇬🇧英国"
            },
            {
              "key": "KR",
              "label": "🇰🇷韩国"
            },
            {
              "key": "CA",
              "label": "🇨🇦加拿大"
            },
            {
              "key": "IE",
              "label": "🇮🇪爱尔兰"
            }
          ],
          "desc": "要更改为的地区或国家，此选项影响Wi-Fi或有线网络下国家和地区检测的结果。"
        }
      ],
      "author": "@VirgilClyne",
      "repo": "https://github.com/NSRingo/GeoServices",
      "icons": [
        "https://support.apple.com/library/content/dam/edam/applecare/images/en_US/iOS/ios15-location-arrow-status-icon.png",
        "https://support.apple.com/library/content/dam/edam/applecare/images/en_US/iOS/ios15-location-arrow-status-icon.png"
      ]
    },
    {
      "id": "iRingo.Maps",
      "name": "🗺️ 地图",
      "descs_html": [
        "请参照<a href=\"https://NSRingo.github.io/guide/GeoServices/maps\">🗺️ 地图</a>的使用说明进行配置",
        "影响功能范围包括但不限于“地图”、“Apple News”、“指南针”等"
      ],
      "keys": [
        "@iRingo.Maps.Settings",
        "@iRingo.Maps.Caches"
      ],
      "settings": [
        {
          "id": "@iRingo.Maps.Settings.GeoManifest.Dynamic.Config.CountryCode",
          "name": "[动态配置] 资源清单的国家或地区代码",
          "type": "selects",
          "val": "CN",
          "items": [
            {
              "key": "AUTO",
              "label": "🇺🇳自动（跟随用户当前所在地区）"
            },
            {
              "key": "CN",
              "label": "🇨🇳中国大陆"
            },
            {
              "key": "HK",
              "label": "🇭🇰中国香港"
            },
            {
              "key": "TW",
              "label": "🇹🇼中国台湾"
            },
            {
              "key": "SG",
              "label": "🇸🇬新加坡"
            },
            {
              "key": "US",
              "label": "🇺🇸美国"
            },
            {
              "key": "JP",
              "label": "🇯🇵日本"
            },
            {
              "key": "AU",
              "label": "🇦🇺澳大利亚"
            },
            {
              "key": "GB",
              "label": "🇬🇧英国"
            },
            {
              "key": "KR",
              "label": "🇰🇷韩国"
            },
            {
              "key": "CA",
              "label": "🇨🇦加拿大"
            },
            {
              "key": "IE",
              "label": "🇮🇪爱尔兰"
            }
          ],
          "desc": "此选项影响“地图”整体配置内容，包括以下的地图功能与服务。"
        },
        {
          "id": "@iRingo.Maps.Settings.UrlInfoSet.Dispatcher",
          "name": "[URL信息集] 调度器",
          "type": "selects",
          "val": "AutoNavi",
          "items": [
            {
              "key": "AUTO",
              "label": "🇺🇳自动（随[动态配置]版本自动选择）"
            },
            {
              "key": "AutoNavi",
              "label": "🧭高德（🇨🇳:互动百科/大众点评/携程 | 🇺🇳:维基百科/Yelp/Booking）"
            },
            {
              "key": "Apple",
              "label": "Apple（维基百科/Yelp/Booking）"
            }
          ],
          "desc": "地点数据接口，此选项影响公共指南，兴趣点(POI)与位置信息等功能。"
        },
        {
          "id": "@iRingo.Maps.Settings.UrlInfoSet.Directions",
          "name": "[URL信息集] 导航与ETA",
          "type": "selects",
          "val": "AutoNavi",
          "items": [
            {
              "key": "AUTO",
              "label": "🇺🇳自动（随[动态配置]版本自动选择）"
            },
            {
              "key": "AutoNavi",
              "label": "🧭高德（🇨🇳:高德地图 | 🇺🇳:TomTom）"
            },
            {
              "key": "Apple",
              "label": "Apple（🇨🇳:🈚️ | 🇺🇳:TomTom）"
            }
          ],
          "desc": "导航与ETA服务接口，此选项影响导航与ETA(到达时间)等功能。"
        },
        {
          "id": "@iRingo.Maps.Settings.UrlInfoSet.RAP",
          "name": "[URL信息集] 评分和照片",
          "type": "selects",
          "val": "Apple",
          "items": [
            {
              "key": "AUTO",
              "label": "🇺🇳自动（随[动态配置]版本自动选择）"
            },
            {
              "key": "AutoNavi",
              "label": "🧭高德（🇨🇳:🈶️但未开放 | 🇺🇳:🈚️）"
            },
            {
              "key": "Apple",
              "label": "Apple（🇨🇳:🈚️ | 🇺🇳:🈶️）"
            }
          ],
          "desc": "评分和照片服务接口，此选项影响评分和照片服务以及照片使用。"
        },
        {
          "id": "@iRingo.Maps.Settings.UrlInfoSet.LocationShift",
          "name": "[URL信息集] 定位漂移",
          "type": "selects",
          "val": "AUTO",
          "items": [
            {
              "key": "AUTO",
              "label": "🇺🇳自动（随[动态配置]版本自动选择）"
            },
            {
              "key": "AutoNavi",
              "label": "🧭高德（🈚️坐标，使用🇨🇳GCJ-02坐标）"
            },
            {
              "key": "Apple",
              "label": "Apple（🈶️坐标，使用🇺🇳WGS-84坐标）"
            }
          ],
          "desc": "定位漂移修正服务接口，控制定位漂移和🧭指南针与📍坐标的经纬度。"
        },
        {
          "id": "@iRingo.Maps.Settings.TileSet.Satellite",
          "name": "[瓦片数据集] 卫星图像",
          "type": "selects",
          "val": "HYBRID",
          "items": [
            {
              "key": "AUTO",
              "label": "🇺🇳自动（随[动态配置]版本自动选择）"
            },
            {
              "key": "HYBRID",
              "label": "混合（🇨🇳:2D较新 | 🇺🇳:主要城市3D）"
            },
            {
              "key": "CN",
              "label": "🇨🇳中国四维（🇨🇳:2D较新 | 🇺🇳:🈚️）"
            },
            {
              "key": "XX",
              "label": "🇺🇳DigitalGlobe（🇨🇳:2D较旧 | 🇺🇳:2D+主要城市3D）"
            }
          ],
          "desc": "此选项影响所列位图、影像与模型数据。"
        },
        {
          "id": "@iRingo.Maps.Settings.TileSet.Flyover",
          "name": "[瓦片数据集] 飞行俯瞰",
          "type": "selects",
          "val": "XX",
          "items": [
            {
              "key": "AUTO",
              "label": "🇺🇳自动（随[动态配置]版本自动选择）"
            },
            {
              "key": "CN",
              "label": "🇨🇳Apple（🇨🇳:🈚️ | 🇺🇳:🈚️）"
            },
            {
              "key": "XX",
              "label": "🇺🇳Apple（🇨🇳:🈚️ | 🇺🇳:🈶️）"
            }
          ],
          "desc": "此选项影响飞行俯瞰全球各地的主要地标和城市功能。"
        },
        {
          "id": "@iRingo.Maps.Settings.TileSet.Munin",
          "name": "[瓦片数据集] 四处看看",
          "type": "selects",
          "val": "XX",
          "items": [
            {
              "key": "AUTO",
              "label": "🇺🇳自动（随[动态配置]版本自动选择）"
            },
            {
              "key": "CN",
              "label": "🇨🇳Apple（🇨🇳:🈚️ | 🇺🇳:🈚️）"
            },
            {
              "key": "XX",
              "label": "🇺🇳Apple（🇨🇳:🈚️ | 🇺🇳:🈶️）"
            }
          ],
          "desc": "此选项影响 360 度全景视角在某些地点四处看看功能。"
        },
        {
          "id": "@iRingo.Maps.Settings.LogLevel",
          "name": "[调试] 日志等级",
          "type": "selects",
          "val": "WARN",
          "items": [
            {
              "key": "OFF",
              "label": "关闭"
            },
            {
              "key": "ERROR",
              "label": "❌ 错误"
            },
            {
              "key": "WARN",
              "label": "⚠️ 警告"
            },
            {
              "key": "INFO",
              "label": "ℹ️ 信息"
            },
            {
              "key": "DEBUG",
              "label": "🅱️ 调试"
            },
            {
              "key": "ALL",
              "label": "全部"
            }
          ],
          "desc": "选择脚本日志的输出等级，低于所选等级的日志将全部输出。"
        }
      ],
      "author": "@VirgilClyne",
      "repo": "https://github.com/NSRingo/GeoServices",
      "icons": [
        "https://developer.apple.com/assets/elements/icons/maps/maps-128x128.png",
        "https://developer.apple.com/assets/elements/icons/maps/maps-128x128.png"
      ]
    },
    {
      "id": "iRingo.Spotlight",
      "name": "🔍 聚焦搜索",
      "descs_html": [
        "请参照<a href=\"https://NSRingo.github.io/guide/Siri/siri-and-search\">⭕ Siri与搜索</a>的使用说明进行配置",
        "影响功能范围包括「Siri建议」「来自APPLE的内容」「来自APPLE的建议」等"
      ],
      "keys": [
        "@iRingo.Spotlight.Settings",
        "@iRingo.Spotlight.Caches"
      ],
      "settings": [
        {
          "id": "@iRingo.Spotlight.Settings.CountryCode",
          "name": "国家或地区代码",
          "type": "selects",
          "val": "SG",
          "items": [
            {
              "key": "AUTO",
              "label": "🇺🇳自动（跟随系统地区设置）"
            },
            {
              "key": "CN",
              "label": "🇨🇳中国大陆"
            },
            {
              "key": "HK",
              "label": "🇭🇰中国香港"
            },
            {
              "key": "TW",
              "label": "🇹🇼中国台湾"
            },
            {
              "key": "SG",
              "label": "🇸🇬新加坡"
            },
            {
              "key": "US",
              "label": "🇺🇸美国"
            },
            {
              "key": "JP",
              "label": "🇯🇵日本"
            },
            {
              "key": "AU",
              "label": "🇦🇺澳大利亚"
            },
            {
              "key": "GB",
              "label": "🇬🇧英国"
            },
            {
              "key": "KR",
              "label": "🇰🇷韩国"
            },
            {
              "key": "CA",
              "label": "🇨🇦加拿大"
            },
            {
              "key": "IE",
              "label": "🇮🇪爱尔兰"
            }
          ],
          "desc": "不同国家或地区提供的内容或有差别，此选项同时会影响分配给您不同地区的 Siri 服务器。"
        },
        {
          "id": "@iRingo.Spotlight.Settings.Domains",
          "name": "搜索领域",
          "type": "checkboxes",
          "val": [
            "web",
            "itunes",
            "app_store",
            "movies",
            "restaurants",
            "maps"
          ],
          "items": [
            {
              "key": "web",
              "label": "网页"
            },
            {
              "key": "itunes",
              "label": "iTunes"
            },
            {
              "key": "app_store",
              "label": "App Store"
            },
            {
              "key": "movies",
              "label": "电影"
            },
            {
              "key": "restaurants",
              "label": "餐厅"
            },
            {
              "key": "maps",
              "label": "地图"
            }
          ],
          "desc": "启用搜索的领域，领域数据由国家或地区设置决定，此选项仅开启搜索的领域，不代表设置的地区一定有相应的数据和服务。"
        },
        {
          "id": "@iRingo.Spotlight.Settings.Functions",
          "name": "功能",
          "type": "checkboxes",
          "val": [
            "flightutilities",
            "lookup",
            "mail",
            "messages",
            "news",
            "safari",
            "siri",
            "spotlight",
            "visualintelligence"
          ],
          "items": [
            {
              "key": "flightutilities",
              "label": "航班工具"
            },
            {
              "key": "lookup",
              "label": "查询"
            },
            {
              "key": "mail",
              "label": "邮件"
            },
            {
              "key": "messages",
              "label": "信息"
            },
            {
              "key": "news",
              "label": "新闻"
            },
            {
              "key": "safari",
              "label": "Safari浏览器"
            },
            {
              "key": "siri",
              "label": "Siri"
            },
            {
              "key": "spotlight",
              "label": "聚焦搜索"
            },
            {
              "key": "visualintelligence",
              "label": "视觉智能"
            }
          ],
          "desc": "启用的「Siri 建议」功能，未选的功能不代表关闭，仅代表还原到该地区默认设置状态。"
        },
        {
          "id": "@iRingo.Spotlight.Settings.SafariSmartHistory",
          "name": "Safari 智能历史记录",
          "type": "boolean",
          "val": true,
          "desc": "是否在 Safari 浏览器中启用基于历史记录的Siri建议功能，启用后将在Safari浏览器起始页推荐基于时间地点跨设备等的相关浏览记录。"
        },
        {
          "id": "@iRingo.Spotlight.Settings.LogLevel",
          "name": "[调试] 日志等级",
          "type": "selects",
          "val": "WARN",
          "items": [
            {
              "key": "OFF",
              "label": "关闭"
            },
            {
              "key": "ERROR",
              "label": "❌ 错误"
            },
            {
              "key": "WARN",
              "label": "⚠️ 警告"
            },
            {
              "key": "INFO",
              "label": "ℹ️ 信息"
            },
            {
              "key": "DEBUG",
              "label": "🅱️ 调试"
            },
            {
              "key": "ALL",
              "label": "全部"
            }
          ],
          "desc": "选择脚本日志的输出等级，低于所选等级的日志将全部输出。"
        }
      ],
      "author": "@VirgilClyne",
      "repo": "https://github.com/NSRingo/Siri/siri-and-search",
      "icons": [
        "https://developer.apple.com/assets/elements/icons/spotlight/spotlight-128x128.png",
        "https://developer.apple.com/assets/elements/icons/spotlight/spotlight-128x128.png"
      ]
    },
    {
      "id": "iRingo.TV",
      "name": "📺 TV",
      "descs_html": [
        "请参照<a href=\"https://NSRingo.github.io/guide/apple-tv\">📺 TV</a>的使用说明进行配置",
        "自定义TV app的配置文件及各个栏目"
      ],
      "keys": [
        "@iRingo.TV.Settings",
        "@iRingo.TV.Caches"
      ],
      "settings": [
        {
          "id": "@iRingo.TV.Settings.ThirdParty",
          "name": "启用第三方 App 与 TV app 关联功能",
          "type": "boolean",
          "val": false,
          "desc": "是否将桌面版/macOS版/app版等平台的 TV app 转换至 iPad 版，以启用第三方 App 与 TV app 关联功能(如: Disney+, Prime Video 等)。"
        },
        {
          "id": "@iRingo.TV.Settings.HLSUrl",
          "name": "[主机名] HTTP实时流(HLS)地址",
          "type": "selects",
          "val": "play-edge.itunes.apple.com",
          "items": [
            {
              "key": "",
              "label": "OFF(不修改)"
            },
            {
              "key": "play.itunes.apple.com",
              "label": "play.itunes.apple.com (不推荐，与播放服务域名重叠)"
            },
            {
              "key": "play-edge.itunes.apple.com",
              "label": "play-edge.itunes.apple.com (默认)"
            }
          ],
          "desc": "因为FPS服务域名禁止MitM，修改此地址可以分离HLS与FPS的域名，从而恢复对DualSubs的双语字幕支持。"
        },
        {
          "id": "@iRingo.TV.Settings.FPSUrl",
          "name": "[主机名] FairPlay流(FPS)地址",
          "type": "selects",
          "val": "play.itunes.apple.com",
          "items": [
            {
              "key": "",
              "label": "OFF(不修改)"
            },
            {
              "key": "play.itunes.apple.com",
              "label": "play.itunes.apple.com (默认)"
            },
            {
              "key": "play-edge.itunes.apple.com",
              "label": "play-edge.itunes.apple.com (不推荐，与播放服务域名重叠)"
            }
          ],
          "desc": "因为FPS服务域名禁止MitM，修改此地址可以分离HLS与FPS的域名，从而恢复对DualSubs的双语字幕支持。"
        },
        {
          "id": "@iRingo.TV.Settings.Tabs",
          "name": "启用的标签与栏目",
          "val": [
            "WatchNow",
            "Originals",
            "MLS",
            "Sports",
            "Kids",
            "Store",
            "Movies",
            "TV",
            "Library",
            "Search"
          ],
          "type": "checkboxes",
          "items": [
            {
              "key": "WatchNow",
              "label": "主页(立即观看)"
            },
            {
              "key": "Originals",
              "label": "Apple TV+/TV+(原创内容)"
            },
            {
              "key": "MLS",
              "label": "MLS Season Pass(旧版不支持)"
            },
            {
              "key": "Sports",
              "label": "体育节目(旧版为主页的二级菜单)"
            },
            {
              "key": "Kids",
              "label": "儿童(旧版为主页的二级菜单)"
            },
            {
              "key": "Store",
              "label": "商店"
            },
            {
              "key": "Movies",
              "label": "电影(旧版为主页的二级菜单)"
            },
            {
              "key": "TV",
              "label": "电视节目(旧版为主页的二级菜单)"
            },
            {
              "key": "Library",
              "label": "资料库"
            },
            {
              "key": "Search",
              "label": "搜索"
            }
          ],
          "desc": "启用的标签与栏目，未选择的标签与栏目入口将被隐藏，启用的入口由国家和地区决定，此选项仅代表功能入口上的开启，不代表对应地区一定有数据和服务."
        },
        {
          "id": "@iRingo.TV.Settings.CountryCode.Configs",
          "name": "[配置文件]国家或地区代码",
          "val": "AUTO",
          "type": "selects",
          "desc": "“配置文件”要更改为的地区或国家版本",
          "items": [
            {
              "key": "AUTO",
              "label": "🇺🇳自动（与当前登陆账号保持一致）"
            },
            {
              "key": "CN",
              "label": "🇨🇳中国大陆"
            },
            {
              "key": "HK",
              "label": "🇭🇰香港"
            },
            {
              "key": "TW",
              "label": "🇹🇼台湾"
            },
            {
              "key": "SG",
              "label": "🇸🇬新加坡"
            },
            {
              "key": "US",
              "label": "🇺🇸美国"
            },
            {
              "key": "JP",
              "label": "🇯🇵日本"
            },
            {
              "key": "AU",
              "label": "🇦🇺澳大利亚"
            },
            {
              "key": "GB",
              "label": "🇬🇧英国"
            },
            {
              "key": "KR",
              "label": "🇰🇷韩国"
            },
            {
              "key": "CA",
              "label": "🇨🇦加拿大"
            },
            {
              "key": "IE",
              "label": "🇮🇪爱尔兰"
            }
          ]
        },
        {
          "id": "@iRingo.TV.Settings.CountryCode.View[0]",
          "name": "[内容详情]首选语言",
          "val": "SG",
          "type": "selects",
          "desc": "“内容详情”(电影、电视节目、人物等详情页面)要更改为的首选语言",
          "items": [
            {
              "key": "AUTO",
              "label": "自动(与当前登陆账号保持一致)"
            },
            {
              "key": "CN",
              "label": "简体中文(中国)"
            },
            {
              "key": "HK",
              "label": "繁体粤语(香港)"
            },
            {
              "key": "TW",
              "label": "繁体中文(台湾)"
            },
            {
              "key": "SG",
              "label": "简体中文(新加坡)"
            },
            {
              "key": "US",
              "label": "英语(美国)"
            },
            {
              "key": "JP",
              "label": "日语(日本)"
            },
            {
              "key": "AU",
              "label": "英语(澳大利亚)"
            },
            {
              "key": "GB",
              "label": "英语(英国)"
            },
            {
              "key": "KR",
              "label": "韩语(韩国)"
            },
            {
              "key": "CA",
              "label": "英语(加拿大)"
            }
          ]
        },
        {
          "id": "@iRingo.TV.Settings.CountryCode.View[1]",
          "name": "[内容详情]第二语言",
          "val": "TW",
          "type": "selects",
          "desc": "当首选语言不可用时，“内容详情”(电影、电视节目、人物等详情页面)要更改为的第二语言",
          "items": [
            {
              "key": "AUTO",
              "label": "自动(与当前登陆账号保持一致)"
            },
            {
              "key": "CN",
              "label": "简体中文(中国)"
            },
            {
              "key": "HK",
              "label": "繁体粤语(香港)"
            },
            {
              "key": "TW",
              "label": "繁体中文(台湾)"
            },
            {
              "key": "SG",
              "label": "简体中文(新加坡)"
            },
            {
              "key": "US",
              "label": "英语(美国)"
            },
            {
              "key": "JP",
              "label": "日语(日本)"
            },
            {
              "key": "AU",
              "label": "英语(澳大利亚)"
            },
            {
              "key": "GB",
              "label": "英语(英国)"
            },
            {
              "key": "KR",
              "label": "韩语(韩国)"
            },
            {
              "key": "CA",
              "label": "英语(加拿大)"
            }
          ]
        },
        {
          "id": "@iRingo.TV.Settings.CountryCode.WatchNow",
          "name": "[主页(立即观看)]国家或地区代码",
          "val": "AUTO",
          "type": "selects",
          "desc": "“主页”栏目要更改为的地区或国家版本",
          "items": [
            {
              "key": "AUTO",
              "label": "🇺🇳自动（与当前登陆账号保持一致）"
            },
            {
              "key": "CN",
              "label": "🇨🇳中国大陆"
            },
            {
              "key": "HK",
              "label": "🇭🇰香港"
            },
            {
              "key": "TW",
              "label": "🇹🇼台湾"
            },
            {
              "key": "SG",
              "label": "🇸🇬新加坡"
            },
            {
              "key": "US",
              "label": "🇺🇸美国"
            },
            {
              "key": "JP",
              "label": "🇯🇵日本"
            },
            {
              "key": "AU",
              "label": "🇦🇺澳大利亚"
            },
            {
              "key": "GB",
              "label": "🇬🇧英国"
            },
            {
              "key": "KR",
              "label": "🇰🇷韩国"
            },
            {
              "key": "CA",
              "label": "🇨🇦加拿大"
            },
            {
              "key": "IE",
              "label": "🇮🇪爱尔兰"
            }
          ]
        },
        {
          "id": "@iRingo.TV.Settings.CountryCode.Originals",
          "name": "[Apple TV+/TV+(原创内容)]国家或地区代码",
          "val": "TW",
          "type": "selects",
          "desc": "“Apple TV+/TV+”栏目要更改为的地区或国家版本",
          "items": [
            {
              "key": "AUTO",
              "label": "🇺🇳自动（与当前登陆账号保持一致）"
            },
            {
              "key": "CN",
              "label": "🇨🇳中国大陆"
            },
            {
              "key": "HK",
              "label": "🇭🇰香港"
            },
            {
              "key": "TW",
              "label": "🇹🇼台湾"
            },
            {
              "key": "SG",
              "label": "🇸🇬新加坡"
            },
            {
              "key": "US",
              "label": "🇺🇸美国"
            },
            {
              "key": "JP",
              "label": "🇯🇵日本"
            },
            {
              "key": "AU",
              "label": "🇦🇺澳大利亚"
            },
            {
              "key": "GB",
              "label": "🇬🇧英国"
            },
            {
              "key": "KR",
              "label": "🇰🇷韩国"
            },
            {
              "key": "CA",
              "label": "🇨🇦加拿大"
            },
            {
              "key": "IE",
              "label": "🇮🇪爱尔兰"
            }
          ]
        },
        {
          "id": "@iRingo.TV.Settings.CountryCode.Channels",
          "name": "[频道 & Apps]国家或地区代码",
          "val": "AUTO",
          "type": "selects",
          "desc": "“频道 & Apps”栏目要更改为的地区或国家版本",
          "items": [
            {
              "key": "AUTO",
              "label": "🇺🇳自动（与当前登陆账号保持一致）"
            },
            {
              "key": "CN",
              "label": "🇨🇳中国大陆"
            },
            {
              "key": "HK",
              "label": "🇭🇰香港"
            },
            {
              "key": "TW",
              "label": "🇹🇼台湾"
            },
            {
              "key": "SG",
              "label": "🇸🇬新加坡"
            },
            {
              "key": "US",
              "label": "🇺🇸美国"
            },
            {
              "key": "JP",
              "label": "🇯🇵日本"
            },
            {
              "key": "AU",
              "label": "🇦🇺澳大利亚"
            },
            {
              "key": "GB",
              "label": "🇬🇧英国"
            },
            {
              "key": "KR",
              "label": "🇰🇷韩国"
            },
            {
              "key": "CA",
              "label": "🇨🇦加拿大"
            },
            {
              "key": "IE",
              "label": "🇮🇪爱尔兰"
            }
          ]
        },
        {
          "id": "@iRingo.TV.Settings.CountryCode.Sports",
          "name": "[体育节目]国家或地区代码",
          "val": "US",
          "type": "selects",
          "desc": "“体育节目”栏目要更改为的地区或国家版本",
          "items": [
            {
              "key": "AUTO",
              "label": "🇺🇳自动（与当前登陆账号保持一致）"
            },
            {
              "key": "CN",
              "label": "🇨🇳中国大陆"
            },
            {
              "key": "HK",
              "label": "🇭🇰香港"
            },
            {
              "key": "TW",
              "label": "🇹🇼台湾"
            },
            {
              "key": "SG",
              "label": "🇸🇬新加坡"
            },
            {
              "key": "US",
              "label": "🇺🇸美国"
            },
            {
              "key": "JP",
              "label": "🇯🇵日本"
            },
            {
              "key": "AU",
              "label": "🇦🇺澳大利亚"
            },
            {
              "key": "GB",
              "label": "🇬🇧英国"
            },
            {
              "key": "KR",
              "label": "🇰🇷韩国"
            },
            {
              "key": "CA",
              "label": "🇨🇦加拿大"
            },
            {
              "key": "IE",
              "label": "🇮🇪爱尔兰"
            }
          ]
        },
        {
          "id": "@iRingo.TV.Settings.CountryCode.Kids",
          "name": "[儿童]国家或地区代码",
          "val": "US",
          "type": "selects",
          "desc": "“儿童”栏目要更改为的地区或国家版本",
          "items": [
            {
              "key": "AUTO",
              "label": "🇺🇳自动（与当前登陆账号保持一致）"
            },
            {
              "key": "CN",
              "label": "🇨🇳中国大陆"
            },
            {
              "key": "HK",
              "label": "🇭🇰香港"
            },
            {
              "key": "TW",
              "label": "🇹🇼台湾"
            },
            {
              "key": "SG",
              "label": "🇸🇬新加坡"
            },
            {
              "key": "US",
              "label": "🇺🇸美国"
            },
            {
              "key": "JP",
              "label": "🇯🇵日本"
            },
            {
              "key": "AU",
              "label": "🇦🇺澳大利亚"
            },
            {
              "key": "GB",
              "label": "🇬🇧英国"
            },
            {
              "key": "KR",
              "label": "🇰🇷韩国"
            },
            {
              "key": "CA",
              "label": "🇨🇦加拿大"
            },
            {
              "key": "IE",
              "label": "🇮🇪爱尔兰"
            }
          ]
        },
        {
          "id": "@iRingo.TV.Settings.CountryCode.Store",
          "name": "[商店]国家或地区代码",
          "val": "AUTO",
          "type": "selects",
          "desc": "“商店”栏目要更改为的地区或国家版本",
          "items": [
            {
              "key": "AUTO",
              "label": "🇺🇳自动（与当前登陆账号保持一致）"
            },
            {
              "key": "CN",
              "label": "🇨🇳中国大陆"
            },
            {
              "key": "HK",
              "label": "🇭🇰香港"
            },
            {
              "key": "TW",
              "label": "🇹🇼台湾"
            },
            {
              "key": "SG",
              "label": "🇸🇬新加坡"
            },
            {
              "key": "US",
              "label": "🇺🇸美国"
            },
            {
              "key": "JP",
              "label": "🇯🇵日本"
            },
            {
              "key": "AU",
              "label": "🇦🇺澳大利亚"
            },
            {
              "key": "GB",
              "label": "🇬🇧英国"
            },
            {
              "key": "KR",
              "label": "🇰🇷韩国"
            },
            {
              "key": "CA",
              "label": "🇨🇦加拿大"
            },
            {
              "key": "IE",
              "label": "🇮🇪爱尔兰"
            }
          ]
        },
        {
          "id": "@iRingo.TV.Settings.CountryCode.Movies",
          "name": "[电影]国家或地区代码",
          "val": "AUTO",
          "type": "selects",
          "desc": "“电影”栏目要更改为的地区或国家版本",
          "items": [
            {
              "key": "AUTO",
              "label": "🇺🇳自动（与当前登陆账号保持一致）"
            },
            {
              "key": "CN",
              "label": "🇨🇳中国大陆"
            },
            {
              "key": "HK",
              "label": "🇭🇰香港"
            },
            {
              "key": "TW",
              "label": "🇹🇼台湾"
            },
            {
              "key": "SG",
              "label": "🇸🇬新加坡"
            },
            {
              "key": "US",
              "label": "🇺🇸美国"
            },
            {
              "key": "JP",
              "label": "🇯🇵日本"
            },
            {
              "key": "AU",
              "label": "🇦🇺澳大利亚"
            },
            {
              "key": "GB",
              "label": "🇬🇧英国"
            },
            {
              "key": "KR",
              "label": "🇰🇷韩国"
            },
            {
              "key": "CA",
              "label": "🇨🇦加拿大"
            },
            {
              "key": "IE",
              "label": "🇮🇪爱尔兰"
            }
          ]
        },
        {
          "id": "@iRingo.TV.Settings.CountryCode.TV",
          "name": "[电视节目]国家或地区代码",
          "val": "AUTO",
          "type": "selects",
          "desc": "“电视节目”栏目要更改为的地区或国家版本",
          "items": [
            {
              "key": "AUTO",
              "label": "🇺🇳自动（与当前登陆账号保持一致）"
            },
            {
              "key": "CN",
              "label": "🇨🇳中国大陆"
            },
            {
              "key": "HK",
              "label": "🇭🇰香港"
            },
            {
              "key": "TW",
              "label": "🇹🇼台湾"
            },
            {
              "key": "SG",
              "label": "🇸🇬新加坡"
            },
            {
              "key": "US",
              "label": "🇺🇸美国"
            },
            {
              "key": "JP",
              "label": "🇯🇵日本"
            },
            {
              "key": "AU",
              "label": "🇦🇺澳大利亚"
            },
            {
              "key": "GB",
              "label": "🇬🇧英国"
            },
            {
              "key": "KR",
              "label": "🇰🇷韩国"
            },
            {
              "key": "CA",
              "label": "🇨🇦加拿大"
            },
            {
              "key": "IE",
              "label": "🇮🇪爱尔兰"
            }
          ]
        },
        {
          "id": "@iRingo.TV.Settings.CountryCode.Persons",
          "name": "[人物]国家或地区代码",
          "val": "SG",
          "type": "selects",
          "desc": "“人物”栏目(导演、演员等)要更改为的地区或国家版本",
          "items": [
            {
              "key": "AUTO",
              "label": "🇺🇳自动（与当前登陆账号保持一致）"
            },
            {
              "key": "CN",
              "label": "🇨🇳中国大陆"
            },
            {
              "key": "HK",
              "label": "🇭🇰香港"
            },
            {
              "key": "TW",
              "label": "🇹🇼台湾"
            },
            {
              "key": "SG",
              "label": "🇸🇬新加坡"
            },
            {
              "key": "US",
              "label": "🇺🇸美国"
            },
            {
              "key": "JP",
              "label": "🇯🇵日本"
            },
            {
              "key": "AU",
              "label": "🇦🇺澳大利亚"
            },
            {
              "key": "GB",
              "label": "🇬🇧英国"
            },
            {
              "key": "KR",
              "label": "🇰🇷韩国"
            },
            {
              "key": "CA",
              "label": "🇨🇦加拿大"
            },
            {
              "key": "IE",
              "label": "🇮🇪爱尔兰"
            }
          ]
        },
        {
          "id": "@iRingo.TV.Settings.CountryCode.Search",
          "name": "[搜索]国家或地区代码",
          "val": "AUTO",
          "type": "selects",
          "desc": "“搜索”栏目要更改为的地区或国家版本",
          "items": [
            {
              "key": "AUTO",
              "label": "🇺🇳自动（与当前登陆账号保持一致）"
            },
            {
              "key": "CN",
              "label": "🇨🇳中国大陆"
            },
            {
              "key": "HK",
              "label": "🇭🇰香港"
            },
            {
              "key": "TW",
              "label": "🇹🇼台湾"
            },
            {
              "key": "SG",
              "label": "🇸🇬新加坡"
            },
            {
              "key": "US",
              "label": "🇺🇸美国"
            },
            {
              "key": "JP",
              "label": "🇯🇵日本"
            },
            {
              "key": "AU",
              "label": "🇦🇺澳大利亚"
            },
            {
              "key": "GB",
              "label": "🇬🇧英国"
            },
            {
              "key": "KR",
              "label": "🇰🇷韩国"
            },
            {
              "key": "CA",
              "label": "🇨🇦加拿大"
            },
            {
              "key": "IE",
              "label": "🇮🇪爱尔兰"
            }
          ]
        },
        {
          "id": "@iRingo.TV.Settings.CountryCode.Others",
          "name": "[其他]国家或地区代码",
          "val": "AUTO",
          "type": "selects",
          "desc": "其他未指定的栏目要更改为的地区或国家版本",
          "items": [
            {
              "key": "AUTO",
              "label": "🇺🇳自动（与当前登陆账号保持一致）"
            },
            {
              "key": "CN",
              "label": "🇨🇳中国大陆"
            },
            {
              "key": "HK",
              "label": "🇭🇰香港"
            },
            {
              "key": "TW",
              "label": "🇹🇼台湾"
            },
            {
              "key": "SG",
              "label": "🇸🇬新加坡"
            },
            {
              "key": "US",
              "label": "🇺🇸美国"
            },
            {
              "key": "JP",
              "label": "🇯🇵日本"
            },
            {
              "key": "AU",
              "label": "🇦🇺澳大利亚"
            },
            {
              "key": "GB",
              "label": "🇬🇧英国"
            },
            {
              "key": "KR",
              "label": "🇰🇷韩国"
            },
            {
              "key": "CA",
              "label": "🇨🇦加拿大"
            },
            {
              "key": "IE",
              "label": "🇮🇪爱尔兰"
            }
          ]
        },
        {
          "id": "@iRingo.TV.Settings.LogLevel",
          "name": "[调试] 日志等级",
          "type": "selects",
          "val": "WARN",
          "items": [
            {
              "key": "OFF",
              "label": "关闭"
            },
            {
              "key": "ERROR",
              "label": "❌ 错误"
            },
            {
              "key": "WARN",
              "label": "⚠️ 警告"
            },
            {
              "key": "INFO",
              "label": "ℹ️ 信息"
            },
            {
              "key": "DEBUG",
              "label": "🅱️ 调试"
            },
            {
              "key": "ALL",
              "label": "全部"
            }
          ],
          "desc": "选择脚本日志的输出等级，低于所选等级的日志将全部输出。"
        }
      ],
      "author": "@VirgilClyne",
      "repo": "https://github.com/NSRingo/TV",
      "icons": [
        "https://developer.apple.com/assets/elements/icons/apple-tv/apple-tv-128x128.png",
        "https://developer.apple.com/assets/elements/icons/apple-tv/apple-tv-128x128.png"
      ]
    },
    {
      "id": "iRingo.News",
      "name": "📰 News",
      "descs_html": [
        "请参照<a href=\"https://NSRingo.github.io/guide/apple-news\">📰 News</a>的使用说明进行配置",
        "影响功能范围……等"
      ],
      "keys": [
        "@iRingo.News.Settings",
        "@iRingo.News.Caches"
      ],
      "settings": [
        {
          "id": "@iRingo.News.Settings.CountryCode",
          "name": "国家或地区代码",
          "type": "selects",
          "val": "US",
          "items": [
            {
              "key": "AUTO",
              "label": "🇺🇳自动（跟随地区检测结果）"
            },
            {
              "key": "CN",
              "label": "🇨🇳中国大陆"
            },
            {
              "key": "HK",
              "label": "🇭🇰香港"
            },
            {
              "key": "TW",
              "label": "🇹🇼台湾"
            },
            {
              "key": "SG",
              "label": "🇸🇬新加坡"
            },
            {
              "key": "US",
              "label": "🇺🇸美国"
            },
            {
              "key": "JP",
              "label": "🇯🇵日本"
            },
            {
              "key": "AU",
              "label": "🇦🇺澳大利亚"
            },
            {
              "key": "GB",
              "label": "🇬🇧英国"
            },
            {
              "key": "KR",
              "label": "🇰🇷韩国"
            },
            {
              "key": "CA",
              "label": "🇨🇦加拿大"
            },
            {
              "key": "IE",
              "label": "🇮🇪爱尔兰"
            }
          ],
          "desc": "不同国家或地区提供的内容或有差别。"
        },
        {
          "id": "@iRingo.News.Settings.NewsPlusUser",
          "name": "[搜索]显示News+内容",
          "type": "boolean",
          "val": true,
          "desc": "是否显示News+搜索结果。"
        },
        {
          "id": "@iRingo.News.Settings.LogLevel",
          "name": "[调试] 日志等级",
          "type": "selects",
          "val": "WARN",
          "items": [
            {
              "key": "OFF",
              "label": "关闭"
            },
            {
              "key": "ERROR",
              "label": "❌ 错误"
            },
            {
              "key": "WARN",
              "label": "⚠️ 警告"
            },
            {
              "key": "INFO",
              "label": "ℹ️ 信息"
            },
            {
              "key": "DEBUG",
              "label": "🅱️ 调试"
            },
            {
              "key": "ALL",
              "label": "全部"
            }
          ],
          "desc": "选择脚本日志的输出等级，低于所选等级的日志将全部输出。"
        }
      ],
      "author": "@VirgilClyne",
      "repo": "https://github.com/NSRingo/News",
      "icons": [
        "https://developer.apple.com/assets/elements/icons/news/news-128x128.png",
        "https://developer.apple.com/assets/elements/icons/news/news-128x128.png"
      ]
    },
    {
      "id": "iRingo.TestFlight",
      "name": "✈ TestFlight",
      "descs_html": [
        "请参照<a href=\"https://NSRingo.github.io/guide/test-flight\">✈️ TestFlight</a>的使用说明进行配置",
        "影响功能范围……等"
      ],
      "keys": [
        "@iRingo.TestFlight.Settings",
        "@iRingo.TestFlight.Caches"
      ],
      "settings": [
        {
          "id": "@iRingo.TestFlight.Settings.CountryCode",
          "name": "国家或地区代码",
          "type": "selects",
          "val": "US",
          "items": [
            {
              "key": "AUTO",
              "label": "🇺🇳自动（跟随地区检测结果）"
            },
            {
              "key": "CN",
              "label": "🇨🇳中国大陆"
            },
            {
              "key": "HK",
              "label": "🇭🇰香港"
            },
            {
              "key": "TW",
              "label": "🇹🇼台湾"
            },
            {
              "key": "SG",
              "label": "🇸🇬新加坡"
            },
            {
              "key": "US",
              "label": "🇺🇸美国"
            },
            {
              "key": "JP",
              "label": "🇯🇵日本"
            },
            {
              "key": "AU",
              "label": "🇦🇺澳大利亚"
            },
            {
              "key": "GB",
              "label": "🇬🇧英国"
            },
            {
              "key": "KR",
              "label": "🇰🇷韩国"
            },
            {
              "key": "CA",
              "label": "🇨🇦加拿大"
            },
            {
              "key": "IE",
              "label": "🇮🇪爱尔兰"
            }
          ],
          "desc": "不同国家或地区提供的内容或有差别。"
        },
        {
          "id": "@iRingo.TestFlight.Settings.MultiAccount",
          "name": "启用多账号支持",
          "type": "boolean",
          "val": false,
          "desc": "是否启用多账号支持，会自动保存保存更新当前账号信息。"
        },
        {
          "id": "@iRingo.TestFlight.Settings.Universal",
          "name": "启用通用应用支持",
          "type": "boolean",
          "val": true,
          "desc": "是否启用通用应用支持，解除 TestFlight app 的 iOS/iPadOS/macOS(AppleSilicon) 平台限制。"
        },
        {
          "id": "@iRingo.TestFlight.Settings.LogLevel",
          "name": "[调试] 日志等级",
          "type": "selects",
          "val": "WARN",
          "items": [
            {
              "key": "OFF",
              "label": "关闭"
            },
            {
              "key": "ERROR",
              "label": "❌ 错误"
            },
            {
              "key": "WARN",
              "label": "⚠️ 警告"
            },
            {
              "key": "INFO",
              "label": "ℹ️ 信息"
            },
            {
              "key": "DEBUG",
              "label": "🅱️ 调试"
            },
            {
              "key": "ALL",
              "label": "全部"
            }
          ],
          "desc": "选择脚本日志的输出等级，低于所选等级的日志将全部输出。"
        }
      ],
      "author": "@VirgilClyne",
      "repo": "https://github.com/NSRingo/TestFlight",
      "icons": [
        "https://developer.apple.com/assets/elements/icons/testflight/testflight-128x128.png",
        "https://developer.apple.com/assets/elements/icons/testflight/testflight-128x128.png"
      ]
    },
    {
      "id": "iRingo.Watch",
      "name": "⌚️ WATCH",
      "descs_html": [
        "请参照<a href=\"https://NSRingo.github.io/guide/apple-watch\">⌚️ WATCH</a>的使用说明进行配置",
        "影响功能范围WATCH上的“指南针”、“地图”、“News”等"
      ],
      "keys": [
        "@iRingo.Watch.Settings",
        "@iRingo.Watch.Caches"
      ],
      "settings": [
        {
          "id": "@iRingo.Watch.Settings.GeoManifest.Dynamic.Config.CountryCode",
          "name": "[动态配置] 资源清单的国家或地区代码",
          "val": "US",
          "type": "selects",
          "items": [
            {
              "key": "AUTO",
              "label": "🇺🇳自动（跟随地区检测结果）"
            },
            {
              "key": "CN",
              "label": "🇨🇳中国大陆"
            },
            {
              "key": "HK",
              "label": "🇭🇰中国香港"
            },
            {
              "key": "TW",
              "label": "🇹🇼中国台湾"
            },
            {
              "key": "SG",
              "label": "🇸🇬新加坡"
            },
            {
              "key": "US",
              "label": "🇺🇸美国"
            },
            {
              "key": "JP",
              "label": "🇯🇵日本"
            },
            {
              "key": "AU",
              "label": "🇦🇺澳大利亚"
            },
            {
              "key": "GB",
              "label": "🇬🇧英国"
            },
            {
              "key": "KR",
              "label": "🇰🇷韩国"
            },
            {
              "key": "CA",
              "label": "🇨🇦加拿大"
            },
            {
              "key": "IE",
              "label": "🇮🇪爱尔兰"
            }
          ],
          "desc": "此选项影响“地图”整体配置内容，包括以下的地图功能与服务。"
        },
        {
          "id": "@iRingo.Watch.Settings.UrlInfoSet.LocationShift",
          "name": "[URL信息集] 定位漂移",
          "val": "Apple",
          "type": "selects",
          "items": [
            {
              "key": "AUTO",
              "label": "🇺🇳自动（随[动态配置]版本自动选择）"
            },
            {
              "key": "AutoNavi",
              "label": "🧭高德（🈚️坐标，使用🇨🇳GCJ-02坐标）"
            },
            {
              "key": "Apple",
              "label": "Apple（🈶️坐标，使用🇺🇳WGS-84坐标）"
            }
          ],
          "desc": "定位漂移修正服务接口，控制定位漂移和🧭指南针与📍坐标的经纬度。"
        }
      ],
      "author": "@VirgilClyne",
      "repo": "https://github.com/NSRingo",
      "icons": [
        "https://developer.apple.com/assets/elements/icons/apple-watch-app/apple-watch-app-128x128.png",
        "https://developer.apple.com/assets/elements/icons/apple-watch-app/apple-watch-app-128x128.png"
      ]
    }
  ]
}