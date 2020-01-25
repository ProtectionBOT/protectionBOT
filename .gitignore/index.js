const Discord = require('discord.js');
const client = new Discord.Client ();
var bot = new Discord.Client ();
var Client = new Discord.Client ();
let status = [bot.users.size+ " utilisateurs", "la protection", "son développeur: Serenity_Thomas#4399"]
let nowstat = status[Math.floor(Math.random() * status.length)]
let prefix = "?"

bot.login(process.env.TOKEN);

bot.on('ready', () => {
    console.log("le bot Protection est bien connecté aux  serveurs")
    setInterval(changing_status, 20000);

    function changing_status() {
        let status = [bot.users.size+" utilisateurs", "la protection", "son développeur: Serenity_Thomas#4399"] 
        let nowstat = status[Math.floor(Math.random() * status.length)]

        bot.user.setActivity(nowstat, {type: "WATCHING"})
        console.log("Statut du botchangé.")
    }
});

bot.on('message' , message => {
    if (message.content.startsWith("?mute")) {
    let member = message.mentions.members.first()
    let muterole = message.guild.roles.find(role => role.name === 'Mute')
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas la permission d'utliser cette commande :x:")
    if (!member) return message.channel.send("Membre introuvable :x:")
    if (muterole) {
        member.addRole(muterole)
        message.channel.send(member + ' est muet :white_check_mark:')
    }
    else {
        message.guild.createRole({name: 'Mute', permissions: 0}).then((role) => {
            message.guild.channels.filter(channel => channel.type === 'text').forEach(channel => {
                channel.overwritePermissions(role, {
                    SEND_MESSAGES: false
                })
            })
            member.addRole(role)
            message.channel.send(member + ' à été mute :white_check_mark:')
        })
    }
}
});


bot.on('message', message => {
    if (message.content.startsWith("?ban")) {
        message.delete();
        if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return message.channel.send("Vous n'avez pas la permission :x:");
  
        if(message.mentions.users.size === 0) {
            return message.channel.send("Vous devez mentionner un utilisateur :x:");
        }
  
        var ban = message.guild.member(message.mentions.users.first());
        if(!ban) {
            return message.channel.send("L'utilisateur ne se trouve pas sur Terre !");
        }
  
        if(message.guild.member(kick).hasPermission("BAN_MEMBERS")) return message.channel.send("Impossible de le bannir :x:!")
  
        if(!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) {
            return message.channel.send("Je n'ai pas la permission pour ban :x: ");
        }
        ban.ban().then(member => {
            var ban_embed = new Discord.RichEmbed()
            .setColor("#40A497")
            .setTitle("Ban :")
            .addField("Membre banni:", `${member.user.username}`)
            .addField("ID :", `${member.user.id}`)
            .addField("Modérateur :", `${message.author.username}`)
            client.guilds.get("481105805161005066").channels.get("488344143047819282").send(ban_embed)
            console.log("Un utilisateur a été banni !")
        });
        
    }



bot.on('message', message => {
    if (message.content.startsWith("?kick")) {
        if(message.content.startsWith(prefix + "mute")) {
      message.delete();
        if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send("Vous n'avez pas la permission :x:!");

        if(message.mentions.users.size === 0) {
            return message.channel.send('Vous devez mentionner un utilisateur !');
        }

        if(message.guild.member(kick).hasPermission("BAN_MEMBERS")) return message.channel.send("Impossible de le mute :x:!")

        var mute = message.guild.member(message.mentions.users.first());
        if(!mute) {
            return message.channel.send("Je n'ai pas trouvé l'utilisateur ou il n'existe pas :x: !");
        }
        message.channel.overwritePermissions(mute, { SEND_MESSAGES: false}).then(member => {        
            var mute_embed = new Discord.RichEmbed()
            .setColor("#40A497")
            .setTitle("Mute :")
            .addField("Membre muté:", `${mute.user.username}`)
            .addField("ID :", `${mute.user.id}`)
            .addField("Modérateur :", `${message.author.username}`)
            client.guilds.get("481105805161005066").channels.get("488344143047819282").send(mute_embed)
            console.log("Un utilisateur a été mute :white_check_mark: !")
        });
    }

bot.on('message', message => {
    if(message.content.startsWith("?userinfo")) {
      var memberavatar = message.author.avatarURL
      var membername = message.author.username
         var mentionned = message.mentions.users.first();
        var getvalueof;
        if(mentionned){
            var getvalueof = mentionned;
        } else {
            var getvalueof = message.author;
        }

        if(getvalueof.bot == true){
            checkbot = "L'utilisateur est un bot :robot:";
        } else {
            checkbot = "N'est pas un bot :no_entry: :robot:";
        }
        if(getvalueof.presence.status == 'online'){
          status = "En ligne"; 
        } else if (getvalueof.presence.status = 'dnd') {
          status = "Ne pas déranger"
          } else if (getvalueof.presence.status = 'idle') {
            status = "Inactif"
          } else if (getvalueof.presence.status = 'invisible') {
            status = "Offline"
          }

      message.channel.sendMessage({
          embed: {
            type: 'rich',
            description: '',
            fields: [{
              name: 'Pseudo',
              value: getvalueof.username,
              inline: false
            }, {
              name: 'User id',
              value: getvalueof.id,
              inline: false
            },{
              name: '#',
              value: getvalueof.discriminator,
              inline: false
    },{
              name: 'Status',
              value: status,
              inline: false
    },{
              name: 'Bot',
              value: checkbot,
              inline: false
    }],
          image: {
        url: getvalueof.avatarURL
          },
            color: 0xE46525,
            footer: {
              text: 'Protection',
              proxy_icon_url: ' '
            },

            author: {
              name: membername,
              icon_url: memberavatar,
              proxy_icon_url: ' '
            }
          }
    })
    }
    })

var fs = require('fs');
 
let warns = JSON.parse(fs.readFileSync("./warns.json", "utf8"));
 
bot.on ('message', message => { 
  if (!message.guild) return
  if(message.content.startsWith("?warn")) { 
 
if (message.channel.type === "dm") return;
 
var mentionned = message.mentions.users.first();
 
if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur:x:**").catch(console.error);
 
if(message.mentions.users.size === 0) {
 
  return message.channel.send("**Vous n'avez mentionné aucun utilisateur**:x:");
 
}else{
 
    const args = message.content.split(' ').slice(1);
 
    const mentioned = message.mentions.users.first();
 
    if (message.member.hasPermission('MANAGE_GUILD')){
 
      if (message.mentions.users.size != 0) {
 
        if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">") {
 
          if (args.slice(1).length != 0) {
 
            const date = new Date().toUTCString();
 
            if (warns[message.guild.id] === undefined)
 
              warns[message.guild.id] = {};
 
            if (warns[message.guild.id][mentioned.id] === undefined)
 
              warns[message.guild.id][mentioned.id] = {};
 
            const warnumber = Object.keys(warns[message.guild.id][mentioned.id]).length;
 
            if (warns[message.guild.id][mentioned.id][warnumber] === undefined){
 
              warns[message.guild.id][mentioned.id]["1"] = {"raison": args.slice(1).join(' '), time: date, user: message.author.id};
 
            } else {
 
              warns[message.guild.id][mentioned.id][warnumber+1] = {"raison": args.slice(1).join(' '),
 
                time: date,
 
                user: message.author.id};
 
            }
 
            fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});
 
message.delete();
 
            message.channel.send(':warning: | **'+mentionned.tag+' à été averti** :white_check_mark:');
 
message.mentions.users.first().send(`:warning: **Warn |** depuis **${message.guild.name}** donné par **${message.author.username}**\n\n**Raison:** ` + args.slice(1).join(' '))
 
          } else {
 
            message.channel.send(":x: Erreur mauvais usage: "+prefix+"warn <user> <raison> :x:");
 
          }
 
        } else {
 
          message.channel.send(":x:Erreur mauvais usage: "+prefix+"warn <user> <raison>:x:");
 
        }
 
      } else {
 
        message.channel.send(":x:Erreur mauvais usage: "+prefix+"warn <user> <raison>:x:");
 
      }
 
    } else {
 
      message.channel.send("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**:x:");
 
    }
 
  }
 
}
 
 
 
bot.on ('message', message => { 
  if (!message.guild) return
  if(message.content.startsWith("?seewarn")) { 
 
if (message.channel.type === "dm") return;
 
if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**:x:").catch(console.error);
 
    const mentioned = message.mentions.users.first();
 
    const args = message.content.split(' ').slice(1);
 
    if (message.member.hasPermission('MANAGE_GUILD')){
 
      if (message.mentions.users.size !== 0) {
 
        if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">") {
 
          try {
 
            if (warns[message.guild.id][mentioned.id] === undefined||Object.keys(warns[message.guild.id][mentioned.id]).length === 0) {
 
              message.channel.send("**"+mentioned.tag+"** n'a aucun warn :eyes:");
 
              return;
 
            }
 
          } catch (err) {
 
            message.channel.send("**"+mentioned.tag+"** n'a aucun warn :eyes:");
 
            return;
 
          }
 
          let arr = [];
 
          arr.push(`**${mentioned.tag}** a **`+Object.keys(warns[message.guild.id][mentioned.id]).length+"** warns :eyes:");
 
          for (var warn in warns[message.guild.id][mentioned.id]) {
 
            arr.push(`**${warn}** - **"`+warns[message.guild.id][mentioned.id][warn].raison+
 
            "**\" warn donné par **"+message.guild.members.find("id", warns[message.guild.id][mentioned.id][warn].user).user.tag+"** a/le **"+warns[message.guild.id][mentioned.id][warn].time+"**");
 
          }
 
          message.channel.send(arr.join('\n'));
 
        } else {
 
          message.channel.send(":x:Erreur mauvais usage: "+prefix+"seewarn <user> <raison>:x:");
 
          console.log(args);
 
        }
 
      } else {
 
        message.channel.send(":x:Erreur mauvais usage: "+prefix+"seewarn <user> <raison>:x:");
 
      }
 
    } else {
 
      message.channel.send("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur:x:**");
 
    }
 
  }})})



  bot.on ('message', message => { 
    if (!message.guild) return
    if(message.content.startsWith("?unwarn")) {
     
    if (message.channel.type === "dm") return;
     
    if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**:x:").catch(console.error);
     
       const mentioned = message.mentions.users.first();
     
        const args = message.content.split(' ').slice(1);
     
        const arg2 = Number(args[1]);
     
        if (message.member.hasPermission('MANAGE_GUILD')){
     
          if (message.mentions.users.size != 0) {
     
            if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">"){
     
              if (!isNaN(arg2)) {
     
                if (warns[message.guild.id][mentioned.id] === undefined) {
     
                  message.channel.send(mentioned.tag+" n'a aucun warn");
     
                  return;
     
                } if (warns[message.guild.id][mentioned.id][arg2] === undefined) {
     
                  message.channel.send("**:x: Ce warn n'existe pas**");
     
                  return;
     
                }
     
                delete warns[message.guild.id][mentioned.id][arg2];
     
                var i = 1;
     
                Object.keys(warns[message.guild.id][mentioned.id]).forEach(function(key){
     
                  var val=warns[message.guild.id][mentioned.id][key];
     
                  delete warns[message.guild.id][mentioned.id][key];
     
                  key = i;
     
                  warns[message.guild.id][mentioned.id][key]=val;
     
                  i++;
     
                });
     
                fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});
     
                if (Object.keys(warns[message.guild.id][mentioned.id]).length === 0) {
     
                  delete warns[message.guild.id][mentioned.id];
     
                }
     
                message.channel.send(`Le warn de **${mentioned.tag}**\': **${args[1]}** a été enlevé avec succès!:white_check_mark:`);
     
                return;
     
              } if (args[1] === "tout") {
     
                delete warns[message.guild.id][mentioned.id];
     
                fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});
     
                message.channel.send(`Les warns de **${mentioned.tag}** a été enlevé avec succès!:white_check_mark:`);
     
                return;
     
              } else {
     
                message.channel.send(":x:Erreur mauvais usage: "+prefix+"unwarn <utilisateur> <nombre>:x:");
     
              }
     
            } else {
     
              message.channel.send(":x: Erreur mauvais usage: "+prefix+"unwarn <utilisateur> <nombre>:x:");
     
            }
     
          } else {
     
           message.channel.send(":x:Erreur mauvais usage: "+prefix+"unwarn <utilisateur> <nombre>:x:");
     
          }
     
        } else {
     
          message.channel.send("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur:x:**");
     
        }
      }})};

      bot.on ('message', message => { 
        if (!message.guild) return
        if(message.content.startsWith("?clear")) {
        message.delete();
          if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.channel.send(":x:Vous n'avez pas la permission:x: !");
  
          let args = message.content.split(" ").slice(1);
  
          if(!args[0]) return message.channel.send(":x:Tu dois préciser un nombre de messages à supprimer:x: !")
          message.channel.bulkDelete(args[0]).then(() => {
              message.channel.send(`${args[0]} messages ont été supprimés :white_check_mark: !`);
              clear.clear().then(member => {
                var clear_embed = new Discord.RichEmbed()
                .setColor("#40A497")
                .setTitle("Clear :")
                .addField("Messages supprimés:", `${args[0]}`)
                .addField("Dans le salon :", `${message.channel.name}`)
                .addField("Modérateur :", `${message.author.username}`)
                client.guilds.get("481105805161005066").channels.get("488344143047819282").send(clear_embed)
                console.log("Un modérateur a supprimé des messages !")
            });
          });
}})})});

bot.on("message" , message =>{
  if (!message.guild) return
  if (message.content === prefix + "protection"){
      message.channel.send ("Bonjour "+ message.author +". Je protège ce serveur sans problème!")
  }
});

bot.on("message" , message =>{
  if (!message.guild) return
  if (message.content === prefix + "dev"){
      message.channel.send (" J'ai été créé et développé par Serenity_Thomas#4399 avec l'aide de Люка#1916")
  }
});

bot.on("message" , message =>{
  if (!message.guild) return
  if (message.content === prefix + "invite"){
      message.channel.send ("Bonjour "+ message.author +". voici le lien pour m'inviter sur ton serveur: https://discordapp.com/oauth2/authorize?client_id=669226539837292574&scope=bot&permissions=8 !")
  }
});

bot.on('message', message => {
  if (!message.guild) return
  if (message.content === "?ping") {
    console.log("PING")
    message.channel.send('Ping du bot : **'+Math.round(bot.ping)+"ms**")
  }
})
bot.on ('message', message => { 
  if (!message.guild) return
  if(message.content.startsWith("?say")) {  
   if (message.guild.member(message.author).hasPermission("ADMINISTRATOR")) {
    if (message.guild.member(bot.user).hasPermission("ADMINISTRATOR")) {
       var text = message.content.split(' ').slice(1).join(' ')
       if (!text) return message.reply('hey , tu as oublié ce que tu voulais marquer ^^')
       message.delete('')
       message.channel.send(text)
  } else {
   message.reply("Il me faut la permission __**ADMINISTRATOR**__ pour faire cela.:x:")
}
} else {
message.reply("Il te faut la permission __**ADMINISTRATOR**__ pour faire cela.:x:")
}}

})
bot.on('message', message => {
  if (!message.guild) return
  if(message.content.startsWith("?serverinfo")) {
      if (message.guild) {
      var sowner = message.guild.owner.user.username
      var otag = message.guild.owner.user.discriminator
      var server_embed = new Discord.RichEmbed()
      .setAuthor(message.author.tag)
      .setImage(message.guild.iconURL)
      .setTitle(message.guild.name)
      .setDescription("Informations du serveur " + message.guild.name)
      .addField("nombre de membres", message.guild.memberCount)
      .addField("nombre de channels", message.guild.channels.size)
      .addField("nombre de rôles", message.guild.roles.size)
      .addField("Fondateur", sowner + '#' + otag)
      .addField("Region", message.guild.region)
      .addField("Nombre de roles", message.guild.roles.size)
      .addField("_ _", "Icone du serveur")
      .setFooter("Protection", message.author.avatarURL)
      message.channel.send(server_embed)
      }
    }

});

bot.on('message', message =>{
  if (message.content.startsWith("?help")) {
      message.delete(0);     
      message.channel.send("", {
      embed: {
      color: 0x00AAFF,
      author: message.author.name,
      title: "Page D'Aide",
      description: '**Le Prefixe :``?``**',
      fields: [
      { 
      name: '**?help **',
      value: "cela vous permet de voir toute les commandes du Bot!"
      }, {     
      name: '**?say**',
      value: "permet de parler avec un texte"
      }, {    
      name: '**?kick**',
      value: "Expulser une personne"
      }, {  
      name: '**?ban**',
      value: "Bannir une personne "  
      }, {
      name: '**?userinfo**',
      value: "Permet de voir les infos d'une autre personne ou bien de toi même"
      }, {    
      name: '**?serverinfo**',
      value: "vous envoie les informations du serveur sur lequel la commande est effectuée"
      }, {
      name: '**?ping**',
      value: "Sert a voir le ping du bot"
      }],
      thumbnail: {
      url: message.client.iconURL
      },
      timestamp: new Date(),
      footer: {
      text: '© Protection.',
      }}});
      }
  });


client.on ("guildMemberAdd", user =>{
  user.guild.channels.get ("659722917453758494").send("Bienvenue "+ user + " sur le serveur " + user.guild.name + " !")
});
client.on("guildMemberRemove", user =>{
  user.guild.channels.get ("659722917453758494").send ("L'utilisateur " + user.user.username + " a quitté le serveur")
});

client.on('message', function (message) {
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
 
    if (args[0].toLowerCase() === prefix + 'kick') {
       if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande ;(")
       let member = message.mentions.members.first()
       if (!member) return message.channel.send("Veuillez mentionner un utilisateur :x:")
       if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.send("Vous ne pouvez pas kick cet utilisateur :x:")
       if (!member.kickable) return message.channel.send("Je ne peux pas exclure cet utilisateur :sunglass:")
       member.kick()
       message.channel.send('**' + member.user.username + '** a été exclu :white_check_mark:')
    }
})
 
/*Ban*/
client.on('message', function (message) {
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
 
    if (args[0].toLocaleLowerCase() === prefix + 'ban') {
       if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande ;(")
       let member = message.mentions.members.first()
       if (!member) return message.channel.send("Veuillez mentionner un utilisateur :x:")
       if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.send("Vous ne pouvez pas bannir cet utilisateur :x:")
       if (!member.bannable) return message.channel.send("Je ne peux pas bannir cet utilisateur :sunglass:")
       message.guild.ban(member, {days: 7})
       message.channel.send('**' + member.user.username + '** a été banni :white_check_mark:')
    }
})
