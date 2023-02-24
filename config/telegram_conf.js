const TelegramBot = require('node-telegram-bot-api');
const token = process.env.TELEGRAM_BOT_TOKEN; // Replace the value "token" below with the Telegram token you receive from @BotFather
const administratorId = process.env.TELEGRAM_ADMINISTRATOR_ID;// Replace the value "administratorId" below with the you personal id of your Telegram account
const bot = new TelegramBot(token, { polling: true });
var exec = require('child_process').exec, child;// Execute cmd

bot.onText(/(.*)/, function (msg, match) {
    var fromId = msg.from.id;
    var resp = new String(match[0]);
    resp = resp.toLowerCase();
    if (resp.charAt(0) == '\\' && fromId == administratorId) {
        resp = resp.slice(1);
        var respTo = resp.split(' ');
        var enter = respTo[0];
        // Command to Cmd
        if (enter == 'cmd' && fromId == administratorId) {
            var getter = respTo.join(' ');
            var prefCommand = getter.replace(/cmd /, '');
            var command = prefCommand;
            console.log("Command to server" + " --PROCESSING-- " + command);
            child = exec(command, (err, output) => {
                if (output) {
                    bot.sendMessage(fromId, output);
                    console.log("Command to server" + " --OK-- " + command);
                }
                if (err !== null) {
                    console.log('exec error: ' + err);
                }
            });
        } else {
            bot.sendMessage(fromId, "Command error - " + command);
        }
    }
});
