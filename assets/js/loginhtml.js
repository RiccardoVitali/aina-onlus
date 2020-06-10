 fetch("v1/users/me").then(function(response) {

    response.json().then(res => {
      if (response.status == 303) {
        return {
          err: "Invalid credentials"
        }
      }
    }).then(function(json) {
      document.getElementById("err").innerHTML = `${json.err}`;

    });
  });
