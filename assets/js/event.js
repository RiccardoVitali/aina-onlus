var myString = window.location.search.toString();
  var lastChar = myString.substring(1);

  fetch("v1/events/" + lastChar).then(function(response) {
    return response.json();
  }).then(function(json) {
    const name = json.name;
    const date = json.date;
    const description = json.description;
    const location = json.location;
    const photo_url = json.photo_url
    const map_url = json.map_url
    const personId = json.person_id;
    const serviceId = json.service_id;

    var color;
        if(serviceId==1){ //school
           color = "warning";
        }
        if(serviceId==4){ //Farm
           color = "success";
        }
        if(serviceId==5){ // Accomodation
          color = "info";
        }
        if(serviceId==2){ //Clinic
          color = "danger";
        }
        if(serviceId==3){ // Outdoor activities
          color = "secondary";
        }

    //var person_name_surname;
    fetch("v1/people/" + personId).then(function(res) {
      return res.json();
    }).then(function(json) {
      const person_name_surname = json.name + " " + json.surname;

      fetch("v1/services/" + serviceId).then(function(res) {
        return res.json();
      }).then(function(json) {
        const service_name = json.name;

        document.getElementById("event_card").innerHTML = `   <ul class="uk-breadcrumb">
        <li><a href="/allevents.html">Events</a></li>
        <li><span>${name}</span></li>
        </ul>
        </div>       <div class="row d-flex align-items-center">
          <div class="col-lg-6  ">
            <h2>${name}</h2>
            <p> <span uk-icon="calendar"></span>&nbsp ${date} &nbsp <a href="/service.html?${serviceId}"><span class="badge badge-${color}">${service_name}</span></a><br>
              <span uk-icon="location"></span>&nbsp ${location} </p>
            <p>
${description}
            </p>
            <p> <span uk-icon="user"></span>Organized by <a href="/person.html?${personId}">${person_name_surname}</a> </p>
          </div>
          <div class="col-lg-6">
            <img src="assets/img/events/${photo_url}" class="img-fluid" alt="">
          </div>
        </div>
      <br><br>
        <div class="row">
          <div class="col-lg-6">
            <h3><strong>Address</strong></h3>
            <div class="map-responsive">
    <iframe src="https://www.google.com/maps/embed?${map_url}" width="600" height="450" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
</div>
          </div>
          <div class="col-lg-6 pt-5">
            <h3><strong>Info</strong></h3>
            <button class="uk-button uk-button-default"> <span uk-icon="download"></span>&nbspDownload Flyer</button><br><br>
            <button class="uk-button uk-button-default"><span uk-icon="calendar"></span>&nbspAdd to Calendar </button>

          </div>
        </div>`;
      })
    })
  });
