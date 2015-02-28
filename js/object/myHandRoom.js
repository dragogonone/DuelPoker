//自分の手札置き場のグループと色をつけるためのラベル

var MyHandRoomGroup = enchant.Class.create(enchant.Group, {
    initialize: function(){
        enchant.Group.call(this);
		this.x = 20;
		this.y = SCENE_HGT - CARD_HGT - 30;
    }
});

var MyHandRoomLabel = enchant.Class.create(enchant.Label, {
	initialize: function(){
        enchant.Label.call(this);
		this.backgroundColor = "yellow";
		this.width = ROOM_WID_1;
		this.height = ROOM_HGT_1;
    }
});