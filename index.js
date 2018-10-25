const botconfig = require("./botconfig.json");
const tokenfile = require("./tokenfile.json");
const Discord = require("discord.js");

const bot = new Discord.Client({ disableEveryone: true });

bot.on("ready", async () => {
    console.log("BOT HEVEN is online");
});

bot.on("message", async message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    let msg;

    // SUGGEST A BOT COMMAND (STABLE)
    if (cmd === `${prefix}suggestabot`) {
        let suggestion = args.join(" ").slice();
        let channel = message.guild.channels.find(c => c.name === "bot-suggestions");
        if (!channel) return message.channel.send("Uh oh... I can't post your request.");

        if (suggestion) {
            message.delete().catch(O_o => { }); // Deletes the last send message

            let embed = new Discord.RichEmbed()
                .setTitle("Bot Suggestion")
                .setDescription("*(Please note this feature is being worked on, and may have bugs)*")
                .addField("Created By", `${message.author} with ID ${message.author.id}`)
                .addField("Content", suggestion)
                .addField("Submitted At", message.createdAt)
                .setColor("#23a332");

            channel.send(embed);
            return message.channel.send(`${message.author} Your suggestion has been submitted!`);
        } else {
            message.channel.send("**Correct Syntax:** `.suggestabot [link]`");
        }
    }

    // HELP COMMAND (STABLE)
    if (cmd === `${prefix}help`) {
        msg = "**>** `.help` Lists commands";
        msg = msg + "\n**>** `.suggestabot <link>` Suggest a bot to be added (Guidelines: `.botguidelines`)";
        msg = msg + "\n**>** `.botguidelines` View the guidelines for adding your bot.";
        msg = msg + "\n**>** `.devme` Adds you to the developer channels";
        msg = msg + "\n**>** `.bots` View a list of bots on this server";
        msg = msg + "\n**>** `.botinfo <bot #>` View more information about a bot. (Bot Numbers: `.bots`)"
        msg = msg + "\n**>** `.langlist` View the list of languages that you can add using `.addlang`"
        msg = msg + "\n**>** `.addlang` Assign a language to yourself, so people know what language you use"

        let embed = new Discord.RichEmbed()
        .setTitle("**Bot Heaven** | Commands")
        .setDescription(msg)
        .setFooter("Please report any bugs/issues to Mastrivious")
        .setColor("#ffffff");

        message.channel.send(embed);
    }

    if (cmd === `${prefix}botguidelines`) {
        msg = "**1.** No spam commands or responses";
        msg = msg + "\n**2.** Bot should be on almost always, for testing";
        msg = msg + "\n**3.** Bot shouldn't DM users on join";
        msg = msg + "\n**4.** Bot should use English";
        msg = msg + "\n**5.** Bot should only post NSFW in NSFW channels";
        msg = msg + "\n**6.** Bot should have a working help command";

        let embed = new Discord.RichEmbed()
        .setTitle("**Bot Heaven** | Bot Guidelines")
        .setDescription(msg)
        .setFooter("Your bot wont be added if they dont follow these guidelines!")
        .setColor("#ffffff");

        message.channel.send(embed);



    }

    if (cmd === `${prefix}devme`) {
        let devRole = message.guild.roles.find(r => r.name === "Developer");
        if (!devRole) return message.channel.send("**Error!** I can't find the proper role.");
        if (message.member.roles.has(devRole.id)) return message.channel.send("**Whoops!** Your already are a developer");
        message.member.addRole(devRole).catch(console.error);
        message.channel.send(`**${message.author.username}**, you have been added to the developer channels`);
        console.log(`${message.author} has been added to the dev channels. At ${message.createdAt}`);
    }

    if (cmd === `${prefix}bots`){
        msg = "\n\n**1** IdleRPG";
        msg = msg + "\n**2** Blackjack";
        msg = msg + "\n**3** FredBoat";
        msg = msg + "\n**4** Dyno";
        msg = msg + "\n**5** Bumper!";
        msg = msg + "\n**6** Countr";
        msg = msg + "\n**7** cat";
        msg = msg + "\n**8** Pokécord";
        msg = msg + "\n**9** Dank Memer";
        msg = msg + "\n**10** Tatsumaki";
        msg = msg + "\n**11** Thor";
        

        let embed = new Discord.RichEmbed()
        .setTitle("**Bot Heaven** | Bot List")
        .setDescription(msg)
        .setColor("#ffffff")
        .addField("Your bot not on this list?", "Contact Mastrivious")
        .addField("Need more information about a bot?", "Try `.botinfo <number>`\nFor Example: `.botinfo 11` Would give more information about Thor");
        

        message.channel.send(embed);
    }

    if (cmd === `${prefix}botinfo`){
        msg = "Do: `.botinfo <bot #>`";
        msg = msg + "\nFor a list of bot numbers do: `.bots`";

        let badsyntax = new Discord.RichEmbed()
        .setTitle("Incorrect Syntax!")
        .setDescription(msg)
        .setColor("#c43636");

        if (!args[0]) return message.channel.send(badsyntax);
        if (args[0] === "1") return botinfo("IdleRPG", "$", "Adrian & Mary Johanna");
        if (args[0] === "2") return botinfo("Blackjack", "+", "Wesley");
        if (args[0] === "3") return botinfo("FredBoat", ";;", "Fre_d");
        if (args[0] === "4") return botinfo("Dyno", "?", "NoobLance");
        if (args[0] === "5") return botinfo("Bumper!", "b!", "Tea Cup");
        if (args[0] === "6") return botinfo("Countr", "c!", "Promise");
        if (args[0] === "7") return botinfo("cat", "c!", "aikaterma");
        if (args[0] === "8") return botinfo("Pokécord", "p!", "miles");
        if (args[0] === "9") return botinfo("Dank Memer", "pls", "Mels, Yukine, ParadoxOrigins, & Blake");
        if (args[0] === "10") return botinfo("Tatsumaki", "t!", "David");
        if (args[0] === "11") return botinfo("Thor", "t!", "Mastriviou");

    }

    if (cmd === `${prefix}langlist`){
              msg = "\n**1** Javascript";
        msg = msg + "\n**2** Python";
        msg = msg + "\n\n To assign yourself the role, do `.addlang <lang #>`"; 

        let embed = new Discord.RichEmbed()
        .setTitle("**Bot Heaven** | Language List")
        .setDescription(msg)
        .setFooter("Feel like there should be more languages? Let us know!")
        .setColor("#ffffff");

        message.channel.send(embed);
    }

    if (cmd === `${prefix}addlang`){
        msg = "Do: `.addlang <lang #>`";
        msg = msg + "\nFor a list of language numbers do: `.langlist`";

        let devRole = message.guild.roles.find(r => r.name === "Developer");

        let badsyntax = new Discord.RichEmbed()
        .setTitle("Incorrect Syntax!")
        .setDescription(msg)
        .setColor("#c43636");
        
        if (!args[0]) return message.channel.send(badsyntax);
        if (args[0] === "1") {
            msg = "**Your not a developer on this server!**";
            msg = msg + "\nIf you are, do `.devme`... Then try this command again";
            let role = message.guild.roles.find(r => r.name === "Javascript");

            let embed = new Discord.RichEmbed()
            .setDescription(msg)
            .setColor("c43636");
            
            if (!message.member.roles.has(devRole.id)) return message.channel.send(embed);
            if (message.member.roles.has(role.id)) return message.channel.send(`**Whoops!** You have already been assigned the "Javascript" role`);
            if (!message.member.roles.has(role.id)) message.member.addRole(role).catch(console.error);
            message.channel.send(`**${message.author.username}**, you have been assigned the "Javascript" role`);
            console.log(`${message.author} has been assigned the "Javascript" role at ${message.createdAt}`);
                
            
        } 
        if (args[0] === "2") {
            msg = "**Your not a developer on this server!**";
            msg = msg + "\nIf you are, do `.devme`... Then try this command again";
            let role = message.guild.roles.find(r => r.name === "Python");

            let embed = new Discord.RichEmbed()
            .setDescription(msg)
            .setColor("c43636");
            
            if (!message.member.roles.has(devRole.id)) return message.channel.send(embed);
            if (message.member.roles.has(role.id)) return message.channel.send(`**Whoops!** You have already been assigned the "Python" role`);
            if (!message.member.roles.has(role.id)) message.member.addRole(role).catch(console.error);
            message.channel.send(`**${message.author.username}**, you have been assigned the "Python" role`);
            console.log(`${message.author} has been assigned the "Python" role at ${message.createdAt}`);     
        } 
        





    }

    function botinfo(name, bprefix, authors){
        msg = `**Prefix:** ${bprefix}`;
        msg = msg + `\n**Author(s):** ${authors}`;

        let embed = new Discord.RichEmbed()
        .setTitle(`Bot Information - ${name}`)
        .setDescription(msg)
        .setColor("#ffffff")
        .setFooter("Incorrect Information? Contact Mastrivious")

        message.channel.send(embed);
    }
});

bot.login(tokenfile.token);