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
        if(phase==2){
            var p = player1;
            var cards = p.handRoom.getSelecting();
            console.log(cards);

            if(cards != "no cards"){
                var backCards = [];
                for(var i=0;i<cards.length;i++){
                    backCards[i] = p.hand[cards[i]];
                }

                for(var i=0;i<cards.length;i++){
                    handToYamahudaCard(backCards[i]);
                }
            }
            afterCardBack(p);
        }else if(phase==3){
            var p = player1;
            var cards = p.fieldRoom.getSelecting();
            if(cards != "no cards"){
                var blocker = p.field[cards[0]];
            }else{
                var blocker = null;
            }
            battle.afterBlockerSelect(blocker);
        }
    }
});
