document.getElementById("footer").innerHTML = `<div class="footer-top ">
  <div class="container-fluid ">
    <div class="row mr-5 ml-5">

      <div class="col-lg-4 col-md-6 footer-contact">
        <h5>TERMS & CONDITION</h5>
        <p>
          We employ the use of cookies. <br>
          By accessing aina-onlus.it, you <br>
          agreed to use cookies in agreement <br>
          with the Aina Onlus’ Privacy Policy.
        </p>
      </div>
      <div class="col-lg-4 col-md-6 footer-contact">
        <a href="/supportus.html">
        <h5 style="color:white;">CONTACT US</h5>
      </a>
        <p>

          <strong>Phone:</strong> +1 5589 55488 55<br>
          <strong>Email:</strong> hello@aina-onlus.it<br>
        </p>
      </div>

      <div class="col-lg-4 col-md-6 footer-newsletter">
        <h5>NEWSLETTER</h5>
<!--
        <form name="newsletter" action="/newsletter" method="post" onsubmit="return check()">
          <input type="email" name="email"><input type="submit" value="Subscribe">
        </form>
      </div>-->
      <form id="email_form" name="email_form" onsubmit="check()">
        <input type="email" name="email"><input type="submit" value="Subscribe">
      </form>
    </div>

    </div>
  </div>
</div>`
