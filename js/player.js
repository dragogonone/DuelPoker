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
	this.enemyPlayer = 0;	//相手のプレイヤーを入れておく
	this.isSummoned = 0;	//このターン召喚したか
	this.backNum = 0;		//ターンの終わりに戻したカードの枚数

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

	var p = this;
	for(var i=0;i<5;i++){//5枚ドロー
		scene.tl.delay(5).then(function(){
			YamahudaToHandCard(p);
		});
	}
}

//カードドロー
Player.prototype.drawCard = function() {
	YamahudaToHandCard(this);
}

//フィールドにカードを召喚
Player.prototype.summonTry = function(cards) {

	if(cards == "no cards"){
		console.log("召喚:カードが選択されていません");
		return;
	}

	var creature = [];
	var unsortedCreature = [];

	for(var i=0;i<cards.length;i++){
		unsortedCreature[i] = this.hand[cards[i]];
	}

	creature = card_array_sort(unsortedCreature);

	//役判定
	var yaku = judgePokerByCreature(creature);
	console.log("役:" + getYakuName(yaku[0]));

	//召喚判定
	if(canSummonByCreature(creature)==0){
		console.log("クリーチャーの召喚条件を満たしていません");
		return;
	}

	this.summon(unsortedCreature,yaku);
}
Player.prototype.summon = function(unsortedCreature,yaku){

	creature = card_array_sort(unsortedCreature);
	//役判定


	//使用したカードを手札から削除
	for(var i=0;i<unsortedCreature.length;i++){
		this.hand[unsortedCreature[i].posi2] = 0;
	}
	this.leftenCards(this.hand);//カードを詰める

	//役の効果召喚前発動
	var creatures = [];
	creatures[0] = creature//役によって複数のクリーチャーが同時に召喚される可能性もある
	switch(yaku[0]){
		case 1://ツーペア
			creatures = divide_array(creature,yaku[1]);
			break;
		case 2://スリーカード
			break;
		case 3://フラッシュ
			break;
		case 4://ストレート
			break;
		case 5://フルハウス
			creatures = divide_array(creature,yaku[1]);
			break;
		case 6://フォーカード
			break;
		case 7://ストレートフラッシュ
			break;
		case 8://ロイヤルストレートフラッシュ
			break;
		default:
			break;
	}
	var summonedCrts = [];
	for(var i=0;i<creatures.length;i++){

		summonedCrts[i] = this.addFieldCreature(creatures[i]);//フィールドにカードを追加する
		console.log("a");
		console.log(summonedCrts[i].creatureName + "を召喚");
	}
	//役の効果召還後発動
	switch(yaku[0]){
		case 1://ツーペア
			break;
		case 2://スリーカード
			console.log("スリーカード:対象のクリーチャーを一体破壊");
			console.log(nonActivePlayer);
				if(nonActivePlayer.field.length==0){
					console.log("対象がいませんでした");
				}else{
					phase = 4;
					console.log("対象を選択");
					yakuGlobal = 2;
				}
			break;
		case 3://フラッシュ
			summonedCrts[0].isDivineShield = 1;
			console.log("Divive Shield added");
			break;
		case 4://ストレート
			//phase = 4;
			//console.log("サルベージ");
			break;
		case 5://フルハウス
			break;
		case 6://フォーカード
		console.log("フォーカード:対象のクリーチャーのコントロール奪取");
			if(nonActivePlayer.field.length==0){
				console.log("対象がいませんでした");
			}else{
				phase = 4;
				console.log("対象を選択");
				yakuGlobal = 6;
			}
			break;
		case 7://ストレートフラッシュ
			break;
		case 8://ロイヤルストレートフラッシュ
			break;
		default:
			break;
		}
		this.isSummoned = 1;
}

Player.prototype.getSelecting = function(room){
	var arr = [];
	var count = 0;
	for(var i=0;i<room.length;i++){
		if(room[i].isSelected==1){
			arr.push(i)
			count++;
		}
	}
	if(count==0){
		return "no cards";
	}
	return arr;
}

Player.prototype.leftenCards = function(room){
	room = deleteArrZero(room);
	for(var i=0;i<room.length;i++){
		room[i].posi2 = i;
		if(room==this.hand){
			room[i].moveTo(this.handRoom.x + i*(CARD_WID + 5) + 5,this.handRoom.y + ROOM_HGT_1 - CARD_HGT);
		}else if(room==this.field){
			room[i].moveTo(this.fieldRoom.x + i*(CARD_HGT + 5) + 5,this.fieldRoom.y + ROOM_HGT_1 - CARD_HGT);
			if(room[i].isTapped==1){
				room[i].moveTo(room[i].x + CARD_HGT,room[i].y + (CARD_HGT - CARD_WID));
			}
		}
		room[i].isSelected = 0
	}

}


Player.prototype.getUntap = function(){
	var arr = [];
	var count = 0;
	for(var i=0;i<this.field.length;i++){
		if(this.field[i].isTapped==0){
			arr.push(i);
			count++;
		}
	}
	if(count==0){
		return "no cards";
	}
	return arr;
}

Player.prototype.getTap = function(){
	var arr = [];
	var count = 0;
	for(var i=0;i<this.field.length;i++){
		if(this.field[i].isTapped==1){
			arr.push(i);
			count++;
		}
	}
	if(count==0){
		return "no cards";
	}
	return arr;
}

Player.prototype.overCheck = function(room){
	if(this.room.length>7){
		console.log("cardOver");
	}
}

Player.prototype.addHand = function(room,numberCode){
	var posi2 =  room.length;
	var card = new CardSprite(numberCode,posi2,this.player);
	card.moveTo(yamahudaRoom.x - this.x,yamahudaRoom.y - this.y);
	card.tl.moveTo(x*(CARD_WID + 5) + 5,ROOM_HGT_1 - CARD_HGT, CARD_SPEED, enchant.Easing.QUAD_EASEOUT)
	this.addChild(card);
	if(this.player.player==2){//相手のカードは裏返して追加
		card.reverse(0);
	}
	return card;
}

//カードのスプライトを引数にとりそれらをアニメーションしつつフィールドに追加
Player.prototype.addFieldCreature = function(cards){
	var x = this.field.length;
	var group = new CreatureGroup(x, cards,this);
	var y = cards.length;
	var bef_posi =  [];
	for(var i=0;i<y;i++){
		var card = cards
		group.addChild(cards[i]);
		bef_posi[i] = {};
		bef_posi[i].x = cards[i].x;
		bef_posi[i].y = cards[i].y;
	}
	group.moveTo(5 + x*(CARD_HGT + 5) + this.fieldRoom.x,this.fieldRoom.y + ROOM_HGT_1 - CARD_HGT)
	for(var i=0;i<y;i++){
		cards[i].tl.moveTo(bef_posi[i].x - group.x,bef_posi[i].y - group.y,0);
	}

	for(var i=0;i<y;i++){
		cards[i].tl.moveTo(0, 0,SUMMON_SPEED)
				.moveTo(0, 0 - ((y-i-1)*15),SUMMON_SPEED);
	}
		scene.addChild(group);
		this.field.push(group);
		return group;
}
