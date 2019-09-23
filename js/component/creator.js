function createObject(type, locX, locY) {
	color = "#ff0000";
	
	// lengthy way to get the right color from type
	for (i = 0; i < Core.terrainTypes.length; i++) {
		if (type == Core.terrainTypes[i][0]) {
			color = Core.terrainTypes[i][2];
			break;
		}
	}
	
	Core.tiles[locX][locY] = new Component.component(color, locX, locY, type); // add the object
}