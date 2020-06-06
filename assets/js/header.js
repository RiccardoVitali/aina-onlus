fetch("v1/users/me").then(function(response){

  response.json().then(res=>{

    if(res.error!=undefined){
      document.getElementById("header").innerHTML = `<nav class="navbar navbar-expand-lg navbar-light bg-light ml-5 mr-5">


        <a class="navbar-brand" href="#">
          <img src="assets/img/logo.png" width="150" height="150" class="d-inline-block align-top" alt="">

        </a>

        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse " id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item ">
              <a class="nav-link" href="#">Services <span class="sr-only"></span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Events</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">People</a>
            </li>
            <li class="nav-item">
              <a class="nav-link " href="#">Association</a>
            </li>
            <li class="nav-item">
              <a class="nav-link " href="#">Support Us</a>
            </li>
            <li class="nav-item">
              <a class="nav-link " href="#">Contact Us</a>
            </li>

          </ul>
          <form class="form-inline">
        <button class="btn btn-danger" type="button">Log In</button>
        </div>

      </nav>`

      return;
    }
    else{
      document.getElementById("header1").innerHTML = `<nav class="navbar navbar-expand-lg navbar-light bg-light ml-5 mr-5">


        <a class="navbar-brand" href="#">
          <img src="assets/img/logo.png" width="150" height="150" class="d-inline-block align-top" alt="">

        </a>

        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse " id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item ">
              <a class="nav-link" href="#">Services <span class="sr-only"></span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Events</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">People</a>
            </li>
            <li class="nav-item">
              <a class="nav-link " href="#">Association</a>
            </li>
            <li class="nav-item">
              <a class="nav-link " href="#">Support Us</a>
            </li>
            <li class="nav-item">
              <a class="nav-link " href="#">Contact Us</a>
            </li>

          </ul>
          <form class="form-inline">
        <button class="btn btn-danger" type="button">Log Out</button>
        <button class="btn btn-danger" type="button">My aina</button>
        </div>

      </nav>`

      return ;
    }
  })
});
