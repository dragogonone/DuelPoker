//自分のフィールドカード置き場のグループと色をつけるためのラベル

var YamahudaRoomGroup = enchant.Class.create(enchant.Group, {
    initialize: function(){
        enchant.Group.call(this);
		this.x = 20;
		this.y = 130;
        this.name = "yamahudaRoom"
    }
});

var YamahudaRoomLabel = enchant.Class.create(enchant.Label, {
	initialize: function(){
        enchant.Label.call(this);
		this.backgroundColor = "black";
        this.width = CARD_WID + 20;
        this.height = CARD_HGT + 20;
        this.text = "deck"
        this.font = "14px cursive";
        this.color = "gray";
    }
});
