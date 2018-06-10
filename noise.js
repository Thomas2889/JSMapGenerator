// Noise function
PerlinNoise = new function() {

this.noise = function(x, y, z) {

   var p = new Array(512)
   var permutation = [ 151,160,137,91,90,15,
   131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,
   190, 6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,
   88,237,149,56,87,174,20,125,136,171,168, 68,175,74,165,71,134,139,48,27,166,
   77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,
   102,143,54, 65,25,63,161, 1,216,80,73,209,76,132,187,208, 89,18,169,200,196,
   135,130,116,188,159,86,164,100,109,198,173,186, 3,64,52,217,226,250,124,123,
   5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,
   223,183,170,213,119,248,152, 2,44,154,163, 70,221,153,101,155,167, 43,172,9,
   129,22,39,253, 19,98,108,110,79,113,224,232,178,185, 112,104,218,246,97,228,
   251,34,242,193,238,210,144,12,191,179,162,241, 81,51,145,235,249,14,239,107,
   49,192,214, 31,181,199,106,157,184, 84,204,176,115,121,50,45,127, 4,150,254,
   138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180
   ];
   for (var i=0; i < 256 ; i++) 
 p[256+i] = p[i] = permutation[i]; 

      var X = Math.floor(x) & 255,                  // FIND UNIT CUBE THAT
          Y = Math.floor(y) & 255,                  // CONTAINS POINT.
          Z = Math.floor(z) & 255;
      x -= Math.floor(x);                                // FIND RELATIVE X,Y,Z
      y -= Math.floor(y);                                // OF POINT IN CUBE.
      z -= Math.floor(z);
      var    u = fade(x),                                // COMPUTE FADE CURVES
             v = fade(y),                                // FOR EACH OF X,Y,Z.
             w = fade(z);
      var A = p[X  ]+Y, AA = p[A]+Z, AB = p[A+1]+Z,      // HASH COORDINATES OF
          B = p[X+1]+Y, BA = p[B]+Z, BB = p[B+1]+Z;      // THE 8 CUBE CORNERS,

      return scale(lerp(w, lerp(v, lerp(u, grad(p[AA  ], x  , y  , z   ),  // AND ADD
                                     grad(p[BA  ], x-1, y  , z   )), // BLENDED
                             lerp(u, grad(p[AB  ], x  , y-1, z   ),  // RESULTS
                                     grad(p[BB  ], x-1, y-1, z   ))),// FROM  8
                     lerp(v, lerp(u, grad(p[AA+1], x  , y  , z-1 ),  // CORNERS
                                     grad(p[BA+1], x-1, y  , z-1 )), // OF CUBE
                             lerp(u, grad(p[AB+1], x  , y-1, z-1 ),
                                     grad(p[BB+1], x-1, y-1, z-1 )))));
   }
   function fade(t) { return t * t * t * (t * (t * 6 - 15) + 10); }
   function lerp( t, a, b) { return a + t * (b - a); }
   function grad(hash, x, y, z) {
      var h = hash & 15;                      // CONVERT LO 4 BITS OF HASH CODE
      var u = h<8 ? x : y,                 // INTO 12 GRADIENT DIRECTIONS.
             v = h<4 ? y : h==12||h==14 ? x : z;
      return ((h&1) == 0 ? u : -u) + ((h&2) == 0 ? v : -v);
   } 
   function scale(n) { return (1 + n)/2; }
}
// /noise function

// testing vars

//max on W.206 = 16368
TEST_MAP_SIZE = 10000;
TEST_MAP_OFFSET = -10000;

testSeed = Math.random()*1000000000;

testLandPercent = 0.4;

grass=[];
forest=[];
dForest=[];
grove=[];
spring=[];
desert=[];
saltFlat=[];
savannah=[];
jungle=[];
dJungle=[];
steppe=[];
iceCap=[];
iceWater=[];
tundra=[];
taiga=[];
lMountain=[];
hMountain=[];
sMountain=[];
basalt=[];
lava=[];
water=[];
dWater=[];
beach=[];
oil=[];
temp=[];
//

function makeWorld(MAP_SIZE, MAP_OFFSET, seed, landPercent) {
	var timeStart = new Date();
	percent = -1;
	map = [];
	oceanPercent = 1 - landPercent
	var seedRNG = new Math.seedrandom(seed);
	
	console.log("LOADING...");
	// Make island map
	for (var y = 0; y < MAP_SIZE/10; y++) {
		
		if (y >= ((MAP_SIZE/10/100)*percent+1)) {
			percent++
		}
		console.log(percent + "%");
			
		for (var x = 0; x < MAP_SIZE/10; x++) {
			var height = PerlinNoise.noise((x/200) + MAP_OFFSET, (y/200) + MAP_OFFSET, seed/Math.pow(seed.toString().length, 10)*16);
			
			if (height <= 0.169) {
				lava[lava.length] = new component("#DC143C", x, y); // lava
			} else if (height <= 0.2) {
				basalt[basalt.length] = new component("#494949", x, y); // basalt
			} else if (height <= 0.8) {
				
				var height = PerlinNoise.noise((x/200) + MAP_OFFSET, (y/200) + MAP_OFFSET, seed/seed.toString().length);
				if (height <= oceanPercent) {
					if (seedRNG() <= 0.0001) {
						for (var x2 = -5 + x; x2 < 5 + x; x2++) {
							for (var y2 = -5 + y; y2 < 5 + y; y2++) {
								var height2 = seedRNG();
								if (height2 <= 0.05) {
									ctx = myGameArea.context
									var tile = ctx.getImageData(x2*10, y2*10, 10, 10).data
									if (tile[3] == 0) {
										oil[oil.length] = new component("#000000", x2, y2); // OIL
									} else
										ctx.clearRect(x2*10, y2*10, 10, 10);
										oil[oil.length] = new component("#000000", x2, y2); // OIL
								} else {
									ctx = myGameArea.context
									var tile = ctx.getImageData(x2*10, y2*10, 10, 10).data
									if (tile[3] == 0) {
										dWater[dWater.length] = new component("#00CED1", x2, y2); // dWATER
									}
								}
							}
						}
						
					} else {
						dWater[dWater.length] = new component("#00CED1", x, y); // dWATER
					}
				} else if (height <= oceanPercent + 0.01) {
					water[water.length] = new component("#40E0D0", x, y); // WATER
				} else if (height <= oceanPercent + 0.02) {
					beach[beach.length] = new component("#FAEBD7", x, y); // BEACH
				} else {
					makeTempMap(x, y, MAP_SIZE, MAP_OFFSET, seed)
					//grass[grass.length] = new component("#32CD32", x, y); // grass
				}
				
			} else if (height <= 0.81) {
				lMountain[lMountain.length] = new component("#808080", x, y); // lMountain
			} else if (height <= 0.82) {
				hMountain[hMountain.length] = new component("#C0C0C0", x, y); // hMountain
			} else {
				sMountain[sMountain.length] = new component("#DCDCDC", x, y); // sMountain
			}	
		}
	}
	
	var timeEnd = new Date();
	var timeDiff = timeEnd - timeStart;
	console.log("loaded.");
	console.log("Loading took: " + timeDiff + " milliseconds");
	if (oil.length > 0) {
		console.log("made " + oil.length + " oil");
	}
}

function makeTempMap(x, y, MAP_SIZE, MAP_OFFSET, seed) {
	var height = PerlinNoise.noise((x/100) + MAP_OFFSET, (y/100) + MAP_OFFSET, seed/seed.toString().length);
	
	if (height <= 0.4) {
		makeBiomeMap.cold(x, y, MAP_SIZE, MAP_OFFSET, seed);
	} else if (height <= 0.6) {
		makeBiomeMap.temperate(x, y, MAP_SIZE, MAP_OFFSET, seed);
	} else {
		makeBiomeMap.hot(x, y, MAP_SIZE, MAP_OFFSET, seed);
	}	
}

var makeBiomeMap = {
	cold : function(x, y, MAP_SIZE, MAP_OFFSET, seed) {
		var height = PerlinNoise.noise((x/50) + MAP_OFFSET, (y/50) + MAP_OFFSET, seed/seed.toString().length*10);
	
		if (height <= 0.25) {
			iceCap[iceCap.length] = new component("#F0FFFF", x, y); // iceCap
		} else if (height <= 0.5) {
			iceWater[iceWater.length] = new component("#F0F8FF", x, y); // iceWater
		} else if (height <= 0.75) {
			tundra[tundra.length] = new component("#FFFAFA", x, y); // tundra
		} else {
			taiga[taiga.length] = new component("#F5F5DC", x, y); // taiga
		}
	},
	temperate : function(x, y, MAP_SIZE, MAP_OFFSET, seed) {
		var height = PerlinNoise.noise((x/50) + MAP_OFFSET, (y/50) + MAP_OFFSET, seed/Math.pow(10, seed.toString().length)*Math.pow(seed.toString().length, 10));
	
		if (height <= 0.2) {
			grass[grass.length] = new component("#32CD32", x, y); // grass
		} else if (height <= 0.4) {
			forest[forest.length] = new component("#228B22", x, y); // forest
		} else if (height <= 0.6) {
			dForest[dForest.length] = new component("#006400", x, y); // dForest
		} else if (height <= 0.8) {
			grove[grove.length] = new component("#55FF7F", x, y); // grove
		} else {
			spring[spring.length] = new component("#AFEEEE", x, y); // spring
		}
	},
	hot : function(x, y, MAP_SIZE, MAP_OFFSET, seed) {
		var height = PerlinNoise.noise((x/50) + MAP_OFFSET, (y/50) + MAP_OFFSET, seed*Math.pow(10, seed.toString().length));
	
		if (height <= 0.3) {
			desert[desert.length] = new component("#FFE4B5", x, y); // desert
		} else if (height <= 0.4) {
			saltFlat[saltFlat.length] = new component("#F8F8FF", x, y); // saltFlat
		} else if (height <= 0.6) {
			savannah[savannah.length] = new component("#DEB887", x, y); // savannah
		} else if (height <= 0.8) {
			jungle[jungle.length] = new component("#6B8E23", x, y); // jungle
		} else if (height <= 0.9) {
			dJungle[dJungle.length] = new component("#556B2F", x, y); // dJungle
		} else {
			steppe[steppe.length] = new component("#90EE90", x, y); // steppe
		}
	}
}

// TESTING FUNCTIONS BELOW

function component(color, chunkX, chunkY) {
	
	this.chunkX = chunkX
	this.chunkY = chunkY
	this.color = color
    this.x = chunkX * 10
    this.y = chunkY * 10
    ctx = myGameArea.context;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, 10, 10);
	this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, 10, 10);
    }
}


var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = TEST_MAP_SIZE;
        this.canvas.height = TEST_MAP_SIZE;
		this.canvas.id = "main";
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    },
	clear : function() {
        this.context.clearRect(0 - panning.offset.x, 0 - panning.offset.y, this.canvas.width, this.canvas.height);
    }
}


function start() {
	myGameArea.start()
	makeWorld(TEST_MAP_SIZE, TEST_MAP_OFFSET, testSeed, testLandPercent)
}

start() //