//room間のカードの移動
//とてつもなく冗長な気がするが各roomごとに実装があまりにもちがうのでこれでゴリ押す

//フィールドのカードを墓地へ送る
//引数に死ぬクリーチャーのインスタンス
function fieldToTrushCard(creature){
	console.log(creature);
	var p = creature.player;
	console.log(p);
	p.fieldRoom.deleteGroup(creature);
	for(i=0;i<creature.cards.length;i++){
		p.trushRoom.addCard(creature.cards[i].numberCode);
	}
}

//山札のカードを墓地へ送る
//引数は送られるplayerと枚数
function yamahudaToTrushCard(player,breakNum){
	for(var i=0;i<breakNum;i++){
		if(yamahuda.length>0){
			var x = popYamahuda();
			player.trushRoom.addCard(x);
		}else{//OverDamage
			console.log("OverDamage");
			player.overCard++;
		}
	}
}

//手札のカードを山札に送る
//引数はカードのスプライト
function handToYamahudaCard(card){
	var p = card.player;
	p.handRoom.deleteCard(card);
	p.handRoom.leftenCards();
	addYamahuda(card.numberCode);
}
