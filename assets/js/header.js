fetch("v1/users/me").then(function(response){

  response.json().then(res=>{

    if(res.error!=undefined){
      document.getElementById("header1").innerHTML = `<nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light">


        <a class="navbar-brand" href="/">
          <img src="assets/img/logo.png" width="150" height="150" class="d-inline-block align-top" alt="">

        </a>

        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse " id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item ">
              <a class="nav-link" href="/allservices.html">Services <span class="sr-only"></span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/allevents.html">Events</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/allpeople.html">People</a>
            </li>
            <li class="nav-item">
              <a class="nav-link " href="/association.html">Association</a>
            </li>
            <li class="nav-item">
              <a class="nav-link " href="/supportus.html">Support Us</a>
            </li>
            <li class="nav-item">
              <a class="nav-link " href="/contactus.html">Contact Us</a>
            </li>

          </ul>
        &nbsp<form class="form-inline">
          <a href="login.html"><button class="btn btn-danger" type="button" id="login">Log In</button></a>
        </div>

      </nav>`

      return;
    }
    else{
      document.getElementById("header1").innerHTML = `<nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light " >


        <a class="navbar-brand" href="/">
          <img src="assets/img/logo.png" width="150" height="150" class="d-inline-block align-top" alt="">

        </a>

        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse " id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item ">
              <a class="nav-link" href="/allservices.html">Services <span class="sr-only"></span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="allevents.html">Events</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="allpeople.html">People</a>
            </li>
            <li class="nav-item">
              <a class="nav-link " href="/association.html">Association</a>
            </li>
            <li class="nav-item">
              <a class="nav-link " href="/supportus.html">Support Us</a>
            </li>
            <li class="nav-item">
              <a class="nav-link " href="/contactus.html">Contact Us</a>
            </li>

          </ul>
          <form class="form-inline" method="post" action="v1/users/logout">
<input id="login" type="submit" value="Logout" />
</form>
&nbsp<form class="form-inline">
<a href="dash.html"><button class="btn btn-danger" type="button">My aina</button></a>
</form>
      </nav>`

      return ;
    }
  })
});
