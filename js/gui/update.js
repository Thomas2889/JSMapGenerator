function UpdateGUI(mouseX, mouseY) {
	
	UpdateMouseDesc();
	
}

function UpdateMouseDesc() {
	
	xPos = Core.selChunkX;
	yPos = Core.selChunkY;

	if (0 <= Core.selChunkX && Core.selChunkX < Core._WORLD_SIZE && 0 <= Core.selChunkY && Core.selChunkY < Core._WORLD_SIZE) {
		
		if (Core.tiles[xPos][yPos] != null) {
			terrainType = Core.tiles[xPos][yPos].type;
		} else {
			terrainType = "None";
		}
		
		if (terrainType != "None") {
			type = terrainType;
			terrainType = "ERROR";
			for (i = 0; i < Core.terrainTypes.length; i++) {
				if (type == Core.terrainTypes[i][0]) {
					terrainType = Core.terrainTypes[i][1];
					break;
				}
			}
		}
		
		html = document.getElementById("MouseDesc_Coords");
		html.style.color = null;
		html.innerHTML = xPos + " | " + yPos;
		html = document.getElementById("MouseDesc_TileType");
		html.style.color = null;
		if (terrainType == "ERROR") {html.style.color = "#FF0000";}
		html.innerHTML = "tile: " + terrainType;
	
	} else {
		
		html = document.getElementById("MouseDesc_Coords");
		html.style.color = "#990000";
		html.innerHTML = xPos + " | " + yPos;
		html = document.getElementById("MouseDesc_TileType");
		html.style.color = "#990000";
		html.innerHTML = "out of bounds";
		
	}
	
}


function GUITick() {
	UpdateContextMenu();
}

function UpdateContextMenu() {
	rect = Core.myGameArea.canvas.getBoundingClientRect();
	
	mouseX = (Core.selChunkX*10) + rect.left + Core.panVars.panning.offset.x;
	mouseY = (Core.selChunkY*10) + rect.top + Core.panVars.panning.offset.y;
	
	contextMenu = document.getElementById("ContextMenu");
	
	if (Gui.contextTarget && !Gui.contextActive) {
		Gui.contextActive = true;
		contextMenu.style.visibility = "visible";
		
		contextMenu.style.top = mouseY + 10;
		contextMenu.style.left = mouseX + 10;
		
	} else if (!Gui.contextTarget && Gui.contextActive) {
		Gui.contextActive = false;
		contextMenu.style.visibility = "hidden";
		
		while (contextMenu.firstChild) {
			contextMenu.removeChild(contextMenu.firstChild);
		}
	}
}