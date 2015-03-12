//OKボタンのスプライト

var okButtonLabel = enchant.Class.create(enchant.Label, {
    initialize: function(){
        enchant.Label.call(this);
        this.width = 120;
        this.height = 30;
        this.x = (SCENE_WID + ROOM_WID_1) / 2 + 5;
        this.y = SCENE_HGT - ROOM_HGT_1 + 20;
        this.backgroundColor = "orange";
        this.text = "OK";
        this.textAlign = "center";
        this.color = "white";
        this.font = "30px 'ＭＳ ゴシック'";
    },
    ontouchend:function(){ // touchendイベントのイベントリスナー
        console.log("OK Button");
        if(phase==2){//ターン終了時のカード交換
            var p = player1;
            var cards = p.getSelecting(p.hand);
            console.log(cards);

            if(cards != "no cards"){
                var backCards = [];
                for(var i=0;i<cards.length;i++){
                    backCards[i] = p.hand[cards[i]];
                }

                for(var i=0;i<cards.length;i++){
                    //cardMove(backCards[i],p.handRoom,yamahudaRoom);
                    handToYamahudaCard(backCards[i]);
                }
                p.backNum = cards.length;
            }
            afterCardBack(p);
        }else if(phase==3){//ブロッカー選択
            var p = player1;
            var cards = p.getSelecting(p.field);
            if(cards != "no cards"){
                var blocker = p.field[cards[0]];
            }else{
                var blocker = null;
            }
            console.log(blocker);
            battle.afterBlockerSelect(blocker);
        }
    }
});
