fetch("v1/events").then(function(response){
  return response.json();
}).then(function(json){

for(let i=0;i<json.length;i++){
  document.getElementById("events_card").innerHTML += `<li data-tags="${json[i].date.substring(3,6)}">



      <div class="uk-card-small uk-card-default uk-card-body uk-first-column"><div>
        <a href="/event.html?${json[i].id}" class="link-details" title="More Details"><img src="assets/img/events/${json[i].photo_url}" class="img-fluid" alt="">
        </a> <br>
        <div class="portfolio-info"><br>
                  <h4><a href="/event.html?${json[i].id}"><span style="color:black">${json[i].name}</span></a></h4>
                  <p><i class="fas fa-map-marker-alt"> </i>&nbsp${json[i].location} <br>
                  <i class="far fa-clock"> </i>&nbsp${json[i].date}</p>
                </div>

      </div></li>
      `
          }
});

