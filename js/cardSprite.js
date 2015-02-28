//カード一枚一枚のスプライト
var CardSprite = enchant.Class.create(enchant.Sprite, {
    initialize: function(num, _posi2){
        enchant.Sprite.call(this, CARD_WID, CARD_HGT);
        this.x = 160;
        this.y = 160;
        this.number = num;
        this.image = game.assets[TRUMP_IMG];
        this.frame = getCardFrame(num);
        this.isSelected = 0;		//選択されているか
        this.posi2 = _posi2;		//何枚目か(0なら一番左、一番下、等)
    },
    ontouchend:function(){ // touchendイベントのイベントリスナー
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
            console.log(player1.trap);
        }
        console.log(selecting_arr);
  	}
});
