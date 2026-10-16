import test from 'node:test';
import assert from 'node:assert/strict';
import {createFish,stepFish} from '../src/fish-motion.js';

test('residents start scattered, with distinct routes and speeds',()=>{
 const fish=createFish();
 assert.equal(new Set(fish.map(f=>f.y.toFixed(4))).size,fish.length);
 assert.equal(new Set(fish.map(f=>f.speed.toFixed(5))).size,fish.length);
 for(let i=0;i<fish.length;i++)for(let j=i+1;j<fish.length;j++)assert.ok(Math.hypot(fish[i].x-fish[j].x,(fish[i].y-fish[j].y)*.65)>.07);
 assert.ok(fish.some(f=>f.vx<0)&&fish.some(f=>f.vx>0));
});
test('only a few curious residents approach; the goldfish keeps its own route',()=>{
 const fish=createFish();let approached=false;
 for(let n=0;n<1200;n++){
  stepFish(fish,1/60,n/60,{active:true,x:.5,y:.5});
  const count=fish.filter(f=>f.curious).length;
  assert.ok(count<=3);approached ||= count>0;
  assert.equal(fish.find(f=>f.type==='goldfish').curious,false);
 }
 assert.ok(approached);
});
test('two minutes of swimming include independent pauses and dashes without leaving the water',()=>{
 const fish=createFish(),modes=new Set(),start=fish.map(f=>({x:f.x,y:f.y}));let crowdedFrames=0;
 for(let n=0;n<3600;n++){
  stepFish(fish,1/30,n/30,{active:false});
  for(const f of fish){modes.add(f.mode);assert.ok(Number.isFinite(f.x)&&Number.isFinite(f.y));assert.ok(f.x>=.035&&f.x<=.965&&f.y>=.13&&f.y<=.88)}
  let crowded=false;
  for(let i=0;i<fish.length;i++)for(let j=i+1;j<fish.length;j++)if(Math.hypot(fish[i].x-fish[j].x,(fish[i].y-fish[j].y)*.65)<.12)crowded=true;
  if(crowded)crowdedFrames++;
 }
 assert.ok(modes.has('hover')&&modes.has('dart')&&modes.has('cruise'));
 assert.ok(fish.every((f,i)=>Math.hypot(f.x-start[i].x,f.y-start[i].y)>.01));
 assert.ok(crowdedFrames/3600<.03,`fish overlap in ${(crowdedFrames/3600*100).toFixed(1)}% of frames`);
});
