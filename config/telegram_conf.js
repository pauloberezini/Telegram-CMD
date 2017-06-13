const TelegramBot = require('node-telegram-bot-api');
const token = '';
const bot = new TelegramBot(token, {polling: true});
var exec = require('child_process').exec, child;////////////////EXECUTE CMD
/////////////////////////////////////////////////////BOT ANSWER/////////////////////////////////////////////////////
bot.onText(/(.*)/, function (msg, match) {
    var fromId = msg.from.id;
    var resp = new String(match[0]);
    resp = resp.toLowerCase();
/////////////////////////////////////////////////////COMMAND CONTROLLER/////////////////////////////////////////////////////
    if(resp.charAt(0) =='\\' && fromId == '216199859') {
        resp = resp.slice(1);
        var respTo = resp.split(' ');
        var enter = respTo[0];
/////////////////////////////////////////////////////COMMAND CMD/////////////////////////////////////////////////////
        if (enter == 'cmd' && fromId == '') {
            var getter = respTo.join(' ');
            var prefCommand = getter.replace(/cmd /,'');
            var command =  prefCommand;
            console.log("Command to server"+" --PROCESSING-- "+command);
            child = exec(command, function (error, stdout, stderr) {
                if(stdout){
                    bot.sendMessage(fromId, stdout);
                    console.log("Command to server"+" --OK-- "+command);
                }
                if (stderr) {
                    bot.sendMessage(fromId, stderr);
                }
                if (error !== null) {
                    console.log('exec error: ' + error);
                }
            });
        }else {
            bot.sendMessage(fromId, "command find error - "+ command);
        }
    }

});