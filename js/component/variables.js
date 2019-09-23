Component = {
	
	component: class {
		constructor(colorArg, chunkXArg, chunkYArg, typeArg) {
			this.chunkX = chunkXArg;
			this.chunkY = chunkYArg;
			this.x = chunkXArg * Core._CHUNK_SIZE;
			this.y = chunkYArg * Core._CHUNK_SIZE;
			this.color = colorArg;
			this.type = typeArg;
			this.ctx = Core.myGameArea.context;
		}
		
		update() {
			this.ctx.fillStyle = this.color;
			this.ctx.fillRect(this.x, this.y, Core._CHUNK_SIZE, Core._CHUNK_SIZE);
		}
	},
	
	mouseComponent: class {
		constructor() {
			this.x = 0;
			this.y = 0;
			this.inColor = "#FFD700";
			this.outColor = "#FF3100";
			
			this.ctx = Core.myGameArea.context;
		}
		
		update(chunkX, chunkY, inbounds) {
			this.x = chunkX * Core._CHUNK_SIZE;
			this.y = chunkY * Core._CHUNK_SIZE;
			
			this.ctx.globalAlpha = 0.5;
			if (inbounds) {
				this.ctx.fillStyle = this.inColor;
			} else {
				this.ctx.fillStyle = this.outColor;
			}
			this.ctx.fillRect(this.x, this.y, Core._CHUNK_SIZE, Core._CHUNK_SIZE);
			this.ctx.globalAlpha = 1;
		}
	}
	
}