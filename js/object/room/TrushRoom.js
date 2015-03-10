//自分の手札置き場のグループと色をつけるためのラベル

var TrushRoomGroup = enchant.Class.create(enchant.Group, {
    initialize: function(_player){
        enchant.Group.call(this);
        this.player = _player;
        this.room = "trush";
        if(_player.player==1){
            this.x = (SCENE_WID + ROOM_WID_1) / 2 + 5;
            this.y = SCENE_HGT / 2 + 10;
            this.name = "myTrushRoom";
        }else if(_player.player==2){
            this.x = (SCENE_WID + ROOM_WID_1) / 2 + 5;
            this.y = SCENE_HGT / 2 - ROOM_HGT_1 - 10;
            this.name = "eneTrushRoom";
        }
    },
    ontouchend: function(){
        console.log("墓地カード:" + this.player.trush.length + "枚");
        console.log(this.player.trush);
        console.log(this.parentNode.childNodes);
    },
    addCard: function(card){//指定したカードを墓地に生成し表示 引数は数字コード
        var x =  this.player.trush.length;
        var sp = new CardSprite(card,x);
        sp.moveTo(10,10);
        this.addChild(sp);
        this.player.trush.push(card);
        return sp;
    }
});

var TrushRoomColor = enchant.Class.create(enchant.Label, {
    initialize: function(_name){
        enchant.Label.call(this);
        this.backgroundColor = "purple";
        this.width = ROOM_WID_2;
        this.height = ROOM_HGT_1;
        this.text = "     "//
        this.font = ROOM_HGT_1 + "px cursive";
        this.color = this.backgroundColor;
        this.name = _name;
    },
    ontouchend: function(){
        console.log(this.name);
    }
});


var TrushRoomLabel = enchant.Class.create(enchant.Label, {
    initialize: function(_name){
        enchant.Label.call(this);
        this.backgroundColor = "purple";
        this.width = ROOM_WID_2;
        this.height = ROOM_HGT_1;
        this.text = "trush"
        this.font = "14px cursive";
        this.color = "gray";
        this.name = _name;
    },
    ontouchend: function(){
        console.log(this.name);
    }
});
