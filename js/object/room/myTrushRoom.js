//自分の手札置き場のグループと色をつけるためのラベル

var MyTrushRoomGroup = enchant.Class.create(enchant.Group, {
    initialize: function(){
        enchant.Group.call(this);
        this.x = ROOM_WID_1 + 35;
        this.y = SCENE_HGT - CARD_HGT - 30 - ROOM_HGT_1;
        this.name = "myTrushRoom"
    },
    displayCard: function(card){//指定したカードを表示
        var sp = new CardSprite(card, player1.trush.length + 1);
        sp.moveTo(10,10);
        this.addChild(sp);
    }
});

var MyTrushRoomLabel = enchant.Class.create(enchant.Label, {
	initialize: function(){
        enchant.Label.call(this);
        this.backgroundColor = "purple";
        this.width = CARD_WID + 20;
        this.height = CARD_HGT + 20;
        this.text = "trush";
        this.font = "14px cursive";
        this.color = "gray";
    }
});
