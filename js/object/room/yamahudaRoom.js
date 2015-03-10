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
        var aP = activePlayer;
        var fldSlt = aP.fieldRoom.getSelecting();
        if(fldSlt != "no cards"){
            var num = aP.fieldRoom.getSelecting();
            var atCrt = aP.field[num[0]];
            battle = new Battle(atCrt,this);
        }else{
            console.log("残り山札:" + yamahuda.length + "枚");
            console.log(yamahuda);
        }
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
