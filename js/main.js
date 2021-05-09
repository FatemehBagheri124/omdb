
        var apiKey = "8250a82f";
        var currentPage = 1;
        var ursearch = "";

        $(".pagination").on("click","a",function(event){

          event.preventDefault();

          $("#load").fadeIn(500);

          currentPage = Number( $(this).text() );

          mysearch();

        })
        
      $("#search").submit(function(event){
        event.preventDefault();
        

        $("#load").fadeIn(500);
        currentPage = 1;
        ursearch = $("#search input").val();
          mysearch();
      })

      
        function mysearch() {
          $.ajax({url:`http://www.omdbapi.com/?s=${ursearch}&page=${currentPage}&apikey=${apiKey}`,

          success:function(data){

          $("#movies > div").remove();

          var results = data.totalResults;
          var allpages= Math.ceil(results/10);

          $(".pagination").html("");

          if(currentPage !== 3 && currentPage !== 1){

          $(".pagination").append(`
              <li class="page-item ${ 1==currentPage ? "active" : "" }">
                <a class="page-link" href="#">${1}</a>
              </li>
              ${ currentPage != 2 ? " <span> &nbsp; ... &nbsp; </span> " : "" }
          `);}
          if(currentPage > 2){

          for(var i=currentPage-2;i<currentPage;i++){
            $(".pagination").append(`
              <li class="page-item ${ i==currentPage ? "active" : "" }">
                <a class="page-link" href="#">${i}</a>
              </li>
            `);
          }

          }

          var nextpages = currentPage+2;
          for(var i=currentPage;i<=( nextpages > allpages ? allpages : nextpages ) ;i++){ 
          $(".pagination").append(`
            <li class="page-item ${ i==currentPage ? "active" : "" }">
              <a class="page-link" href="#">${i}</a>
            </li>
          `);
          }
          if( 
          currentPage != allpages - 2 && 
          currentPage != allpages - 1 &&
          currentPage != allpages
          ){
          $(".pagination").append(`
              <span> &nbsp; ... &nbsp; </span>
              <li class="page-item ${ allpages==currentPage ? "active" : "" }">
                <a class="page-link" href="#">${allpages}</a>
              </li>
          `);
          }

          var movies= data.Search;
          movies.forEach(movie => {

            $("#movies").append(`
            <div class="col-md-3">
            <div class="card">
                <img class="card-img-top" src="${movie.Poster}" alt="Card image cap">
                <div class="card-body">
                <h5 class="card-title">${movie.Title}</h5>
                <p class="card-text"> Type: ${movie.Type}  </p>
                <button data-toggle="modal" data-id="${movie.imdbID}" data-target="#details" class="btn btn-success">More details ...</button>
                </div>
            </div>

            </div>
            
            `)
          });
          },

          complete:function(data){
            $("#load").fadeOut(500);}
          })
       
         }
                


      $("#movies").on("click",`[data-toggle="modal"]`,function(){

        var id = $(this).attr("data-id");

        $.ajax({url:`http://www.omdbapi.com/?i=${id}&apikey=${apiKey}`,
           
        success:function(data) {
          
          $("#details .modal-body").html(""); 
          $("#details .modal-title").text(data.Title);

           

            $("#details .modal-body").append(`

              <img class="d-block mx-auto" src="${data.Poster}" title="${data.Title}" alt="${data.Title}"/>

              <ul class="list-unstyled p-4 ">
                <li> Year : ${data.Year} </li>
                <li> imdbRating : ${data.imdbRating} </li>
                <li> Language : ${data.Language} </li>
                <li> Genre : ${data.Genre} </li>
                <li> Runtime : ${data.Runtime} </li>
                <li> Country : ${data.Country} </li>
                <li> Director : ${data.Director} </li>
                <li> Writer : ${data.Writer} </li>
                <li> Actors : ${data.Actors} </li>
                <li> Plot : ${data.Plot} </li>
                
                
              </ul>  

            `);
  

        }
      })
      })