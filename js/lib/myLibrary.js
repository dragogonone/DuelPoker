// 自作の汎用ライブラリ


//配列の中の0を消して詰める関数
//第一引数が配列　第二引数は０の数
//戻り値は配列
function deleteArrZero(arr){
	var x = 0;
	var y = arr.length;
	var z = 0
	for(i=0;i<y;i++){
		if(arr[i] == 0){
			z++;
		}
	}

	for(i=0;i<(y-z);i++){
		while(arr[x]==0){ x++;}
		arr[i] = arr[x];
		x++;
	}
	for(i=0;i<z;i++){
		arr.pop();
	}
	return arr;
}

//配列の0でない要素の数を返す関数
//引数は配列、戻り値は整数
function countArrNotZero(arr){
	var count = 0;
	for(i=0;i<arr.length;i++){
		if(arr[i]!=0){
			count++;
		}
	}
	return count;
}


//第一引数の配列の0でない要素のある番地をもった配列を返す関数
//例: [1,0,0,1,0] が引数だと返り値は[0,3]
function makeArrNotZero(arr){
	var ret = [];
	for(i=0;i<arr.length;i++){
		if(arr[i]!=0){
			ret.push(i);
		}
	}
	return ret;
}

//配列を引数の個数の0で初期化する関数
function initArray(num){
	var arr = [];
	for(var i=0;i<num;i++){
		arr[i] = 0;
	}
	return arr;
}

//挿入ソート
function sortArray(arr){
    arr.sort(
        function(a,b){
            if(a < b) return -1;
            if(a > b) return 1;
            return 0;
        }
    );
    return arr;
}


//二つの数字を比較し大きい方が第何引数かを返す　同じなら0を返す
function getBigger(n1,n2){
	if(n1>n2){
		return 1;
	}else if(n1<n2){
		return 2;
	}else{
		return 0;
	}
}
