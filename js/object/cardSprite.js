//カード一枚一枚のスプライト
var CardSprite = enchant.Class.create(enchant.Sprite, {
    initialize: function(num, _posi2,_player){
        enchant.Sprite.call(this, CARD_WID, CARD_HGT);
        this.numberCode = num;      //カード番号 詳しくはcardConvert.jsを参照
        //this.className = "cardSprite";  //cssのカードスプライト
        this.player = _player;
        this.image = game.assets[TRUMP_IMG];
        this.frame = getCardFrame(num);
        this.posi2 = _posi2;		//何枚目か(0なら一番左、一番下、等)
        this.name = "cardSprite";
        this.isUra = 0;     //裏側表示かどうか
        this.isSelected = 0;//選択されているか
    },
    ontouchend:function(){ // touchendイベントのイベントリスナー
        if(this.numberCode==55){//山札
            var aP = activePlayer;
            var fldSlt = aP.getSelecting(aP.field);
            if(fldSlt != "no cards"){
                var num = aP.getSelecting(aP.field);
                var atCrt = aP.field[num[0]];
                battle = new Battle(atCrt,yamahudaRoom);
            }else{
                console.log("残り山札:" + yamahuda.length + "枚");
                console.log(yamahuda);
            }
            return;
        }
        if(this.player.trush[this.posi2]==this){
            console.log("墓地カード:" + this.player.trush.length + "枚");
            console.log(this.player.trush);
        }
    	if(this.player.hand[this.posi2]==this){//手札のカードをクリックしたとき
            var fldSlt = this.player.getSelecting(this.player.field);
            if(fldSlt != "no cards"){//既にフィールドのカードを選択していた場合
                this.player.leftenCards(this.player.field);
            }
            if(this.isSelected==0){
                this.y-=10;
                this.isSelected = 1;
            }else{
                this.y+=10;
                this.isSelected = 0;
            }

            console.log("select:" + this.player.getSelecting(this.player.hand));

        }
    },
    getNumber:function(){//カードのマーク抜き数字を返す
        var num = codeToNum(this.numberCode);
        return(num);
    },
    getMark:function(){//カードのマーク番号を返す
        var mark = codeToMark(this.numberCode);
        return(mark);
    },
    getMarkName:function(){//カードのマークの日本語を返す
        var markName = getMarkName(this.getMark);
        return(markName);
    },
    reverse:function(effect){//表裏を反転する
        if(this.isUra==0){//もともと表だった場合
            var new_frame = 54;
            this.isUra = 1;
        }else{
            var new_frame = getCardFrame(this.numberCode);
            this.isUra = 0;
        }
        if(effect==1){
        this.tl.scaleTo(0, 1, REVERSE_SPEED, enchant.Easing.QUAD_EASEIN)
            .then(function(){this.frame = new_frame;})
            .scaleTo(1, 1, REVERSE_SPEED, enchant.Easing.QUAD_EASEOUT);
        }else{
            this.frame = new_frame;
        }
        return this.frame;
    }
});
