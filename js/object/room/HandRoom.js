//自分の手札置き場のグループと色をつけるためのラベル

var HandRoomGroup = enchant.Class.create(enchant.Group, {
    initialize: function(_player){
        enchant.Group.call(this);
        this.player = _player;
        if(_player.player==1){
		    this.x = 20;
		    this.y = SCENE_HGT - ROOM_HGT_1;
            this.name = "myHandRoom";
        }else if(_player.player==2){
            this.x = SCENE_WID - ROOM_WID_1 - 20;
            this.y = 0;
            this.name = "eneHandRoom";
        }
    },
    addCard: function(card){//手札にカードを一枚追加 //引数は数字コード
        var x =  this.player.hand.length - 1;
        var sp = new CardSprite(card,x);
        sp.moveTo(x*(CARD_WID + 5) + 5,ROOM_HGT_1 - CARD_HGT);
        this.addChild(sp);
        return sp;
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
    leftenCards: function(){//カードを左下に寄せる
        console.log(this.player.hand);
        console.log(this.childNodes.length);
        for(var i=1;i<this.childNodes.length;i++){
            console.log(this.childNodes[i].posi2);
            this.childNodes[i].posi2 = i-1;
            this.childNodes[i].moveTo((i-1)*(CARD_WID + 5) + 5,ROOM_HGT_1 - CARD_HGT);
        }
    },
    deselect: function(){//カードの選択を解除
        for(var i=1;i<=this.player.hand.length;i++){
            this.childNodes[i].moveTo((i-1)*(CARD_WID + 5) + 5,ROOM_HGT_1 - CARD_HGT);
        }
        selecting_posi = 0;
        selecting_arr = initArray(7);
    }
});

var HandRoomLabel = enchant.Class.create(enchant.Label, {
	initialize: function(_name){
        enchant.Label.call(this);
        this.name = _name
		this.backgroundColor = "yellow";
		this.width = ROOM_WID_1;
		this.height = ROOM_HGT_1
        this.text = "hand"
        this.font = "14px cursive";
        this.color = "gray";
    }
});
