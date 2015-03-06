//ポーカーの役判定をするファイル


//引数は＜ソート済み＞数字配列
//返り値の配列にその組み合わせを入れる
function judgePoker(codes){
    var nums = [];
    var marks = [];
    var ret = 0;//
    for(var i=0;i<codes.length;i++){
        nums[i] = codeToNum(codes[i]);
        marks[i] = codeToMark(codes[i]);
    }

    var yaku = [];
    yaku[0] = twoPair(nums);
    yaku[1] = threeCard(nums);
    yaku[2] = flushPoker(marks);
    yaku[3] = straightPoker(nums);
    yaku[4] = fullHouse(nums);
    yaku[5] = fourCard(nums);
    yaku[6] = straightFlush(nums,marks);
    yaku[7] = royalStraightFlush(nums,marks);

    for(var i=0;i<8;i++){
        if(yaku[i]){ ret = [i,yaku[i]]; }
    }

    return ret;
}

function getYakuName(num){
    switch(num){
        case 0:
            var ret = "ツーペア";
            break;
        case 1:
            var ret = "スリーカード";
            break;
        case 2:
            var ret = "フラッシュ";
            break;
        case 3:
            var ret = "ストレート";
            break;
        case 4:
            var ret = "フルハウス";
            break;
        case 5:
            var ret = "フォーカード";
            break;
        case 6:
            var ret = "ストレートフラッシュ";
            break;
        case 7:
            var ret = "ロイヤルストレートフラッシュ";
            break;
    }
    return ret;
}

//返り値には組み合わせのなかで最も強い二つを入れる
function onePair(nums){
    var arr = nums.concat();
    var ln = nums.length;
    var ret = 0;
    var power = -1;
    for(var i=0;i<ln;i++){
        if(arr[i]==0){ continue; }
        for(var j=i+1;j<arr.length;j++){
            if(arr[i]==arr[j]){
                var x = ((arr[i]+11) % 13);
                if(x>power){
                    ret = [i,j];
                    power = x;
                }
            }
        }
    }
    return ret;
}


function twoPair(nums){
    var arr = nums.concat();
    var count = 0;
    var ret = [0];
    for(var i=0;i<arr.length;i++){
        if(arr[i]==0){ continue; }
        var oP = onePair(nums);
        if(oP!=0){//見つかった
            arr[oP[0]] = 0;
            arr[oP[1]] = 0;
            ret[count] = oP;
            count++;
        }
    }
    if(count==2){
        return ret;
    }else{
        return 0;
    }
}

function threeCard(nums){
    var arr = nums.concat();
    var ln = arr.length;
    var ret = 0;
    var power = -1;
    for(var i=0;i<ln;i++){
        var x= arr[i];
        if(x==0){ continue; }
        for(var j=i+1;j<ln;j++){
            if(x==arr[j]){//2枚
                for(var k=j+1;k<ln;k++){
                    if(x==arr[k]){//3枚
                        var y = ((x+11) % 13);
                        if(y>power){
                            ret = [i,j,k];
                            power = y;
                        }
                    }
                }
            }
        }
    }
    return ret;
}

function fourCard(nums){
    var arr = nums.concat();
    var ln = arr.length;
    var ret = 0;
    var power = -1;
    for(var i=0;i<ln;i++){
        var x= arr[i];
        if(x==0){ continue; }
        for(var j=i+1;j<ln;j++){
            if(x==arr[j]){//2枚
                for(var k=j+1;k<ln;k++){
                    if(x==arr[k]){//3枚
                        for(var l=k+1;l<ln;l++){
                            if(x==arr[l]){//4枚
                                var y = ((x+11) % 13);
                                if(y>power){
                                    ret = [i,j,k,l];
                                    power = y;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return ret;
}

//返り値配列で3以上の最大のストレートを構成
//とりあえずソートされた関数がくると想定
//ex引数[2,2,3,4,5,8,9,10] 返り値[0,2,3,4]
function straightPoker(nums){
    var arr = nums.concat();
    var ln = arr.length;
    var max = 5;//ここの数字を変えることで何枚からストレートにするかを変更可能
    var count = 1;
    var ret = [];
    for(var i=0;i<ln;i++){
        var x = arr[i];
        for(var j=i+1;j<ln;j++){
            if(x==arr[j]){ continue; }
            if(x!=arr[j] - 1) { break; }
            x++;
            count++;
        }
        if(count>=max){
            max = count;
            var x = i;
            for(var y=0;y<count;y++){
                ret[y] = x;
                while(arr[x]==arr[x+1]){
                    x++;
                }
                x++;
            }
        }
        count = 1;
    }
    if(ret==0){
        return 0;
    }
    return ret;
}

//フラッシュは５枚から
function flushPoker(marks){
    var count = 0;
    for(var i=0;i<marks.length;i++){
        if(marks[0]!=marks[i]){
            return 0;
        }
        count++;
    }
    if(count<5){ return 0; }
    return marks[0];
}

function fullHouse(nums){
    var arr = nums.concat();
    var threes = threeCard(arr);
    if(threes==0){
        return 0;
    }
    arr[threes[0]] = 0;
    arr[threes[1]] = 0;
    arr[threes[2]] = 0;

    arr = deleteArrZero(arr);

    var pair = onePair(arr);
    if(pair==0){
        return 0;
    }
    return [threes,pair];
}

function straightFlush(nums,marks){
    var flush = flushPoker(marks);
    if(flush==0){
        return 0;
    }

    var straight = straightPoker(nums);
    if(straight==0){
        return 0;
    }

    return [straight,flush];
}

function royalStraightFlush(nums,marks){
    var sf = straightFlush(nums,marks);
    if(sf[[0]]==10){
        console.log("ロイヤルストレートフラッシュ！！");
        return 1;
    }else{
        return 0;
    }

}
