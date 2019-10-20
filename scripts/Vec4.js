class Vec4 {  //4d vector used in transformation matrices
  constructor(x, y, z, w){
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
  }
  dot(v){ //dot with another Vec4
    return this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w;
  }
  toVec3(){ //chop off 4th dimension
    return new Vec3(this.x, this.y, this.z);
  }
}
