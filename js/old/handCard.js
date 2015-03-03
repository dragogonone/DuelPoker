//カード一枚一枚のスプライト
var HandCard = enchant.Class.create(enchant.cardSprite, {
    initialize: function(num, _posi2){
         enchant.cardSprite.call(this, CARD_WID, CARD_HGT);
        // this.x = 160;
        // this.y = 160;
        // this.numberCode = num;      //カード番号 詳しくはcardConvert.jsを参照
        // this.image = game.assets[TRUMP_IMG];
        // this.frame = getCardFrame(num);
        // this.posi2 = _posi2;		//何枚目か(0なら一番左、一番下、等)
        // this.isUra = 0;     //裏側表示かどうか
        this.name = "handCard";
    },
    ontouchend:function(){ // touchendイベントのイベントリスナー
        console.log(this.parentNode.name);
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
});
