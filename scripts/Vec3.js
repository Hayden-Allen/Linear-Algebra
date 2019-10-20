class Vec3 {  //3d vector used to represent points in 3d space
  constructor(x, y, z){
    this.x = x;
    this.y = y;
    this.z = z;
  }
  dot(v){ //dot product with another Vec3
    return this.x * v.x + this.y * v.y + this.z * v.z;
  }
}
