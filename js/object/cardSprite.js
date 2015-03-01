//カード一枚一枚のスプライト
var CardSprite = enchant.Class.create(enchant.Sprite, {
    initialize: function(num, _posi2){
        enchant.Sprite.call(this, CARD_WID, CARD_HGT);
        this.x = 160;
        this.y = 160;
        this.numberCode = num;      //カード番号 詳しくはcardConvert.jsを参照
        this.image = game.assets[TRUMP_IMG];
        this.frame = getCardFrame(num);
        this.posi2 = _posi2;		//何枚目か(0なら一番左、一番下、等)
        this.name = "cardSprite";
        this.isUra = 0;     //裏側表示かどうか
    },
    ontouchend:function(){ // touchendイベントのイベントリスナー
        console.log(this.parentNode.name);
    	if(this.parentNode.name=="myHandRoom"){//手札のカードをクリックしたとき
            if(selecting_posi == 2){
                myFieldRoom.deselect();
            }
            if(selecting_arr[this.posi2]==0){
                this.y-=10;
                selecting_arr[this.posi2] = 1;
                selecting_posi = 1;
            }else{
                this.y+=10;
                selecting_arr[this.posi2]  = 0;
            }
            console.log(selecting_arr);
        }

        //フィールドのカードはクリーチャーグループでまとめて扱っているのでここにクリック処理は記述しない

        if(this.parentNode.name=="myTrushRoom"){//墓地をクリックしたとき
            console.log("墓地カード:" + player1.trush);
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
    },
    reverse:function(){//表裏を反転する
        if(this.isUra==0){//もともと表だった場合
            this.frame = 54;
            this.isUra = 1;
        }else{
            this.frame = getCardFrame(num);
            this.isUra = 0;
        }

    }
});
