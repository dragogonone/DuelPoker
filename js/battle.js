//  バトルに関する関数をまとめるクラス
//  1バトルにつきひとつバトルが生成される


//攻撃したとき外部ファイルが呼ぶ関数
//攻撃クリーチャーと攻撃対象が引数

var Battle = enchant.Class.create({
    initialize: function(_atCrt,_dfCrt){

        this.atCrt = _atCrt;
        this.dfCrt = _dfCrt;
        this.blCrt = null;
        this.aP = _atCrt.player;
        if(this.aP == player1){
            this.nP = player2;
        }else{
            this.nP = player1;
        }

        console.log(this.atCrt.creatureName + " tried to attack to " + this.cratureName);

        console.log(this.atCrt.x);
		console.log(this.atCrt.cards[0].x);

        //ここにブロックの処理を書く
        if(this.nP.isMan==1){
            var blockable = this.nP.getUntap();
            if(blockable!="no cards"){
                phase = 3;
                console.log("ブロックするクリーチャーを選択")
                return;
            }
            console.log("ブロックできない")
            this.afterBlockerSelect(null);
        }else{//CPUのブロック処理
            console.log(this);
            this.afterBlockerSelect(null);
        }
    },
    afterBlockerSelect: function(_blCrt){//ブロッカーを選択した後のバトルの処理

        this.blCrt = _blCrt;
        if(this.blCrt!=null){//ブロックされた
            this.blockAttack();
        }else if(this.dfCrt==yamahudaRoom){
            this.attackToYamahuda();
        }else{
            this.attackToCreature();
        }

        this.attackEnd(this.atCrt,this.aP);
    },
    attackEnd: function(){
        player1.leftenCards(player1.field);
        player2.leftenCards(player2.field);
        if(this.atCrt==this.aP.field[this.atCrt.posi2]){
            this.atCrt.tap();
        }
        phase = 1;
    },
    attackToYamahuda: function(){
        console.log(this.atCrt.getPower() + " attack to deck");
        //攻撃成功
        var breakNum = this.atCrt.getBreakPower();
        yamahudaToTrushCard(this.nP,breakNum);//山札からカードを指定枚数墓地へ
    },
    blockAttack: function(){

        console.log(this.blCrt.getPower() + " block to attack of " + this.atCrt.getPower());
        this.blCrt.tap();
        this.dfCrt = this.blCrt;
        this.attackToCreature();
    },
    attackToCreature: function(){
        console.log(this.atCrt.getPower() + " attack to " + this.dfCrt.getPower());

        //バトル開始
        var i = getBigger(this.atCrt.getPower(),this.dfCrt.getPower());
        switch(i){
            case 1://攻撃側の勝利
                fieldToTrushCard(this.dfCrt);
                break;
            case 2://防御側の勝利
                fieldToTrushCard(this.atCrt);
                break;
            case 0://両方死ぬ
                fieldToTrushCard(this.atCrt);
                fieldToTrushCard(this.dfCrt);
                break;
        }
        this.attackEnd();
    }
});
