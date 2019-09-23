function startController() {
	
	offsetY = -8; // ???
	offsetX = -8; // ???
	Core.myGameArea.canvas.addEventListener("mousemove", GetMousePosition);
	Core.myGameArea.canvas.addEventListener("mousedown", MouseClick);
	Core.myGameArea.canvas.addEventListener("scroll", Scroll);
	document.getElementById("main").onmouseout = MouseOut;
	document.getElementById("main").onmouseover = MouseOver;
	
}

function MouseOver() {
	Core.mouseOn = true;
}

function MouseOut() {
	Core.mouseOn = false;
}

function GetMousePosition(e) {
	rect = Core.myGameArea.canvas.getBoundingClientRect();
	mouseX = e.clientX - rect.left - Core.panVars.panning.offset.x; // get the mouse location relative to the top left of the canvas and accounting for panning offset
	mouseY = e.clientY - rect.top - Core.panVars.panning.offset.y;
	Core.selChunkX = getChunkX(mouseX);
	Core.selChunkY = getChunkY(mouseY);
	
	UpdateGUI(e.clientX, e.clientY);
}

function MouseClick(e) {
	
	openContext = true;
	if (Gui.contextActive) {
		Gui.contextTarget = false;
		openContext = false;
	}
	
	if (e.button == 0) {
	
		if (Core.selectedType != "pan" && Core.selectedType != "multiTool") { // if they aren't using the panning tool
			if (0 <= Core.selChunkX && Core.selChunkX < Core._WORLD_SIZE && 0 <= Core.selChunkY && Core.selChunkY < Core._WORLD_SIZE) { // if the mouse is inside of the "game area"
				collision = false;
				
				if (Core.tiles[Core.selChunkX][Core.selChunkY] != null) { // if there is an object where they clicked
					collision = true;
					if (Core.selectedType == "delete") { // if they are using delete when they clicked the object, delete the object
						Core.tiles[Core.selChunkX][Core.selChunkY] = null;
					}
				}
				
				if (Core.selectedType != "delete") { // if they aren't deleting anything
					if (collision == false) { // if the tile is empty
						
						for (i = 0; i < Core.terrainTypes.length; i++) {
							if (Core.selectedType == Core.terrainTypes[i][0]) {
								making = true;
								break;
							}
						}
						
						console.log(making);
						
						if (making) {
							createObject(Core.selectedType, Core.selChunkX, Core.selChunkY); // make a new component. The component type is defined by selectedType
						}
					}
				}
			}
		} else if (Core.selectedType == "pan") {
			
			window.addEventListener("mousemove", pan); // track the mouse movement in the pan function
			window.addEventListener("mouseup", endPan); // when the user stops holding click it ends the panning control
			Core.panVars.panning.start.x = e.clientX;
			Core.panVars.panning.start.y = e.clientY; // store starting coordinates of the mouse
			
		} else if (Core.selectedType == "multiTool") {
			
			if (openContext) {
				MultiToolContext();
			}
			
		}
		
	} else if (e.button == 2) {
		
		if (openContext) {
			AddContextSplitter("Tools");
			AddContextButton("Pan", "pan", true);
			AddContextButton("Delete", "delete", true);
			AddContextButton("MultiTool", "multiTool", true);
			
			Gui.contextChunks = [Core.selChunkX, Core.selChunkY];
			Gui.contextTarget = true;
		}
		
	}
	
}

function Scroll(e) {
	console.log("test");
}

function pan(e) {
	Core.panVars.panning.offset.x = Core.panVars.global.offset.x + (e.clientX - Core.panVars.panning.start.x);
	Core.panVars.panning.offset.y = Core.panVars.global.offset.y + (e.clientY - Core.panVars.panning.start.y); // get the current offset from the start position
	
	Core.myGameArea.context.setTransform(1, 0, 0, 1, 0, 0); // ensure the scale stays the same
	Core.myGameArea.context.clearRect(0, 0, Core.myGameArea.canvas.width, Core.myGameArea.canvas.height); // clear the game area each mouse movement to prevent sudden teleport-y panning
	Core.myGameArea.context.translate(Core.panVars.panning.offset.x, Core.panVars.panning.offset.y); // do the transform
	visualUpdate(); // force a visual update to make it look smooth, without this it will just flash
}

function endPan(e) {
	window.removeEventListener("mousemove", pan);
	window.removeEventListener("mouseup", endPan); // remove the panning event listeners
	
	Core.panVars.panning.start.x = null; // remove the start positions for panning, ready for next time
	Core.panVars.panning.start.y = null;
	Core.panVars.global.offset.x = Core.panVars.panning.offset.x; // update the global offset
	Core.panVars.global.offset.y = Core.panVars.panning.offset.y;
}