var myString = window.location.search.toString();
var lastChar = myString.substring(1,myString.length);

fetch("v1/services/"+lastChar).then(function(response){
  return response.json();
}).then(function(json){
  const name = json.name;
  const description = json.description;
  const photo_url = json.photo_url;

  document.getElementById("service").innerHTML=`
  <ul class="uk-breadcrumb">
  <li><a href="/allservices.html">Services</a></li>
  <li><span>${name}</span></li>
  </ul><div class="row">
          <div class="col-lg-6">
            <h3>${name}</h3>
            <p>${description}</p>
          </div>
          <div class="col-lg-6">
              <br><br><img src="${photo_url}" class="card-img-top" alt="...">
          </div>
        </div>`

  fetch("v1/events").then(function(respo){
    return respo.json();
}).then(function(json){
  let related_events = [];
  for(var t=0;t<json.length;t++){
    if(json[t].service_id==lastChar){
      related_events.push(t);
    }
  }
  for(var z=0;z<related_events.length;z++){
    document.getElementById("relative_events_card").innerHTML += `
<div class="col-lg-4">
    <div class="uk-card-small uk-card-default uk-card-body uk-first-column"><div>
      <a href="/event.html?${json[related_events[z]].id}" class="link-details" title="More Details"><img src="assets/img/events/${json[related_events[z]].photo_url}" class="img-fluid" alt="">
      </a> <br>
      <div class="portfolio-info">
                <h4><a href="/event.html?${json[related_events[z]].id}"><br><span style="color:black">${json[related_events[z]].name}</span></a></h4>
                <p><i class="fas fa-map-marker-alt"> </i>&nbsp${json[related_events[z]].location} <br>
                <i class="far fa-clock"> </i>&nbsp${json[related_events[z]].date}</p>
              </div>

    </div></div>`
  }
})


  fetch("v1/rel").then(function(res){
    return res.json();
  }).then(function(json){
    related_people_ids = [];
    for(var j=0;j<json.length;j++){
      if(json[j].service_id == lastChar){
        related_people_ids.push(json[j].person_id);
      }
    }

    var related_people_name_surname = [];
    var related_people_role = [];
    async function get_person_name_surname(related_people_ids){
      for(let h=0;h<related_people_ids.length;h++){
        let x = await fetch("v1/people/"+related_people_ids[h]).then((res)=>{
          return res.json();
        });
        related_people_name_surname.push(x.name + " " + x.surname);
        related_people_role.push(x.role);
    }
    for(let i=0;i<related_people_ids.length;i++){
      document.getElementById("relative_people_card").innerHTML += `

      <div class="col-lg-4">

       <div class="uk-card-small uk-card-default uk-card-body uk-first-column"><div>
         <a href="/person.html?${related_people_ids[i]}" class="link-details" title="More Details"><img src="assets/img/people/p${related_people_ids[i]}.jpg" class="img-fluid" alt="">
         </a> <br><br>
         <div class="portfolio-info">
                   <h4><a href="/person.html?${related_people_ids[i]}"><span style="color:black">${related_people_name_surname[i]}</span></a></h4>
                   <p>
                   <i class="far fa-clock"> </i>&nbsp${related_people_role[i]}</p>
                 </div>

       </div></div>

      `
              }
    }
    get_person_name_surname(related_people_ids);

  })
  })

