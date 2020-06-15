let myUser = document.querySelector(".user");
fetch("v1/users/me").then(function(response){

  response.json().then(res=>{

    if(res.error!=undefined){
      return {username: "Sorry, you must be logged in"};
    }
    else{
      return res;
    }
  }).then(function(json){
    let user = document.createElement("p");
    user.innerHTML=`Welcome ${json.username}!`;
    myUser.appendChild(user);
    document.getElementById("username").innerHTML = `<p>${json.username}</p>`;
    document.getElementById("email").innerHTML = `<p>${json.email}</p>`;

  });
});
