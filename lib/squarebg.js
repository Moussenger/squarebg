"use strict";

var squarebg = function (options) {

	var getRandomInt = function (min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
	};

	var createBaseCanvas = function (bg) {
		bg.canvas  = document.createElement("canvas");
		bg.context = bg.canvas.getContext("2d");
		bg.imgData = bg.context.createImageData(bg.width, bg.height);
	};

	var createImageData = function (bg) {
		var i, len, r, g, b, a;

		for(i=0, len=bg.imgData.data.length; i<len; i+=4) {
			r = getRandomInt(0, 255);
			g = getRandomInt(0, 255);
			b = getRandomInt(0, 255);
			a = 255;
		}
	};

	(function () {
		var bg = {};

		if(!options) return;
 
		bg.width  = options.width  || 100;
		bg.height = options.height || 100;

		createBaseCanvas(bg);
		createImageData(bg);
		bg.context.putImageData(bg.imgData, 0, 0);
		document.body.appendChild(bg.canvas);
	})();
};