// jshint ignore: start

// canvas:  window.a
// body:    window.b
// context: window.c
d = e = t = 64;
M = 32;
N = 16;

r = Math.random;
s = Math.sin;

c.m = c.moveTo;
c.l = c.lineTo;
c.s = c.stroke;
c.f = c.fill;
c.b = c.beginPath;
c.t = c.translate;
c.lineWidth=2;
m = []

function n(x, y) {
  // create an elevated path for the train tracks
  if(x == 0 || x == 1) { 
    return -1;
  }

  // create a path for the road
  if((y % 40) == 6 || (y % 40) == 7) {
    return 0;
  }

  // create a map with random values
  m[y] = m[y] || r();

  return s(x - m[y] * 15);
}

// set the zero point of the canvas in the center
c.t(360,320)
// d = e = 0

setInterval(function() {
  e += 0.2;
  d = ~~e;
  c.save();
  c.t(-(e%1)*M, +(e%1)*N)

  for(i = -18; i < 18; i++) {
    for(j = 18; j >= -18; j--) {
      // isometric coordinates
      x = j * M + i * M;
      y = i * N - j * N;

      // get the height for these coordinates
      h = ~~(n(i, j+d) * 8);

      // determine if this tile should be a tree
      T = !!(n(h,i)>0.8 && (i < 0 || i > 2))

      // draw the tile
      c.b();
      
      c.m(x,     y + h);                      // bottom corner
      c.l(x + M, y - N + n(i, j+d+1) * 8);    // right corner
      c.l(x,     y - M + n(i-1, j+d+1) * 8 -T*40);  // top corner
      c.l(x - M, y - N + n(i-1, j+d) * 8);    // left corner

      // make tile color
      c.fillStyle = c.strokeStyle =
        i == 1 ? // if tile is train track
          '#B52' 
        : // else
          (j+d) % 40 == 6 ? // if tile is road
          '#333' 
        : // else
          T ? // if tile is tree
          'rgb('+(76-h+j*2)+','+(116-h*2)+','+(30-h-i)+')'
        : // else
          'rgb('+(113-h+j*2)+','+(161-h)+','+(61-h)+')'

      // color sides of elevated path for the train track
      // if(i == 0 || i == 2) { 
      //   c.fillStyle='#953';
      // }

      // color top of elevated path for the train track
      // if(i == 1) { 
      //   c.fillStyle='#B52';
      // }

      // // color path for the road
      // if((j+d) % 40 == 6) { 
      //   c.fillStyle='#333'; 
      // }

      // fill the tile
      c.f()

      c.strokeStyle='#631'
      // every 4th tile draw a pole
      if(i == 0 && (j+d) % 4 == 0) {
        c.b()
        x-=8

        c.m(x,y)                                // bottom
        c.l(x,y-t)                              // top
        c.l(x,y-t+10)                           // start of wire
        c.quadraticCurveTo(x-64,y+4,x-t*2,y+10) // wire

        // stroke
        c.s()
      }
    }
  }

  // draw rail tracks
  c.m(-3200,1600)
  c.l(3200,-1600)
  c.m(-3200,1616)
  c.l(3200,-1584)
  c.s()
  c.restore()

  for(i = 8; i > 0; i--) {
    x = i * M + (i%2)*2 - t*2;
    y = -i * N - (i%2) + t;
    
    if(s(i+e+r()) > 0.98) {
      y -= 1;
    }


    for(j = 5; j < 32; j+=2){
      J=8-j+y
      c.b()
      c.fillStyle = j < 13 ? '#A33' : j == 31 ? '#FFD' : '#CCD'
      c.m(x,N+J)
      c.l(x+M,J)
      c.l(x,y-8-j)
      c.l(x-M,J)
      c.f()
    }
  }

}, 40);
