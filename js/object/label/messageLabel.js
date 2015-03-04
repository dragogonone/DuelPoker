//画面中央に出すメッセージのラベル
var messageLabel = enchant.Class.create(enchant.Label, {
    initialize: function(){
        enchant.Label.call(this);
        this.width = ROOM_WID_1;
        this.height = 20;
        this.x = 200;
        this.y = SCENE_HGT / 2 - 10;
        this.backgroundColor = "orange";
        this.text = "";
        this.textAlign = "center";
        this.color = "gray";
        this.backgroundColor = "orange";
        this.font = "26px 'ＭＳ ゴシック'";
    },
    ontouchend:function(){

    }
});
