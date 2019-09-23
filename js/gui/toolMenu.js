function btnTool(type) {
	Core.selectedType = type;
	
	if (type != "multiTool") {
		Gui.contextTarget = false;
	}
	
	var x = document.getElementsByClassName("on");
	for (i = 0; i < x.length; i++) {
		x[i].classList.remove("on");
	}
	
	document.getElementById("btnSelect_" + type).classList.add("on");
}