//自分のフィールドカード置き場のグループと色をつけるためのラベル

var MyFieldRoomGroup = enchant.Class.create(enchant.Group, {
    initialize: function(){
        enchant.Group.call(this);
		this.x = 20;
		this.y = SCENE_HGT - CARD_HGT - 30 - ROOM_HGT_1;
        this.name = "myFieldRoom"
    },
    addCard: function(cards){
        if(!player1.field){
            var x = 0;
        }else{
            var x = player1.field.length;
        }
        console.log(cards);
        var group = new CreatureGroup(player1, x, cards);
        var y = cards.length;
        for(i=0;i<y;i++){
            var card = new CardSprite(cards[i], i);
            card.moveTo(x*(CARD_WID + 5) - 60, ROOM_HGT_1 - CARD_HGT - ((y-i-1)*15));
            group.addChild(card);
        }
        this.addChild(group);
    }
});

var MyFieldRoomLabel = enchant.Class.create(enchant.Label, {
	initialize: function(){
        enchant.Label.call(this);
		this.backgroundColor = "orange";
		this.width = ROOM_WID_1;
		this.height = ROOM_HGT_1;
        this.text = "field"
        this.font = "14px cursive";
        this.color = "gray";
    }
});
