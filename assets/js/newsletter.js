function check(){
  var email = document.forms["email_form"]["email"].value
  fetch('/newsletter' , {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(email)
  })
  .then(res => {
    if(res.status==402){
    alert("Insert a valid email address");
    }
    if(res.status==400){
    alert("The email:  "+email+"  is already registered");
    }
    if(res.status==301)
    alert("You are now registered to the newsletter! You'll receive Aina's news at:  "+email);
  })

}
