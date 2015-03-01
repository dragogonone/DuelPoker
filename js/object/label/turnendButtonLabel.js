//召喚ボタンのスプライト
var turnendButtonLabel = enchant.Class.create(enchant.Label, {
    initialize: function(){
        enchant.Label.call(this);
        this.width = 120;
        this.height = 24;
        this.x = 480;
        this.y = 440;
        this.backgroundColor = "orange";
        this.text = "Turn End";
        this.textAlign = "center";
        this.color = "white";
        this.font = "26px 'ＭＳ ゴシック'";
    },
    ontouchend:function(){ // touchendイベントのイベントリスナー
        myTurnEnd();
    }
});
