



let floorMaterial = new Material();
floorMaterial.albedoColor= new Color4(0.1875, 0.4140625, 0.21875, 1);

let floor = new Entity();
floor.addComponent(new Transform({
  position: new Vector3(8, 0, 8),
  scale: new Vector3(16, 0.1, 16)
}))
floor.addComponent(new BoxShape());
floor.addComponent(floorMaterial);

engine.addEntity(floor);




const buidlBoxMaterial = new Material();
buidlBoxMaterial.albedoColor = new Color3(0.75, 0.75, 0.75);


const buidlBox = new Entity();
buidlBox.addComponent(new Transform({
  position: new Vector3(8, 3, 8),
  scale: new Vector3(4, 4, 0.5),
  rotation: Quaternion.Euler(0, 270, 0)
}));
buidlBox.addComponent(new BoxShape());

buidlBox.addComponent(buidlBoxMaterial);


const buidlBoxTextLabel = new Entity();
buidlBoxTextLabel.addComponent(new Transform({
  position: new Vector3(0, 0, -0.55),
  scale: new Vector3(0.75, 0.75, 1),
  rotation: Quaternion.Euler(0, 0, 0)
}))
const buidlBoxText = new TextShape("BUIDL\nIN\nPROGRESS!");

buidlBoxText.fontSize = 2;
buidlBoxText.hTextAlign = "center";
buidlBoxText.color = new Color3(1, 0, 0);

buidlBoxTextLabel.addComponent(buidlBoxText);

engine.addEntity(buidlBoxTextLabel);

engine.addEntity(buidlBox);

buidlBoxTextLabel.setParent(buidlBox);




@Component("cryptonautRotator")
export class CryptonautRotator {
  active: boolean;
  speed: number;
  direction: Vector3;

  constructor(active:boolean, speed:number, direction:Vector3) {
    this.active = active;
    this.speed = speed;
    this.direction = direction;
  }
}


let randomSouthSpin = new Vector3(Math.random(), Math.random(), Math.random());
let randomEastSpin = new Vector3(Math.random(), Math.random(), Math.random());
let randomNorthSpin = new Vector3(Math.random(), Math.random(), Math.random());


let cryptonautImageMaterial = new BasicMaterial();
cryptonautImageMaterial.texture = new Texture("images/cryptonaut.jpg", {hasAlpha: false, wrap:3});


let cryptonautCubeSouth = new Entity();
cryptonautCubeSouth.addComponent(new Transform({
  position: new Vector3(8, 2, 2),
  scale: new Vector3(1, 1, 1),
  rotation: Quaternion.Euler(0, 0, 0)
}))
cryptonautCubeSouth.addComponent(new BoxShape());

cryptonautCubeSouth.addComponent(cryptonautImageMaterial);

cryptonautCubeSouth.addComponent(new CryptonautRotator(true, 100, randomSouthSpin));

engine.addEntity(cryptonautCubeSouth);


let cryptonautCubeEast = new Entity();
cryptonautCubeEast.addComponent(new Transform({
  position: new Vector3(12, 2, 8),
  scale: new Vector3(1, 1, 1),
  rotation: Quaternion.Euler(0, 0, 0)
}))
cryptonautCubeEast.addComponent(new BoxShape());

cryptonautCubeEast.addComponent(cryptonautImageMaterial);

cryptonautCubeEast.addComponent(new CryptonautRotator(true, 100, randomEastSpin));

engine.addEntity(cryptonautCubeEast);

/*
let cryptonautCubeNorth = new Entity();
cryptonautCubeNorth.addComponent(new Transform({
  position: new Vector3(8, 2, 12),
  scale: new Vector3(1, 1, 1),
  rotation: Quaternion.Euler(0, 0, 0)
}))
cryptonautCubeNorth.addComponent(new BoxShape());

cryptonautCubeNorth.addComponent(cryptonautImageMaterial);

cryptonautCubeNorth.addComponent(new CryptonautRotator(true, 100, randomNorthSpin));

engine.addEntity(cryptonautCubeNorth);
*/


let cryptonautRotatorElapsedTime = 0;
let cryptonautCubeEntities = engine.getComponentGroup(CryptonautRotator);

export class CryptonautRotatorSystem implements ISystem {

  update(dt: number) {

    cryptonautRotatorElapsedTime += dt;

    for (let cryptonautCubeEntity of cryptonautCubeEntities.entities) {

      let cryptonautCubeTransform = cryptonautCubeEntity.getComponent(Transform);
      let cryptonautCubeRotator = cryptonautCubeEntity.getComponent(CryptonautRotator);

      if (cryptonautCubeRotator.active) {
        // Spin the cube
        cryptonautCubeTransform.rotate(cryptonautCubeRotator.direction, cryptonautCubeRotator.speed * dt)
      }

    }
    
  }

}

engine.addSystem(new CryptonautRotatorSystem());





// Add more code here







