//クリーチャーグループのクラス フィールドに出ているユニットごとにインスタンスを生成

var CreatureGroup = enchant.Class.create(enchant.Group, {
    initialize: function(player, posi2, cards){
        enchant.Group.call(this, player, posi2, cards);
        this.player = player;
        this.cards = cards;
        this.posi2 = posi2;		//何枚目か(0なら一番左、一番下、等)
        this.isSelected = 0;		//選択されているか
        this.isTapped = 0;          //タップされているか
        this.name = "creatureGroup";
    },
    ontouchend:function(){ // touchendイベントのイベントリスナー
    	if(this.isSelected==0){
            myTrushRoom.displayCard(this.cards[0]);//test
    		this.y-=10;
    		this.isSelected = 1;
    		selecting_arr[this.posi2] = 1;
    	}else{
    		this.y+=10;
    		this.isSelected = 0;
    		selecting_arr[this.posi2]  = 0;
    	}
    },
    getPower: function(){//パワーを返す
        var x = 0;
        for(var i=0;i<this.cards.length;i++){
            if(this.cards[i] == 1){
                x += 20;
            }else{
                x += this.cards[i];
            }
        }
        return x;
    }
});
