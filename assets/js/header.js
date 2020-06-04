fetch("v1/users/me").then(function(response){

  response.json().then(res=>{

    if(res.error!=undefined){
      document.getElementById("header").innerHTML = `<div class="container-fluid mr-5 ml-5 d-flex align-items-center">

      <div class="logo mr-auto">

        <a href="/"><img src="assets/img/logo.png" alt="" class="img-fluid"></a>
      </div>

      <nav class="nav-menu d-none d-lg-block">
        <ul>
          <li><a href="/allservices.html">Services</a></li>
          <li><a href="/allevents.html">Events</a></li>
          <li><a href="/allpeople.html">People</a></li>
          <li><a href="/association.html">Association</a></li>
          <li><a href="/supportus.html">Support Us</a></li>

          <li><a href="/login.html">  <span id="login">Log in</span> </a></li>


        </ul>
      </nav>



    </div>`

      return;
    }
    else{
      document.getElementById("header").innerHTML = `<div class="container-fluid mr-5 ml-5 d-flex align-items-center">

      <div class="logo mr-auto">

        <a href="/"><img src="assets/img/logo.png" alt="" class="img-fluid"></a>
      </div>

      <nav class="nav-menu d-none d-lg-block">
        <ul>
          <li><a href="/allservices.html">Services</a></li>
          <li><a href="/allevents.html">Events</a></li>
          <li><a href="/allpeople.html">People</a></li>
          <li><a href="/association.html">Association</a></li>
          <li><a href="/supportus.html">Support Us</a></li>

          <li><a href="/dash.html">  <span id="login">MY AINA</span> </a></li>
          <li><form style="padding-top:5px;" method="post" action="v1/users/logout">
                      <input id="login" type="submit" value="logout" />
                    </form></li>


        </ul>
      </nav>



    </div>`

      return ;
    }
  })
});
