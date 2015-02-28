enchant();  // 初期化
 
var FPS = 30;    				// フレームレート
var SCENE_WID = 640;			//画面横幅
var SCENE_HGT = 480;			//画面縦幅
var CARD_WID = 60;				// カードの縦幅
var CARD_HGT = 90;				// カードの横幅
var TRUMP_IMG = "img/trump.gif"		// トランプの画像
var ROOM_WID_1 = SCENE_WID - 200;				//メインのカード置き場の横幅
var ROOM_HGT_1 = CARD_HGT + 20;				//メインのカード置き場の縦幅

var selecting_arr = [];		 //選択中のカード入れ 1:選択中 2:非選択中
 
window.onload = function () {
    game = new Game(SCENE_WID, SCENE_HGT); // Gameオブジェクトの作成
    game.fps = FPS;				// フレームレートのセット
    game.preload(TRUMP_IMG);	// トランプ画像の読み込み
    game.keybind(90, 'z');		// Zボタンを割り当て
    game.keybind(88, 'x');		// Xボタンを割り当て
    game.onload = function () {	// ゲームが開始された時の関数をセット
        scene = game.rootScene;	// game.rootSceneは長いのでsceneに参照を割り当て
		scene.backgroundColor = 'green';
		
        initGame();
    };
    game.start();
};

function initGame(){
	initYamahuda();
	dispLabels();
	for(i=0;i<7;i++){
		selecting_arr[i] = 0;
	}
	player1 = new Player(1);
	player2 = new Player(2);
	player1.initCards();
	player2.initCards();
	
	dispHand(player1);
	dispHand(player2);
	
}


function Test(){

}

