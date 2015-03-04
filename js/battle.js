//  バトルに関する関数をまとめる
//  ファイル構成については一考の余地あり


//攻撃したとき外部ファイルが呼ぶ関数
//攻撃クリーチャーと攻撃対象が引数
function attack(atCrt,dfCrt){

    aP = atCrt.parentNode.player;
    if(aP == player1){
        var nP = player2;
    }else{
        var nP = player1;
    }

    //ここにブロックの処理を書く

    if(dfCrt==yamahudaRoom){
        attackToYamahuda(atCrt,nP);
    }else{
        attackToCreature(atCrt,dfCrt,aP,nP);
    }


    if(atCrt.parentNode==aP.fieldRoom){
        atCrt.tap();
        atCrt.parentNode.deselect();
    }
    player1.fieldRoom.leftenCards();
    player2.fieldRoom.leftenCards();
}

//山札に攻撃したときの関数
//引数に攻撃したクリーチャー
function attackToYamahuda(atCrt,nP){
    console.log(atCrt.getPower() + " attack to deck");
    //攻撃成功
    var breakNum = atCrt.getBreakPower();
    yamahudaToTrushCard(nP,breakNum);//山札からカードを指定枚数墓地へ
}

function attackToCreature(atCrt,dfCrt,aP,nP){

    console.log(atCrt.getPower() + " attack to " + dfCrt.getPower());

    //バトル開始
    var i = getBigger(atCrt.getPower(),dfCrt.getPower())
    switch(i){
        case 1://攻撃側の勝利
            fieldToTrushCard(dfCrt);
            break;
        case 2://防御側の勝利
            fieldToTrushCard(atCrt);
            break;
        case 0://両方死ぬ
            fieldToTrushCard(atCrt);
            fieldToTrushCard(dfCrt);
            break;
    }
}
