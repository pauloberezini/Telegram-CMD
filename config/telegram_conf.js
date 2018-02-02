const TelegramBot = require('node-telegram-bot-api');
const token = 'token'; // Replace the value "token" below with the Telegram token you receive from @BotFather
const administratorId = 'administratorId';// Replace the value "administratorId" below with the you personal id of your Telegram account
const bot = new TelegramBot(token, {polling: true});
var exec = require('child_process').exec, child;// Execute cmd
// Bot answer
bot.onText(/(.*)/, function (msg, match) {
    var fromId = msg.from.id;
    var resp = new String(match[0]);
    resp = resp.toLowerCase();
    if(resp.charAt(0) =='\\' && fromId == 'fromId') {
        resp = resp.slice(1);
        var respTo = resp.split(' ');
        var enter = respTo[0];
// Command to Cmd
        if (enter == 'cmd' && fromId == administratorId) {
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
