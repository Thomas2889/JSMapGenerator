function ContextButton(action) {
	
	Gui.contextTarget = false;
	
	if (action == "delete") {
		Core.tiles[Gui.contextChunks[0]][Gui.contextChunks[1]] = null;
	}
	
}

function MultiToolContext() {
	
	AddContextSplitter("Actions");
	
	if (Core.tiles[Core.selChunkX][Core.selChunkY] != null) {
		AddContextButton("Delete", "delete");
	}
	
	Gui.contextChunks = [Core.selChunkX, Core.selChunkY];
	Gui.contextTarget = true;
	
}

function AddContextButton(text, event, tool=false) {
	
	button = document.createElement("button");
	
	button.className = "ContextMenuButton";
	
	if (!tool) {
		button.onclick = function () { ContextButton(event) };
	} else {
		button.onclick = function () { btnTool(event); Gui.contextTarget = false; };
	}
	
	button.innerHTML = text;
	
	document.getElementById("ContextMenu").appendChild(button);
	
}

function AddContextSplitter(text="") {
	
	splitter = document.createElement("div");
	
	if (text.length == 0) {
		splitter.className = "ContextMenuSplitter";
	} else {
		splitter.className = "ContextMenuSplitterText";
		splitter.innerHTML = text;
	}
	
	document.getElementById("ContextMenu").appendChild(splitter);
	
}