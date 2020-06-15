  fetch("v1/people").then(function(response) {
    return response.json();
  }).then(function(json) {

    for (let i = 0; i < json.length; i++) {
      const id = json[i].id
      const role = json[i].role;
      const name = json[i].name;
      const surname = json[i].surname;
      fetch("v1/services/"+json[i].main_service).then(function(resp){
        return resp.json();
      }).then(function(json){
        const service_name = json.name;

        document.getElementById("people_card").innerHTML += `<li data-tags="${service_name}">

      <div class="uk-card-small uk-card-default uk-card-body uk-first-column"><div>
        <a href="/person.html?${id}" class="link-details" title="More Details"><img src="assets/img/people/p${id}.jpg" class="img-fluid" alt="">
        </a> <br><br>
        <div class="portfolio-info">
                  <h4><a href="/person.html?${id}"><span style="color:black">${name} ${surname}</span></a></h4>
                  <p>
                  <span uk-icon="user"></span>&nbsp${role}</p>
                </div>

      </div></li>`
      })
    };
  });
