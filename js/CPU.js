//コンピューターの思考や行動を記す

//ターンのはじめ　ポータル関数
function CPUturnStart(){
    while(animating){
        console.log("a");
        scene.tl.delay(30);
    };
    //召喚
    cpuSummon();

    //攻撃
    cpuAttack();

    //ターン終了
    turnEnd(activePlayer);
    //カード戻し
    afterCardBack();


    function cpuSummon(){

        if(activePlayer.field.length>=5){
    		return 0;
    	}

        var summonable = [];//召喚可能性
        var yaku_arr = [];//役
        var power_arr = [];//パワー
        //これら＋枚数で決定
        var hyouka_arr = [];//評価値
        var p = activePlayer;
        var ln = p.hand.length;
        var beki_arr = bekisyugou_array(ln);
        for(var i=0;i<beki_arr.length;i++){
            var crt_list = [];
            for(var j=0;j<beki_arr[i].length;j++){
                crt_list[j] = p.hand[beki_arr[i][j]].numberCode;
            }
            summonable[i] = canSummon(crt_list);
            var yaku = judgePoker(crt_list);
            yaku_arr[i] = yaku[0] || 0;
            power_arr[i] = crt_list.reduce(function(a, b) {
                return a + b;
            });

            hyouka_arr[i] = summonable[i] * (power_arr[i] + (beki_arr[i].length * 100) + (yaku_arr[i] * 10000));
        }
        // console.log(summonable);
        // console.log(yaku_arr);
        // console.log(power_arr);
        // console.log(hyouka_arr);

        var deside = getMaxOfArrayKey(hyouka_arr);
        console.log(deside);
        var creature = [];
        for(var j=0;j<beki_arr[deside].length;j++){
            creature[j] = p.hand[beki_arr[deside][j]];
        }
        //console.log(creature);
        //召喚実行
        if(deside){
            activePlayer.summon(creature,yaku);
        }
    }

    function cpuAttack(){
        var aP = activePlayer;
        var nP = aP.enemyPlayer;
        var powerDescCrts = creature_array_sort(p.field);
        var tap = nP.getTap();
        var untap = nP.getUntap();
        if(tap=="no cards"){ tap = -1;}
        if(untap=="no cards"){ untap = -1;}

        var enemyTapCrts = [];
        var enemyUntapCrts = [];

        for(var i=0;i<tap;i++){
            enemyTapCrts[i] = nP.field[tap[i]];
        }
        for(var i=0;i<untap;i++){
            enemyUntapCrts[i] = nP.field[untap[i]];
        }

        for(var i=0;i<powerDescCrts.length;i++){
            for(var j=0;j<enemyPowers.length;j++){
                if(powerDescCrts[i].getPower()<enemyPowers[i])
            }
        }


    }

}
