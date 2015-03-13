// jshint ignore: start

// canvas:  window.a
// body:    window.b
// context: window.c
d = e = t = 64;
M = 32;
N = 16;

r = Math.random;
s = Math.sin;

c.l = c.lineTo;
c.f = c.fill;
c.b = c.beginPath;
c.t = c.translate;
// c.lineWidth=1.5;
m = []

function n(x, y) {
  // // create a map with random values
  m[y] = m[y] || r();

  // // create an elevated path for the train tracks
  if(x == 0 || x == 1) { 
    return -1;
  }

  // // create a path for the road
  if((y % 40) == 6 || (y % 40) == 7) {
    return 0;
  }

  return s(x - m[y] * 9);
}

// set the zero point of the canvas in the center
c.t(480,320)
// c.t(a.width/2,a.height/2)

setInterval(function() {
  e += 0.3;
  d = ~~e;
  c.save();
  c.t(-(e%1)*M, +(e%1)*N)

  for(i = -20; i < 20; i++) {
    for(j = 20; j >= -20; j--) {
      // isometric coordinates
      x = j * M + i * M;
      y = i * N - j * N;

      // get the height for these coordinates
      h = ~~(n(i, j+d) * 8);

      // determine if this tile should be a tree
      T = n(h,i)>0.8 && (i < 0 || i > 2)

      // draw the tile
      c.b();

      c.l(x,     y + h);                      // bottom corner
      c.l(x + M, y - N + n(i, j+d+1) * 8);    // right corner
      c.l(x,     y - M + n(i-1, j+d+1) * 8 -T*40);  // top corner
      c.l(x - M, y - N + n(i-1, j+d) * 8);    // left corner

      // set tile color
      c.fillStyle =
        // if tile is road
        (j+d) % 40 == 6 ?
          '#333' 
        // else if tile is train track
        : i == 1 ?
          '#B52' 
        // else if sides of train track
        : i == 2 ? 
          '#953'
        // else if tile is tree
        : T ? 
          'rgb('+(76-h+j*2)+','+(116-h*2)+','+(30-h-i)+')'
        // else
        : 
          'rgb('+(113-h+j*3)+','+(161-h)+','+(61-h)+')'

      // fill the tile
      c.f()

      // every 4th tile draw a pole
      if(i == 0 && (j+d) % 4 == 0) {
        c.b()
        x-=8

        c.l(x,y)                               // bottom
        c.l(x,y-t)                             // top
        c.quadraticCurveTo(x-64,y+4,x-t*2,y) // wire

        // stroke
        c.stroke()
      }
    }
  }

  // draw rail tracks
  c.l(-3200,1600)
  c.l(3200,-1600)
  c.moveTo(-3200,1616)
  c.l(3200,-1584)
  c.stroke()
  c.restore()

  // draw wagons
  for(i = 8; i > 0; i--) {
    x = i * M + (i%2)*2 - t*2;
    y = -i * N - (i%2) + t;
    
    for(j = 5; j < 32; j+=2){
      J=8-j+y
      c.b()



      // set train color
      c.fillStyle = 
        // if bottom
        j < 9 ?
          '#546' 
        // if top of engine
        : i > 6 && j > 30 ?
          '#D48'
        // if engine
        : i > 6 ?
          '#C03'
        // else if top
        : j > 30 ?
          '#FC5'
        // else
        :
          '#fb1'

      c.l(x,N+J)
      c.l(x+M,J)
      c.l(x,y-8-j)
      c.l(x-M,J)
      c.f()
    }

    // windows
    if(i < 7) {
      c.fillStyle = '#026'
      c.b()
      c.l(x+4,y-2)
      c.l(x+28,y-14)
      c.l(x+28,y-8)
      c.l(x+4,y+4)
      c.f()
    }
  }

  // engine cabin side
  c.fillStyle = '#DDD'
  c.b()
  c.l(160, -66)
  c.l(139, -77)
  c.l(160, -87)
  c.f()

  // engine cabin top
  c.fillStyle = '#fff'
  c.b()
  c.l(160, -87)
  c.l(128, -103)
  c.l(108, -93)
  c.l(140, -77)
  c.f()

}, 30);