enchant();  // 初期化

var FPS = 30;    				// フレームレート
var CARD_SPEED = 20;            //カードの移動フレーム
var REVERSE_SPEED = 4;          //カードが裏返るときのスピード
var SCENE_WID = 960;			//画面横幅
var SCENE_HGT = 640;			//画面縦幅
var CARD_WID = 60;				// カードの縦幅
var CARD_HGT = 90;				// カードの横幅
var ROOM_HGT_1 = CARD_HGT + 20;				//カード置き場の縦幅
var ROOM_WID_1 = ((CARD_WID + 5) * 7) + 5;		    //長いカード置き場の横幅
var ROOM_WID_2 = CARD_WID + 20;             //1枚のカード置き場の横幅

var TRUMP_IMG = "img/trump.gif";		// トランプの画像
var BGM = "sound/";


var yamahuda = [];	//山札配列
var isYamaNone = 0; //山札が切れたときのフラグ
var phase = 0;              //現在のフェイズ
                            //0:何も選択できない(相手ターン中など)
                            //1:自分のターンの自由フェイズ
                            //2:ターン終了時のカード交換
                            //3:ブロッカー選択
                            //4:攻撃後の効果対象選択
                            //↑は変わっていく可能性大
var yakuGlobal = 0;         //役を保存しておくグローバル変数 美しくないので変えたいところ
var activePlayer = 0;       //どっちのターンか
var nonActivePlayer = 0;    //↑ではない方のプレイヤー
var battle = undefined;             //バトルのインスタンス

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

    initYamahuda();//山札を初期化

	player1 = new Player(1,1)//(_player,isMan);
	player2 = new Player(2,0);

    player1.enemyPlayer = player2;
    player2.enemyPlayer = player1;

    dispLabels();   //ラベルやroomを生成して画面に表示　長いので下に追いやった

	player1.initCards();
	player2.initCards();

    activePlayer = player1;
    nonActivePlayer = player2;

    turnStart(activePlayer);
}

function endGame(){
    console.log("endGame");

    //勝敗判定
    var n1 = player1.trush.length + player1.overCard;
    var n2 = player2.trush.length + player2.overCard;
    console.log("p1:" + n1 + "VS p2:" + n2);
    if(n1>n2){
        console.log("player2 WIN!!!");
    }else if(n1<n2){
        console.log("player1 WIN!!!");
    }else{
        console.log("draw!!!");
    }

    //ゲームのリセット(仮)
    //location.reload();
}

function dispLabels() {

    var lbl = new okButtonLabel();//召喚ボタンのラベル
    scene.addChild(lbl);

    var lbl = new turnendButtonLabel();//ターンエンドボタンのラベル
    scene.addChild(lbl);

    messageLabel = new messageLabel();//画面中央のメッセージのラベル
    scene.addChild(messageLabel);


    yamahudaRoom = new YamahudaRoomGroup();//自分の手札置き場
    scene.addChild(yamahudaRoom);
    var yamahudaRoomLabel = new YamahudaRoomLabel();
    yamahudaRoom.addChild(yamahudaRoomLabel);
    var sp = new CardSprite(55,0);
    sp.moveTo(10,10);
    yamahudaRoom.addChild(sp);

    var myHandRoom = new HandRoomGroup(player1);//自分の手札置き場
    scene.addChild(myHandRoom);
    player1.handRoom = myHandRoom;
    var myHandRoomColor = new HandRoomColor("myHandRoomColor");
    myHandRoom.addChild(myHandRoomColor);
    var myHandRoomLabel = new HandRoomLabel("myHandRoomLabel");
    myHandRoom.addChild(myHandRoomLabel);

    var myFieldRoom = new FieldRoomGroup(player1);//自分の手札置き場
    scene.addChild(myFieldRoom);
    player1.fieldRoom = myFieldRoom;
    var myFieldRoomColor = new FieldRoomColor("myFieldRoomColor");
    myFieldRoom.addChild(myFieldRoomColor);
    var myFieldRoomLabel = new FieldRoomLabel("myFieldRoomLabel");
    myFieldRoom.addChild(myFieldRoomLabel);

    var myTrushRoom = new TrushRoomGroup(player1);//自分の墓地
    scene.addChild(myTrushRoom);
    player1.trushRoom = myTrushRoom;
    //var myTrushRoomColor = new TrushRoomColor("myTrushRoomColor");
    //myTrushRoom.addChild(myTrushRoomColor);
    var myTrushRoomLabel = new TrushRoomLabel("myTrushRoomLabel");
    myTrushRoom.addChild(myTrushRoomLabel);

    var eneHandRoom = new HandRoomGroup(player2);//自分の手札置き場
    scene.addChild(eneHandRoom);
    player2.handRoom = eneHandRoom;
    var eneHandRoomColor = new HandRoomColor("eneHandRoomColor");
    eneHandRoom.addChild(eneHandRoomColor);
    var eneHandRoomLabel = new HandRoomLabel("eneHandRoomLabel");
    eneHandRoom.addChild(eneHandRoomLabel);


    var eneFieldRoom = new FieldRoomGroup(player2);//自分の手札置き場
    scene.addChild(eneFieldRoom);
    player2.fieldRoom = eneFieldRoom;
    var eneFieldRoomColor = new FieldRoomColor("eneFieldRoomColor");
    eneFieldRoom.addChild(eneFieldRoomColor);
    var eneFieldRoomLabel = new FieldRoomLabel("eneFieldRoomLabel");
    eneFieldRoom.addChild(eneFieldRoomLabel);

    var eneTrushRoom = new TrushRoomGroup(player2);//自分の墓地
    scene.addChild(eneTrushRoom);
    player2.trushRoom = eneTrushRoom;
    //var eneTrushRoomColor = new TrushRoomColor("eneTrushRoomColor");
    //eneTrushRoom.addChild(eneTrushRoomColor);
    var eneTrushRoomLabel = new TrushRoomLabel("eneTrushRoomLabel");
    eneTrushRoom.addChild(eneTrushRoomLabel);


}
