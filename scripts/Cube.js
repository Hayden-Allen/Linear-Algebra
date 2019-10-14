class Cube {
  constructor(center, w, h, l, theta, phi, psi, colors, alphas){
    this.center = center;
    this.vertices = [
      new Vec3(-w / 2, -h / 2, l / 2),  //top left
      new Vec3(w / 2, -h / 2, l / 2),  //top right
      new Vec3(w / 2, h / 2, l / 2),  //bot right
      new Vec3(-w / 2, h / 2, l / 2),  //bot left
      new Vec3(-w / 2, - h / 2, -l / 2),  //back top left
      new Vec3(w / 2, -h / 2, -l / 2),  //back top right
      new Vec3(w / 2, h / 2, -l / 2),  //back bot right
      new Vec3(-w / 2, h / 2, -l / 2),  //back bot left
    ];
    this.theta = theta;
    this.phi = phi;
    this.psi = psi;
    this.colors = colors;
    this.alphas = alphas;
    this.calculateRotationMatrix();
  }
  calculateRotationMatrix(){
    let s = Math.sin(this.theta), c = Math.cos(this.theta);
    let rz =  new Mat3(new Vec3(c, -s, 0),
                        new Vec3(s, c, 0),
                        new Vec3(0, 0, 1));

    s = Math.sin(this.phi); c = Math.cos(this.phi);
    let ry = new Mat3(new Vec3(c, 0, s),
                      new Vec3(0, 1, 0),
                      new Vec3(-s, 0, c));

   s = Math.sin(this.psi); c = Math.cos(this.psi);
   let rx = new Mat3(new Vec3(1, 0, 0),
                      new Vec3(0, c, -s),
                      new Vec3(0, s, c));

    this.rotationMatrix = rz.multiplyMat3(ry).multiplyMat3(rx);
  }
  draw(){
    let vertices = [];
    let transform = Global.Mat4fromMat3(this.rotationMatrix);
    transform.row1.w = this.center.x;
    transform.row2.w = this.center.y;
    transform.row3.w = this.center.z;
    // transform = Global.perspective.multiplyMat4(transform);
    // console.log(transform);

    this.vertices.forEach(function(v){
      vertices.push(transform.multiplyVec4(new Vec4(v.x, v.y, v.z, 1)).toVec3());
    });



    Global.rect3d(vertices[0], vertices[4], vertices[5], vertices[1], "#000000", this.colors[1], this.alphas[1]);  //top
    Global.rect3d(vertices[0], vertices[4], vertices[7], vertices[3], "#000000", this.colors[2], this.alphas[2]);  //left
    Global.rect3d(vertices[4], vertices[5], vertices[6], vertices[7], "#000000", this.colors[3], this.alphas[3]);  //back
    Global.rect3d(vertices[3], vertices[7], vertices[6], vertices[2], "#000000", this.colors[4], this.alphas[4]);  //bottom
    Global.rect3d(vertices[1], vertices[5], vertices[6], vertices[2], "#000000", this.colors[5], this.alphas[5]);  //right
    Global.rect3d(vertices[0], vertices[1], vertices[2], vertices[3], "#000000", this.colors[0], this.alphas[0]);  //front
    
  }
}
