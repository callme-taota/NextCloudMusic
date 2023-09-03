export default class Action {
    constructor(c){
        this.subscribers = [];
        this.c = c;
        let key = c.key;
        this.key = key;
    }

    get = () => {
        return this.c.Get(this.key);
    }

    set = (value) => {
        let res = this.c.Submit(this.key,value);
        this.action = value;
        this.notifySubscribers();
        return res;
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
            if(typeof _ === 'function'){
                this.subscribers = new Set([...this.subscribers, _]);
                // _(this.action);
                // this.subscribers.push(_);
            }
        }catch(e){
            console.error(e);
        }
    }

}
