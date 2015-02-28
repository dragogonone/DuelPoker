//画面描画系のファイル
//カードのスプライトやグループもここで生成している

//手札を表示
function dispHand(player){
	mai = player.hand.length;
	if(mai==0){return;}
	for(i=0;i<mai;i++){
		if(player.player==1){
			var card = new CardSprite(player.hand[i], 1, i);
			card.moveTo(i*(CARD_WID + 5) + 20, 10);
			myHandRoom.addChild(card);
		}else{
			var card = new CardSprite(55, 11, i);
			card.moveTo( SCENE_WID - (mai-i) *(60 + 5) - 20, 20);
			scene.addChild(card);
		}
		
	}
}

//手札を非表示
function eraseHand(player){
	if(player.player==1){
		for(i=0;i<myHandRoom.childNodes.length;i++){
			myHandRoom.removeChild(myHandRoom.childNodes[i]);//一回全ての手札の要素を消す
		}
	myHandRoomLabel = new MyHandRoomLabel();//手札置き場の色を再生
	myHandRoom.addChild(myHandRoomLabel);
	}
}

//ボタン等のラベルを表示
//手札置き場などのスプライトもここに
//おそらく一ゲームの中で最初の一回だけ呼び出す
function dispLabels() {
	var sum = new summonButtonLabel();//召喚ボタンのラベル
	scene.addChild(sum);
	
	myHandRoom = new MyHandRoomGroup();//自分の手札置き場
	scene.addChild(myHandRoom);
	var myHandRoomLabel = new MyHandRoomLabel();
	myHandRoom.addChild(myHandRoomLabel);
	
}

function addCardField(player, cards){
	if(!player.field){
		var x = 1;
	}else{
		var x = player.field.length + 1;
	}
	var group = new CreatureGroup(player, x, cards);
	console.log("cards:" + cards);
	for(i=0;i<cards.length;i++){
		var card = new CardSprite(cards[i], 2, i);
		card.moveTo(x*(CARD_WID + 5) - 40, SCENE_HGT - CARD_HGT - 200 + (i*15));
		group.addChild(card);
	}
	scene.addChild(group);
}