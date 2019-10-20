class Mat3 {  //3x3 matrix
  constructor(row1, row2, row3){  //each row is a Vec3
    this.row1 = row1;
    this.row2 = row2;
    this.row3 = row3;
  }
  column1(){  //for use in matrix multiplication
    return new Vec3(this.row1.x, this.row2.x, this.row3.x);
  }
  column2(){  //for use in matrix multiplication
    return new Vec3(this.row1.y, this.row2.y, this.row3.y);
  }
  column3(){  //for use in matrix multiplication
    return new Vec3(this.row1.z, this.row2.z, this.row3.z);
  }
  multiplyVec3(v){  //post-multiply this by Vec3
    return new Vec3(this.row1.dot(v), this.row2.dot(v), this.row3.dot(v));
  }
  multiplyMat3(m){  //post-multiply this by another Mat3
    return new Mat3(new Vec3(this.row1.dot(m.column1()), this.row1.dot(m.column2()), this.row1.dot(m.column3())),
                    new Vec3(this.row2.dot(m.column1()), this.row2.dot(m.column2()), this.row2.dot(m.column3())),
                    new Vec3(this.row3.dot(m.column1()), this.row3.dot(m.column2()), this.row3.dot(m.column3())));
  }
}
