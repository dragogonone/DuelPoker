document.onkeydown = testAA;

function testAA(){
    switch(event.keyCode){
        case 90://z
            console.log("tap");
            for(var i=0;i<player1.field.length;i++){
                player1.field[i].tap();
            }
        break;
        case 88://z
            console.log("tap");
            for(var i=0;i<player1.field.length;i++){
                player1.field[i].untap();
            }
            break;
        case 67://c
            console.log("ene");
            var n = popYamahuda();
            var sp = new CardSprite(n,player2.field.length);
            var cre = [];
            cre[0] = sp;
            player2.fieldRoom.addGroup(cre);
            player2.field[0].tap();
            break;
        case 65://a
            break;
    }
}
