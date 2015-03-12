//召喚に関連する関数はこちら


//召喚できるか判定　引数数字コードver CPUが使用
function canSummon(cards){
	var yaku = judgePoker(cards);
	var mark = 1;
	var number = 1;
	for(var i=0;i<cards.length;i++){
		//マーク
		if( codeToMark(cards[0]) != codeToMark(cards[i]) ){
			mark = 0//一つでもマークが違ったらダメ
		}
		//同じ数字
		if( codeToNum(cards[0]) != codeToNum(cards[i])){
			number = 0//一つでも数字が違ったらダメ
		}
	}

	//判定
	if(yaku==0 && mark==0 && number==0){
		return 0;
	}else{
		return 1;
	}
}


//召喚できるか判定 引数にスプライト配列 人間が使用
function canSummonByCreature(creature){
	var player = creature[0].player;
	if(player.isSummoned==1){
		console.log("このターンは既に召喚しています");
		return 0;
	}
	if(player.field.length>=5){
		console.log("フィールドがいっぱいです");
		return 0;
	}

	//役
	var yaku = judgePokerByCreature(creature);
	var mark = 1;
	var number = 1;
	//マーク•数字
	for(var i=0;i<creature.length;i++){
		//マーク
		if(creature[0].getMark()!=creature[i].getMark()){
			mark = 0//一つでもマークが違ったらダメ
		}
		//同じ数字
		if(creature[0].getNumber()!=creature[i].getNumber()){
			number = 0//一つでも数字が違ったらダメ
		}
	}

	//判定
	if(yaku==0 && mark==0 && number==0){
		return 0;
	}else{
		return 1;
	}
}

//第一引数の配列を第二引数の要素で分割
//ex[2,5,7,3] [[0,2],[1,3]]→[[2,7],[5,3]]
function divide_array(divee,diver){
	var ret = [];
	var arr = [];
	for(var i=0;i<diver.length;i++){
		for(var j=0;j<diver[i].length;j++){
			arr[j] = divee[diver[i][j]];//役配列の具体的要素の前のペアの0番目
			arr[j] = divee[diver[i][j]];
			ret[i] = arr.concat();
		}
	arr = [];
	}
	return ret;
}
