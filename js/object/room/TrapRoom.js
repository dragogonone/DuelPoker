//自分の手札置き場のグループと色をつけるためのラベル

var TrapRoomGroup = enchant.Class.create(enchant.Group, {
    initialize: function(){
        enchant.Group.call(this);
        this.player = _player;
        if(_player.player==1){
            this.x = 10;
            this.y = SCENE_HGT - ((ROOM_HGT_1+5) * 2);
            this.name = "myTrapRoom";
        }else if(_player.player==2){
            this.x = SCENE_WID - ROOM_WID_1 - 10;
            this.y = (ROOM_HGT_1 + 5) * 3;
            this.name = "eneTrapRoom";
        }
    }
});

var TrapRoomLabel = enchant.Class.create(enchant.Label, {
	initialize: function(){
        enchant.Label.call(this);
		this.backgroundColor = "orange";
		this.width = ROOM_WID_1;
		this.height = ROOM_HGT_1;
        this.text = "trush";
        this.font = "14px cursive";
        this.color = "gray";
        this.name = _name;
    }
});
