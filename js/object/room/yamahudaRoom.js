//自分のフィールドカード置き場のグループと色をつけるためのラベル

var YamahudaRoomGroup = enchant.Class.create(enchant.Group, {
    initialize: function(){
        enchant.Group.call(this);
		this.x = (SCENE_WID - ROOM_WID_1) / 2 - ROOM_WID_2 - 5;
		this.y = (SCENE_HGT -ROOM_HGT_1) / 2;
        this.name = "yamahudaRoom";
        this.room = "yamahuda";
    },
    ontouchend:function(){
    },
    deleteImg: function(){
        this.removeChild(this.childNodes[1]);
    }
});

var YamahudaRoomLabel = enchant.Class.create(enchant.Label, {
	initialize: function(){
        enchant.Label.call(this);
		this.backgroundColor = "black";
        this.width = ROOM_WID_2;
        this.height = ROOM_HGT_1;
        this.text = "deck"
        this.font = "14px cursive";
        this.color = "gray";
    }
});
