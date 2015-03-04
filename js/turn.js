//自分のターンの関数はここに

function turnStart(player){//ターンの始まるプレイヤーが引数
    console.log(player.player + "P Turn Start");
    player.drawCard();
    console.log("hand:" + player1.hand);
    phase = 1;

    if(player.isMan==0){
        console.log("CPU turn");
        phase = 0;
        CPUturnStart();
    }

}

function turnEnd(player){//ターンの終わるプレイヤーが引数
    console.log(player.player + "P Turn End");

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
    }else{
        activePlayer = player1;
    }
    console.log(activePlayer);
    turnStart(activePlayer);
}

//CPUがどういう行動を取るのかを記述
function CPUturnStart(){
    turnEnd(activePlayer);
    afterCardBack();
}
