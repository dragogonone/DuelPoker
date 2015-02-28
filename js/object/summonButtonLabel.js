//召喚ボタンのスプライト
var summonButtonLabel = enchant.Class.create(enchant.Label, {
    initialize: function(){
        enchant.Label.call(this);
        this.width = 120;
        this.height = 24;
        this.x = 480;
        this.y = 400;
        this.backgroundColor = "orange";
        this.text = "SUMMON";
        this.textAlign = "center";
        this.color = "white";
        this.font = "26px 'ＭＳ ゴシック'";
    },
    ontouchend:function(){ // touchendイベントのイベントリスナー
    	console.log(selecting_arr);
    	var count = countArrNotZero(selecting_arr);
    	var arr = makeArrNotZero(selecting_arr);
    	if(count == 0){
    		console.log("カードが選択されていません");
    	}else{
    		player1.summon(arr);
    	}
    }
});