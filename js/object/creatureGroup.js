//クリーチャーグループのクラス フィールドに出ているユニットごとにインスタンスを生成

var CreatureGroup = enchant.Class.create(enchant.Group, {
    initialize: function(posi2, cards,_player){
        enchant.Group.call(this);
        this.cards = cards;
        this.posi2 = posi2;		//何枚目か(0なら一番左、一番下、等)
        this.player = _player;
        this.isTapped = 0;          //タップされているか
        this.name = "creatureGroup";
        this.isSelected = 0;
        this.isDivineShield = 0;
        this.isSummoningSickness = 1;
        var codes = [];
        for(var i=0;i<cards.length;i++){
            codes[i] = cards[i].numberCode;
        }
        this.creatureName = createName(codes);

    },
    ontouchend:function(){ // touchendイベントのイベントリスナー
        if(player1.field[this.posi2]==this){//自分のカード
            console.log(this.isSelected);
            if(phase==1 || phase==3){
                console.log(this.x);
        		console.log(this.y);
        		console.log(this.cards[0].x);
        		console.log(this.cards[0].y);
            console.log(this.creatureName + " パワー:" + this.getPower());
            if(this.isTapped == 1){
                console.log("タップされています");
                return;
            }
            var hndSlt = this.player.getSelecting(this.player.hand);
            var fldSlt = this.player.getSelecting(this.player.field);
            var x = this.isSelected;
            if(hndSlt != "no cards"){
                this.player.leftenCards(this.player.hand);
            }else if(fldSlt != "no cards"){
                this.player.leftenCards(this.player.field);
            }
    	    if(x==0){
    		    this.y-=10;
    		    this.isSelected = 1;
    	    }
            }
       }else if(player2.field[this.posi2]==this){//相手のカード
           if(phase==4){
               console.log("攻撃後の処理");
               switch(yakuGlobal){
                   case 2:
                       fieldToTrushCard(this);
                       break;
                   case 6:
                       fieldToEnemyField(this);
                        break;
                    default:
                        console.log("攻撃後の処理でエラーっぽいことになっています");
                        break;
               }
               phase=1;
           }else if(phase==1){
               console.log(this.creatureName + this.getPower());
               var aP = activePlayer;
               var fldSlt = aP.getSelecting(aP.field);
               if(fldSlt != "no cards"){//攻撃開始
                   if(this.isTapped==0){
                       console.log("アンタップ状態のクリーチャーには攻撃できない");
                       return;
                   }
                   var num = aP.getSelecting(aP.field);
                   var atCrt = aP.field[num[0]];
                   battle = new Battle(atCrt,this);
               }
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
        this.tl.tween({
            x: this.x + CARD_HGT,
            y: this.y + (CARD_HGT - CARD_WID),
            rotation: 90,
            time: 5});
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
        this.tl.tween({
            x: this.x - CARD_HGT,
            y: this.y - (CARD_HGT - CARD_WID),
            rotation: 0,
            time: 5});
        for(var i=0;i<this.cards.length - 1;i++){
            this.cards[i].y = this.cards[i].x * 1.8;
            this.cards[i].x = 0;
        }
    }
});
