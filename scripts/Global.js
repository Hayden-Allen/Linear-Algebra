let Global = {
  c: document.getElementById("c"),  //canvas
  ctx: c.getContext("2d"),  //canvas draw context
  focalLength: 1, //focal length of camera
  farZ: 10, //used in perspective transformation
  keys: new Bitset(0),  //keeps track of which keys are pressed
  zscale: 1 / 100,  //scale z axis coordinates
  aspectRatio: 4/3, //canvas is 800 wide by 600 tall
  fov: 90,  //90 degree field of view

  Key: {  //all key data
    Code: { //event codes for keys
      space: 32,
      g: 71,
      h: 72,
      t: 84,
      y: 89,
      r: 82,
      f: 70,
      q: 81,
      e: 69,
      w: 87,
      a: 65,
      s: 83,
      d: 68
    },
    //indices of keys in Bitset
    space: 12,
    g: 11,
    h: 10,
    t: 9,
    y: 8,
    r: 7,
    f: 6,
    q: 5,
    e: 4,
    w: 3,
    a: 2,
    s: 1,
    d: 0
  },
  Time: { //keeps track of time spent on each frame
    last: 0,
    now: 0,
    delta: 0
  },

  clearScreen: function(){
    this.ctx.clearRect(0, 0, this.c.width, this.c.height);  //clear screen

    //update time
    this.Time.now = performance.now();
    this.Time.delta = this.Time.now - this.Time.last;
    this.Time.last = this.Time.now;
  },
  timeScale: function(){  //returns Time.delta in seconds
    return this.Time.delta / 1000;
  },
  Vec4fromVec3: function(v3){ //create 4d vector from 3d one
    return new Vec4(v3.x, v3.y, v3.z, 0);
  },
  Mat4fromMat3: function(m3){ //create 4x4 matrix from 3x3 one
    return new Mat4(this.Vec4fromVec3(m3.row1),
                    this.Vec4fromVec3(m3.row2),
                    this.Vec4fromVec3(m3.row3),
                    new Vec4(0, 0, 0, 1));
  },
  init: function(){
    c.width = 800;
    c.height = 600;
    c.style = "border: 1px solid black;"; //black border around canvas

    //attempted perspective projection matrix; I don't think it really works
    this.perspective = new Mat4(new Vec4(1 / (this.aspectRatio * Math.tan(this.fov / 2)), 0, 0, 0),
                                new Vec4(0, 1 / (Math.tan(this.fov / 2)), 0, 0),
                                new Vec4(0, 0, (-this.focalLength - this.farZ) / (this.focalLength - this.farZ), 2 * this.focalLength * this.farZ / (this.focalLength - this.farZ)),
                                new Vec4(0, 0, 1, 0));
  },
  point3d: function(v3){  //convert 3d point to 2d point
    let x = v3.x;
    let y = v3.y;
    let z = -v3.z * this.zscale;  //scale z coordinate. negative by convention
    if(z < 0){
      x = x / z * this.focalLength;
      y = y / z * this.focalLength;
    }
    //origin is middle of screen (width / 2, height / 2)
    return new Vec2(this.focalLength * x / z + Global.c.width / 2, this.focalLength * y / z + Global.c.height / 2);
  },
  line3d: function(v1, v2, color){  //draws line between two 3d points
    this.ctx.strokeStyle = color;
    let v1t = this.point3d(v1); //v1 projected onto canvas plane
    let v2t = this.point3d(v2); //v2 projected onto canvas plane

    //move from v1 to v2 and draw line
    this.ctx.beginPath();
    this.ctx.moveTo(v1t.x, v1t.y);
    this.ctx.lineTo(v2t.x, v2t.y);
    this.ctx.stroke();
    this.ctx.closePath();
  },
  rect3d: function(v1, v2, v3, v4, scolor, fcolor, alpha){  //draws rectangle between four 3d points
    //project vertices onto canvas plane
    let v1t = this.point3d(v1);
    let v2t = this.point3d(v2);
    let v3t = this.point3d(v3);
    let v4t = this.point3d(v4);

    this.ctx.save();  //save current state of canvas

    //set colors and opacity to given values
    this.ctx.globalAlpha = alpha;
    this.ctx.fillStyle = fcolor;
    this.ctx.strokeStyle = scolor;

    //move from 1->2->3->4->1, drawing a line each time. Once done, fill the drawn shape
    this.ctx.beginPath();
    this.ctx.moveTo(v1t.x, v1t.y);
    this.ctx.lineTo(v2t.x, v2t.y);
    this.ctx.stroke();
    this.ctx.lineTo(v3t.x, v3t.y);
    this.ctx.stroke();
    this.ctx.lineTo(v4t.x, v4t.y);
    this.ctx.stroke();
    this.ctx.lineTo(v1t.x, v1t.y);
    this.ctx.stroke();
    this.ctx.fill();
    this.ctx.closePath();

    this.ctx.restore(); //reset canvas to saved state
  }
}
