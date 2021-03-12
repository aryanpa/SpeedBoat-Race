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

    boat1 = createSprite(100,200);
    boat1.addImage("boat1",boat1_img);
    boat1.scale = 0.3
    boat2 = createSprite(300,200);
    boat2.addImage("boat2",boat2_img);
    boat2.scale = 0.3
    boat3 = createSprite(500,200);
    boat3.addImage("boat3",boat3_img);
    boat3.scale = 0.3
    boat4 = createSprite(700,200);
    boat4.addImage("boat4",boat4_img);
    boat4.scale = 0.3
    boats = [boat1, boat2, boat3, boat4];
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();

    player.getBoatsAtEnd();
    
    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      image(pool, 0,-displayHeight*4,displayWidth, displayHeight*5);
      
      var index = 0;

      var x = 175 ;
      var y;

      for(var plr in allPlayers){
       
        index = index + 1 ;

        x = x + 200;
       
        y = displayHeight - allPlayers[plr].distance;
        boats[index-1].x = x;
        boats[index-1].y = y;
    

       
        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x,y,90,90);
          boats[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = boats[index-1].y;
        }
       
      
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

    if(player.distance > 3860){
      gameState = 2;
      player.rank += 1;
      Player.updateBoatsAtEnd(player.rank);
    }
   
    drawSprites();
  }

  end(){
    console.log("Game Ended");

    console.log(player.rank);

  }
}
