class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
   // intro.play();
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    plr1 = createSprite(100,200);
    plr1.addImage("plr1",plr1_img);
    plr1.scale=0.2;
    plr1.debug=true;

    plr2 = createSprite(300,200);
    plr2.addImage("plr2",plr2_img);
    plr2.scale=0.2;

    plr3 = createSprite(500,200);
    plr3.addImage("plr3",plr3_img);
    plr3.scale=0.2;

    plr4 = createSprite(700,200);
    plr4.addImage("plr4",plr4_img);
    plr4.scale=0.2;

    players = [plr1, plr2, plr3, plr4];
   passedFinish = false;

  
  }

  play(){
    background(audience);
    form.hide();
    //intro.stop();
    
    Player.getPlayerInfo();
    player.getFinishedPlayers(); 
    
    if(allPlayers !== undefined){
     
      background(audience);
     
      image(track,0,0,displayWidth*5,displayHeight/2)

      var index = 0

    
      var y = -40 ;
      var x ;
  
      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the players a little away from each other in y direction
        x = allPlayers[plr].distance+100;
        y= y + 100;
       
        players[index-1].x = x;
        players[index-1].y = y;
    
        
       
        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x,y,60,60);
          players[index - 1].shapeColor = "red";
           camera.position.x = players[index-1].x+(displayWidth/4);
           
           camera.position.y = displayHeight/2;

        }
       
          textAlign(CENTER);
          textSize(20);
          text(allPlayers[plr].name, players[index - 1].x-75, players[index - 1].y);
      }

    }

    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
      //running.play();

    if(flag === 0)
    {
      intro.stop();
      running.loop();
      flag = 1;
      console.log("key pressed");

    }
      
      if(player.distance<7000 && passedFinish === false)
      {
      

        player.distance +=30
       
        console.log(player.distance);
      }
      else if(player.distance > 7000 && passedFinish === false ){
       
      
       
      console.log("before"+finishedPlayers)
           
       finishedPlayers+=1;
       console.log("after add"+finishedPlayers)
       Player.updateFinishedPlayers(finishedPlayers);
       
        player.rank = finishedPlayers;
        passedFinish = true;
        
      }   
      player.update();
    
    }
    else
    {
      flag = 0;
      running.stop();
    }

   
    drawSprites();
  }
  displayRanks(){
    //display the medals
    camera.position.y = 0;
    camera.position.x = 0;

    clear ();
    background(leader);
  

    if(flagCheer === 0)
    {
      running.stop();
      clapping.play();
      flagCheer = 1;

    }
   
   
    image(cheerImage, 200, -220 + displayHeight/9, 400, 300);
    noFill();
    strokeWeight(20);
    rect(160,-150,500,350);

   
  fill("red");
 

    Player.getPlayerInfo();
    
    textAlign(CENTER);
     strokeWeight(10);
    stroke("black");
    textSize(50);
    
    for(var plr in allPlayers){
     
        if(allPlayers[plr].rank === 1){
           
            text("🥇" + allPlayers[plr].name, -470,-330);
            image(eval("plr"+allPlayers[plr].index+"_img"), -530,-350, 200,200);
        }else if(allPlayers[plr].rank === 2){
            text("🥈" + allPlayers[plr].name, -320,-230);
            image(eval("plr"+allPlayers[plr].index+"_img"), -390,-220, 170,170);
        }else if(allPlayers[plr].rank === 3){
            text("🥉" + allPlayers[plr].name, -650,-100);
            image(eval("plr"+allPlayers[plr].index+"_img"), -690,-110, 150,150);
        }
        else{
            
            text(" 🏅" + allPlayers[plr].name, -160,0);
            image(eval("plr"+allPlayers[plr].index+"_img"), -210,-10, 150,150);
        }
    }
  
}

 
}

 