'use strict';
 
fetchJSON( mainRepoUrl )

.then( function( responseText ){           
    const repos = JSON.parse( responseText );
        for( let i in repos ){
            creatRepoSelect( 'select-repository' , repos[ i ].name , repos[ i ].name);
    }

} ).catch( function( status ){                                          

    errorStatus( 'repository' , status );   

} );

document.getElementById( 'select-repository' ).addEventListener( "change" , main );
