var api= "https://fcc-weather-api.glitch.me/api/current?";
var lat,lon;
var tempUnit= 'C';
var currentTempInCelcius;

$( document ).ready(function(){
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(function(position){
			console.log(position)
			var lat= "lat=" + position.coords.latitude;
			var lon= "lon=" + position.coords.longitude;
			getWeather(lat, lon);
		});
	}
	else {
		console.log("Your device does not support Geolocation")
	}


	// $("#tempunit").click(function(){
	// 	var currentTempUnit= $("#tempunit").text();
	// 	var newTempUnit = currentTempUnit == "C"?"F":"C";
	// 	$("#tempunit").text(newTempUnit);
	// 	if ( newTempUnit == "F"){
	// 		var fahtemp= Math.round(parseInt("#temp".text())*9/5+32);
	// 		$("#temp").text(fahtemp + " " + String.fromCharCode(176));
	// 	}
	// 	else{
	// 		$("#temp").text(currentTempInCelcius + " " + String.fromCharCode(176));
	// 	}
	// });

	function getWeather(lat, lon){
		var urlString = api + lat + "&" + lon;
		$.ajax({
			url: urlString, success: function(result){
				$("#city").text(result.name+", ");
				$("#country").text(result.sys.country);
				currentTempInCelcius= Math.round(result.main.temp*10)/10;
				$("#temp").text(currentTempInCelcius);
				$("#tempunit").text(tempUnit);
				$("#desc").text(result.weather[0].main);
			}
		});
	} 
});

// Tony alicea