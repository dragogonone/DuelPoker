//召喚ボタンのスプライト
var turnendButtonLabel = enchant.Class.create(enchant.Label, {
    initialize: function(){
        enchant.Label.call(this);
        this.width = 120;
        this.height = 24;
        this.x = 700;
        this.y = 540;
        this.backgroundColor = "orange";
        this.text = "Turn End";
        this.textAlign = "center";
        this.color = "white";
        this.font = "26px 'ＭＳ ゴシック'";
    },
    ontouchend:function(){ // touchendイベントのイベントリスナー
        turnEnd(activePlayer);
    }
});
