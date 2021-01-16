$(document).ready(function() {
	//consts for canvas
	const canvas = document.querySelector('.myCanvas');
	const width = canvas.width = window.innerWidth;
	const height = canvas.height = window.innerHeight;
	const ctx = canvas.getContext('2d');
	var set = createPoints(50);
	plotPoints(set);
	jarvis(organizeSetX(set));
	function getRandomInt(max) {
		return Math.floor(Math.random() * Math.floor(max));
	}

	//create set of random points
	function createPoints(amount) {
		var pointSet = new Array();
		for (i = 0; i < amount; i++) {
			var x = getRandomInt(width);
			var y = getRandomInt(height);
			var point = [x, y];
			pointSet.push(point);
		}
		return pointSet;
	}

	//plot all points created by createPoints method
	function plotPoints(pointSet) {

		var pointSize = 5; // Change according to the size of the point.
		ctx.fillStyle = "#000"; // Red color
		for (i = 0; i < pointSet.length; i++) {
			ctx.beginPath(); //Start path
			ctx.arc(pointSet[i][0], pointSet[i][1], pointSize, 0, Math.PI * 2, true); // Draw a point using the arc function of the canvas with a point structure.
			ctx.fill(); // Close the path and fill.
		}
	}

	//create array
	//1: organized from leftmost to rightmost point (if two points have same x value organize from top to bottom)
	function organizeSetX(pointSet) {
		var sortedX = pointSet.slice();
		return sortedX.sort(function(a, b) {
			if (a[0] == b[0]) return a[1] - b[1];
			return a[0] - b[0];
		});
		console.log("setX");
		console.log(sortedX);
	}

	function isToLeft(initial, checking, next){
		var A = initial;
		var B = checking;
		var C = next;
    	var Bx = B[0] - A[0];
    	var By = B[1] - A[1];
    	var Cx = C[0] - A[0];
    	var Cy = C[1] - A[1];
 
    	// Determining cross Product
		var cross = Bx * Cy - By * Cx;
		if(cross < 0){
			return false;
		}
		if(cross > 0){
			return true
		}
		return false;
	}

	function jarvis(set){
		console.log(set);
		var initialPoint = set[0];
		var finalPoint = set[0];
		var setSize = set.length;
		do{
			var index = 0;
			var nextPoint = set[index];
		if(setSize - set.length < 3){
			nextPoint = set[index + 1];
		}
		
		
		for(var i = 1; i < set.length - 1; i++){

			var checkingPoint = set[index + 2];
			console.log(initialPoint);
			if(isToLeft(initialPoint, checkingPoint, nextPoint)){
			nextPoint = checkingPoint;
			}
			index = index + 1;
		}

		ctx.beginPath();
		ctx.moveTo(initialPoint[0], initialPoint[1]);
		ctx.lineTo(nextPoint[0], nextPoint[1]);
		ctx.stroke();
		
		set.splice(set.indexOf(nextPoint), 1);
		initialPoint = nextPoint;
	}while(initialPoint != finalPoint);
	}
});