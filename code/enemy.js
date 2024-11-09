class Enemy extends Entidad{
    constructor(x, y, juego) {
        super(x,y,juego)
        this.lado =100;
       // this.cargarSpriteSheet()
       this.cargarGrafico()
    }


    cargarGrafico(){
          this.grafico = new PIXI.Graphics()
          .circle(this.x,this.y,10)
          .fill(0xff0000)
          this.container.addChild(this.grafico)
    }




    async cargarSpriteSheet() {
        let json = await PIXI.Assets.load('frames/enemy/enemyG.json')
        this.sprite = new PIXI.AnimatedSprite(json.animations['corriendo']);
        this.sprite.animationSpeed = 0.2
        this.sprite.loop = true
        this.sprite.play()
        this.app.stage.addChild(this.sprite)
        this.sprite.anchor.set(0.5, 1)
        this.listo = true


    }

    update() {

       super.update()


    }
}