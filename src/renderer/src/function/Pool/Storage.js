export default class Storage {
    constructor(s,_) {
        this.subscribers = [];
        if(typeof s == 'object'){
            this.s = s;
        }else{
            this.s = {};
            return;
        }

        if(typeof _ === 'function'){
            try{
                let res ;
                res = _();
                this.packing = res;
            }catch(e){
                console.error(e);
            }
        }

        let proxyobj = new Proxy(this.s,{
            get(target,key){
                let res = target[key];
                return res;
            },
            set(target,key,value){
                return Reflect.set(target,key,value);
            }
        })
        this.proxyObj = proxyobj;

        
    }

    NewConn = (obj,k) => {
        if(!this.Check(k)){
            let s = this.s;
            s[k] = obj;
            let Get = this.Get;
            let Submit = this.Submit;
            return {
                key:k,
                Get,
                Submit
            };
        }
        
    }
    Submit = (key,value) => {
        this.proxyObj[key] = value;
        this.action = { [key] : value };
        this.notifySubscribers();
        return this.proxyObj[key];
    }
    Lock = () => {

    }
    Get = (key) => {
        let r = JSON.parse(JSON.stringify(this.s[key]));
        return r;
    }
    Check = (key) => {
        try{
            let r = this.s[key];
            if(r === undefined){
                return false;
            }else{
                return true;
            }
        }catch(e){
            return false;
        }
    }

    notifySubscribers = () => {
        this.subscribers.forEach(subscriber => {
            try {
                if(typeof subscriber === 'function'){
                    subscriber(this.action);
                }
            } catch (e) {
                console.error(e);
            }
        });
    }
    
    
    Subscribe = (_) => {
        try{
            _(this.action);
            this.subscribers.push(_);
        }catch(e){
            console.error(e);
        }
    }
}