Global.init();

let c1 = new Cube(new Vec3(0, 0, -100), 50, 50, 50, 0, 0, 0,
                  ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#00ffff", "#ff00ff"],
                  [1, 1, 1, 1, 1, 1]);

let p1 = new Vec3(0, 0, -1);
let p2 = new Vec3(25, -25, 1);

let speed = 100, omega = Math.PI / 2;
function update(){
  Global.clearScreen();

  c1.center.x -= (Global.keys.at(Global.Key.d) - Global.keys.at(Global.Key.a)) * speed * Global.timeScale();
  c1.center.y -= (Global.keys.at(Global.Key.s) - Global.keys.at(Global.Key.w)) * speed * Global.timeScale();
  c1.center.z += (Global.keys.at(Global.Key.f) - Global.keys.at(Global.Key.r)) * speed * Global.timeScale();
  c1.theta -= (Global.keys.at(Global.Key.e) - Global.keys.at(Global.Key.q)) * omega * Global.timeScale();
  c1.phi -= (Global.keys.at(Global.Key.y) - Global.keys.at(Global.Key.t)) * omega * Global.timeScale();
  c1.psi -= (Global.keys.at(Global.Key.h) - Global.keys.at(Global.Key.g)) * omega * Global.timeScale();
  // c1.theta -= omega * Global.timeScale();
  // c1.psi -= omega * Global.timeScale();
  c1.calculateRotationMatrix();
  c1.draw();

  //Global.line3d(p1, p2, "#000ff0");

  if(Global.keys.at(Global.Key.space))
    c1.theta = c1.phi = c1.psi = 0;

  setTimeout(update, 1000 / 60);
}
update();


window.onkeydown = function(e){
  //console.log(e.keyCode);
  for(var code in Global.Key.Code){
    if(Global.Key.Code[code] === e.keyCode)
      Global.keys.set(Global.Key[code]);
  }
}
window.onkeyup = function(e){
  for(var code in Global.Key.Code){
    if(Global.Key.Code[code] === e.keyCode)
      Global.keys.reset(Global.Key[code]);
  }
}
