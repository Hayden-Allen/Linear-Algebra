class Mat3 {
  constructor(row1, row2, row3){
    this.row1 = row1;
    this.row2 = row2;
    this.row3 = row3;
  }
  column1(){
    return new Vec3(this.row1.x, this.row2.x, this.row3.x);
  }
  column2(){
    return new Vec3(this.row1.y, this.row2.y, this.row3.y);
  }
  column3(){
    return new Vec3(this.row1.z, this.row2.z, this.row3.z);
  }
  multiplyVec3(v){
    return new Vec3(this.row1.dot(v), this.row2.dot(v), this.row3.dot(v));
  }
  multiplyMat3(m){
    return new Mat3(new Vec3(this.row1.dot(m.column1()), this.row1.dot(m.column2()), this.row1.dot(m.column3())),
                    new Vec3(this.row2.dot(m.column1()), this.row2.dot(m.column2()), this.row2.dot(m.column3())),
                    new Vec3(this.row3.dot(m.column1()), this.row3.dot(m.column2()), this.row3.dot(m.column3())));
  }
}
