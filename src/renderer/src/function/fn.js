/*








*/
import { Theme_State,Message_State } from "./Pool/Pool";

export function isnull(value){
    let flag= false;
    if (value === null) flag= true;
    if (typeof value === 'undefined') flag= true;
    if (typeof value === 'string' && value === '') flag= true;
    return flag;
}

//弃用-加入主题控制了
export function SuperClass(...args) {
    let defaultclass;
    let actionclass;
    let flag;
    let added;
    let returnClass = ''
    if(!isnull(args[0])){
        defaultclass = args[0];
    }
    if(!isnull(args[1])){
        actionclass = args[1];
    }
    if(!isnull(args[2])){
        flag = args[2];
    }
    if(!isnull(args[3])){
        added = args[3];
    }
    if(args.length === 1){
        return defaultclass;
    }
    if(args.length === 2){
        console.error('Superclass does not support passing two values, please pass in with the judgment value.')
        return 'Superclass-error';
    }
    if(args.length === 3){
        returnClass = defaultclass + ' ';
        returnClass +=  flag ? actionclass : ''
        return returnClass
    }
    if(args.length === 4){
        returnClass = defaultclass + ' ';
        returnClass += flag ? actionclass+added : ''
        return returnClass
    }
    return 'error';
}

export const Theme_setter = () => {
    const prefersColorScheme = window.matchMedia('(prefers-color-scheme: light)');
    let model;
    const set = (flag) => {
      if(flag){
        model='light';
      }else{
        model='dark';
      }
      let theme = {model};
      Theme_State.set(theme);
    }
    prefersColorScheme.addEventListener('change',(e) => {
      set(e.matches);
    })
    set(prefersColorScheme.matches)
}

export function TimeFormatter(time){
    time = parseInt(time)
    let date = new Date(parseInt(time)).toLocaleString().split(' ')[0].replace('/', '-').replace('/', '-') + ' '
    return (date)
}

export function DurationFormatter(d){
    let ttm = Math.floor( d / 60000 )
    let tts = Math.floor( d - 60* ttm)
    if(ttm<10) ttm ='0' + ttm;
    if(tts<10) tts ='0' + tts;
    tts = tts.toString().substr(0,2);
    let totaltime = ttm + ':' + tts;
    return totaltime;
}

export function SendMessage(message){
    let t = new Date().getTime();
    let MsgObj = Message_State.get();
    let arr = MsgObj.msgArr;
    let obj = {message,time : t}
    arr.push(obj);
    MsgObj.msgArr=arr;
    Message_State.set(MsgObj);
    setTimeout(() => {
        DelMessage(t);
    }, 2000);
}

export function DelMessage(time){
    let MsgObj = Message_State.get();
    let arr = MsgObj.msgArr;
    arr = arr.filter(obj => obj.time !== time);
    MsgObj.msgArr = arr;
    Message_State.set(MsgObj);
}
