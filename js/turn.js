//自分のターンの関数はここに

function turnStart(player){//ターンの始まるプレイヤーが引数
    console.log(player.player + "P Turn Start");
    player.drawCard();
    phase = 1;
    player.isSummoned = 0;

    if(player.isMan==0){
        console.log("CPU turn");
        phase = 0;
        CPUturnStart();
    }

}

function turnEnd(player){//ターンの終わるプレイヤーが引数

    if(isYamaNone == 1){
        endGame();
    }

    //カード戻すモード 一回操作権を得る
    player.handRoom.deselect();
    player.fieldRoom.deselect();
    console.log("戻すカードを選んで下さい");
    phase = 2;
}

function afterCardBack(){
    if(activePlayer == player1){
        activePlayer = player2;
        nonActivePlayer = player1;
    }else{
        activePlayer = player1;
        nonActivePlayer = player2;
    }
    console.log(activePlayer);
    turnStart(activePlayer);
}

//CPUがどういう行動を取るのかを記述
function CPUturnStart(){
    turnEnd(activePlayer);
    //召喚
    //攻撃
    afterCardBack();
}
