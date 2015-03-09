//召喚の関連する関数はこちら

//カードスプライト配列を実際の数字でソートして返す
function card_array_sort(data,order){
	//デフォは昇順(ASC)
	var num_a = 1;
	var num_b = -1;

	if(order === 'desc'){//指定があれば降順(DESC)
		num_a = -1;
		num_b = 1;
	}

	data = data.sort(function(a, b){
		var x = a.getNumber();
		var y = b.getNumber();
		if (x > y) return num_a;
		if (x < y) return num_b;
		return 0;
	});
	return data;
}


//召喚できるか判定
function canSummon(creature){
	var player = creature[0].player;
	if(player.isSummoned==1){
		console.log("このターンは既に召喚しています");
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
