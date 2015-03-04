//召喚ボタンのスプライト
//将来的にはFieldRoomクリックorドラッグで召喚なので消す予定

var okButtonLabel = enchant.Class.create(enchant.Label, {
    initialize: function(){
        enchant.Label.call(this);
        this.width = 120;
        this.height = 24;
        this.x = 700;
        this.y = 510;
        this.backgroundColor = "orange";
        this.text = "OK";
        this.textAlign = "center";
        this.color = "white";
        this.font = "26px 'ＭＳ ゴシック'";
    },
    ontouchend:function(){ // touchendイベントのイベントリスナー
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
        }
    }
});
