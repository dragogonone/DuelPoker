//自分の手札置き場のグループと色をつけるためのラベル

var MyHandRoomGroup = enchant.Class.create(enchant.Group, {
    initialize: function(){
        enchant.Group.call(this);
		this.x = 20;
		this.y = SCENE_HGT - CARD_HGT - 20;
        this.name = "myHandRoom"
    },
    addCard: function(card){//手札にカードを一枚追加
        var x =  player1.hand.length - 1;
        var sp = new CardSprite(card,x);
        sp.moveTo(x*(CARD_WID + 5) + 5,ROOM_HGT_1 - CARD_HGT);
        this.addChild(sp);
    }
});

var MyHandRoomLabel = enchant.Class.create(enchant.Label, {
	initialize: function(){
        enchant.Label.call(this);
		this.backgroundColor = "yellow";
		this.width = ROOM_WID_1;
		this.height = ROOM_HGT_1
        this.text = "hand"
        this.font = "14px cursive";
        this.color = "gray";
    }
});


//0から手札を表示
function dispHand(player){
    mai = player.hand.length;
    if(mai==0){return;}
        for(i=0;i<mai;i++){
            if(player.player==1){
                var card = new CardSprite(player.hand[i], i);
                card.moveTo(i*(CARD_WID + 5) + 5, ROOM_HGT_1 - CARD_HGT);
                myHandRoom.addChild(card);
            }else{
                var card = new CardSprite(55, i);
                card.moveTo( SCENE_WID - (mai-i) *(60 + 5) - 20, 0);
                scene.addChild(card);
            }

        }
        console.log(myHandRoom.childNodes);
    }

    //全手札を非表示
    function eraseHand(player){
        if(player.player==1){
            for(i=0;i<myHandRoom.childNodes.length;i++){
                myHandRoom.removeChild(myHandRoom.childNodes[i]);//一回全ての手札の要素を消す
            }
            myHandRoomLabel = new MyHandRoomLabel();//手札置き場の色を再生
            myHandRoom.addChild(myHandRoomLabel);
        }
    }
