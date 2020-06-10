fetch("v1/services").then(function(response){
  return response.json();
}).then(function(json){

for(let i=0;i<json.length && i<6;i++){
  document.getElementById("services_card").innerHTML += `
<li>


  <div class="uk-card-small uk-card-default uk-card-body uk-first-column"><div>
    <a href="/service.html?${json[i].id}" class="link-details" title="More Details"><img src="${json[i].photo_url}" class="img-fluid" alt="">
    </a> <br><br>
    <div class="portfolio-info">
              <h4><a href="/service.html?${json[i].id}"><span style="color:black">${json[i].name}</span></a></h4>

            </div>

  </div></li>`
          }
});
