//カードやクリーチャーの特殊なソートについてここに

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

//クリーチャーグループ配列をパワーでソートして返す
function creture_array_sort(data,order){
	//デフォは昇順(ASC)
	var num_a = 1;
	var num_b = -1;

	if(order === 'desc'){//指定があれば降順(DESC)
		num_a = -1;
		num_b = 1;
	}

	data = data.sort(function(a, b){
		var x = a.getPower();
		var y = b.getPower();
		if (x > y) return num_a;
		if (x < y) return num_b;
		return 0;
	});
	return data;
}
