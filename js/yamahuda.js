//山札カードの内部処理はこのファイルに

//山札からドローする関数　返り値でドローしたカード
function popYamahuda(){
	var num = yamahuda.pop();
	checkYamahuda();
	return num;
}

//山札に指定したカードを追加 引数に数字コード
function addYamahuda(num){
	yamahuda.push(num);
	shuffleYamahuda();
}


//山札が0になっていたら山札切れフラグをonに
//山札操作が行われる度に呼び出す
function checkYamahuda(){
	if(yamahuda.length==0){
		isYamaNone = 1;
		console.log("山札が切れました");
		yamahudaRoom.deleteImg();
	}
}

//山札を初期化
function initYamahuda(){
	for(var i=0;i<52;i++) {//とりあえずjokerは抜く　53にすれば追加できる
		yamahuda[i] = i+1;
	}
	isYamaNone = 0;
	shuffleYamahuda();
}


//残りの山札をシャッフルする関数
function shuffleYamahuda(){
	var len = yamahuda.length;
	for(var i=0;i<len;i++) {
		r = Math.floor(Math.random()*len);
		w = yamahuda[i];
       	yamahuda[i]=yamahuda[r];
       	yamahuda[r]=w;
    }
}
