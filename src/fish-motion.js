// Each resident owns its route, pace and attention span.
export function createFish(seed=731){
 let value=seed>>>0;
 const random=()=>{value=(Math.imul(value,1664525)+1013904223)>>>0;return value/4294967296};
 const species=['clown','angel','tetra','goldfish','tetra','clown','angel','tetra','clown','tetra','tetra','angel','tetra'];
 const fish=[];
 for(let i=0;i<species.length;i++){
  const type=species[i];let x,y;
  for(let attempt=0;attempt<70;attempt++){x=.09+random()*.82;y=.17+random()*.65;if(fish.every(f=>Math.hypot(f.x-x,(f.y-y)*.65)>.095))break}
  const depth=.65+random()*.45;
  const speed=(type==='tetra'?.038:type==='goldfish'?.015:.024)*( .75+random()*.7);
  fish.push({id:i,type,x,y,vx:(random()>.5?1:-1)*speed,vy:(random()-.5)*.014,
   size:(type==='tetra'?30:type==='goldfish'?72:55)*( .83+random()*.3),depth,speed,
   phase:random()*Math.PI*2,interest:type==='clown'?.8+random()*.2:type==='angel'?.32+random()*.2:type==='goldfish'?.12:.25+random()*.2,
   gx:.1+random()*.8,gy:.19+random()*.61,nextDecision:1+random()*7,mode:'cruise',facing:1,tilt:0,random});
 }
 return fish;
}
export function stepFish(fish,dt,time,pointer={active:false}){
 const curious=new Set(pointer.active?fish.filter(f=>f.interest>.35&&Math.sin(time*.31+f.phase)>.05&&Math.hypot(f.x-pointer.x,(f.y-pointer.y)*.65)<.48)
  .sort((a,b)=>Math.hypot(a.x-pointer.x,(a.y-pointer.y)*.65)/a.interest-Math.hypot(b.x-pointer.x,(b.y-pointer.y)*.65)/b.interest).slice(0,1).map(f=>f.id):[]);
 const positions=fish.map(f=>({x:f.x,y:f.y,depth:f.depth}));
 for(const f of fish){
  if(time>f.nextDecision){
   const r=f.random();f.mode=r<.15?'hover':f.type==='tetra'&&r>.8?'dart':'cruise';
   f.gx=.09+f.random()*.82;f.gy=.17+f.random()*.66;
   f.nextDecision=time+(f.mode==='hover'?1.1+f.random()*1.8:f.mode==='dart'?.8+f.random()*1.2:4+f.random()*8);
  }
  let gx=f.gx,gy=f.gy,speed=f.speed*(f.mode==='hover'?.12:f.mode==='dart'?1.8:1);
  f.curious=curious.has(f.id);
  if(f.curious){const angle=f.phase+time*.12;const radius=.07+(f.id%3)*.028;gx=pointer.x+Math.cos(angle)*radius;gy=pointer.y+Math.sin(angle)*radius*1.2;speed=f.speed*1.3;}
  const dx=gx-f.x,dy=gy-f.y;const distance=Math.hypot(dx,dy*.65)||1;
  let wantedX=dx/distance*speed,wantedY=dy/distance*speed*.62;
  if(distance<.035&&!f.curious){f.nextDecision=Math.min(f.nextDecision,time+.3);wantedX*=.3;wantedY*=.3}
  // Local separation: fish do not queue behind one shared destination.
  for(let i=0;i<positions.length;i++){if(i===f.id)continue;const other=positions[i];const sx=f.x-other.x,sy=(f.y-other.y)*.65;const gap=Math.hypot(sx,sy);const room=.12+.025*f.depth;
   if(gap>0&&gap<room){const force=(room-gap)/room*.12;wantedX+=sx/gap*force;wantedY+=sy/gap*force;}
  }
  if(f.x<.065)wantedX+=.045;if(f.x>.935)wantedX-=.045;if(f.y<.16)wantedY+=.035;if(f.y>.84)wantedY-=.035;
  const ease=1-Math.exp(-dt*(f.mode==='dart'?2.7:1.35));
  f.vx+=(wantedX-f.vx)*ease;f.vy+=(wantedY-f.vy)*ease;
  f.x=Math.max(.035,Math.min(.965,f.x+f.vx*dt));f.y=Math.max(.13,Math.min(.88,f.y+f.vy*dt));
  const face=Math.abs(f.vx)>.0018?Math.sign(f.vx):(f.facing>=0?1:-1);
  f.facing+=(face-f.facing)*(1-Math.exp(-dt*5));
  const tilt=Math.max(-.28,Math.min(.28,f.vy*(face)*7));f.tilt+=(tilt-f.tilt)*(1-Math.exp(-dt*3));
 }
 return fish;
}
