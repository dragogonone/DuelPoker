//召喚ボタンのスプライト
var turnendButtonLabel = enchant.Class.create(enchant.Label, {
    initialize: function(){
        enchant.Label.call(this);
        this.width = 120;
        this.height = 30;
        this.x = (SCENE_WID + ROOM_WID_1) / 2 + 5;
        this.y = SCENE_HGT - ROOM_HGT_1 + 60;
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
