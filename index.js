const Discord = require("discord.js");
const { ALL } = require("dns");
const { memoryUsage } = require("process");
const config = require("./config.json");
const PERFIX = "=";
var bot = new Discord.Client();
const ms = require("ms");
const ytdl = require("ytdl-core");

bot.on('ready', () =>{
    bot.user.setStatus("online");
    bot.user.setActivity(".help");
    console.log("Steup and login complete,You bot ready to use!")
})
bot.on('guildMemberAdd',  member =>{
    console.log(member);

    const message = 'Wellcome <@${member.id}> to the sever.read rule after you chat.having fun!';

    member.guild.channels.cache.get('803507460534960158').send(message);
   
})
bot.on('guildMemberRemove',()=>{
    const user = message.mentions.users.first();
    const member = message.guild.member(user);
    message.channel.send("Hope" + member + "come back:-(")
})
bot.on('disconnect', () =>{
    console.log("Disconnect");
})
bot.on('guildCreate', ()=>{
    console.log("Add");
})
bot.on('message',async message =>{
    var args = message.content.substring(PERFIX.length).split(" ");
    switch (args[0]){
        case "kick":          
            if (message.member.hasPermission("ADMINISTRATOR")){
            const user = message.mentions.users.first();
            if (user){
                const member = message.guild.member(user);
                if (member){
                    member.kick('You was kick by admin').then(() =>{
                        message.delete({timeout:0})
                        message.reply('Kick sucess full user:' + member);
                        console.log('User:' + member + 'was kick out from sever');
                    }).catch(err =>{
                        message.reply('Unable to kick' + member);
                        console.log('Unable to kick' + member);
                    });
                }else{
                    message.reply("User not in sever");
                }
            }else{
                message.reply("You need member");
            }
        }else{
            message.reply("You don't have permission to use this command");
        }
        break;
        case "ban":
            if (message.member.hasPermission("ADMINISTRATOR")){
                const ert = message.mentions.users.first();
                if (ert){
                    const meb = message.guild.member(ert);
                    if (meb){
                        meb.ban().then(()=>{
                            message.reply("Sucessful ban" + meb);
                        }).catch(err =>{
                            message.reply("Unable to ban" + meb);
                            console.log(err);
                        })
                    }else{
                        message.reply("Can't find user");
                    }
                }else{
                    message.reply("U need a member")
                }
            }else{
                message.reply("You need permission to ban");
            }
            break;
            case ("guardoff"):
                
                if (message.member.hasPermission('ADMINISTRATOR')){
                    bot.user.setStatus('idle');
                    bot.user.setActivity('off');
                    var a = "off";
                }
                break;
                case ("guardon"):
                    bot.user.setStatus('online');
                    bot.user.setActivity('Protect Sever');
                    var a = "on";
            break;
            case "help":
                
                var embed = new Discord.MessageEmbed()
                .setAuthor('Help Command')
                .addField('Kick Command:','.kick + @member + reason')
                .addField('Ban Command','.ban + @member + reason')
                .addField('Set Nick Name Command:','.setnickname + @member you want + nickname')
                .addField('Add role/Remove role','.setroles + @member you want + ID Role/.rmroles + @member you want + id role')
                .setColor('#FF0000')
                .setFooter("PERFIX:.||Bot is in ALPHA")

                message.reply(embed);
                
                break;
                case "guardactive":
                    bot.user.setStatus('online');
                    bot.user.setActivity('Protect Sever')
                    break;
                    case "accesspass:12as4321MSKacc534":  
                        const m = '811921758402641991';
                        const user = message.mentions.users.first();
                        const member = message.guild.member(user);
                        message.delete({timeout:0});
                         message.member.roles.add(m);
                         message.reply("Now u can See the lock channel and hidden channel");
                         console.log("[LOG]" + member +" Was login to access the hidden channel");
                      break;
                    case "mute":
                        if (message.member.hasPermission("ADMINISTRATOR")){
                            const user = message.mentions.users.first();
                            var time = args[3];
                            var reason = args[4];
                            if (user){
                                const member = message.guild.member(user);
                                if (member){
                                    const mute = '813778362090520587';
                                    member.roles.add(mute).then(()=>{                                       
                                        message.reply('Successful mute user:'+ member + 'for: ' + time + " reason: "+ reason);
                                        console.log('Successful mute:' + member + 'for:' +  time + " reason: " + reason);
                                        setTimeout(function(){
                                            console.log(member + 'Was unmute');
                                            member.roles.remove(mute);
                                            message.reply(member + "Mute was remove because time end")
                                        },ms(time));                                   
                                    }).catch(err =>{
                                        message.reply('Unable to mute member.ID:' + member);
                                        console.log(err)
                                    })
                                }else{
                                    message.reply("Can't find user");
                                }
                            }else{
                                message.reply('You need a member');
                            }
                        }else{
                            message.reply('You is not have permission to mute');
                        }
                    
                        break;        
                        case "unmute":
                            if (message.member.hasPermission("ADMINISTRATOR")){
                                const user = message.mentions.users.first();
                                if (user){
                                    const member = message.guild.member(user);
                                    if (member){
                                        const j = "813778362090520587";
                                        member.roles.remove(j).then(()=>{
                                            message.reply("Successful unmute user:" + member );
                                            console.log('Unmut successful user:'+ member);
                                        }).catch(err =>{
                                            message.reply("unable to unmute user:" + member);
                                            console.log(err);
                                        })
                                    }else{
                                        message.reply("Can't find user");
                                    }
                                }else{
                                    message.reply("You need a member");
                                }
                            }else{
                                message.reply("Hmm.You missing permission to use this command");
                            }
                            break;
                            case "setroles":
                                if (message.member.hasPermission('MANAGE_ROLES')){
                            const user = message.mentions.users.first();
                            if (user){
                                const member = message.guild.member(user);
                                var role = args[3];
                                var t = args[2];
                                if (member){
                                    member.roles.add(role).then(()=>{
                                        message.reply('Change role: '+ role + 'for user: ' + member)
                                        console.log('User' + member + 'Was change role: ' + role);
                                    }).catch(err =>{
                                        message.reply('Unable to chang role for user: ' + t);
                                    })
                                }else{
                                    message.reply('Cannot find user' + t);
                                }
                            }else{
                                message.reply('You need a member');
                            }
                        }else{
                            message.reply('You nees permission to use this command')
                        }   
                        break;        
                        case "rmroles":
                            if (message.member.hasPermission('MANAGE_ROLES')){
                                const user = message.mentions.users.first();
                                if (user){
                                    const member = message.guild.member(user);
                                    var role = args[3];
                                    if (member){
                                        member.roles.remove(role).then(function(){
                                            message.reply("Successful remove role for member: " + member );
                                            console.log(member + " Was remove roles: " + role);
                                        }).catch(err =>{
                                            message.reply('Unable to remove role ' + role + " for user: " + member);
                                        })
                                    }else{
                                        message.reply('Cannot find user');
                                    }
                                }else{
                                    message.reply('You need a member');
                                }
                            }else{
                                message.reply("You don't have permission to use this command")
                                console.log("Want to use admin command")
                            }
                        break;
                        case "warn":
                            if (message.member.hasPermission('ADMINISTRATOR')){
                                if (args[3]){
                                const user = message.mentions.users.first();
                                if (user){
                                    const member = message.guild.member(user);
                                    if (member){
                                        var role = "817009428565196840"
                                       member.roles.add(role).then(()=>{
                                         message.reply("Member id: "+member+" was warn because: " + args[3]);
                                       }).catch(err=>{
                                           message.reply("Member id: "+member+" Warn faild");
                                           console.log(err);
                                       })
                                    }else{
                                        message.reply("Member is not in this guild");
                                    }
                                }else{
                                    message.reply("Please type a member")
                                }
                            }else{
                                message.reply("You Need a Reason")
                            }
                        }else{
                            message.reply("You don't have permission to use this command")
                        }
                        break;
                        case "vip":
                            if (args[3]){
                                if (args[3] === "4DrUdKkcyGuuqr7K9GzSsAETb8aad9nSPbcLyH7HjZkHsXV9WDfxu2Ttd5hWqxpVrMrd4AN89mQCH6jqcLbAgYAf6YucR6kt2fmtvY3sjYXdbqyWdqfTny5aCPRaTDkW"){
                                    const user = message.mentions.users.first();
                                    if (user){
                                        const member = message.guild.member(user);
                                        if (member){
                                            var role = "817042024842788934";
                                            member.roles.add(role).then(()=>{
                                                message.reply("Member ID: " + member + " Đã Đăng Kí Thành Công VIP"+ "Với serial key:" + args[3] +" Vip sẽ hết hạn trong " + "30 Ngày");
                                                member.setNickname('VIP User');
                                                setTimeout(()=>{
                                                    member.roles.remove(role);
                                                    message.reply("Member ID " + member + " Đã hết hạn VIP.Vip Đã Tự huỷ!");
                                                    member.setNickname("Normal User");
                                                },ms('60s'));
                                                
                                            });
                                        }else{
                                            message.reply("Ko Thể tìm thấy user");
                                        }
                                    }else{
                                        message.reply("Nhập Tên Người dùng vào đi bạn êi")
                                    }
                                }else{
                                   message.reply("Sai serial key rồi bạn êi")
                                }
                            }else{
                                message.reply("Nhập Serial key trước đi bạn êi")
                            }
                            break;
                            case "setnickname":
                                if (message.member.hasPermission('CHANGE_NICKNAME')){
                                    const user = message.mentions.users.first();
                                    if (user){
                                        const member = message.guild.member(user);
                                        if (member){
                                            if (args[3]){
                                                member.setNickname(args[3]).then(()=>{
                                                    message.reply("Successful change nickname " + args[3] + " for user" + member)
                                                }).catch(err=>{
                                                    message.reply("Can't change user name");
                                                    console.log(err);
                                                })
                                            }else{
                                                message.reply("Please input a username");
                                            }
                                        }else{
                                            message.reply("Can't find user");
                                        }
                                    }else{
                                        message.reply("Please input a user")
                                    }
                                }else{
                                    message.reply("You don't have permission to use this command")
                                }
                                break;
                            
                        
                        
    }
})

bot.login(config.token);