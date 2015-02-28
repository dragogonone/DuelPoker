//自分のフィールドカード置き場のグループと色をつけるためのラベル

var MyFieldRoomGroup = enchant.Class.create(enchant.Group, {
    initialize: function(){
        enchant.Group.call(this);
		this.x = 20;
		this.y = SCENE_HGT - CARD_HGT - 20 - ROOM_HGT_1;
    }
});

var MyFieldRoomLabel = enchant.Class.create(enchant.Label, {
	initialize: function(){
        enchant.Label.call(this);
		this.backgroundColor = "orange";
		this.width = ROOM_WID_1;
		this.height = ROOM_HGT_1;
    }
});