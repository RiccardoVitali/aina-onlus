function check(){
  //window.location = popo;
  var email = document.forms["email_form"]["email"].value
  console.log(email);
  fetch('/newsletter' , {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(email)
  })
  .then(res => {
    if(res.status==402){
    alert("You do not insert anything");
    }
    if(res.status==400){
    alert("The email:  "+email+"  is already registered");
    }
    if(res.status==301)
    alert("You are now registered to the newsletter! You'll receive Aina's news at:  "+email);
  })

}
