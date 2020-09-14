const path = require('path');
const { MessageEmbed } = require('discord.js');
import {readFileSync, writeFileSync } from "fs";
const srjson = readFileSync(path.join(__dirname,'./resources/selfrole.json')).toString();
let roleList = JSON.parse(srjson);
module.exports = {
    'name': 'selfrole',
    'description': 'Give yourself a role!',
    'arguments': 'Role(s) (not mentions)',
    'permissions': 'None',
    async execute(message,args,client){
        console.log(roleList);
        switch (args[0].toLowerCase()){
            case 'add':
                if (!roleList[message.guild.id.toString()]){
                    roleList[message.guild.id.toString()] = [];
                }
                if (!message.member.hasPermission("ADMINISTRATOR")) return;
                let role = message.mentions.roles.first();
                if (role == undefined){
                    role = message.guild.roles.cache.find(r => r.name == args[1]);
                }
                console.log(roleList);
                roleList[message.guild.id.toString()].push(role.id);
                break;
            case 'self':
                role = message.guild.roles.cache.find(r => r.name == args[1]);
                if (role == undefined) return message.channel.send('That\'s not a role in this server!');
                if (roleList[message.guild.id.toString()].includes(role.id)) return message.channel.send('That\'s not a role you can give yourself!');
                if (role != undefined){
                    try{
                        message.member.roles.add(role);
                    }
                    catch{
                        return message.channel.send('I can\'t give you that role!');
                    }
                }
                break;
        }
    }
}