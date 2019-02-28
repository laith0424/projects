'use strict';

 
const mainRepoUrl = 'https://api.github.com/orgs/HackYourFuture/repos?per_page=100%27';

function contributorUrl( option ) { 
    return `https://api.github.com/repos/HackYourFuture/${option}/contributors`;
 }


 function creatRepoSelect( parent , value , text) {

    let select = document.getElementById( parent );
    let option = document.createElement( "option" );
    option.text = text;
    option.value = value;
    select.appendChild( option )

  }


  function createAndAppend( contr  ) {


    ///////////////////////////////////////////////////////////////////////
    //////////             create the repo info              /////////////
    /////////////////////////////////////////////////////////////////////
      

    let repository = document.getElementById( 'repository' );
    repository.classList.remove( 'NetworkError' ); 
    repository.innerHTML = '';
    

    //let div = document.createElement( 'div' );
    //div.setAttribute( 'class' , 'user' );



    let ul = document.createElement( 'ul' );
    for ( let i = 0 ; i < 4 ; i++ ){
      

        let span = document.createElement( 'span' );
        span.append( Object.keys( contr[ 0 ])[ i ] + '  :  ' );
        span.setAttribute( 'class' , 'u-capitalize-text' );

        let li = document.createElement( 'li' );
        li.append( span );
        li.append( contr[ 0 ][ Object.keys( contr[ 0 ])[ i ] ] );


        ul.appendChild( li );
    }
    // `https://github.com/HackYourFuture/${contr[ 0 ][ Object.keys( contr[ 0 ])[ 0 ] ]}`


    let a_1 = document.createElement( 'a' );
        a_1.href=`https://github.com/HackYourFuture/${contr[ 0 ][ Object.keys( contr[ 0 ])[ 0 ] ]}`;
        a_1.append(`Repository →`);
        a_1.setAttribute( 'class' , 'btn-text u-margin-top-big' );  // btn-text u-margin-top-big  btn btn--green btn--animated

    let li = document.createElement( 'li' );
        li.append( a_1 );

    ul.appendChild( li );
    repository.appendChild( ul );

  

    ///////////////////////////////////////////////////////////////////////
    //////////          create the contributors info         /////////////
    /////////////////////////////////////////////////////////////////////
 
    
    let contributors = document.getElementById( 'Contributors' );
    contributors.classList.remove( 'NetworkError' ); 
    contributors.innerHTML = '';
    for( let i in contr ){

        let div_row = document.createElement( 'div' );
        div_row.setAttribute( 'class' , 'row' );

        let div_contributor = document.createElement( 'div' );
        div_contributor.setAttribute( 'class' , 'contributor' );

        let figure = document.createElement( 'figure' );
        figure.setAttribute( 'class' , 'contributor__shape' );

        let img = document.createElement( 'img' );
        img.src = contr[ i ].getAvatarUrl();
        img.setAttribute( "alt" , contr[ i ].getLogin() );
        img.setAttribute( "class" , "contributor__img" );

        //figcaption
        let figcaption = document.createElement( 'figcaption' );
        figcaption.setAttribute( 'class' , 'contributor__caption' );
        figcaption.setAttribute( 'title' , 'Name' );
        figcaption.append( contr[ i ].getLogin() );

        figure.appendChild( img );
        figure.appendChild( figcaption );

        div_contributor.appendChild(figure);

        let div_contributor__text = document.createElement( 'div' );
        div_contributor__text.setAttribute( 'class' , 'contributor__text' );
        /*
        let h3 = document.createElement( 'h3' );
        h3.setAttribute( 'class' , 'heading-tertiary u-margin-bottom-small' );
        h3.append( contr[ i ].getLogin() );*/

        let p = document.createElement( 'p' );
        p.append( "Contributions: " + contr[ i ].getContributions() );

        let a = document.createElement( 'a' );
        a.href=`https://github.com//${contr[ i ].getLogin()}`;
        a.append(`View Account →`);
        a.setAttribute( 'class' , 'btn-text u-margin-top-big' );

        //div_contributor__text.appendChild( h3 );
        div_contributor__text.appendChild( p );
        div_contributor__text.appendChild( a );
      
        div_contributor.appendChild( div_contributor__text );

        div_row.appendChild(div_contributor);
        contributors.appendChild( div_row );

    }

  }


  function errorStatus( parent , status ){
    let root = document.getElementById( parent );
    root.classList.add( 'NetworkError' );
    root.innerHTML = status; 
  }


  function fetchJSON( url ) {
    return new Promise( ( resolve , reject ) => {
      const xhr = new XMLHttpRequest();
      xhr.open( 'GET', url );
      xhr.onload = () => {
        if ( xhr.status == 200 ) {
          resolve( xhr.responseText );
        } else {
          reject( new Error ( `Network error: ${xhr.status} - ${xhr.statusText}` ) );
        }
      };
      xhr.onerror = () => reject( new Error ( `Network error: ${xhr.status} - ${xhr.statusText}` ) );
      xhr.send();
    });
  }


  async function createContributorsClass( option , myRepos ){
      try{
          const responseText  = await fetchJSON( contributorUrl( option ) );
          const contri = JSON.parse( responseText  );
          let contributors = [];
          for( let i in contri ){

            let contr = new Contributor( myRepos , contri[ i ].login , contri[ i ].contributions , contri[ i ].avatar_url );

            contributors.push( contr );

           }
           createAndAppend(  contributors  );

      }
      catch(err){
        errorStatus( 'Contributors' , err );
      }

}




async  function main() {
    const option  = this.options[ this.selectedIndex ].value;
    try{ 
       const responseText  =  await fetchJSON( mainRepoUrl );
       const repos = JSON.parse( responseText  );
       let myRepos;
       for( let i in repos ){
            if( option == repos[ i ].name ) {

                myRepos = new Repository( repos[ i ].name , repos[ i ].forks , repos[ i ].updated_at , repos[ i ].description );


            }
        }
        createContributorsClass( option , myRepos);
       
     }
    catch ( err ){
        errorStatus( 'repository' , status );
    }
    
}
