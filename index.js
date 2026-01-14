const canvas=document.getElementById("fx");
const ctx=canvas.getContext("2d");

function resize(){canvas.width=innerWidth;canvas.height=innerHeight;}
resize();
window.addEventListener("resize",resize);

/* FIREWORKS */
let fireworks=[];
class Firework{
  constructor(x,y){
    this.p=[];
    for(let i=0;i<60;i++){
      this.p.push({x,y,vx:(Math.random()-.5)*5,vy:(Math.random()-.5)*5,life:100});
    }
  }
  update(){this.p.forEach(a=>{a.x+=a.vx;a.y+=a.vy;a.life--;}); this.p=this.p.filter(a=>a.life>0);}
  draw(){this.p.forEach(a=>{ctx.beginPath();ctx.arc(a.x,a.y,2,0,Math.PI*2); ctx.fillStyle=`hsl(${Math.random()*360},100%,65%)`; ctx.fill();});}
}

/* CONFETTI */
let conf=[];
class Conf{
  constructor(){this.x=Math.random()*innerWidth; this.y=-10; this.s=4+Math.random()*6; this.v=2+Math.random()*3;}
  update(){this.y+=this.v;}
  draw(){ctx.fillStyle=`hsl(${Math.random()*360},100%,70%)`; ctx.fillRect(this.x,this.y,this.s,this.s);}
}

/* HEARTS */
function heart(){
  const h=document.createElement("div");
  h.className="heart";
  h.innerHTML="💖";
  h.style.left=Math.random()*100+"vw";
  h.style.animationDuration=4+Math.random()*3+"s";
  document.body.appendChild(h);
  setTimeout(()=>h.remove(),7000);
}
setInterval(heart,500);

/* FLOWERS */
function flowerBurst(){
  for(let i=0;i<18;i++){
    const f=document.createElement("div");
    f.className="flower";
    f.innerHTML=["🌸","🌹","🌺","💐","🌷"][Math.floor(Math.random()*5)];
    f.style.left=50+Math.random()*20-10+"vw";
    f.style.bottom="50vh";
    document.body.appendChild(f);
    setTimeout(()=>f.remove(),1800);
  }
}

/* ANIMATE LOOP */
function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  fireworks.forEach((f,i)=>{f.update();f.draw(); if(!f.p.length)fireworks.splice(i,1);});
  conf.forEach((c,i)=>{c.update();c.draw(); if(c.y>innerHeight)conf.splice(i,1);});
  requestAnimationFrame(animate);
}
animate();

/* auto effects */
setInterval(()=>fireworks.push(new Firework(Math.random()*canvas.width, Math.random()*canvas.height*0.6)),1300);
setInterval(()=>conf.push(new Conf()),180);

/* flower bursts on load */
window.onload=()=>{
  flowerBurst();
  setTimeout(flowerBurst,1200);
  setInterval(flowerBurst,2500);
};
