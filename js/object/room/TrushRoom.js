//自分の手札置き場のグループと色をつけるためのラベル

var TrushRoomGroup = enchant.Class.create(enchant.Group, {
    initialize: function(_player){
        enchant.Group.call(this);
        this.player = _player;
        if(_player.player==1){
            this.x = ROOM_WID_1 + 30;
            this.y = SCENE_HGT - (ROOM_HGT_1 * 2) - 10;
            this.name = "myTrushRoom";
        }else if(_player.player==2){
            this.x = SCENE_WID - ROOM_WID_1 - 30 - ROOM_WID_2;
            this.y = this.y = ROOM_HGT_1 + 10;
            this.name = "eneTrushRoom";
        }
    },
    displayCard: function(card){//指定したカードを表示
        var sp = new CardSprite(card, player1.trush.length + 1);
        sp.moveTo(10,10);
        this.addChild(sp);
    },
    addCard: function(){//指定したカードを墓地配列に追加
        this.player.trush.push(card);
    }
});

var TrushRoomLabel = enchant.Class.create(enchant.Label, {
	initialize: function(_name){
        enchant.Label.call(this);
        this.backgroundColor = "purple";
        this.width = ROOM_WID_2;
        this.height = ROOM_HGT_1;
        this.text = "trush";
        this.font = "14px cursive";
        this.color = "gray";
        this.name = _name;
    }
});
