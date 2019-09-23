function GameStartup() {
	
	Core.myGameArea.start();
	
	document.getElementById("ContextMenu").oncontextmenu = function (e) { e.preventDefault(); };
	
	for(x = 0; x < Core._WORLD_SIZE; x++) {
		Core.tiles[x] = []
		for(y = 0; y < Core._WORLD_SIZE; y++) {
			Core.tiles[x][y] = null;
		}
	}
	
	makeWorld(Core._WORLD_SIZE, 0, 0231423765593, 0.4);
	
	Core.mouse = new Component.mouseComponent();
	startController();
	
	setInterval(visualUpdate, 16);
}

setTimeout(GameStartup, 100); // startup after 100 milliseconds to give the page time to load