function makeWorld(MAP_SIZE, MAP_OFFSET, seed, landPercent) {
	
	oceanPercent = 1 - landPercent; // get the "ocean percent" from the land percent. for example 60% land means 40% ocean
	seedRNG = new Math.seedrandom(seed); // create a new seeded random
	
	percent = -1;
	
	for (y = 0; y < MAP_SIZE; y++) {
		
		if (y >= ((MAP_SIZE/100)*percent+1)) {
			percent++
		}
		console.log(percent + "%");
		
		for (x = 0; x < MAP_SIZE; x++) { // loop through the map size
		
		if (Core.tiles[x][y] == null) {
			
				height = PerlinNoise.noise((x/50) + MAP_OFFSET, (y/50) + MAP_OFFSET, seed/Math.pow(seed.toString().length, 10)*16); // get some perlin noise
				
				if (height <= 0.169) { // these two are for volcanos
					createObject("lava", x, y);
				} else if (height <= 0.2) {
					createObject("basalt", x, y);
				} else if (height <= 0.8) { // this is non volcano/montains
					
					height = PerlinNoise.noise((x/50) + MAP_OFFSET, (y/50) + MAP_OFFSET, seed/seed.toString().length); // make new perlin noise, different
					if (height <= oceanPercent) { // if the height is under the ocean percent
						if (seedRNG() <= 0.001) { // if the seeded random gives something less that 0.001, we make an oil field here
							
							for (x2 = -5 + x; x2 < 5 + x; x2++) {
								for (y2 = -5 + y; y2 < 5 + y; y2++) { // loop through a 10x10 box with the current x,y as the center
									height2 = seedRNG();
									
									if (height2 <= 0.05) { // if the seeded random is less than 0.05 (5% chance)
										if (Core.tiles[x][y] != null) {
											Core.tiles[x][y] = null; // if there is something here, delete it
										}
										createObject("oil", x, y); // make oil here
									} else {
										if (Core.tiles[x][y] == null) {
											createObject("dWater", x, y); // if not making oil, make deep water instead. This was a quick patch for a bug where some deep water was left out
										}
									}
								}
							}
							
						} else {
							createObject("dWater", x, y); // not making oil field, just make deep water
						}
					} else if (height <= oceanPercent + 0.01) {
						createObject("water", x, y); // water next to deep water
					} else if (height <= oceanPercent + 0.02) {
						createObject("beach", x, y); // beach next to water
					} else {
						GenTempMap(x, y, MAP_SIZE, MAP_OFFSET, seed)
						//createObject("grass", x, y);
					}
					
				} else if (height <= 0.81) { // mountains
					createObject("lMountain", x, y);
				} else if (height <= 0.82) {
					createObject("hMountain", x, y);
				} else {
					createObject("sMountain", x, y);
				}
			}
		}
	}
}

function GenTempMap(x, y, MAP_SIZE, MAP_OFFSET, seed) {
	height = PerlinNoise.noise((x/70) + MAP_OFFSET, (y/70) + MAP_OFFSET, seed/seed.toString().length)
	
	if (height <= 0.4) {
		GenColdMap(x, y, MAP_SIZE, MAP_OFFSET, seed);
	} else if (height <= 0.6) {
		GenTemperateMap(x, y, MAP_SIZE, MAP_OFFSET, seed);
	} else {
		GenHotMap(x, y, MAP_SIZE, MAP_OFFSET, seed);
	}
}

function GenColdMap(x, y, MAP_SIZE, MAP_OFFSET, seed) {
	height = PerlinNoise.noise((x/50) + MAP_OFFSET, (y/50) + MAP_OFFSET, seed/Math.pow(10, seed.toString().length)*Math.pow(seed.toString().length, 10));
	
	if (height <= 0.25) {
		createObject("iceCap", x, y);
	} else if (height <= 0.5) {
		createObject("iceWater", x, y);
	} else if (height <= 0.75) {
		createObject("tundra", x, y);
	} else {
		createObject("taiga", x, y);
	}
}

function GenTemperateMap(x, y, MAP_SIZE, MAP_OFFSET, seed) {
	height = PerlinNoise.noise((x/50) + MAP_OFFSET, (y/50) + MAP_OFFSET, seed/Math.pow(10, seed.toString().length)*Math.pow(seed.toString().length, 10));
	
	if (height <= 0.2) {
		createObject("grass", x, y);
	} else if (height <= 0.4) {
		createObject("forest", x, y);
	} else if (height <= 0.6) {
		createObject("dForest", x, y);
	} else if (height <= 0.8) {
		createObject("grove", x, y);
	} else {
		createObject("spring", x, y);
	}
}

function GenHotMap(x, y, MAP_SIZE, MAP_OFFSET, seed) {
	height = PerlinNoise.noise((x/50) + MAP_OFFSET, (y/50) + MAP_OFFSET, seed*Math.pow(10, seed.toString().length));
	
	if (height <= 0.3) {
		createObject("desert", x, y);
	} else if (height <= 0.4) {
		createObject("saltFlat", x, y);
	} else if (height <= 0.6) {
		createObject("savannah", x, y);
	} else if (height <= 0.8) {
		createObject("jungle", x, y);
	} else if (height <= 0.9) {
		createObject("dJungle", x, y);
	} else {
		createObject("steppe", x, y);
	}
}