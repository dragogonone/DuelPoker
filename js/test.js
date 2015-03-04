document.onkeydown = testAA;

function testAA(){
    switch(event.keyCode){
        case 90://z
            console.log("tap");
            for(var i=0;i<player1.field.length;i++){
                player1.field[i].tap();
            }
        break;
        case 88://x
            console.log("untap");
            for(var i=0;i<player1.field.length;i++){
                player1.field[i].untap();
            }
            break;
        case 67://c
            console.log("enemySummon");
            var n = popYamahuda();
            var sp = new CardSprite(n,player2.field.length);
            var cre = [];
            cre[0] = sp;
            player2.fieldRoom.addGroup(cre);
            player2.field[0].tap();
            break;
        case 89://y
            console.log("yama kill");
            var num = yamahuda.length;
            var randnum = Math.floor(Math.random() * num);
            yamahudaToTrushCard(player1,randnum);
            yamahudaToTrushCard(player2,(num - randnum));
            break;
        case 66://b
            console.log("handToYamahuda");
            handToYamahudaCard(player1.hand[0]);
            break;
        case 69://e
            console.log("errorCheck");
            var x = player1.handRoom.getSelecting();
            var y = player1.fieldRoom.getSelecting();
            console.log(x);
            console.log(y);
            console.log(phase);
        case 65://a
            console.log("enemyAttack");
            attack(player2.field[1],yamahudaRoom);
    }
}
