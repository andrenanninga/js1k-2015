function n(c,i){return 0==c||1==c?-1:i%40==6||i%40==7?0:(m[i]=m[i]||r(),s(c-15*m[i]))}d=e=t=64,M=32,N=16,r=Math.random,s=Math.sin,c.l=c.lineTo,c.f=c.fill,c.b=c.beginPath,c.t=c.translate,m=[],c.t(a.width/2,a.height/2),setInterval(function(){for(e+=.3,d=~~e,c.save(),c.t(-(e%1)*M,+(e%1)*N),i=-20;i<20;i++)for(j=20;j>=-20;j--)x=j*M+i*M,y=i*N-j*N,h=~~(8*n(i,j+d)),T=!!(n(h,i)>.8&&(i<0||i>2)),c.b(),c.l(x,y+h),c.l(x+M,y-N+8*n(i,j+d+1)),c.l(x,y-M+8*n(i-1,j+d+1)-40*T),c.l(x-M,y-N+8*n(i-1,j+d)),c.fillStyle=(j+d)%40==6?"#333":1==i?"#B52":0==i||2==i?"#953":T?"rgb("+(76-h+2*j)+","+(116-2*h)+","+(30-h-i)+")":"rgb("+(113-h+2*j)+","+(161-h)+","+(61-h)+")",c.f(),0==i&&(j+d)%4==0&&(c.b(),x-=8,c.l(x,y),c.l(x,y-t),c.quadraticCurveTo(x-64,y+4,x-2*t,y),c.stroke());for(c.l(-3200,1600),c.l(3200,-1600),c.moveTo(-3200,1616),c.l(3200,-1584),c.stroke(),c.restore(),i=8;i>0;i--)for(x=i*M+i%2*2-2*t,y=-i*N-i%2+t,j=5;j<32;j+=2)J=8-j+y,c.b(),c.fillStyle=j<10?"#555":31==j?"#FD7":"#FB0",c.l(x,N+J),c.l(x+M,J),c.l(x,y-8-j),c.l(x-M,J),c.f()},30);