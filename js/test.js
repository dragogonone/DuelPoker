document.onkeydown = testAA;

function testAA(){
    switch(event.keyCode){
        case 90://z
            console.log("tap");
            for(var i=0;i<player1.field.length;i++){
                player1.field[i].tap();
            }
        break;
        case 88://x
            console.log("untap");
            for(var i=0;i<player1.field.length;i++){
                player1.field[i].untap();
            }
            break;
        case 67://c
            console.log("enemySummon");
            var n = popYamahuda();
            var sp = new CardSprite(n,player2.field.length,player2);
            var cre = [];
            cre[0] = sp;
            player2.fieldRoom.addGroup(cre);
            player2.field[0].tap();
            break;
        case 89://y
            console.log("yama kill");
            var num = yamahuda.length;
            var randnum = Math.floor(Math.random() * num);
            yamahudaToTrushCard(player1,randnum);
            yamahudaToTrushCard(player2,(num - randnum));
            break;
        case 66://b
            console.log("handToYamahuda");
            handToYamahudaCard(player1.hand[0]);
            break;
        case 69://e
            console.log("errorCheck");
            var arr = card_array_sort(player1.hand);
            console.log("aa");
            for(var i=0;i<arr.length;i++){
                console.log(arr[i].getNumber());
            }
            break;
        case 80://p
            console.log("pokerCheck");
            var codes = [2,1,3,4,16];
            var nums = [3,4,3,3,4];
            var marks = [1,1,1,1,1];
            for(var i=0;i<codes.length;i++){
                codes[i] = numToCode(nums[i],marks[i]);
                //nums[i] = codeToNum(codes[i]);
                //marks[i] = codeToMark(codes[i]);
            }
            var sortArr = sortArray(nums.concat());
            console.log(nums);
            console.log(marks);
            console.log(codes);
            console.log(flushPoker(marks));
            console.log(judgePoker(codes));
            break;
        case 65://a
            console.log("enemyAttack");
            player2.field[1].isSelected = 1;
            player2.field[1].y-=10;
            battle = new Battle(player2.field[1],yamahudaRoom);
            break;
        case 87://w
            console.log("handChange");
            var new_hand = [1,2,3,4,5,6];
            var ln = player1.hand.length;
            for(var i=0;i<ln;i++){
                handToYamahudaCard(player1.hand[0]);
            }
            for(var i=0;i<new_hand.length;i++){
                var card = player1.handRoom.addCard(new_hand[i]);
                player1.hand.push(card);
            }
            break;
    }
}
