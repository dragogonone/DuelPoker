//クリーチャーグループのクラス フィールドに出ているユニットごとにインスタンスを生成

var CreatureGroup = enchant.Class.create(enchant.Group, {
    initialize: function(player, posi2, cards){
        enchant.Group.call(this, player, posi2, cards);
        this.player = player;
        this.cards = cards;
        this.posi2 = posi2;		//何枚目か(0なら一番左、一番下、等)
        this.isSelected = 0;		//選択されているか
    },
    ontouchend:function(){ // touchendイベントのイベントリスナー
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