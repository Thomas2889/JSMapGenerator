function visualUpdate() {
	
	Core.myGameArea.clear(); // clear the game area
		
	for (x = 0; x < Core.tiles.length; x++) {
		for (y = 0; y < Core.tiles[x].length; y++) {
			if (Core.tiles[x][y] != null) {
				Core.tiles[x][y].update(); // update all of the tiles (if they exist)
			}
		}
	}
	
	
	if (Core.mouseOn == true) { // update the mouse object if the mouse is on the canvas
		if (0 <= Core.selChunkX && Core.selChunkX < Core._WORLD_SIZE && 0 <= Core.selChunkY && Core.selChunkY < Core._WORLD_SIZE) { // if the mouse is inside of the "game area" use inbounds color
			Core.mouse.update(Core.selChunkX, Core.selChunkY, true);
		} else { // otherwise use the "out of bounds" color
			Core.mouse.update(Core.selChunkX, Core.selChunkY, false);
		}
		
	}
	
	GUITick();
	
}