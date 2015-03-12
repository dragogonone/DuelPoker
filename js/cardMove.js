//room間のカードの移動
//とてつもなく冗長な気がするが各roomごとに実装があまりにもちがうのでこれでゴリ押す

//フィールドのカードを墓地へ送る
//引数に死ぬクリーチャーのインスタンス
function fieldToTrushCard(creature){
	var p = creature.player;
	//p.fieldRoom.deleteGroup(creature);
	if(creature.isDivineShield==1){
		console.log(creature.creatureName + "のバリアが解けた！");
		creature.isDiveShield = 0;
		return;
	}

	p.field[creature.posi2] = 0;
	var aft_rm = p.trushRoom;
	var bef_rm = p.fieldRoom;
	for(var i=0;i<creature.cards.length;i++){
		var card = creature.cards[i];
			card.moveTo(creature.x + card.x,creature.y + card.y);
			scene.addChild(card);
			card.tl.delay(i*10)
				.moveTo(aft_rm.x + 10,aft_rm.y + 10,CARD_SPEED, enchant.Easing.QUAD_EASEOUT)
			p.trush.push(card);
	}
	scene.removeChild(creature);
	p.leftenCards(p.field);
}

//心変わり
function fieldToEnemyField(creature){
	var old_p = creature.player;
	var new_p = old_p.enemyPlayer;
	var aft_rm = new_p.fieldRoom;
	var posi2 = new_p.field.length;

	var new_x = 5 + posi2*(CARD_HGT + 5) + aft_rm.x;
	var new_y = aft_rm.y + ROOM_HGT_1 - CARD_HGT
	var new_r = creature.rotation
	console.log(new_r);
	if(creature.isTapped==1){
		new_x = new_x + CARD_HGT;
		new_y = new_y + (CARD_HGT - CARD_WID);
		new_r = new_r;
	}
	creature.tl.tween({
		x:new_x,
		y:new_y,
		rotation: new_r,
		time: CARD_SPEED
	});
	creature.player = new_p;
	new_p.field.push(creature);
	old_p.field[creature.posi2] = 0;
	old_p.leftenCards(old_p.field);
	//new_p.leftenCards(new_p.field);
}

//山札のカードを墓地へ送る
//引数は送られるplayerと枚数
function yamahudaToTrushCard(player,breakNum){
	for(var i=0;i<breakNum;i++){
		if(yamahuda.length>0){
			//cardMove(card,yamahudaRoom,player.trushRoom);
			var bef_rm = yamahudaRoom
			var aft_rm = player.trushRoom;
			var num = popYamahuda();
	        var card = new CardSprite(num,player.trush.length,player);
	        card.moveTo(bef_rm.x + 10,bef_rm.y + 10);
			card.frame = 54;
            card.isUra = 1;
			scene.addChild(card);
			card.tl.delay(i*10)
				.moveTo(aft_rm.x + 10,aft_rm.y + 10,CARD_SPEED, enchant.Easing.QUAD_EASEOUT)
				.scaleTo(0, 1, REVERSE_SPEED * 2, enchant.Easing.QUAD_EASEIN)
				.then(function(){this.reverse(0)})
				.scaleTo(1, 1, REVERSE_SPEED * 2, enchant.Easing.QUAD_EASEIN)
			  	;
	        player.trush.push(card);
		}else{//OverDamage
			console.log("OverDamage");
			player.overCard++;
		}
	}
}


//手札のカードを山札に送る
//引数はカードのスプライト
function handToYamahudaCard(card){
	//cardMove(card,card.player.handRoom,yamahudaRoom);
	var p = card.player;
	var rm = p.handRoom;
	card.tl.moveTo(yamahudaRoom.x + 10,yamahudaRoom.y + 10,CARD_SPEED, enchant.Easing.QUAD_EASEOUT)
		.scaleTo(0, 1, REVERSE_SPEED * 2, enchant.Easing.QUAD_EASEIN)
	 	.then(function(){
			this.reverse(0);
		})
		.removeFromScene(this);
	p.hand[card.posi2] = 0;
	p.leftenCards(p.hand);
	addYamahuda(card.numberCode);
}

function YamahudaToHandCard(player){
	var cardNum = popYamahuda();
	var posi2 =  player.hand.length;
	var card = new CardSprite(cardNum,posi2,player);
	var bef_rm = yamahudaRoom;
	var aft_rm = player.handRoom;
	card.moveTo(bef_rm.x + 10,bef_rm.y + 10);

	if(player.hand.length>=7){
		console.log("Over Cards");
		aft_rm = player.trushRoom;
		animating = 1;
		card.tl.moveTo(aft_rm.x + 10,aft_rm.y + 10, CARD_SPEED, enchant.Easing.QUAD_EASEOUT)
				.then(function(){animating = 0;});
				scene.addChild(card);
		player.trush.push(card);
	}

	animating = 1;
	card.tl.moveTo(posi2*(CARD_WID + 5) + 5 + aft_rm.x,ROOM_HGT_1 - CARD_HGT + aft_rm.y, CARD_SPEED, enchant.Easing.QUAD_EASEOUT)
			.then(function(){animating = 0;});
	scene.addChild(card);
	if(player.player==2){//相手のカードは裏返して追加
		//card.reverse(0);
	}
	player.hand[posi2] = card;
}

function handToFieldCard(card){

}


//roomからroomに送るアニメーション
// function cardMove(card,bef_rm,aft_rm){
// 	var p = bef_rm.player;
// 	switch(bef_rm.room){
// 		case "hand":
// 			p.hand[card.posi2] = 0;
// 			p.handRoom.leftenCards();
// 			break;
// 		case "field":
// 			break;
// 		case "trap":
// 			break;
// 		case "trush":
// 			break;
// 		case "yamahuda":
// 			var x = popYamahuda();
// 			var card = new CardSprite(x, 0,player);
// 			card.numberCode = popYamahuda();
// 			break;
// 	}
// 	card.tl.moveTo(aft_rm.x - bef_rm.x + 10,aft_rm.y - bef_rm.y + 10,CARD_SPEED, enchant.Easing.QUAD_EASEOUT);
//
// 	switch(aft_rm.room){
// 		case "hand":
// 			if(card.isUra==1 && card.player.isMan==1){
// 				card.reverse();
// 			}
// 			break;
// 		case "field"://フィールドは処理が難しいので別
// 			break;
// 		case "trap":
// 			break;
// 		case "trush":
// 			if(card.isUra==1){
// 				card.reverse();
// 			}
// 			aft_rm.addCard(card.numberCode);
// 			break;
// 		case "yamahuda":
// 			if(card.isUra==0){
// 				card.reverse();
// 			}
// 			addYamahuda(card.numberCode);
// 			break;
// 	}
// }
