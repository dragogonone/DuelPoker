//自分のフィールドカード置き場のグループと色をつけるためのラベル

var FieldRoomGroup = enchant.Class.create(enchant.Group, {
    initialize: function(_player){
        enchant.Group.call(this);
        this.player = _player;
        if(_player.player==1){
            this.x = 20;
            this.y = SCENE_HGT - (ROOM_HGT_1 * 2) - 10;
            this.name = "myFieldRoom";
        }else if(_player.player==2){
            this.x = SCENE_WID - ROOM_WID_1 - 20;
            this.y = ROOM_HGT_1 + 10;
            this.name = "eneFieldRoom";
        }
    },
    addGroup: function(cards){
        var x = this.player.field.length - 1;
        var group = new CreatureGroup(this.player, x, cards);
        var y = cards.length;
        for(i=0;i<y;i++){
            var card = new CardSprite(cards[i], i);
            card.moveTo(x*(CARD_WID + 5) + 5, ROOM_HGT_1 - CARD_HGT - ((y-i-1)*15));
            group.addChild(card);
        }
        this.addChild(group);
    },
    deleteGroup: function(num){//引数は何番目にあるか、つまりposi2
        var x = 0;
        for(i=1;i<this.childNodes.length;i++){//i=0は色用ラベルなので除外
            if(num==this.childNodes[i].posi2){
                this.removeChild(this.childNodes[i]);
                break;
            }
        }
    },
    deselect: function(){//カードの選択を解除
        for(i=1;i<this.childNodes.length;i++){
            if(selecting_arr[i-1]==1){
                console.log(this.childNodes[i]);
                this.childNodes[i].y+=10;
            }
        }
        selecting_posi = 0;
        selecting_arr = initArray(7);
    }

});

var FieldRoomLabel = enchant.Class.create(enchant.Label, {
	initialize: function(_name){
        enchant.Label.call(this);
		this.backgroundColor = "orange";
		this.width = ROOM_WID_1;
		this.height = ROOM_HGT_1;
        this.text = "field"
        this.font = "14px cursive";
        this.color = "gray";
        this.name = _name;
    }
});
