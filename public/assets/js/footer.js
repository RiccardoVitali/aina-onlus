document.getElementById("footer").innerHTML = `<div class="footer-top ">
  <div class="container-fluid ">
    <div class="row mr-5 ml-5">

      <div class="col-lg-4 col-md-6 footer-contact">
        <h3 style="color:white">Terms & Conditions</h3>
        <p>
          We employ the use of cookies. <br>
          By accessing aina-onlus.it, you <br>
          agreed to use cookies in agreement <br>
          with the Aina Onlus’ Privacy Policy.
        </p>
      </div>
      <div class="col-lg-4 col-md-6 footer-contact">
        <a href="/contactus.html">
        <h3 style="color:white;">Contact us</h3>
      </a>
        <p>

          <span uk-icon="receiver"></span>&nbsp +1 5589 55488 55<br>
          <span uk-icon="mail"></span>&nbsp hello@aina-onlus.it<br>
        </p>
      </div>

      <div class="col-lg-4 col-md-6 footer-newsletter">
      <div class="container-fluid">
  <div class="row justify-content-start">

     <h3 class="sub-n" style="color:white"> Subscribe to the newsletter </h3>
          <form id="email_form" name="email_form" onsubmit="check()">
              <div class="row d-flex my-2 pr-2 pr-md-5 div1">
                  <div class="col-9"> <input type="email" name="email" class="form-control py-3" id="inp1" placeholder="Enter email address"> </div>
                  <div class="col-3 px-0"> <button class="btn-foot text-white px-4 py-2"><span style="color:black"> OK</span> </button> </div>
               </div>
          </form>
  </div>
</div>
  
    </div>

    </div>
  </div>
</div>`
