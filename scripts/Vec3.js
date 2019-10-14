class Vec3 {
  constructor(x, y, z){
    this.x = x;
    this.y = y;
    this.z = z;
  }
  dot(v){
    return this.x * v.x + this.y * v.y + this.z * v.z;
  }
  intersectZ(z){
    return new Vec3(this.x / this.z * z, this.y / this.z * z, z);
  }
}
