//room間のカードの移動
//とてつもなく冗長な気がするが各roomごとに実装があまりにもちがうのでこれでゴリ押す

//フィールドのカードを墓地へ送る
//引数に死ぬクリーチャーのインスタンス
function fieldToTrushCard(creature){
	var p = creature.player;
	p.fieldRoom.deleteGroup(creature);
	for(i=0;i<creature.cards.length;i++){
		p.trushRoom.addCard(creature.cards[i].numberCode);
	}
}

//心変わり
function fieldToEnemyField(creature){
	var p = creature.player;
	p.fieldRoom.deleteGroup(creature);
	var newCrt = [];
	for(i=0;i<creature.cards.length;i++){
		newCrt[i] = creature.cards[i];
	}
	p.enemyPlayer.fieldRoom.addGroup(newCrt);
}

//山札のカードを墓地へ送る
//引数は送られるplayerと枚数
function yamahudaToTrushCard(player,breakNum){
	for(var i=0;i<breakNum;i++){
		if(yamahuda.length>0){
			//cardMove(card,yamahudaRoom,player.trushRoom);
			var bef_rm = yamahudaRoom
			var aft_rm = player.trushRoom;
	        var card = new CardSprite(1,3,player);
	        card.moveTo(10,10);
	        bef_rm.addChild(card);
			console.log(card);
			 card.tl.moveTo(aft_rm.x - bef_rm.x + 10,aft_rm.y - bef_rm.y + 10,CARD_SPEED, enchant.Easing.QUAD_EASEOUT)
			 	.scaleTo(0, 1, REVERSE_SPEED, enchant.Easing.QUAD_EASEIN)
			  	.then(function(){this.frame = card.reverse()})
			  	.scaleTo(1, 1, REVERSE_SPEED, enchant.Easing.QUAD_EASEOUT);
			 var x = popYamahuda();
			 player.trushRoom.addCard(x);
		}else{//OverDamage
			console.log("OverDamage");
			player.overCard++;
		}
	}
}


//roomからroomに送る
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


//手札のカードを山札に送る
//引数はカードのスプライト
function handToYamahudaCard(card){
	//cardMove(card,card.player.handRoom,yamahudaRoom);
	var p = card.player;
	var rm = p.handRoom;
	card.tl.moveTo(yamahudaRoom.x - rm.x + 10,yamahudaRoom.y - rm.y + 10,CARD_SPEED, enchant.Easing.QUAD_EASEOUT)
	 	.then(function(){card.reverse()});
	p.hand[card.posi2] = 0;
	p.handRoom.leftenCards();
	addYamahuda(card.numberCode);
}

function handToFieldCard(card){

}
