

(function(){
	 const appId = '927c55ca627f5c91bf490b95dd8ce7ab';

	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(function(position){
			var lat= position.coords.latitude;
			var lon= position.coords.longitude;
			getWeather(lat, lon);
		});
	}
	else{
		alert("Your device does not support geolocation");
	}

	function getWeather(lat, lon){
		var urlString = 'http://api.openweathermap.org/data/2.5/weather?' + 
        'lat='+ lat +
        '&lon='+ lon +
        '&units=metric' +
        '&appId=' + appId;
		$.ajax({
			url: urlString,
			success: function(result){
				$("#city").text(result.name+", ");
				$("#country").text(result.sys.country);
				$("#temp").text(result.main.temp+ "°C");
				$("#description").text(result.weather[0].main);
				//sunrise 
				var now= new Date(result.sys.sunrise*1000);
				var hour= now.getHours();
				var minutes= now.getMinutes();
				(hour>12)?hour=(hour-12):hour=hour;
				(minutes<10)?minutes="0"+minutes:minutes*1;
				var sunrise_time= hour +":"+minutes+" AM";
				$("#sunrise").text("Sunrise: "+sunrise_time);
				//sunset
				var now1= new Date(result.sys.sunset*1000);
				var hour1= now1.getHours();
				var minutes1= now1.getMinutes();
				(hour1>12)?hour1=((hour1)-12):hour1=hour1;
				(minutes1<10)?minutes1="0"+minutes1:minutes1*1;
				var sunset_time= hour1 +":"+minutes1+" PM";
				$("#sunset").text("Sunset: "+sunset_time);

				$("#humidity").text("Humidity: " + result.main.humidity + "%");
				$("#wind").text("Wind Speed: "+ result.wind.speed + "m/s");

				$("#sunIcon").attr('src','assets/img/icons/' + result.weather[0].icon + '.png');

			}
		});
	}
})(jQuery);