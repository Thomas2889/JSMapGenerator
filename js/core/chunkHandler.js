function getChunkX(x) {
	return Math.floor(x / (Core._CHUNK_SIZE * Core.panVars.zooming.offset.x)); // return chunk X for a given coordinate X
}

function getChunkY(y) {
	return Math.floor(y / (Core._CHUNK_SIZE * Core.panVars.zooming.offset.y)); // return chunk Y for a given coordinate Y
}