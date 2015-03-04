//クリーチャーグループのクラス フィールドに出ているユニットごとにインスタンスを生成

var CreatureGroup = enchant.Class.create(enchant.Group, {
    initialize: function(posi2, cards){
        enchant.Group.call(this, posi2, cards);
        this.cards = cards;
        this.posi2 = posi2;		//何枚目か(0なら一番左、一番下、等)
        this.isTapped = 0;          //タップされているか
        //this.originX = CARD_WID / 2;
        //this.originY = CARD_HGT / 2 + 15 * (cards.length - 1);
        this.name = "creatureGroup";
        this.isSelected = 0;
    },
    ontouchend:function(){ // touchendイベントのイベントリスナー
        if(this.parentNode.name=="myFieldRoom"){//自分のカード
            if(this.isTapped == 1){
                console.log("タップされています");
                return;
            }
            var hndSlt = this.parentNode.player.handRoom.getSelecting();
            var fldSlt = this.parentNode.player.fieldRoom.getSelecting();
            var x = this.isSelected;
            if(hndSlt != "no cards"){
                this.parentNode.player.handRoom.deselect();
            }else if(fldSlt != "no cards"){
                this.parentNode.player.fieldRoom.deselect();
            }

    	    if(x==0){
    		    this.y-=10;
    		    this.isSelected = 1;
    	    }
       }else if(this.parentNode.name=="eneFieldRoom"){//相手のカード
           console.log(this.getPower());
           var fldSlt = activePlayer.fieldRoom.getSelecting();
           console.log(fldSlt);
           if(fldSlt != "no cards"){//攻撃開始
               if(this.isTapped==0){
                   console.log("アンタップ状態のクリーチャーには攻撃できない");
                   return;
               }
               var aP = activePlayer;
               var num = aP.fieldRoom.getSelecting();
               var atCrt = aP.field[num[0]];
               attack(atCrt,this);
           }
       }
    },
    getPower: function(){//パワーを返す
        var x = 0;
        for(var i=0;i<this.cards.length;i++){
            if(this.cards[i].getNumber() == 1){
                x += 20;
            }else{
                x += this.cards[i].getNumber();
            }
        }
        return x;
    },
    getBreakPower: function(){//ブレイク枚数を返す　通常は重ねてあるカードの枚数
        return this.cards.length;
    },
    tap: function(){
        if(this.isTapped==1){
            return;
        }
        this.isTapped = 1;
        this.rotation = 90;
        this.moveTo(this.x + CARD_HGT,this.y + (CARD_HGT - CARD_WID));
        for(var i=0;i<this.cards.length - 1;i++){
            this.cards[i].x = this.cards[i].y / 1.8;
            this.cards[i].y = 0;
        }
    },
    untap: function(){
        if(this.isTapped==0){
            return;
        }
        this.isTapped = 0;
        this.rotation = 0;
        this.moveTo(this.x - CARD_HGT,this.y - (CARD_HGT - CARD_WID));
        for(var i=0;i<this.cards.length - 1;i++){
            this.cards[i].y = this.cards[i].x * 1.8;
            this.cards[i].x = 0;
        }
    }
});
