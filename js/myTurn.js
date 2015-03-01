//自分のターンの関数はここに

function myTurnStart(){
    console.log("1P Turn Start");
    var x = player1.drawCard();
    myHandRoom.addCard(x);
    console.log("hand:" + player1.hand);
}

function myTurnEnd(){
    console.log("1P Turn End");
    console.log("hand:" + player1.hand);
}
