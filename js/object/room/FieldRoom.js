//自分のフィールドカード置き場のグループと色をつけるためのラベル

var FieldRoomGroup = enchant.Class.create(enchant.Group, {
    initialize: function(_player){
        enchant.Group.call(this);
        this.player = _player;
        this.room = "field";
        if(_player.player==1){
            this.x = (SCENE_WID - ROOM_WID_1) / 2;
            this.y = SCENE_HGT / 2 + 10;
            this.name = "myFieldRoom";
        }else if(_player.player==2){
            this.x = (SCENE_WID - ROOM_WID_1) / 2;
            this.y = SCENE_HGT / 2 - ROOM_HGT_1 - 10;
            this.name = "eneFieldRoom";
        }
    },
    addGroup: function(cards){
        var x = this.player.field.length;
        var group = new CreatureGroup(x, cards,this.player);
        var y = cards.length;
        for(var i=0;i<y;i++){
            var card = cards
            cards[i].moveTo(0, 0 - ((y-i-1)*15));
            group.addChild(cards[i]);
        }
        group.moveTo(5 + x*(CARD_HGT + 5),ROOM_HGT_1 - CARD_HGT);
        this.addChild(group);
        this.player.field.push(group);
        return group;
    },
    deleteGroup: function(creature){//引数はクリーチャーグループのスプライト もうこの関数自体いらないんじゃないかな
        if(creature.isDivineShield==1){
            console.log(creature.creatureName + "のバリアが解けた！");
            creature.isDiveShield = 0;
            return;
        }
        this.player.field[creature.posi2] = 0;
        this.removeChild(creature);
        this.leftenCards();
    },
    leftenCards: function(){//カードを左に寄せる
        var field = this.player.field;
        field = deleteArrZero(field);
        for(var i=0;i<field.length;i++){
            field[i].posi2 = i;
            field[i].moveTo(i*(CARD_HGT + 5) + 5,field[i].y);
            if(field[i].isTapped==1){
                field[i].moveTo(field[i].x + CARD_HGT,field[i].y);
            }
            field[i].isSelected = 0;
        }
    },
    deselect: function(){//カードの選択を解除
        var arr = this.getSelecting();
        if(arr=="no cards"){
            return;
        }
        for(i=0;i<arr.length;i++){
            this.player.field[arr[i]].y+=10;
            this.player.field[arr[i]].isSelected = 0;
        }
    },
    getSelecting: function(){//選択中のカードグループの配列を返す
        var arr = [];
        var count = 0;
        for(var i=0;i<this.player.field.length;i++){
            if(this.player.field[i].isSelected==1){
                arr.push(i);
                count++;
            }
        }
        if(count==0){
            return "no cards";
        }
        return arr;
    },
    getUntap: function(){//アンタップ状態にあるカードグループの配列を返す
        var arr = [];
        var count = 0;
        for(var i=0;i<this.player.field.length;i++){
            if(this.player.field[i].isTapped==0){
                arr.push(i);
                count++;
            }
        }
        if(count==0){
            return "no cards";
        }
        return arr;
    }

});

//相当強引な方法で当たり判定を実現
var FieldRoomColor = enchant.Class.create(enchant.Label, {
	initialize: function(_name){
        enchant.Label.call(this);
		this.backgroundColor = "lawngreen";
		this.width = ROOM_WID_1;
		this.height = ROOM_HGT_1;
        this.text = "               "//
        this.font = ROOM_HGT_1 + "px cursive";
        this.color = this.backgroundColor;
        this.name = _name;
    },
    ontouchend: function(){
        console.log(this.parentNode.player.field);
        if(this.parentNode.player==activePlayer && phase==1){
            var cards = player1.handRoom.getSelecting();
            player1.summon(cards);
        }
    }
});


//Fieldroom全体にクリック判定をつけさせることに難航中
var FieldRoomLabel = enchant.Class.create(enchant.Label, {
    initialize: function(_name){
        enchant.Label.call(this);
        this.backgroundColor = "lawngreen";
        this.width = ROOM_WID_1;
        this.height = ROOM_HGT_1;
        this.text = "field"
        this.font = "14px cursive";
        this.color = "gray";
        this.name = _name;
    },
    ontouchend: function(){
        console.log(this.name);
    }
});
