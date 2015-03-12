//カードに名前つけたい
    var nameJson = {
        "bef": {
            "knj": {
                "kihon":["陽炎","氷結","雷鳴","大嵐","慈愛","慧眼","幻影","幻想","混沌","未知","栄光","希望","絶望","流星","冷徹","霊峰"],
                "suru":["咆哮","憤怒","激昂","繁栄","鳴動","凱旋","牽制","威嚇"],
                "job":["皇女","預言者","聖天使","宣教師","勇者","覇王","代弁者","処刑人","猛将","亡霊","執行者","襲撃者","伝道師","守り神","使者"]
            },
            "ktk": {
                1:["フレイム","アイス","サンダー","アース","ライトニング","フロスト","ハリケーン","ストーム","ハリケーン","スターダスト","サイバー","クレイジー","ワイルド","ハングリー","カオス","スターリー","グロリアス","インビジブル"],
                2:["ワールドエンド","ユニバース","ヴァルキリアス","ジャッジメント","ゴッドハンド","バトルマスター","インビンシブル","アルティメット"]
            }
        },
        "mons": {
            "ハート":["ウンディーネ","マーメイド","エンジェル","フェアリー","ピクシー","ユニコーン","カプリコーン","エルフ","フェニックス","スライム"],
            "スペード":["サラマンダー","インプ","キマイラ","デーモン","サキュバス","ヴァンパイア","ガーゴイル","ラミア","ゾンビ","スケルトン","ゴースト"],
            "クローバー":["ドリアード","オーク","トーテム","ゴーレム","ドワーフ","フェンリル","ゴブリン","メデューサ","マンドラコラ"],
            "ダイヤ":["シルフ","ハーピィ","ドラゴン","グリフォン","グレムリン","ワイバーン","ペガサス","ガルーダ","クラーケン"]
        },
        "yoji": {
            "ハート":["明鏡止水","百花繚乱","落花流水","天衣無縫"],
            "スペード":["天上天下","唯我独尊","跳梁跋扈","百鬼夜行"],
            "クローバー":["風林火山","森羅万象","質実剛健","画竜点睛"],
            "ダイヤ":["疾風迅雷","百戦錬磨","八面六臂","獅子奮迅"]
        },
        "aft": {
            "rankup":["卿","改二","零式","提督","精鋭部隊","先生","先輩","御大","リーダー","チーフ","キャプテン","チャンピオン","ガードナー","マスター"],
            "job":["ナイト","ウォリアー","ウィッチ","メイジ","アーチャー","バーサーカー","プリースト","シーフ","レンジャー","ロード","突撃部隊","遊撃隊"]
        }
    }
function createName(codes){
    var n = nameJson;
    var markName = "";
    var ret = "";
    var nums = [];
    var marks = [];
    for(var i=0;i<codes.length;i++){
        nums[i] = codeToNum(codes[i]);
        marks[i] = codeToMark(codes[i]);
    }
    var x = Math.floor(Math.random()*codes.length);
    markName = getMarkName(marks[x]);

    var mons = take_rnd_arr(n["mons"][markName]);
    switch(codes.length){
        case 1:
            x = Math.floor(Math.random()*3);
            if(x==0){
                var bef = take_rnd_arr(n["bef"]["knj"]["kihon"]);
                ret = bef + mons;
            }else if(x==1){
                var bef = take_rnd_arr(n["bef"]["ktk"][1]);
                ret = bef + mons;
            }else{
                var aft = take_rnd_arr(n["aft"]["job"]);
                ret = mons + "•" + aft;
            }

            break;
        case 2:
            x = Math.floor(Math.random()*4);
            if(x==0){
                var bef = take_rnd_arr(n["bef"]["knj"]["kihon"]) + "の";
            }else if(x==1){
                var bef = take_rnd_arr(n["bef"]["knj"]["suru"]) + "する";
            }else{
                var bef = take_rnd_arr(n["bef"]["ktk"][1]);
            }
            var aft = take_rnd_arr(n["aft"]["rankup"])
            ret = bef + mons + aft;
            break;
        case 3:
            var bef_knj = take_rnd_arr(n["bef"]["knj"]["suru"]);
            var bef_ktk = take_rnd_arr(n["bef"]["ktk"][1]);
            ret = bef_knj + "する" + bef_ktk + mons;
            break;
        case 4:
            var bef_knj_1 = take_rnd_arr(n["bef"]["knj"]["kihon"]);
            var bef_knj_2 = take_rnd_arr(n["bef"]["knj"]["job"]);
            var bef_ktk = take_rnd_arr(n["bef"]["ktk"][1]);
            ret = bef_knj_1 + "の" + bef_knj_2 + bef_ktk + mons;
            break;
        default:
            var yoji = take_rnd_arr(n["yoji"][markName]);
            var bef_knj_2 = take_rnd_arr(n["bef"]["knj"]["job"]);
            var bef_ktk = take_rnd_arr(n["bef"]["ktk"][2]);
            ret = yoji + "•" +  bef_knj_2 + bef_ktk + mons;
            break;
    }
    return ret;
}

//引数の配列からランダムに要素を返す
function take_rnd_arr(arr){
    var x = Math.floor(Math.random()*arr.length);
    return arr[x];
}
