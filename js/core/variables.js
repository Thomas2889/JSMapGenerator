Core = {

	// constants
	_CHUNK_SIZE: 10,
	_WORLD_SIZE: 200,


	// variables
	mouse: null,
	mouseOn: false,
	selChunkX: 0,
	selChunkY: 0,
	selectedType: "pan",

	tiles: [],

	// tile types
	terrainTypes: [
	["grass",		"Grass", 			"#32CD32"],
	["forest",		"Forest", 			"#228B22"],
	["dForest",		"Dark Forest", 		"#006400"],
	["grove",		"Grove", 			"#55FF7F"],
	["spring",		"Spring", 			"#AFEEEE"],
	["desert",		"Desert", 			"#FFE4B5"],
	["saltFlat",	"Salt Flat",		"#F8F8FF"],
	["savannah", 	"Savannah", 		"#DEB887"],
	["jungle", 		"Jungle", 			"#6B8E23"],
	["dJungle", 	"Dense Jungle", 	"#556B2F"],
	["steppe", 		"Steppe", 			"#90EE90"],
	["iceCap", 		"Ice Cap", 			"#F0FFFF"],
	["iceWater", 	"Ice Water", 		"#F0F8FF"],
	["tundra", 		"Tundra", 			"#FFFAFA"],
	["taiga", 		"Taiga", 			"#F5F5DC"],
	["lMountain", 	"Low Mountain", 	"#808080"],
	["hMountain", 	"High Mountain", 	"#C0C0C0"],
	["sMountain",	"Snow Cap", 		"#DCDCDC"],
	["basalt", 		"Basalt", 			"#494949"],
	["lava", 		"Lava", 			"#DC143C"],
	["water", 		"Water", 			"#40E0D0"],
	["dWater", 		"Ocean", 			"#00CED1"],
	["beach", 		"Beach", 			"#FAEBD7"],
	["oil", 		"Oil", 				"#222222"]
	],


	// objects
	myGameArea: { // the canvas in which the graphics are displayed
		canvas: document.createElement("canvas"),
		start: function() {
			console.log(this)
			this.canvas.width = 700;
			this.canvas.height = 700;
			this.canvas.id = "main";
			this.canvas.oncontextmenu = function (e) { e.preventDefault(); };
			this.canvas.style.cursor = "none"; // hides the cursor so that its not visible when its over the canvas
			this.context = this.canvas.getContext("2d");
			document.body.insertBefore(this.canvas, document.body.childNodes[0]); // inserts it at the top of body
		},
		clear: function() {
			this.context.clearRect(0 - Core.panVars.panning.offset.x, 0 - Core.panVars.panning.offset.y, this.canvas.width, this.canvas.height); // creates a "clear rect" over the entire canvas
		}
	},


	// panning objects / variables
	panVars: {
		global : { // global is the current offset from 0, 0 and the current zoom scale
			scale: 1,
			offset: {
				x: 0,
				y: 0
			}
		},

		// the difference between global and panning is that global is updated once panning is over, panning is update during panning

		panning: { // panning is used during the pan action, start is the start mouse position and offset is the offset relative to the start
			start: {
				x: null,
				y: null
			},
			offset: {
				x: 0,
				y: 0
			}
		},

		zooming: { // zooming is used when zooming in and out
			offset: {
				x: 1,
				y: 1
			}
		}
	}

}
