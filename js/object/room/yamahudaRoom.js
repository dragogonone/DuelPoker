//自分のフィールドカード置き場のグループと色をつけるためのラベル

var YamahudaRoomGroup = enchant.Class.create(enchant.Group, {
    initialize: function(){
        enchant.Group.call(this);
		this.x = 10;
		this.y = 120;
        this.name = "yamahudaRoom"
    },
    ontouchend:function(){
        if(selecting_posi!=2){
            console.log("残り山札:" + yamahuda.length + "枚");
        }else{
            attackToYamahuda();
        }
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
