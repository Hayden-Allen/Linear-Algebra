class Vec4 {
  constructor(x, y, z, w){
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
  }
  dot(v){
    return this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w;
  }
  toVec3(){
    return new Vec3(this.x, this.y, this.z);
  }
}
