class Form {

  constructor() {
    this.input = createInput("").attribute("placeholder", "Name");
    this.button = createButton('Play');
    this.greeting = createElement('h2');
    this.title = createElement('h1');
    
    this.reset = createButton('Reset');
  }
  hide(){
    this.greeting.hide();
    this.button.hide();
    this.input.hide();
    this.title.hide();
  }

  display(){
    background(backImage);
   intro.play();
   
    
   
    this.title.html("Marathon Game");

    //this.title.position(displayWidth/2 - 50, 0);
    this.title.position(
      displayWidth / 2.25,
      displayHeight / 2.5 - displayHeight / 8
    );

    //this.input.position(displayWidth/2 - 40 , displayHeight/2 - 80);
    this.input.position(displayWidth / 2.25, displayHeight / 2.5);
    this.button.position(
      displayWidth / 2.1,
      displayHeight / 2.5 + displayHeight / 20
    );
    //this.button.position(displayWidth/2 + 30, displayHeight/2);
    //this.reset.position(displayWidth-100,20);
    this.reset.position(10, 10);

    this.button.mousePressed(()=>{
      this.input.hide();
      this.button.hide();
      player.name = this.input.value();
      playerCount+=1;
      player.index = playerCount;
      player.update();
      player.updateCount(playerCount);
      this.greeting.html("Welcome " + player.name + "!") ;
      this.greeting.position(
        displayWidth / 2.1 - player.name.length * (displayWidth / 110),
        125
      );
      //this.greeting.position(displayWidth/2 - 70, displayHeight/4);
    });

    this.reset.mousePressed(()=>{
      player.updateCount(0);
      game.update(0);
      
      database.ref("/").update({
        players: null,
        finishedPlayers: 0
      });

     clear ();
     game.start();

    });

  }
}
