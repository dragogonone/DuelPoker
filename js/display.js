//画面描画系のファイル
//カードのスプライトやグループもここで生成している

//ボタン等のラベルを表示
//手札置き場などのスプライトもここに
//おそらく一ゲームの中で最初の一回だけ呼び出す
function dispLabels() {

	var lbl = new summonButtonLabel();//召喚ボタンのラベル
	scene.addChild(lbl);

	var lbl = new turnendButtonLabel();//ターンエンドボタンのラベル
	scene.addChild(lbl);


	yamahudaRoom = new YamahudaRoomGroup();//自分の手札置き場
	scene.addChild(yamahudaRoom);
	var yamahudaRoomLabel = new YamahudaRoomLabel();
	yamahudaRoom.addChild(yamahudaRoomLabel);
	var sp = new CardSprite(55,0);
	sp.moveTo(10,10);
	yamahudaRoom.addChild(sp);

	myHandRoom = new MyHandRoomGroup();//自分の手札置き場
	scene.addChild(myHandRoom);
	var myHandRoomLabel = new MyHandRoomLabel();
	myHandRoom.addChild(myHandRoomLabel);

	myFieldRoom = new MyFieldRoomGroup();//自分の手札置き場
	scene.addChild(myFieldRoom);
	var myFieldRoomLabel = new MyFieldRoomLabel();
	myFieldRoom.addChild(myFieldRoomLabel);

	myTrapRoom = new MyTrapRoomGroup();//自分の墓地
	scene.addChild(myTrapRoom);
	var myTrapRoomLabel = new MyTrapRoomLabel();
	myTrapRoom.addChild(myTrapRoomLabel);

}


//0から手札を表示
function dispHand(player){
	mai = player.hand.length;
	if(mai==0){return;}
	for(i=0;i<mai;i++){
		if(player.player==1){
			var card = new CardSprite(player.hand[i], i);
			card.moveTo(i*(CARD_WID + 5) + 5, ROOM_HGT_1 - CARD_HGT);
			myHandRoom.addChild(card);
		}else{
			var card = new CardSprite(55, i);
			card.moveTo( SCENE_WID - (mai-i) *(60 + 5) - 20, 0);
			scene.addChild(card);
		}

	}
}

//全手札を非表示
function eraseHand(player){
	if(player.player==1){
		for(i=0;i<myHandRoom.childNodes.length;i++){
			myHandRoom.removeChild(myHandRoom.childNodes[i]);//一回全ての手札の要素を消す
		}
		myHandRoomLabel = new MyHandRoomLabel();//手札置き場の色を再生
		myHandRoom.addChild(myHandRoomLabel);
	}
}

function addCardHand(player, card){//手札にカードを一枚追加する描写
	var x =  player.hand.length - 1;
	var sp = new CardSprite(card,x);
	sp.moveTo(x*(CARD_WID + 5) + 5,ROOM_HGT_1 - CARD_HGT);
	if(player.player==1){
		myHandRoom.addChild(sp);
	}
}




function addCardField(player, cards){//フィールドにカードグループを追加
	if(!player.field){
		var x = 0;
	}else{
		var x = player.field.length;
	}
	console.log(cards);
	var group = new CreatureGroup(player, x, cards);
	if(player.player==1){
		var y = cards.length;
		for(i=0;i<y;i++){
			var card = new CardSprite(cards[i], i);
			card.moveTo(x*(CARD_WID + 5) - 60, ROOM_HGT_1 - CARD_HGT - ((y-i-1)*15));
			group.addChild(card);
		}
		myFieldRoom.addChild(group);
	}
}

function addCardTrush(player, card){//墓地にカードを追加 一番上のカードのみ表示すればよい
	var sp = new CardSprite(card, player.trush.length + 1);
	sp.moveTo(10,10);
	if(player.player==1){
		myTrapRoom.addChild(sp);
	}
}
