$(document).ready(function(){
	var image = $("#rotateble");
	let deg = 90;
	image.click(() =>{
  		image.css("transform","rotate("+deg+"deg)");
  		deg+=90;
  		if (deg === 360) deg = 0;
	});
});