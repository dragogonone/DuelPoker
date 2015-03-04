//自分の手札置き場のグループと色をつけるためのラベル

var HandRoomGroup = enchant.Class.create(enchant.Group, {
    initialize: function(_player){
        enchant.Group.call(this);
        this.player = _player;
        if(_player.player==1){
		    this.x = 10;
		    this.y = SCENE_HGT - ROOM_HGT_1;
            this.name = "myHandRoom";
        }else if(_player.player==2){
            this.x = SCENE_WID - ROOM_WID_1 - 10;
            this.y = 0;
            this.name = "eneHandRoom";
        }
    },
    addCard: function(card){//手札にカードを一枚追加 //引数は数字コード
        var x =  this.player.hand.length;
        var sp = new CardSprite(card,x);
        sp.moveTo(x*(CARD_WID + 5) + 5,ROOM_HGT_1 - CARD_HGT);
        this.addChild(sp);
        if(this.player.player==2){//相手のカードは裏返して追加
            //sp.reverse(); //開発中は切る
        }
        return sp;
    },
    deleteCard: function(card){//引数はカードのスプライト
        this.player.hand[card.posi2] = 0;
        this.removeChild(card);
    },
    leftenCards: function(){//カードを左下に寄せる
        this.player.hand = deleteArrZero(this.player.hand);
        for(var i=0;i<this.player.hand.length;i++){
            this.player.hand[i].posi2 = i;
            this.player.hand[i].moveTo(i*(CARD_WID + 5) + 5,ROOM_HGT_1 - CARD_HGT);
            this.player.hand[i].isSelected = 0;
        }
    },
    deselect: function(){//カードの選択を解除
        for(var i=0;i<this.player.hand.length;i++){
            this.player.hand[i].moveTo(i*(CARD_WID + 5) + 5,ROOM_HGT_1 - CARD_HGT);
            this.player.hand[i].isSelected = 0;
        }
        selecting_posi = 0;
    },
    getSelecting: function(){//選択中のカードの配列を返す
        var arr = [];
        var count = 0;
        for(var i=0;i<this.player.hand.length;i++){
            if(this.player.hand[i].isSelected==1){
                arr.push(i)
                count++;
            }
        }
        if(count==0){
            return "no cards";
        }
        return arr;
    },
    overCheck: function(){//7枚だったらどれか一枚を捨てる

    }
});

var HandRoomColor = enchant.Class.create(enchant.Label, {
    initialize: function(_name){
        enchant.Label.call(this);
        this.backgroundColor = "yellow";
        this.width = ROOM_WID_1;
        this.height = ROOM_HGT_1;
        this.text = "               "//
        this.font = ROOM_HGT_1 + "px cursive";
        this.color = this.backgroundColor;
        this.name = _name;
    },
    ontouchend: function(){
        console.log(this.parentNode.player.hand);
    }
});


var HandRoomLabel = enchant.Class.create(enchant.Label, {
    initialize: function(_name){
        enchant.Label.call(this);
        this.backgroundColor = "yellow";
        this.width = ROOM_WID_1;
        this.height = ROOM_HGT_1;
        this.text = "hand"
        this.font = "14px cursive";
        this.color = "gray";
        this.name = _name;
    },
    ontouchend: function(){
        console.log(this.name);
    }
});
