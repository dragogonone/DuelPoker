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

	if(cards == "no cards"){
		console.log("召喚:カードが選択されていません");
		return;
	}

	var creature = [];
	var unsortedCreature = [];
	var ln = cards.length;


	for(var i=0;i<ln;i++){
		unsortedCreature[i] = this.hand[cards[i]];
	}

	creature = card_array_sort(unsortedCreature);

	//役判定
	var yaku = judgePokerByCreature(creature);
	console.log("役:" + getYakuName(yaku[0]));

	//召喚判定
	if(canSummon(creature)==0){
		console.log(canSummon(creature));
		console.log("クリーチャーの召喚条件を満たしていません");
		return;
	}


	//召喚成功

	//使用したカードを手札から削除
	for(var i=0;i<ln;i++){
		this.handRoom.deleteCard(unsortedCreature[i]);
	}
	this.handRoom.leftenCards();//カードを詰める

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
		summonedCrts[i] = this.fieldRoom.addGroup(creatures[i]);//フィールドにカードを追加する
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

//ターンの終わりに手札からカードを戻す
Player.prototype.cardback = function() {
	var cards = player1.handRoom.getSelecting();
	console.log();
}
