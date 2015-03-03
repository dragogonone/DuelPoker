//自分のターンの関数はここに

function myTurnStart(){
    console.log("1P Turn Start");
    selecting_posi = 0;
    activePlayer = player1;
    nonActivePlayer = player2;
    player1.drawCard();
    console.log("hand:" + player1.hand);
}

function myTurnEnd(){
    console.log("1P Turn End");
    console.log("hand:" + player1.hand);
}
