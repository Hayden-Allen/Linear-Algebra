class Cube {
  constructor(center, w, h, l, theta, phi, psi, colors, alphas){
    this.center = center; //3d point representing the center of this shape
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
    this.theta = theta; //rotation about z-axis
    this.phi = phi; //rotation about y-axis
    this.psi = psi; //rotation about x-axis
    this.colors = colors; //color of each face
    this.alphas = alphas; //opacity of each face
    this.calculateRotationMatrix();
  }
  calculateRotationMatrix(){  //create rotation transformation matrix
    //sin(a + b) = sin(a)cos(b) + cos(a)sin(b)
    //cos(a + b) = cos(a)cos(b) - sin(a)sin(b)
    let s = Math.sin(this.theta), c = Math.cos(this.theta);
    let rz =  new Mat3(new Vec3(c, -s, 0),  //x' = cx - sy
                        new Vec3(s, c, 0),  //y' = sx + cx
                        new Vec3(0, 0, 1)); //z' = z

    s = Math.sin(this.phi); c = Math.cos(this.phi);
    let ry = new Mat3(new Vec3(c, 0, s),    //x' = cx + sz
                      new Vec3(0, 1, 0),    //y' = y
                      new Vec3(-s, 0, c));  //z' = -sx + cz

    s = Math.sin(this.psi); c = Math.cos(this.psi);
   let rx = new Mat3(new Vec3(1, 0, 0),     //x' = x
                      new Vec3(0, c, -s),   //y' = cy - sz
                      new Vec3(0, s, c));   //z' = sy + cz

    this.rotationMatrix = rz.multiplyMat3(ry).multiplyMat3(rx); //combine all into one matrix
  }
  draw(){
    let vertices = [];
    let transform = Global.Mat4fromMat3(this.rotationMatrix); //all rotations in one matrix
    //add translation to transform
    transform.row1.w = this.center.x;
    transform.row2.w = this.center.y;
    transform.row3.w = this.center.z;

    //apply transformation to each vertex
    this.vertices.forEach(function(v){
      vertices.push(transform.multiplyVec4(new Vec4(v.x, v.y, v.z, 1)).toVec3());
    });

    //draw each face
    //I don't know how to determine which faces to draw first based on z coordinate, so it looks weird
    Global.rect3d(vertices[0], vertices[4], vertices[5], vertices[1], "#000000", this.colors[1], this.alphas[1]);  //top
    Global.rect3d(vertices[0], vertices[4], vertices[7], vertices[3], "#000000", this.colors[2], this.alphas[2]);  //left
    Global.rect3d(vertices[4], vertices[5], vertices[6], vertices[7], "#000000", this.colors[3], this.alphas[3]);  //back
    Global.rect3d(vertices[3], vertices[7], vertices[6], vertices[2], "#000000", this.colors[4], this.alphas[4]);  //bottom
    Global.rect3d(vertices[1], vertices[5], vertices[6], vertices[2], "#000000", this.colors[5], this.alphas[5]);  //right
    Global.rect3d(vertices[0], vertices[1], vertices[2], vertices[3], "#000000", this.colors[0], this.alphas[0]);  //front

  }
}
