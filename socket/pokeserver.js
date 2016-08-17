'use strict';
var request = require("request");

const ENG_TO_CN = {
    'Google Login': '谷歌帐号登录',
    'Poke Club Login': 'Poke Club 帐号登录',
    'Brazil': '巴西',
    'Germany': '德国',
    'Italy': '意大利',
    'United Kingdom': '英国',
    'United States': '美国',
    'Argentina': '阿根廷',
    'Australia': '澳大利亚',
    'Austria': '奥地利',
    'Belgium': '比利时',
    'Bulgaria': '保加利亚',
    'Cambodia': '柬埔寨',
    'Canada': '加拿大',
    'Chile': '智利',
    'Croatia': '克罗地亚',
    'Czech Republic': '捷克共和国',
    'Denmark': '丹麦',
    'Estonia': '爱沙尼亚',
    'Finland': '芬兰',
    'France': '法国',
    'Greece': '希腊',
    'Hong Kong &#39321;&#28207;': '香港',
    'Hungary': '匈牙利',
    'Iceland': '冰岛',
    'Indonesia': '印度尼西亚',
    'Ireland': '爱尔兰',
    'Japan &#26085;&#26412;': '日本',
    'Laos': '老挝',
    'Latvia': '拉脱维亚',
    'Lithuania': '立陶宛',
    'Luxembourg': '卢森堡',
    'Malaysia': '马来西亚',
    'Mexico': '墨西哥',
    'Monaco': '摩纳哥',
    'Netherlands': '荷兰',
    'New Zealand': '新西兰',
    'Norway': '挪威',
    'Papua N Guinea': '巴布亚几内亚',
    'Philippines': '菲律宾',
    'Poland': '波兰',
    'Portugal': '葡萄牙',
    'Romania': '罗马尼亚',
    'Singapore': '新加坡',
    'Slovakia': '斯洛伐克',
    'Slovenia': '斯洛文尼亚',
    'Spain': '西班牙',
    'Sweden': '瑞典',
    'Switzerland': '瑞士',
    'Taiwan': '台湾',
    'Thailand': '泰国',
    'Venezuela': '委瑞内拉',
    'Vietnam': '越南',
    'China &#20013;&#22269;': '中国',
    'India &#2311;&#2306;&#2337;&#2367;&#2351;&#2366;': '印度',
    'Israel': '以色列',
    'Pakistan': '巴基斯坦',
    'Peru': '秘鲁',
    'Russia &#1056;&#1086;&#1089;&#1089;&#1080;&#1103;': '俄罗斯',
    'South Korea': '韩国',
    'Turkey': '土耳其'
};

var POKE_SERVER_STATUS = [];

function checkPokeserverStatus() {
    request({
        method: 'GET',
        url: 'http://www.mmoserverstatus.com/pokemon_go',
        headers: {
            'accept-language': 'zh-CN,zh;q=0.8,zh-TW;q=0.6,en;q=0.4',
            accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36'
        }
    }, function (error, response, body) {
        if (error) {
            throw new Error(error);
        }

        var allServerMatchedData = body.match(/<li.*?>(.*?)<span><i.*?>(.*?)<\/i>/g);
        var serverStatus = [];
        for (var matchedData of allServerMatchedData) {
            var status = matchedData.match(/<li.*?>(.*?)<span><i.*?>(.*?)<\/i>/);
            serverStatus.push({
                name: ENG_TO_CN[status[1].trim()],
                time: status[2]
            });
        }

        POKE_SERVER_STATUS = serverStatus;
    });
}

checkPokeserverStatus();
setInterval(checkPokeserverStatus, 30 * 1000); // 30s

module.exports = function (io) {

    var pokeserver = io.of('/pokeserver');

    pokeserver.on('connection', function (socket) {

        var emitPokeserverInfo = setInterval(function () {
            socket.emit('POKE_SERVER_STATUS', POKE_SERVER_STATUS);
        }, 5 * 1000);
        socket.emit('POKE_SERVER_STATUS', POKE_SERVER_STATUS);

        socket.on('disconnect', function () {
            clearInterval(emitPokeserverInfo);
        });

    });

};


