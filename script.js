let coord_url = "https://api.ipbase.com/v1/json/?apikey=58Y95z2oJWC033H3s5St7toMbowBSnvcMzVGzbmm"
let forecast_url = "https://api.openweathermap.org/data/2.5/forecast?lat=41.01030349731445&lon=41.01030349731445&appid=303181f2a99c8ec0f1ae511c681c0047&units=imperiali"

if (coord_url){
	fetch(coord_url)
		.then(response => response.json())
		.then( json => {
			theData = json;
		})
		.finally(() => {
			let latitude = theData.latitude;
			let longitude = theData.longitude;
			var city = theData.city;
			var state = theData.region_name;
			var country = theData.country_name;
			
			var lat_and_long_text = `You are located in ${city}, ${state}, ${country} at coordinates (${latitude}, ${longitude})`;
			document.getElementById("main_div_location_text").textContent = lat_and_long_text;

			weather_url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=303181f2a99c8ec0f1ae511c681c0047&units=imperial`;
			fetch(weather_url)
				.then(response => response.json())
				.then(json => {
					current_weather_data = json;
				})
				.finally(()=>{
					console.log("secured the weather data");
					//current weather conditions at @time and @date
					var current_temp = current_weather_data.main.temp;
					var high_temp = current_weather_data.main.temp_max;
					var low_temp = current_weather_data.main.temp_min;
					var sky_conditions = current_weather_data.weather[0].description;
					var humidity = current_weather_data.main.humidity;
					var pressure = current_weather_data.main.pressure;
					
					document.getElementById("current_temp").textContent = `Currently ${current_temp}`;
					document.getElementById("high_temp").textContent = `High ${high_temp}`;
					document.getElementById("low_temp").textContent = `Low ${low_temp}`;
					document.getElementById("weather_condition").textContent = sky_conditions;
					document.getElementById("humidity").textContent = `${humidity}% humidity`;
					document.getElementById("pressure").textContent = `${pressure} hPa pressure`;

				});
				
		});
	fetch(forecast_url)
		.then(response => response.json())
		.then(json => {
			forecast_data = json;
		})
		.finally(() => {
			for (entry in forecast_data.list){
				//let date_time = obj.dt_txt; 
				let mainDiv = document.createElement("div");
				let header = document.createElement("h2");
				header.textContent = forecast_data.list[entry].dt_txt;
				mainDiv.appendChild(header);
				mainDiv.setAttribute('style','background-color: #808080');
				mainDiv.setAttribute('class','stuff-box');
				let frame_div = document.getElementById("5day_forecast");
				
				frame_div.appendChild(mainDiv);
			}
		});
};

