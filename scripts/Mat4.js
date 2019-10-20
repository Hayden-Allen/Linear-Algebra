class Mat4 {  //4x4 matrix
  constructor(row1, row2, row3, row4){  //each row is a Vec4
    this.row1 = row1;
    this.row2 = row2;
    this.row3 = row3;
    this.row4 = row4;
  }
  column1(){  //for use in matrix multiplication
    return new Vec4(this.row1.x, this.row2.x, this.row3.x, this.row4.x);
  }
  column2(){  //for use in matrix multiplication
    return new Vec4(this.row1.y, this.row2.y, this.row3.y, this.row4.y);
  }
  column3(){  //for use in matrix multiplication
    return new Vec4(this.row1.z, this.row2.z, this.row3.z, this.row4.z);
  }
  column4(){  //for use in matrix multiplication
    return new Vec4(this.row1.w, this.row2.w, this.row3.w, this.row4.w);
  }
  multiplyMat4(m){  //post-multiply this by another Mat4
    return new Mat4(
      new Vec4(this.row1.dot(m.column1()), this.row1.dot(m.column2()), this.row1.dot(m.column3()), this.row1.dot(m.column4())),
      new Vec4(this.row2.dot(m.column1()), this.row2.dot(m.column2()), this.row2.dot(m.column3()), this.row2.dot(m.column4())),
      new Vec4(this.row3.dot(m.column1()), this.row3.dot(m.column2()), this.row3.dot(m.column3()), this.row3.dot(m.column4())),
      new Vec4(this.row4.dot(m.column1()), this.row4.dot(m.column2()), this.row4.dot(m.column3()), this.row4.dot(m.column4())));

  }
  multiplyVec4(v){  //post-multiply this by a Vec4
    return new Vec4(this.row1.dot(v), this.row2.dot(v), this.row3.dot(v), this.row4.dot(v));
  }

}
