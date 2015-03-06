//カード番号と実際の数字、マークの変換など

//数字コード
//1〜13 ハート:1
//14〜26 スペード:2
//27〜39 ダイヤ:3
//40〜52 クローバー:4
//53 Joker
//55 裏

function numToCode(num,mark){
	var code = num +  ((mark-1)*13);
	return code;
}

function codeToNum(code){//数字コードの実際の数字を返す
	var num = parseInt((code-1) % 13 + 1);
	return num;
}

function codeToMark(code){//数字コードのマークを返す
	var mark = parseInt((code-1) / 13) + 1;
	return mark;
}


function getMarkName(mark){
	var ret = "";
	switch(mark){
	case 1:
		ret = "ハート";
		break;
	case 2:
		ret = "スペード";
		break;
	case 3:
		ret = "ダイヤ";
		break;
	case 4:
		ret = "クローバー";
		break;
	}
	return ret;
}


//trump.gifの素材からenchant.jsのframe数を返す
//引数は数字コードで返り値がframe数
function getCardFrame(code){
	var	num = codeToNum(code);
	var mark = codeToMark(code);
	if (code == 53) { return 52; }//ジョーカー
	if (code == 55) { return 54; }//裏面

	if(num < 8) //左側
	{
		var ret = (num-1) * 8 + (mark - 1);
	}else{//右側
		var ret = (num-8) * 8 + (mark - 1) + 4;
	}
	return parseInt(ret);
}
