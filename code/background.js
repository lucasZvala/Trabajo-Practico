class Background {
    

    async cargarSpriteSheet() {
        let json = await PIXI.Assets.load('frames/enemy/enemyG.json')
        this.app.stage.addChild(this.sprite)
        this.sprite.anchor.set(0.5, 1)
        this.listo = true


    }

    
}