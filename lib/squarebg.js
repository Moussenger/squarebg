"use strict";

var squarebg = function (options) {

	var getRandomInt = function (min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
	};

	var normalizeColorComponent = function (colorComponent) {
		return colorComponent.length == 1 ? "0" + colorComponent : colorComponent;
	};

	var getRandomColor = function () {
		return "#" + 
			   normalizeColorComponent(getRandomInt(0, 255).toString(16)) + 
			   normalizeColorComponent(getRandomInt(0, 255).toString(16)) +
			   normalizeColorComponent(getRandomInt(0, 255).toString(16));
	};

	var drawRectangle = function (context, color, x, y, width, height) {
		context.fillStyle = color;
		context.fillRect(x, y, width, height);
	};

	var drawStroke = function (context, color, width, fromX, fromY, toX, toY) {
		context.strokeStyle = color;

		context.beginPath();
		context.moveTo(fromX, fromY);
		context.lineTo(toX, toY);
		context.lineWidth = width;
		context.stroke();
	};

	var createBaseCanvas = function (bg) {
		bg.canvas        = document.createElement("canvas");
		bg.canvas.width  = bg.width;
		bg.canvas.height = bg.height;
		bg.context       = bg.canvas.getContext("2d");
	};

	var createSquares = function (bg, colors, xSquares, ySquares) {
		var x, y, width, height, color;

		width = bg.width / xSquares;
		height = bg.height / ySquares;

		for (x = 0; x < bg.width; x += width) {
			for (y = 0; y < bg.height; y += height) {
				color = colors[getRandomInt(0, colors.length)];
				drawRectangle(bg.context, color, x, y, width, height);
			}
		}
	};

	var createStrokes = function (bg, colors, strokeWidth, xStrokes, yStrokes) {
		var x, y, xOffset, yOffset, color;

		xOffset = bg.width / xStrokes;
		yOffset = bg.height / yStrokes;

		for (x=0; x <= bg.width; x += xOffset) {
			color = colors[getRandomInt(0, colors.length)];
			drawStroke(bg.context, color, strokeWidth, x, 0, x, bg.height);
		}

		for (y=0; y <= bg.height; y += yOffset) {
			var color = colors[getRandomInt(0, colors.length)];
			drawStroke(bg.context, color, strokeWidth, 0, y, bg.width, y);
		}
	};

	return (function () {
		var bg = {};

		if(!options) return;
 
		bg.width  = options.width  || 100;
		bg.height = options.height || 100;

		bg.fillColors   = options.fillColors   || [];
		bg.strokeColors = options.strokeColors || [];

		bg.xSquares = options.xSquares || [];
		bg.ySquares = options.ySquares || [];

		bg.strokeWidth = options.strokeWidth || 0;

		createBaseCanvas(bg);
		createSquares(bg, bg.fillColors, bg.xSquares, bg.ySquares);
		if(bg.strokeWidth) createStrokes(bg, bg.strokeColors, bg.strokeWidth, bg.xSquares, bg.ySquares);

		return bg.canvas.toDataURL();

	})();
};