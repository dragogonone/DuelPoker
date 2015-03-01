//自分の手札置き場のグループと色をつけるためのラベル

var MyHandRoomGroup = enchant.Class.create(enchant.Group, {
    initialize: function(){
        enchant.Group.call(this);
		this.x = 20;
		this.y = SCENE_HGT - CARD_HGT - 20;
        this.name = "myHandRoom"
    },
    addCard: function(card){//手札にカードを一枚追加 //引数は数字コード
        var x =  player1.hand.length - 1;
        var sp = new CardSprite(card,x);
        sp.moveTo(x*(CARD_WID + 5) + 5,ROOM_HGT_1 - CARD_HGT);
        this.addChild(sp);
    },
    deleteCard: function(num){//引数は何番目にあるか、つまりposi2
        var x = 0;
        for(i=1;i<this.childNodes.length;i++){//i=0は色用ラベルなので除外
            if(num==this.childNodes[i].posi2){
                this.removeChild(this.childNodes[i]);
                break;
            }
        }
    },
    leftenCards: function(){//カードを左に寄せる
        console.log(player1.hand);
        console.log(this.childNodes.length);
        for(var i=1;i<this.childNodes.length;i++){
            console.log(this.childNodes[i].posi2);
            this.childNodes[i].posi2 = i-1;
            this.childNodes[i].moveTo((i-1)*(CARD_WID + 5) + 5,ROOM_HGT_1 - CARD_HGT);
        }
    }
});

var MyHandRoomLabel = enchant.Class.create(enchant.Label, {
	initialize: function(){
        enchant.Label.call(this);
        this.name = "myHandRoomLabel"
		this.backgroundColor = "yellow";
		this.width = ROOM_WID_1;
		this.height = ROOM_HGT_1
        this.text = "hand"
        this.font = "14px cursive";
        this.color = "gray";
    }
});
