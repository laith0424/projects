"use strict";


let scores = [ 0 , 0 ];
let active_player = 0;

function new_game(){

  document.getElementById( 'dice-1' ).style.display = 'none';
  document.getElementById( 'dice-2' ).style.display = 'none';

  document.querySelector( '.player-0-panel' ).classList.add( 'active' );
  document.querySelector( '.player-1-panel' ).classList.remove( 'active' );
  document.querySelector( '.player-1-panel' ).classList.remove( 'winner' );
  document.querySelector( '.player-0-panel' ).classList.remove( 'winner' );
  document.querySelector( '#name-1' ).textContent = 'Player 2';
  document.querySelector( '#name-0' ).textContent = 'Player 1';


  scores = [ 0 , 0 ];
  active_player = 0;

  document.getElementById( 'score-0' ).innerHTML = '0';
  document.getElementById( 'score-1' ).innerHTML = '0';

  document.getElementById( 'current-0' ).innerHTML = '0';
  document.getElementById( 'current-1' ).innerHTML = '0';

  document.getElementById( 'btn-roll' ).style.display = 'block';
  document.getElementById( 'btn-hold' ).style.display = 'block';
}



function roll_dice(){

  let player_current_score = document.getElementById( 'score-' + active_player );

   let dice_1 =Math.floor(  Math.random() * 6 ) + 1;
   let dice_2 =Math.floor(  Math.random() * 6 ) + 1;


   
   if( dice_1 === 1 || dice_2 === 1 ){
      
      player_current_score.innerHTML = '0';

      document.querySelector( '.player-' + active_player + '-panel' ).classList.remove( 'active' );
      active_player === 0 ? active_player = 1 : active_player = 0;
      document.querySelector( '.player-' + active_player + '-panel' ).classList.add( 'active' );

      player_current_score = document.getElementById( 'score-' + active_player );

      document.getElementById( 'dice-1' ).style.display = 'none';
      document.getElementById( 'dice-2' ).style.display = 'none';



   } else {

      let value = parseInt( player_current_score.innerHTML )
      player_current_score.innerHTML = '';
      player_current_score.append( value  + dice_1 + dice_2 );

      let dice_img_1 =  document.getElementById( 'dice-1' );
      dice_img_1.src = `img/dice-${dice_1}.png`;
      dice_img_1.style.display = 'block';
 

      let dice_img_2 =  document.getElementById( 'dice-2' );
      dice_img_2.src = `img/dice-${dice_2}.png`;
      dice_img_2.style.display = 'block';

   }


}




function hold(){



  let local_score =  parseInt( document.getElementById( 'score-' + active_player ).innerHTML );
  if( local_score > 0 ){

      scores[ active_player ] += local_score;
      document.getElementById( 'current-' + active_player ).innerHTML = scores[ active_player ];
      document.getElementById( 'score-' + active_player ).innerHTML = '0';




      if( scores[ active_player ] < 100 ) {
          document.querySelector( '.player-' + active_player + '-panel' ).classList.remove( 'active' );
          active_player === 0 ? active_player = 1 : active_player = 0;
          document.querySelector( '.player-' + active_player + '-panel' ).classList.add( 'active' );
          document.getElementById( 'dice-1' ).style.display = 'none';
          document.getElementById( 'dice-2' ).style.display = 'none';
      }



      else {
          document.querySelector( '#name-' + active_player ).textContent = 'Winner!';
          document.getElementById( 'dice-1' ).style.display = 'none';
          document.getElementById( 'dice-2' ).style.display = 'none';
          document.querySelector( '.player-' + active_player + '-panel' ).classList.add( 'winner' );
          document.querySelector( '.player-' + active_player + '-panel' ).classList.remove( 'active' );
          //.style.display = 'none';
          document.getElementById( 'btn-roll' ).style.display = 'none';
          document.getElementById( 'btn-hold' ).style.display = 'none';
      }
  }
  
}
