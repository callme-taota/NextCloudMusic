import Action from "./Action.js";
import Storage from "./Storage.js";
export const S = new Storage
(
    {

    },
    ()=>{
        return "S";
    }
);

export const PlayList_State = new Action(S.NewConn({
    songs : [],
    total : 0,
    now : 0,
},"PlayList"));

export const Theme_State = new Action(S.NewConn({
    model:'light'
},"Theme"));

export const Message_State = new Action(S.NewConn({
    msgArr : [],
},"Message"));

export const SpaceKeyListener = new Action(S.NewConn({
    Listening : true,
},"SpaceKeyListener"));
// S.Subscribe((_)=>{
//     console.log(_);
// });


// let res1 = PlayList.get();
// console.log(res1);

// res1.total = 20;
// let res2 = PlayList.set(res1);
// console.log(res2);
