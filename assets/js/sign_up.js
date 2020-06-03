function sign_up(){
  //window.location = popo;
  var username = document.forms["signup"]["username"].value;
  var email = document.forms["signup"]["email"].value;
  var password = document.forms["signup"]["password"].value;
  var password2 = document.forms["signup"]["password2"].value;

  const s = [username, email, password, password2];
  console.log(s);

  fetch('/signup' , {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(s)
  })
  .then(res => {

    if(res.status==402){
    alert("All fields must be completed");
    }
    if(res.status==405){
    alert("Passwords do not match, try again");
    }
    if(res.status==400){
    alert("The username: "+username+" is not available");
    }
    if(res.status==403){
    alert("An account with the email "+email+", already exists");
    }
    if(res.status==301){
    console.log(window.location)
    window.location = '/login.html';
    alert("Hi "+ username +", you've create an account! Please, login");
    }

  });

}
