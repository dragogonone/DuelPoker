//カード一枚一枚のスプライト
var CardSprite = enchant.Class.create(enchant.Sprite, {
    initialize: function(num, _posi1, _posi2){
        enchant.Sprite.call(this, CARD_WID, CARD_HGT);
        this.x = 160;
        this.y = 160;
        this.number = num;
        this.image = game.assets[TRUMP_IMG];
        this.frame = getCardFrame(num);
        this.isSelected = 0;		//選択されているか
        this.posi1 = _posi1;		//どこにあるか（0:山札 1:手札 2:フィールド 3:墓地 4:罠 の予定 相手の場合は10を足す)
        this.posi2 = _posi2;		//何枚目か(0なら一番左、一番下、等)
    },
    ontouchend:function(){ // touchendイベントのイベントリスナー
    	if(this.posi1==2){//フィールドにいるときはクリーチャーグループが優先
    		return;
    	}
    	if(this.posi1>=10){//相手のカードには反応しない
    		return;
    	}
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
});
