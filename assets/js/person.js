var myString = window.location.search.toString();
var lastChar = myString.substring(1,myString.length);

// related people
fetch("v1/people/"+lastChar).then(function(response){
  return response.json();
}).then(function(json){
  const id = json.id;
  const name = json.name;
  const surname = json.surname;
  const email = json.email;
  const photo_url =json.photo_url;
  const phone = json.phone;
  const role = json.role;
  const description = json.description;
  const main_service = json.main_service;

  fetch("v1/services/"+main_service).then(function(respo){
    return respo.json();
}).then(function(json){
  const main_service_name = json.name;
      var color;
  if(main_service_name=="School"){
    color = "warning";
  }
  if(main_service_name=="Farm & Garden"){
    color = "success";
  }
  if(main_service_name=="Outdoor Activities"){
    color = "info";
  }
  if(main_service_name=="Medical Clinic"){
    color = "danger";
  }
  if(main_service_name=="Accommodation"){
    color = "secondary";
  }
  document.getElementById("person_card").innerHTML = `
  <ul class="uk-breadcrumb">
  <li><a href="/allpeople.html">People</a></li>
  <li><span>${name}</span></li>
  </ul>
  <div class="row">


  <div class="col-lg-4">
    <img src="assets/img/people/p${id}.jpg" class="img-fluid" alt="">
  </div>
  <div class="col-lg-6">
    <h2>${name} ${surname}</h2>
    <h6>${role}</span> <a href="/service.html?${main_service}"><span class="badge badge-${color}">${main_service_name}</span></a></h6>
    <p><span uk-icon="mail"></span>&nbsp${email}</span><br>
    <span uk-icon="receiver"></span>&nbsp${phone}</span></p>
    <p>${description}</p>
  </div>  </div>`
})

  fetch("v1/events").then(function(respo){
    return respo.json();
}).then(function(json){
  var related_events = [];
  for(var t=0;t<json.length;t++){
    if(json[t].person_id==lastChar){
      related_events.push(t);
    }
  }
  for(var z=0;z<related_events.length;z++){
    document.getElementById("relative_events_card").innerHTML += `
  <div>
    <div class="uk-card-small uk-card-default uk-card-body uk-first-column"><div>
      <a href="/event.html?${json[related_events[z]].id}" class="link-details" title="More Details"><img src="assets/img/events/${json[related_events[z]].photo_url}" class="img-fluid" alt="">
      </a> <br>
      <div class="portfolio-info">
                <h4><a href="/event.html?${json[related_events[z]].id}"><br><span style="color:black">${json[related_events[z]].name}</span></a></h4>
                <p><i class="fas fa-map-marker-alt"> </i>&nbsp${json[related_events[z]].location} <br>
                <i class="far fa-clock"> </i>&nbsp${json[related_events[z]].date}</p>
              </div>

    </div>
    </div>`
  }
})

  fetch("v1/rel").then(function(res){
     return res.json();
   }).then(function(json){

     var related_people_ids = [];

     for(let j=0;j<json.length;j++){
       if(json[j].service_id == main_service && json[j].person_id != lastChar){
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
     <div>

      <div class="uk-card-small uk-card-default uk-card-body uk-first-column"><div>
        <a href="/person.html?${related_people_ids[i]}" class="link-details" title="More Details"><img src="assets/img/people/p${related_people_ids[i]}.jpg" class="img-fluid" alt="">
        </a> <br>
        <div class="portfolio-info">
                  <h4><a href="/person.html?${related_people_ids[i]}"><br><span style="color:black">${related_people_name_surname[i]}</span></a></h4>
                  <p>
                  <i class="far fa-clock"> </i>&nbsp${related_people_role[i]}</p>
                </div>

      </div></div>
  `
             }
   }
   get_person_name_surname(related_people_ids);

 });
});


// <div class="uk-child-width-1-3@m uk-grid-small uk-grid-match" uk-grid>
//     <div>
//         <div class="uk-card uk-card-default uk-card-body">
//             <h3 class="uk-card-title">Default</h3>
//             <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
//         </div>
//     </div>
//     <div>
//         <div class="uk-card uk-card-primary uk-card-body">
//             <h3 class="uk-card-title">Primary</h3>
//             <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
//         </div>
//     </div>
//     <div>
//         <div class="uk-card uk-card-secondary uk-card-body">
//             <h3 class="uk-card-title">Secondary</h3>
//             <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
//         </div>
//     </div>
// </div>
