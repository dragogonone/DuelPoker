enchant();  // 初期化

var FPS = 30;    				// フレームレート
var SCENE_WID = 640;			//画面横幅
var SCENE_HGT = 480;			//画面縦幅
var CARD_WID = 60;				// カードの縦幅
var CARD_HGT = 90;				// カードの横幅
var TRUMP_IMG = "img/trump.gif"		// トランプの画像
var ROOM_HGT_1 = CARD_HGT + 20;				//カード置き場の縦幅
var ROOM_WID_1 = SCENE_WID - 200;		    //長いカード置き場の横幅
var ROOM_WID_2 = CARD_WID + 20;             //1枚のカード置き場の横幅

var yamahuda = [];	//山札配列
var selecting_posi = 0;      //選択中のカードの所属ルーム　1:手札 2:フィールド
var activePlayer = 0;       //どっちのターンか
var nonActivePlayer = 0;    //↑ではない方のプレイヤー

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

	player1 = new Player(1);
	player2 = new Player(2);

    dispLabels();   //ラベルやroomを生成して画面に表示　長いので下に追いやった

	player1.initCards();
	player2.initCards();

    myTurnStart();
}

function dispLabels() {

    var lbl = new summonButtonLabel();//召喚ボタンのラベル
    scene.addChild(lbl);

    var lbl = new turnendButtonLabel();//ターンエンドボタンのラベル
    scene.addChild(lbl);


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
    var myHandRoomLabel = new HandRoomLabel("myHandRoomLabel");
    myHandRoom.addChild(myHandRoomLabel);

    var myFieldRoom = new FieldRoomGroup(player1);//自分の手札置き場
    scene.addChild(myFieldRoom);
    player1.fieldRoom = myFieldRoom;
    var myFieldRoomLabel = new FieldRoomLabel("myFieldRoomLabel");
    myFieldRoom.addChild(myFieldRoomLabel);

    var myTrushRoom = new TrushRoomGroup(player1);//自分の墓地
    scene.addChild(myTrushRoom);
    player1.trushRoom = myTrushRoom;
    var myTrushRoomLabel = new TrushRoomLabel("myTrushRoomLabel");
    myTrushRoom.addChild(myTrushRoomLabel);

    var eneHandRoom = new HandRoomGroup(player2);//自分の手札置き場
    scene.addChild(eneHandRoom);
    player2.handRoom = eneHandRoom;
    var eneHandRoomLabel = new HandRoomLabel("eneHandRoomLabel");
    eneHandRoom.addChild(eneHandRoomLabel);

    var eneFieldRoom = new FieldRoomGroup(player2);//自分の手札置き場
    scene.addChild(eneFieldRoom);
    player2.fieldRoom = eneFieldRoom;
    var eneFieldRoomLabel = new FieldRoomLabel("eneFieldRoomLabel");
    eneFieldRoom.addChild(eneFieldRoomLabel);

    var eneTrushRoom = new TrushRoomGroup(player2);//自分の墓地
    scene.addChild(eneTrushRoom);
    player2.trushRoom = eneTrushRoom;
    var eneTrushRoomLabel = new TrushRoomLabel("eneTrushRoomLabel");
    eneTrushRoom.addChild(eneTrushRoomLabel);

}
