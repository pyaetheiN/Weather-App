window.addEventListener('load', () => {
  let long;
  let lat;
  
  let timezone = document.querySelector('.timezone__title');
  let iconEl = document.querySelector('.timezone__icon');
  let temperature = document.querySelector('.temp__title');
  let temperatureDesc = document.querySelector('.temp__desc');

  let tempHeader = document.querySelector('.temp__header');
  let tempTitle = document.querySelector('.temp__title');
  let tempSymbol = document.querySelector('.temp__symbol');

  if(navigator.geolocation){ // if this thing exist
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      console.log(lat, long);

      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=960c95e56dc11e6dcb7dc3cc2a9f09fe&units=metric`;

      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data);
          
          const {temp} = data.main;
          const {description, icon} = data.weather[0];
          const {country} = data.sys;

          // set dom elements from api
          temperature.innerText = temp;
          temperatureDesc.innerText = description;
          timezone.innerText = country;
          iconEl.innerHTML = `<img class="timezone__icon" src="icons/${icon}.png" alt="icon">`;

          // formula for fahrenheit
          let fahrenheit = (temp * 1.8) + 32;

          // change symbol
          tempHeader.addEventListener('click', () => {
            if(tempSymbol.innerText === '°C'){
              tempSymbol.innerText = '°F';
              tempTitle.innerText = Math.round(fahrenheit * 100) / 100;
              // tempTitle.innerText = Math.floor(fahrenheit);
            } else{
              tempSymbol.innerText = '°C';
              tempTitle.innerText = temp;
            }
          })

          // set icon
          // setIcons(icon, document.querySelector('.icon'));
        })
    });
  }

  // function setIcons(icon, iconID){
  //   const skycons = new Skycons({color: 'white'});
  //   const currentIcon = icon.replace(/-/g, '_').toUpperCase();
  //   skycons.play();
  //   return skycons.set(iconID, Skycons[currentIcon])
  // }
})