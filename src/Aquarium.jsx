import React,{useEffect,useRef,useState} from 'react';
import {createFish,stepFish} from './fish-motion.js';
const asset=name=>`${import.meta.env.BASE_URL}assets/${name}`;
export function Aquarium({paused,scene}){
 const canvas=useRef(null),pointer=useRef({x:.5,y:.5,active:false,until:0}),pausedRef=useRef(paused);
 const [following,setFollowing]=useState(false);
 useEffect(()=>{pausedRef.current=paused},[paused]);
 useEffect(()=>{
  const el=canvas.current,ctx=el.getContext('2d'),images={},fish=createFish();let frame=0,last=0,clock=0,visible=true,loaded=false,wasStill=false;
   const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;let w=820,h=440;
  const resize=()=>{const r=el.getBoundingClientRect();w=r.width;h=r.height;const dpr=Math.min(devicePixelRatio,2);el.width=Math.round(w*dpr);el.height=Math.round(h*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);wasStill=false};
  const observer=new ResizeObserver(resize);observer.observe(el);resize();
  const visibility=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting},{threshold:.05});visibility.observe(el);
  Promise.all([...new Set(fish.map(f=>f.type)),'bubble'].map(type=>new Promise(resolve=>{const img=new Image();img.onload=()=>{images[type]=img;resolve()};img.onerror=resolve;img.src=asset(`${type}.png`);}))).then(()=>{loaded=true});
  function draw(now){frame=requestAnimationFrame(draw);const dt=Math.min((now-last)/1000,.04)||.016;last=now;if(!visible||document.hidden||!loaded)return;
   const moving=!pausedRef.current&&!reduced;if(!moving&&wasStill)return;wasStill=!moving;
   const target=pointer.current;const active=target.active||target.until>now;
   if(moving){clock+=dt;stepFish(fish,dt,clock,{...target,active})}
   ctx.clearRect(0,0,w,h);
   for(const f of [...fish].sort((a,b)=>a.depth-b.depth)){
    const img=images[f.type];if(!img)continue;
    const size=f.size*f.depth*Math.max(.6,w/1000);
    const face=Math.abs(f.facing)<.16?(f.facing<0?-.16:.16):f.facing;
    ctx.save();ctx.translate(f.x*w,f.y*h+Math.sin(clock*(1.1+f.speed*12)+f.phase)*1.4);ctx.rotate(f.tilt);
    ctx.scale(face*(f.type==='goldfish'?-1:1)*(1+Math.sin(clock*3.4+f.phase)*.018),1);
    ctx.globalAlpha=Math.min(1,.55+f.depth*.4);ctx.drawImage(img,-size/2,-size/3,size,size*2/3);ctx.restore();
   }
   const bubble=images.bubble;if(bubble){for(let i=0;i<11;i++){const x=((i*.139+.07)%1)*w+Math.sin(clock*.45+i)*4;const y=(1-((clock*(.019+i%3*.004)+i*.137)%1))*h;const size=(4+i%3*3)*w/1000;ctx.globalAlpha=.22;ctx.drawImage(bubble,x,y,size,size)}}
   ctx.globalAlpha=1;
   if(active&&images.bubble&&!pausedRef.current){ctx.globalAlpha=.45;ctx.drawImage(images.bubble,target.x*w-8,target.y*h-8,16,16);ctx.globalAlpha=1}
  }
  frame=requestAnimationFrame(draw);return()=>{cancelAnimationFrame(frame);observer.disconnect();visibility.disconnect()};
 },[]);
 function move(e){const r=e.currentTarget.getBoundingClientRect();pointer.current={x:Math.max(.05,Math.min(.95,(e.clientX-r.left)/r.width)),y:Math.max(.12,Math.min(.88,(e.clientY-r.top)/r.height)),active:true,until:0};setFollowing(true)}
 function leave(){pointer.current.active=false;setFollowing(false)}
 function click(e){move(e);pointer.current.until=performance.now()+5000;}
 function key(e){const directions={ArrowLeft:[-.08,0],ArrowRight:[.08,0],ArrowUp:[0,-.08],ArrowDown:[0,.08]};if(directions[e.key]){e.preventDefault();const [x,y]=directions[e.key];pointer.current={x:Math.max(.05,Math.min(.95,pointer.current.x+x)),y:Math.max(.12,Math.min(.88,pointer.current.y+y)),active:true,until:0};setFollowing(true)}}
 return <div className={`aquarium ${scene}`} data-following={following}><img className="reef" src={asset('reef.png')} alt="Sunlight falling through turquoise water into a lush rocky cove"/><canvas ref={canvas} onPointerMove={move} onPointerLeave={leave} onPointerDown={click} onKeyDown={key} onBlur={leave} tabIndex="0" role="img" aria-label="Interactive aquarium. Move your cursor or use the arrow keys. Curious fish may approach while others continue exploring."/><span className="live-status">{paused?'Preview paused':'Live · a world of their own'}</span><span className="interaction-status" aria-live="polite">{paused?'Even an ocean needs a quiet moment.':following?'Some come closer. Others have places to be.':'Move your cursor. Look a little deeper.'}</span></div>
}
