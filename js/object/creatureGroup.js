//クリーチャーグループのクラス フィールドに出ているユニットごとにインスタンスを生成

var CreatureGroup = enchant.Class.create(enchant.Group, {
    initialize: function(player, posi2, cards){
        enchant.Group.call(this, player, posi2, cards);
        this.player = player;
        this.cards = cards;
        this.posi2 = posi2;		//何枚目か(0なら一番左、一番下、等)
        this.isTapped = 0;          //タップされているか
        this.name = "creatureGroup";
    },
    ontouchend:function(){ // touchendイベントのイベントリスナー
        if(this.parentNode.name=="myFieldRoom"){//自分のカード
            var x = selecting_arr[this.posi2];
            if(selecting_posi == 1){
                myHandRoom.deselect();
                x = 0;
            }else if(selecting_posi == 2){
                myFieldRoom.deselect();
            }

    	    if(x==0){
    		    this.y-=10;
    		    selecting_arr[this.posi2] = 1;
                selecting_posi = 2;
    	    }
       }else{//相手のカード

       }
       console.log(selecting_arr);
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
