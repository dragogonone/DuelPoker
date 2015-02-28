//山札カードの内部処理はこのファイルに
var yamahuda = [];	//山札配列

//山札からドローする関数　返り値でドローしたカード
function popYamahuda(){
	return yamahuda.pop();
}

//山札を初期化
function initYamahuda(){
	for(i=0;i<53;i++) {
		yamahuda[i] = i+1;
	}
	shuffleYamahuda();
}


//残りの山札をシャッフルする関数
function shuffleYamahuda(){
	var len = yamahuda.length;
	for(i=0;i<len;i++) {
		r = Math.floor(Math.random()*len);
		w = yamahuda[i];
       	yamahuda[i]=yamahuda[r];
       	yamahuda[r]=w;
    }
}