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
