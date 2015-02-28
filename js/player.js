//プレイヤーのカード疑似クラス

function Player(_player) {
	this.player = _player;	//どっちプレイヤーなのか
	this.hand = [];
	this.field = [];
	this.trush = [];
	this.trap = [];
}

//初期化
Player.prototype.initCards = function(){
	this.hand = [];
	this.field = [];
	this.trush = [];
	this.trap = [];
	for(i=0;i<5;i++){
		this.hand[i] = popYamahuda();
	}
}

//カードドロー
Player.prototype.drawCard = function() {
	this.hand.push(popYamahuda());
}

//フィールドにカードを召喚
//引数に手札のカード番号の配列
Player.prototype.summon = function(cards) {
	var creature = [];
	
	//クリーチャーのパワーを決定し使用したカードを手札から削除
	for(i=0;i<cards.length;i++){
		creature[i] = this.hand[cards[i]]; 
		this.hand[cards[i]] = 0;
	}
	
	//手札配列を詰める
	this.hand = deleteArrZero(this.hand);
	console.log("hand:" + this.hand);
	this.field.push(creature);
	
	addCardField(this, creature);//フィールドにカードを追加する
	eraseHand(this);//手札を一回削除する
	dispHand(this);//新たな手札を再描画する
	for(i=0;i<5;i++){//選択中のカード配列を空に
		selecting_arr[i] = 0;
	}
}