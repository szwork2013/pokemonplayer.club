'use strict';
var request = require("request"),
    redis = require('redis'),
    redisClient = redis.createClient();

const ENG_TO_CN = {
    'Google Login': {name: 'Google', emoji: ''},
    'Poke Club Login': {name: 'Pokemon Club', emoji: ''},
    'Brazil': {name: '巴西', emoji: '🇧🇷'},
    'Germany': {name: '德国', emoji: '🇩🇪'},
    'Italy': {name: '意大利', emoji: '🇮🇹'},
    'United Kingdom': {name: '英国', emoji: '🇬🇧'},
    'United States': {name: '美国', emoji: '🇺🇸'},
    'Argentina': {name: '阿根廷', emoji: '🇦🇷'},
    'Australia': {name: '澳大利亚', emoji: '🇦🇺'},
    'Austria': {name: '奥地利', emoji: '🇦🇹'},
    'Belgium': {name: '比利时', emoji: '🇧🇪'},
    'Bulgaria': {name: '保加利亚', emoji: '🇧🇬'},
    'Cambodia': {name: '柬埔寨', emoji: '🇱🇹'},
    'Canada': {name: '加拿大', emoji: '🇨🇦'},
    'Chile': {name: '智利', emoji: '🇨🇱'},
    'Croatia': {name: '克罗地亚', emoji: '🇭🇷'},
    'Czech Republic': {name: '捷克', emoji: '🇨🇿'},
    'Denmark': {name: '丹麦', emoji: '🇩🇰'},
    'Estonia': {name: '爱沙尼亚', emoji: '🇪🇪'},
    'Finland': {name: '芬兰', emoji: '🇫🇮'},
    'France': {name: '法国', emoji: '🇫🇷'},
    'Greece': {name: '希腊', emoji: '🇬🇷'},
    'Hong Kong &#39321;&#28207;': {name: '香港', emoji: '🇭🇰'},
    'Hungary': {name: '匈牙利', emoji: '🇭🇺'},
    'Iceland': {name: '冰岛', emoji: '🇮🇸'},
    'Indonesia': {name: '印度尼西亚', emoji: '🇮🇩'},
    'Ireland': {name: '爱尔兰', emoji: '🇮🇪'},
    'Japan &#26085;&#26412;': {name: '日本', emoji: '🇯🇵'},
    'Laos': {name: '老挝', emoji: '🇱🇦'},
    'Latvia': {name: '拉脱维亚', emoji: '🇱🇻'},
    'Lithuania': {name: '立陶宛', emoji: '🇱🇹'},
    'Luxembourg': {name: '卢森堡', emoji: '🇱🇺'},
    'Malaysia': {name: '马来西亚', emoji: '🇲🇾'},
    'Mexico': {name: '墨西哥', emoji: '🇲🇽'},
    // 'Monaco': {name: '摩纳哥', emoji: ''},
    'Netherlands': {name: '荷兰', emoji: '🇳🇱'},
    'New Zealand': {name: '新西兰', emoji: '🇳🇿'},
    'Norway': {name: '挪威', emoji: '🇳🇴'},
    // 'Papua N Guinea': '巴布亚几内亚',
    'Philippines': {name: '菲律宾', emoji: '🇵🇭'},
    'Poland': {name: '波兰', emoji: '🇵🇱'},
    'Portugal': {name: '葡萄牙', emoji: '🇵🇹'},
    'Romania': {name: '罗马尼亚', emoji: '🇷🇴'},
    'Singapore': {name: '新加坡', emoji: '🇸🇬'},
    'Slovakia': {name: '斯洛伐克', emoji: '🇸🇰'},
    'Slovenia': {name: '斯洛文尼亚', emoji: '🇸🇮'},
    'Spain': {name: '西班牙', emoji: '🇪🇸'},
    'Sweden': {name: '瑞典', emoji: '🇸🇪'},
    'Switzerland': {name: '瑞士', emoji: '🇨🇭'},
    // 'Taiwan': '台湾',
    'Thailand': {name: '泰国', emoji: '🇹🇭'},
    // 'Venezuela': {name: '委瑞内拉', emoji: ''},
    'Vietnam': {name: '越南', emoji: '🇻🇳'},
    'China &#20013;&#22269;': {name: '中国', emoji: '🇨🇳'},
    'India &#2311;&#2306;&#2337;&#2367;&#2351;&#2366;': {name: '印度', emoji: '🇮🇳'},
    'Israel': {name: '以色列', emoji: '🇮🇱'},
    // 'Pakistan': {name: '巴基斯坦', emoji: '🇵🇰'},
    'Peru': {name: '秘鲁', emoji: '🇵🇪'},
    'Russia &#1056;&#1086;&#1089;&#1089;&#1080;&#1103;': {name: '俄罗斯', emoji: '🇷🇺'},
    'South Korea': {name: '韩国', emoji: '🇰🇷'},
    'Turkey': {name: '土耳其', emoji: '🇹🇷'},
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
            // throw new Error(error);
            console.log(error);
            return;
        }

        var allServerMatchedData = body.match(/<li.*?>(.*?)<span><i.*?>(.*?)<\/i>/g);

        if (!allServerMatchedData) {
            console.log('Fetch Server status error...');
            return;
        }

        var serverStatus = [];
        for (var matchedData of allServerMatchedData) {
            var status = matchedData.match(/<li.*?>(.*?)<span><i.*?>(.*?)<\/i>/);
            var key = status[1].trim();
            var ping = status[2];

            var obj = ENG_TO_CN[key];

            if (obj) {
                serverStatus.push({
                    name: obj.name,
                    emoji: obj.emoji,
                    ping: ping
                });

                redisClient.set(key, ping);
            }
        }

        POKE_SERVER_STATUS = serverStatus;
    });
}

function initPokeserverStatusByRedis() {
    POKE_SERVER_STATUS = [];

    Object.keys(ENG_TO_CN).forEach(function (key) {
        redisClient.get(key, function (err, ping) {
            if (err) {
                console.log(err);
                return;
            } else if (null == ping) {
                return;
            }
            var obj = ENG_TO_CN[key];
            POKE_SERVER_STATUS.push({
                name: obj.name,
                emoji: obj.emoji,
                ping: ping
            });
        });
    });
}

initPokeserverStatusByRedis();
setInterval(checkPokeserverStatus, 15 * 1000); // 30s

module.exports = function (io) {

    var pokeserver = io.of('/pokeserver');

    pokeserver.on('connection', function (socket) {

        var emitPokeserverInfo = setInterval(function () {
            socket.emit('POKE_SERVER_STATUS', POKE_SERVER_STATUS);
        }, 2 * 1000);

        socket.on('disconnect', function () {
            clearInterval(emitPokeserverInfo);
        });

    });

};


