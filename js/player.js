//プレイヤーのカード疑似クラス
//room間のカードの移動なんかもここに

function Player(_player,isMan) {
	this.player = _player;	//どっちプレイヤーなのか int
	this.hand = [];			//手札のカード配列	cardSprite型
	this.field = [];		//フィールドのカード配列 creatureGroup型
	this.trush = [];		//墓地のカード配列 cardSprite型
	this.trap = [];
	this.overCard = 0;		//最終ターンでの超過ダメージ
	this.isMan = isMan;			//人間か

	this.handRoom = undefined; //roomをプレイヤーの所有物とする
	this.fieldRoom = undefined;
	this.trushRoom = undefined;
	this.trupRoom = undefined;
}

//初期化
Player.prototype.initCards = function(){
	this.hand = [];
	this.field = [];
	this.trush = [];
	this.trap = [];
	for(var i=0;i<5;i++){//5枚ドロー
		var cardNum = popYamahuda();
		var card = this.handRoom.addCard(cardNum);
		this.hand[i] = card;
	}
}

//カードドロー
Player.prototype.drawCard = function() {
	var x = popYamahuda();
	var card = this.handRoom.addCard(x);
	this.hand.push(card);
}

//フィールドにカードを召喚
Player.prototype.summon = function(cards) {

	var creature = [];
	var ln = cards.length;

	//使用したカードを手札から削除
	for(var i=0;i<ln;i++){
		creature[i] = this.hand[cards[i]];
		this.hand[cards[i]] = 0;
	}

	this.fieldRoom.addGroup(creature);//フィールドにカードを追加する

	this.handRoom.leftenCards();//カードを詰める
}

//ターンの終わりに手札からカードを戻す
Player.prototype.cardback = function() {
	var cards = player1.handRoom.getSelecting();
	console.log();
}
