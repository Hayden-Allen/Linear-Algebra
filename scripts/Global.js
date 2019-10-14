let Global = {
  c: document.getElementById("c"),
  ctx: c.getContext("2d"),
  focalLength: 1,
  farZ: 10,
  keys: new Bitset(0),
  zscale: 1 / 100,
  aspectRatio: 4/3,
  fov: 90,

  Key: {
    Code: {
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
  Time: {
    last: 0,
    now: 0,
    delta: 0
  },

  clearScreen: function(){
    this.ctx.clearRect(0, 0, this.c.width, this.c.height);

    this.Time.now = performance.now();
    this.Time.delta = this.Time.now - this.Time.last;
    this.Time.last = this.Time.now;
  },
  timeScale: function(){
    return this.Time.delta / 1000;
  },
  Vec4fromVec3: function(v3){
    return new Vec4(v3.x, v3.y, v3.z, 0);
  },
  Mat4fromMat3: function(m3){
    return new Mat4(this.Vec4fromVec3(m3.row1),
                    this.Vec4fromVec3(m3.row2),
                    this.Vec4fromVec3(m3.row3),
                    new Vec4(0, 0, 0, 1));
  },
  init: function(){
    c.width = 800;
    c.height = 600;
    c.style = "border: 1px solid black;";

    this.perspective = new Mat4(new Vec4(1 / (this.aspectRatio * Math.tan(this.fov / 2)), 0, 0, 0),
                                new Vec4(0, 1 / (Math.tan(this.fov / 2)), 0, 0),
                                new Vec4(0, 0, (-this.focalLength - this.farZ) / (this.focalLength - this.farZ), 2 * this.focalLength * this.farZ / (this.focalLength - this.farZ)),
                                new Vec4(0, 0, 1, 0));
  },
  point3d: function(v3){
    let x = v3.x, y = v3.y, z = -v3.z * this.zscale;
    if(z < 0){
      x = x / z * this.focalLength;
      y = y / z * this.focalLength;
    }
    return new Vec2(this.focalLength * x / z + Global.c.width / 2, this.focalLength * y / z + Global.c.height / 2);
  },
  line3d: function(v1, v2, color){
    this.ctx.strokeStyle = color;
    let v1t = this.point3d(v1);
    let v2t = this.point3d(v2);

    this.ctx.beginPath();
    this.ctx.moveTo(v1t.x, v1t.y);
    this.ctx.lineTo(v2t.x, v2t.y);
    this.ctx.stroke();
    this.ctx.closePath();
  },
  rect3d: function(v1, v2, v3, v4, scolor, fcolor, alpha){
    let v1t = this.point3d(v1);
    let v2t = this.point3d(v2);
    let v3t = this.point3d(v3);
    let v4t = this.point3d(v4);

    this.ctx.save();

    this.ctx.globalAlpha = alpha;
    this.ctx.fillStyle = fcolor;
    this.ctx.strokeStyle = scolor;

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

    this.ctx.restore();
  }
}
