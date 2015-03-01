//カード一枚一枚のスプライト
var CardSprite = enchant.Class.create(enchant.Sprite, {
    initialize: function(num, _posi2){
        enchant.Sprite.call(this, CARD_WID, CARD_HGT);
        this.x = 160;
        this.y = 160;
        this.numberCode = num;      //カード番号 詳しくはcardConvert.jsを参照
        this.image = game.assets[TRUMP_IMG];
        this.frame = getCardFrame(num);
        this.isSelected = 0;		//選択されているか
        this.posi2 = _posi2;		//何枚目か(0なら一番左、一番下、等)
        this.name = "cardSprite";
    },
    ontouchend:function(){ // touchendイベントのイベントリスナー
        console.log(selecting_arr);
    	if(this.parentNode.name=="myHandRoom"){//手札のカードをクリックしたとき
            if(this.isSelected==0){
                this.y-=10;
                this.isSelected = 1;
                selecting_arr[this.posi2] = 1;
            }else{
                this.y+=10;
                this.isSelected = 0;
                selecting_arr[this.posi2]  = 0;
            }
        }

        //フィールドのカードはクリーチャーグループでまとめて扱っているのでここにクリック処理は記述しない

        if(this.parentNode.name=="myTrapRoom"){//墓地をクリックしたとき
            console.log("トラップカード:" + player1.trap);
        }

        if(this.parentNode.name=="yamahudaRoom"){//山札をクリックしたとき

        }
    },
    getNumber:function(){//カードのマーク抜き数字を返す
        var code = codeToNum(this.numberCode);
        return(code[0]);
    },
    getMark:function(){//カードのマーク番号を返す
        var code = codeToNum(this.numberCode);
        return(code[1]);
    },
    getMarkName:function(){//カードのマークの日本語を返す
        var code = codeToNum(this.numberCode);
        return(code[2]);
    }
});
