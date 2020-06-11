function contact(){
  var email = document.forms["contact-form"]["email"].value;
  var name = document.forms["contact-form"]["name"].value;
  var subject = document.forms["contact-form"]["subject"].value;
  var message = document.forms["contact-form"]["message"].value;

  const m = [name, email, subject, message];

  fetch('/contact' , {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(m)
  })
  .then(res => {

    if(res.status==402){
    alert("All fields must be completed");
    }

    if(res.status==301){
    alert("Hi "+ name +", we've received your message about "+subject+". We'll answer you at "+email);
    }

  });

}
