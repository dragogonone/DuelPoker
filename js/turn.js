//自分のターンの関数はここに

function turnStart(player){//ターンの始まるプレイヤーが引数
    console.log(player.player + "P Turn Start");

    for(var i=0;i<player.backNum + 1;i++){
        scene.tl.delay(10)
            .then(function(){player.drawCard()});
    }

    player.backNum = 0;
    phase = 1;
    player.isSummoned = 0;
    for(var i=0;i<player.field.length;i++){
        player.field[i].untap();
    }

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
    player.leftenCards(player.hand);
    player.leftenCards(player.field);
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
