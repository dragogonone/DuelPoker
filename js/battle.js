//  バトルに関する関数をまとめる
//  ファイル構成については一考の余地あり


//山札に攻撃したときの関数
//引数に攻撃したクリーチャー
function attackToYamahuda(){
    if(activePlayer == player1){
        var aP = player1;
        var nP = player2;
    }else{
        var aP = player2;
        var nP = player1;
    }
    var num = aP.fieldRoom.getSelecting();
    var atCrt = aP.field[num[0]];
    console.log(atCrt.getPower() + " attack to deck");

    //攻撃成功
    var breakNum = atCrt.getBreakPower();
    for(var i=0;i<breakNum;i++){
        var x = popYamahuda();
        nP.trushRoom.addCard(x);
    }
    attackEnd(atCrt,null);
}

function attackToCreature(dfCrt){
    if(activePlayer == player1){
        var aP = player1;
        var nP = player2;
    }else{
        var aP = player2;
        var nP = player1;
    }
    var num = aP.fieldRoom.getSelecting();
    var atCrt = activePlayer.field[num[0]];
    console.log(atCrt.getPower() + " attack to " + dfCrt.getPower());



    //バトル開始
    var i = getBigger(atCrt.getPower(),dfCrt.getPower())
    switch(i){
        case 1://攻撃側の勝利
            dieCreature(dfCrt);
            break;
        case 2://防御側の勝利
            dieCreature(atCrt);
            break;
        case 0://両方死ぬ
            dieCreature(atCrt);
            dieCreature(dfCrt);
            break;
    }
    attackEnd(atCrt,dfCrt);
}

//全ての攻撃後の共通処理　タップとか
function attackEnd(atCrt,dfCrt){
    atCrt.tap();
    atCrt.parentNode.deselect();
}

//フィールドのカードを墓地へ送る
//引数に死ぬクリーチャーのインスタンス
//battle.jsに置くのは適切ではないかもしれない
function dieCreature(creature){
    var p = creature.parentNode.player;
    p.fieldRoom.deleteGroup(creature.posi2);
    for(i=0;i<creature.cards.length;i++){
        p.trushRoom.addCard(creature.cards[i].numberCode);
    }
}
