//自分のフィールドカード置き場のグループと色をつけるためのラベル

var FieldRoomGroup = enchant.Class.create(enchant.Group, {
    initialize: function(_player){
        enchant.Group.call(this);
        this.player = _player;
        if(_player.player==1){
            this.x = 20;
            this.y = SCENE_HGT - (ROOM_HGT_1 * 2) - 10;
            this.name = "myFieldRoom";
        }else if(_player.player==2){
            this.x = SCENE_WID - ROOM_WID_1 - 20;
            this.y = ROOM_HGT_1 + 10;
            this.name = "eneFieldRoom";
        }
    },
    addGroup: function(cards){
        var x = this.player.field.length;
        var group = new CreatureGroup(x, cards);
        var y = cards.length;
        for(i=0;i<y;i++){
            cards[i].moveTo(0, 0 - ((y-i-1)*15));
            group.addChild(cards[i]);
        }
        group.moveTo(5 + x*(CARD_HGT + 5),ROOM_HGT_1 - CARD_HGT);
        this.addChild(group);
        this.player.field.push(group);
    },
    deleteGroup: function(num){//引数は何番目にあるか、つまりposi2
        var x = 0;
        for(i=1;i<this.childNodes.length;i++){//i=0は色用ラベルなので除外
            if(num==this.childNodes[i].posi2){
                this.removeChild(this.childNodes[i]);
                break;
            }
        }
    },
    deselect: function(){//カードの選択を解除
        var arr = this.getSelecting();
        console.log(arr);
        for(i=0;i<arr.length;i++){
            this.player.field[arr[i]].y+=10;
            this.player.field[arr[i]].isSelected = 0;
        }
        selecting_posi = 0;
    },
    getSelecting: function(){//選択中のカードグループの配列を返す
        var arr = [];
        console.log(this.player.field[0]);
        for(var i=0;i<this.player.field.length;i++){
            if(this.player.field[i].isSelected==1){
                arr.push(i);
            }
        }
        return arr;
    }


});

var FieldRoomLabel = enchant.Class.create(enchant.Label, {
	initialize: function(_name){
        enchant.Label.call(this);
		this.backgroundColor = "orange";
		this.width = ROOM_WID_1;
		this.height = ROOM_HGT_1;
        this.text = "field"
        this.font = "14px cursive";
        this.color = "gray";
        this.name = _name;
    }
});
