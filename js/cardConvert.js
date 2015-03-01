//カード番号と実際の数字、マークの変換など

//数字コード
//1〜13 ハート:0
//14〜26 スペード:1
//27〜39 ダイヤ:2
//40〜52 クローバー:3
//53 Joker
//55 裏

function numToCode(num,mark){
	code = num * mark;
	return code;
}

function codeToNum(num){
	code = [];
	code[0] = parseInt((num-1) % 13 + 1);
	code[1] = parseInt((num-1) / 13);
	code[2] = getMarkName(parseInt((num-1) / 13));
	return code;
}

function getMarkName(mark){
	ret = "";
	switch(mark){
	case 0:
		ret = "ハート";
		break;
	case 1:
		ret = "スペード";
		break;
	case 2:
		ret = "ダイヤ";
		break;
	case 3:
		ret = "クローバー";
		break;
	}
	return ret;
}


//trump.gifの素材からenchant.jsのframe数を返す
//引数は数字コードで返り値がframe数
function getCardFrame(num){
	pair = codeToNum(num);
	if (num == 53) { return 52; }//ジョーカー
	if (num == 55) { return 54; }//裏面

	if(pair[0] < 8) //左側
	{
		ret = (pair[0]-1) * 8 + pair[1];
	}else{//右側
		ret = (pair[0]-8) * 8 + pair[1] + 4;
	}
	return parseInt(ret);
}
