/* Things being shaped: 20 experiment demos on painted bright scenes (shaped/scene). Facts only from each stop's Pixel Hound record, plus details checked against the original paper (marked "checked online" in the notes). */
(function(){const G=Demo.G,K=window.K,ramp=(t,a,b)=>G.ramp(t,a,b),lerp=G.lerp,win=(t,a,b,f)=>G.win(t,a,b,f);const D={};
const bg=n=>G.pic(n,0,0,600,800);
const flower=(x,y,r,col,al=1)=>{if(al<=0)return;const C=G.c;C.globalAlpha=al;for(let i=0;i<5;i++){const a=i/5*6.283-1.57;G.dot(x+Math.cos(a)*r*.55,y+Math.sin(a)*r*.55,r*.55,col)}G.dot(x,y,r*.35,'#f2c230');C.globalAlpha=1;G.ring(x,y,r*1.1,'#ffffff',2,.5*al)};
const PUR='#8a4fc8',WHT='#fbfbff';
// 1 Mendel
D[1]={dur:19,pics:['garden'],draw(g,t){bg('garden');const k=ramp(t,2,3);K.panel(40,40,520,330,k);if(k<=0)return;
 K.txt('Parents',300,72,{size:20,col:K.BLUE,al:k});flower(220,120,26,PUR,k);K.txt('×',300,120,{size:34,al:k});flower(380,120,26,WHT,k);
 const k2=ramp(t,5,6.5);K.txt('Their children',300,180,{size:20,col:K.BLUE,al:k2});for(let i=0;i<4;i++)flower(180+i*80,222,22,PUR,k2*G.clamp((t-5-i*.3)*2));
 const k3=ramp(t,9,10);K.txt('Grandchildren',300,272,{size:20,col:K.BLUE,al:k3});for(let i=0;i<8;i++){const w=i===2||i===6;flower(90+i*60,318,19,w?WHT:PUR,k3*G.clamp((t-9-i*.25)*2));if(w&&t>12)K.burst(90+i*60,318,50,(t-12)%1.6/1.6)}
 if(t>12.5)K.tag('About 3 purple : 1 white',300,410,{bg:K.TERRA,size:24,pop:G.clamp((t-12.5)/.4)})},
 story:[[0,'Q',"Why do children look like their parents, but never exactly? In 1866 a monk called Gregor Mendel searched for the rules, using pea plants in his monastery garden."],
 [0,'S',"Pea plants come in clear types, like purple flowers or white flowers. Mendel could choose which plant pollinated which. Pollinate = carry pollen from one flower to another so it makes seeds."],
 [3,'D',"He crossed a purple-flowered plant with a white-flowered plant, then planted the seeds."],
 [6.5,'R',"Every one of the children had purple flowers. White seemed to have vanished."],
 [9,'D',"Then he let those purple children breed with each other, and counted the flowers on the next generation."],
 [12.5,'R',"White came back! Roughly 3 purple plants for every 1 white. The white instruction had been hidden, not lost."],
 [14,'W',"Mendel showed traits are passed on in separate units, which we now call genes. You are shaped by instructions you inherit, even ones that skip a generation."],
 [15,'N',"Thin evidence: our record of this paper is short. The 3-to-1 count is the famous result of his pea crosses. The garden is an illustration."]]};
// 2 Thorndike
const esc2=[160,120,95,90,60,52,40,34,30,22,20,16,15,12,10,9,8,8,7,7];
D[2]={dur:19,pics:['puzzlebox'],draw(g,t){bg('puzzlebox');const pull=win(t%4,1.2,2.2,.3)*(t>3&&t<9?1:0);if(pull>0){K.burst(150,520,70,(t%4-1.2));K.tag('Pull the loop!',150,470,{bg:K.TERRA,size:18,al:pull})}
 const k=ramp(t,9,10);K.panel(40,40,520,300,k);if(k<=0)return;K.txt('Time to escape',150,70,{size:19,col:K.BLUE,al:k});K.txt('each try →',470,320,{size:16,w:600,al:k});
 const n=Math.floor(G.clamp((t-10)/5)*20);G.line(80,300,530,300,K.INK,2,.4*k);G.line(80,90,80,300,K.INK,2,.4*k);const pts=[];for(let i=0;i<n;i++){const x=90+i*22,y=300-esc2[i]*1.3;pts.push([x,y]);G.dot(x,y,6,K.TERRA,k)}if(pts.length>1)G.path(pts,K.TERRA,3,.6*k)},
 story:[[0,'Q',"How does an animal learn a new trick? Around 1900 Edward Thorndike put hungry cats into puzzle boxes to find out. His 1911 book 'Animal Intelligence' gathers those experiments."],
 [0,'S',"A puzzle box is a little cage whose door is held shut by a catch. Pulling a loop or pressing a lever opens it. A dish of food waits outside."],
 [3,'D',"At first the cat scratches, pushes and wanders around. Then, by accident, it pulls the loop. The door swings open. Food!"],
 [9,'D',"Thorndike put the cat back in, again and again, and timed every escape."],
 [12,'R',"The escapes got quicker, bit by bit, not in one sudden flash of understanding. Useless moves faded away; the move that worked stayed."],
 [15.5,'W',"He called this the law of effect: actions followed by something good get 'stamped in'. Rewards and results shape what animals, and people, do."],
 [16.5,'N',"Thin evidence: our record of this book is short. The falling line shows the shape of his learning curves, not his exact numbers."]]};
// 3 Tolman
D[3]={dur:18,pics:['maze'],draw(g,t){bg('maze');const k=ramp(t,2,3);K.panel(60,30,480,330,k);if(k<=0)return;const S=[300,330],Gl=[470,80];
 G.dot(Gl[0],Gl[1],16,K.SAFF,k);K.txt('food',Gl[0],Gl[1]-30,{size:16,al:k});K.txt('start',S[0],S[1]+16,{size:16,al:k});
 const old=[[300,320],[300,200],[180,200],[180,90],[430,90]];G.path(old,'#8a7a66',14,.35*k);
 const blocked=t>8;if(blocked){G.line(288,250,312,250,K.TERRA,8,1);K.tag('blocked',230,250,{bg:K.TERRA,size:16})}
 if(t>8.5){const a=ramp(t,8.5,9.5);for(let i=0;i<7;i++){const ang=-2.6+i*.37;G.line(300,300,300+Math.cos(ang)*170,300+Math.sin(ang)*170,'#8a7a66',10,.3*a)}const best=-2.6+6*.37+(-0.03);G.line(300,300,300+Math.cos(-.95)*190,300+Math.sin(-.95)*190,K.TEAL,10,.85*ramp(t,11,12))}
 let rp;if(t<7){const u=(t%3.5)/3.5,seg=Math.min(3,Math.floor(u*4)),f=u*4-seg;rp=[lerp(old[seg][0],old[seg+1][0],f),lerp(old[seg][1],old[seg+1][1],f)]}else if(t<11)rp=[300,300+Math.sin(t*3)*4];else{const u=G.clamp((t-11)/2.5);rp=[300+Math.cos(-.95)*190*u,300+Math.sin(-.95)*190*u]}
 K.rat(rp[0],rp[1],t<7?-1.57:t<11?-1.57:-.95,.7);if(t>13.6)K.tag('Straight toward the food',300,395,{bg:K.TEAL,size:20,pop:G.clamp((t-13.6)/.4)})},
 story:[[0,'Q',"When you walk to a friend's house, do you remember a string of turns, or a map of the area? In 1948 Edward Tolman asked the same about rats."],
 [0,'S',"Many scientists then thought a rat learned a maze as a chain of habits: left here, right there. Tolman doubted it."],
 [3,'D',"In experiments he described, rats first learned one route to food, like the grey path here."],
 [8,'D',"Then the old route was blocked, and new paths were opened up, pointing in different directions."],
 [11,'R',"Many rats picked a new path heading toward where the food had been. A path they had never taken before."],
 [13.6,'W',"A chain of turns can't do that. Tolman argued the rats had built a 'cognitive map': a picture in the head of where things are. People have them too."],
 [15,'N',"The maze drawn here is a simple illustration of this kind of test, not the exact layout."]]};
// 4 Blakemore & Cooper
D[4]={dur:19,pics:['stripes'],draw(g,t){bg('stripes');const k=ramp(t,1,2);K.tag('About 5 hours a day, for months',300,60,{bg:K.BLUE,size:19,al:k*win(t,1,8.5,.5)});
 if(t>4&&t<8.5){K.timer(500,140,34,(t-4)/4.5,'')}
 const k2=ramp(t,8.5,9.5);if(k2<=0)return;K.panel(70,40,460,330,k2);K.txt('One brain cell at a time: which angle does it like?',300,72,{size:18,col:K.BLUE,al:k2,max:420});
 const n=24,q=G.rnd(5),show=G.clamp((t-10)/4);for(let i=0;i<n;i++){if(i/n>show)break;const vert=q()<.82;const ang=vert?(q()-.5)*.6:(1.2+q()*.8)*(q()<.5?1:-1);const cx=110+(i%8)*55,cy=130+Math.floor(i/8)*72;G.at(cx,cy,1,ang);G.line(0,-24,0,24,vert?K.TERRA:'#8a7a66',6,k2);G.end()}
 if(t>14.5)K.tag('Mostly near-vertical',300,345,{bg:K.TERRA,size:20,pop:G.clamp((t-14.5)/.4)})},
 story:[[0,'Q',"Are the seeing parts of your brain fixed at birth, or shaped by what you see first? In 1970 Colin Blakemore and Grahame Cooper tested it with kittens."],
 [0,'S',"The kittens were kept in the dark at first. From about two weeks old, each spent around five hours a day inside a tall tube painted with stripes: all vertical, or all horizontal."],
 [4,'S',"A wide collar stopped them seeing their own bodies. For months, their whole visual world was stripes running one way."],
 [8.5,'D',"Later, the scientists recorded single cells in the visual part of the brain. Each cell fires most for lines at one angle, its favourite."],
 [12,'R',"In a kitten raised with vertical stripes, most cells preferred near-vertical lines. A horizontal-raised kitten had mostly horizontal-loving cells."],
 [15,'W',"Early experience shapes the brain's wiring. What a young brain sees helps decide what it can see later."],
 [16.5,'N',"An animal study with very few kittens. Details of the tube and collar checked against the original and later summaries. Each short line here stands for one recorded cell; the counts are illustrative."]]};
// 5 Dog-whelks
D[5]={dur:19,pics:['harbour'],draw(g,t){bg('harbour');const pl=ramp(t,3,8);if(pl>0){for(let i=0;i<14;i++){const u=((t*.12+i/14)%1);G.glow(lerp(170,420,u),lerp(320,560,u)+Math.sin(i)*30,40+u*40,'#7a5bd0',.22*pl*(1-u))}K.tag('TBT from boat paint',190,280,{bg:'#5a3fa0',size:17,al:pl})}
 const k=ramp(t,7.5,8.5);if(k>0){K.panel(40,430,250,220,k);K.txt('Far from boats',165,455,{size:16,col:K.BLUE,al:k});K.snail(165,560,1,0);K.panel(310,430,250,220,k);K.txt('Near the harbour',435,455,{size:16,col:K.TERRA,al:k});K.snail(435,560,1,ramp(t,10,12.5));
 if(t>12.5)K.note('male part on a female',435,690,470,590,ramp(t,12.5,13.2),{bg:K.TERRA,tc:'#fff',size:16,lift:-10})}
 if(t>14)K.tag('Fewer snails near the boats',300,770,{bg:K.INK,size:18,pop:G.clamp((t-14)/.4)})},
 story:[[0,'Q',"Can a chemical from boat paint change a sea snail's body? In the 1980s, dog-whelks were disappearing from parts of the coast of south-west England."],
 [0,'S',"Dog-whelks are small sea snails living on rocky shores. Many boats then used antifouling paint with a chemical called TBT (tributyltin). Antifouling = stops barnacles and weed growing on the hull."],
 [3,'D',"TBT slowly leaks out of the paint into the water, most of all around harbours full of boats."],
 [7.5,'D',"Researchers surveyed dog-whelks along the coast and compared shores near harbours with shores further away."],
 [10,'R',"Near the boats, the snails were declining. And female snails were growing male body parts. This is called imposex."],
 [14,'W',"The paper linked the decline to TBT from the paints. A trace of chemical in the water was reshaping animals' bodies, an early clue that some chemicals act like hormones."],
 [15.5,'N',"A field survey: it shows a strong pattern along the coast. A 1988 follow-up showed TBT itself could cause the change."]]};
// 6 Colborn review (stand-in)
D[6]={dur:18,pics:['review'],draw(g,t){bg('review');K.tag('A review: no lab of its own',300,40,{bg:K.INK,size:16});const k=ramp(t,3,4);K.panel(70,90,460,300,k);if(k<=0)return;
 const lock=(x,y,al)=>{G.rr(x-50,y-40,100,80,14,'#d9c7ae',null,al);G.rr(x-14,y-40,28,30,6,'#8a7a66',null,al)};lock(190,250,k);lock(410,250,k);
 const kh=ramp(t,4,6);G.rr(178,150-40*(1-kh),24,60,6,K.SAFF,null,k);K.txt('hormone',190,125,{size:16,al:k});
 const kf=ramp(t,7,9);G.rr(398,150-40*(1-kf),24,60,6,'#5a3fa0',null,ramp(t,6.5,7.5));K.txt('look-alike chemical',410,125,{size:16,al:ramp(t,6.5,7.5)});
 if(t>9)[190,410].forEach(x=>K.burst(x,250,90,((t-9)%1.5)/1.5,K.SAFF));K.txt('Cell gets the message: grow this way',300,345,{size:17,al:ramp(t,9,10),col:K.TERRA,max:420})
 if(t>11.5)K.tag('Timing matters most: before birth',300,430,{bg:K.TERRA,size:19,pop:G.clamp((t-11.5)/.4)})},
 story:[[0,'Q',"By the early 1990s, strange changes were turning up in wildlife. Were some man-made chemicals pretending to be hormones?"],
 [0,'S',"Theo Colborn and colleagues pulled studies of wildlife and people into one review. A review = a paper that gathers many studies instead of running a new experiment."],
 [3,'D',"Hormones are the body's chemical messengers. They fit receptors on cells like keys in locks, telling the cell how to grow and work."],
 [6.5,'D',"Some man-made chemicals, like DDT, PCBs and dioxins, can fit those locks too. The review called them endocrine disruptors. Endocrine = the hormone system."],
 [11.5,'R',"Their case: tiny doses at the wrong time in development can change how the body, brain and immune system grow."],
 [13,'W',"It helped launch the study of endocrine disruptors and why timing matters."],
 [14,'N',"A review that raises the case, not proof for every chemical. The scene is a labelled stand-in: the lock and key is a picture of the idea."]]};
// 7 Wild fish
D[7]={dur:17,pics:['river'],draw(g,t){bg('river');const fl=ramp(t,2,4);for(let i=0;i<10;i++){const u=(t*.08+i/10)%1;G.glow(lerp(560,360,u),lerp(430,650,u),30+u*30,'#8a6ad0',.18*fl*(1-u))}if(fl>0)K.tag('treated sewage water',470,380,{bg:'#5a3fa0',size:16,al:fl});
 for(let i=0;i<4;i++)K.fish(140+i*95,620+Math.sin(t+i)*8,.8,'#9aa6a0',{ph:i,flip:i%2});
 const k=ramp(t,6,7);if(k<=0)return;K.lens(300,230,150,(x,y,r)=>{G.dot(x,y,r,'#f6e2d8');G.c.globalAlpha=1;for(let i=0;i<18;i++){const q=G.rnd(i+3);G.dot(x-90+q()*180,y-70+q()*140,10,'#f1c9b8');}const e=ramp(t,9,11);for(let i=0;i<6;i++){const q=G.rnd(40+i);const ex=x-70+q()*140,ey=y-50+q()*100;G.dot(ex,ey,16*e,'#f2c230');G.ring(ex,ey,16*e,'#c2410c',2,e)}},k);
 K.txt('inside a male fish',300,100,{size:18,al:k,col:K.BLUE});if(t>11)K.tag('egg cells in a male',300,410,{bg:K.TERRA,size:19,pop:G.clamp((t-11)/.4)})},
 story:[[0,'Q',"If treated sewage flows into rivers, could it change the fish living there? In the 1990s, UK scientists went to look."],
 [0,'S',"Sewage works clean waste water and release it into rivers. Some chemicals, including hormones and hormone look-alikes, can slip through."],
 [2,'D',"Researchers caught wild fish in rivers around the UK, downstream of sewage works, and examined them closely."],
 [9,'R',"Many male fish had features of both sexes. This is called intersex, for example egg cells growing inside a male's testes."],
 [12,'W',"It was early, wide-ranging evidence that water pollution could change how wild animals develop and breed."],
 [13.5,'N',"A survey shows a pattern but can't prove which chemical did it. That's why the next stop ran a real experiment on a whole lake."]]};
// 8 Kidd lake
const POP=[1,1,.95,.15,.06,.05,.25];
D[8]={dur:20,pics:['lake'],draw(g,t){bg('lake');if(t>3&&t<9){const d=((t-3)%1.2)/1.2;G.dot(430,600+d*60,6,'#c2410c',1-d);K.tag('EE2: 5–6 billionths of a gram per litre',300,520,{bg:K.TERRA,size:16,al:ramp(t,3,3.5)})}
 const yr=Math.min(6,Math.floor(G.clamp((t-8)/6)*7));const v=t<8?1:POP[yr];const q=G.rnd(9);for(let i=0;i<30;i++){const x=120+q()*360,y=260+q()*260,on=i/30<v;if(on)K.fish(x+Math.sin(t*.7+i)*12,y,.35,'#c9a46a',{ph:i,flip:i%2})}
 const k=ramp(t,8,9);if(k<=0)return;K.panel(60,40,480,170,k);K.txt('Young minnows in Lake 260',300,62,{size:17,col:K.BLUE,al:k});
 for(let i=0;i<=yr;i++){const x=100+i*64,h=POP[i]*90;G.rr(x-18,190-h,36,h,6,i>=1&&i<=3?'#5a3fa0':K.TEAL,null,k);K.txt(String(2000+i),x,200,{size:13.5,w:600,al:k})}
 if(t>14.5)K.tag('Collapse after the 2nd summer',300,240,{bg:K.TERRA,size:18,pop:G.clamp((t-14.5)/.4)})},
 story:[[0,'Q',"The last stop found strange fish below sewage works. But could such tiny amounts really wipe out fish? Karen Kidd's team tested it on a whole lake."],
 [0,'S',"At the Experimental Lakes Area in north-western Ontario, Canada, whole lakes are set aside for research. They chose Lake 260, home to small fish called fathead minnows."],
 [3,'D',"For three summers, 2001 to 2003, they added EE2, the man-made estrogen in birth-control pills, at just 5 to 6 billionths of a gram per litre: levels found in some waste water."],
 [9,'R',"Male minnows became feminised: they made an egg-yolk protein normally made only by females, and some grew eggs in their testes."],
 [12,'R',"After the second summer, almost no young fish survived, and the population nearly vanished. A similar lake left alone stayed normal."],
 [15,'W',"Because this was an experiment, it showed cause: tiny amounts of a pollutant can wreck a wild population."],
 [16.5,'N',"Checked online: a 2015 follow-up found the minnows recovered a few years after the additions stopped. The bars sketch the pattern of young fish, not exact counts."]]};
// 9 Rochman
D[9]={dur:18,pics:['aquarium'],draw(g,t){bg('aquarium');const groups=[['no plastic','#9aa6a0',0],['clean plastic','#2f6fd0',.3],['sea-soaked plastic','#5a3fa0',1]];
 const k=ramp(t,2,3);groups.forEach((gp,i)=>{const x=150+i*150;K.tag(gp[0],x,420,{bg:'#fffaf0',col:K.INK,size:15,al:k});for(let j=0;j<2;j++)K.fish(x-25+j*45,500+j*40+Math.sin(t*1.3+i+j)*8,.6,'#c9a46a',{ph:i+j,flip:j});if(gp[2]>0&&t>4&&t<10){K.bits(x,470,30,6,i*9+Math.floor(t),{s:3,cols:i==2?['#5a3fa0','#2a2a2a']:['#2f6fd0','#ffffff']})}});
 const k2=ramp(t,10,11);if(k2<=0)return;K.panel(60,40,480,300,k2);K.txt('Fish liver, after two months',300,66,{size:17,col:K.BLUE,al:k2});
 groups.forEach((gp,i)=>{const x=140+i*160,s=gp[2];G.at(x,190,1);G.c.globalAlpha=k2;G.c.fillStyle=G.mix('#c97a5a','#7a3a2a',s*.6);G.c.beginPath();G.c.ellipse(0,0,60,44,0,0,7);G.c.fill();for(let j=0;j<Math.round(s*10+gp[2]*2);j++){const q=G.rnd(j+1);G.dot(-40+q()*80,-25+q()*50,5,'#f6e7b8',.9)}G.c.globalAlpha=1;G.end();K.txt(gp[0],x,265,{size:14,w:600,al:k2})});
 if(t>13)K.tag('Most stress: sea-soaked plastic',300,310,{bg:K.TERRA,size:17,pop:G.clamp((t-13)/.4)})},
 story:[[0,'Q',"Plastic floating in the sea soaks up pollutants like a sponge. If a fish eats it, do those chemicals move into the fish?"],
 [0,'S',"In a lab, small fish were split into groups. Checked online: one group ate no plastic, one ate clean plastic, and one ate plastic that had soaked in a bay for months and picked up pollutants."],
 [4,'D',"They ate the plastic mixed into their food for two months. Then the scientists measured chemicals in the fish and looked closely at their livers."],
 [10,'R',"Fish fed sea-soaked plastic took up some of its chemicals. Their livers showed signs of stress. Liver = the organ that cleans poisons from the blood."],
 [13,'W',"Plastic can work like a delivery van, carrying harmful chemicals into animals that eat it."],
 [14.5,'N',"A lab study on fish. It did not look at changes in sex or breeding. The liver drawings show the idea, not real tissue."]]};
// 10 Phthalates IQ
D[10]={dur:18,pics:['clinic'],draw(g,t){bg('clinic');const k=ramp(t,2,3);K.tag('Pregnancy: phthalates measured in urine',300,60,{bg:K.BLUE,size:16,al:k*win(t,2,8,.4)});
 if(t>4&&t<8)K.bits(560,350,20,8,3,{s:3});
 const k2=ramp(t,8,9);if(k2<=0)return;K.panel(70,40,460,330,k2);K.txt('Age 7 IQ test',300,64,{size:17,col:K.BLUE,al:k2});G.line(110,320,500,320,K.INK,2,.5*k2);G.line(110,100,110,320,K.INK,2,.5*k2);K.txt('more phthalate in pregnancy →',300,345,{size:14,w:600,al:k2});
 const q=G.rnd(4),n=Math.floor(G.clamp((t-9)/3)*40);for(let i=0;i<n;i++){const x=q(),y=.65-.3*x+(q()-.5)*.45;G.dot(120+x*370,320-G.clamp(y)*210,5,K.TEAL,.8*k2)}
 if(t>12)G.line(125,320-.65*210,490,320-.35*210,K.TERRA,4,ramp(t,12,13));if(t>13.5)G.stamp('A LINK',430,140,13.5,t,K.TERRA,30)},
 story:[[0,'Q',"Phthalates are chemicals that make plastics soft and bendy, found in many everyday products. Could meeting them before birth affect how a child thinks later?"],
 [0,'S',"Scientists followed mothers and their children over many years. During pregnancy, they measured phthalate levels in each mother's urine."],
 [8,'D',"When the children turned 7, they took IQ tests. IQ = a score from puzzles and questions about reasoning, words and memory."],
 [12,'R',"Children whose mothers had more phthalates in pregnancy tended to score lower at age 7. Each dot here stands for a child; the dots are illustrative."],
 [13.5,'W',"It hints that the chemical world before birth may help shape later thinking."],
 [14.5,'N',"This shows an association (a link), not proof of cause. Other differences between families could play a part, even when scientists try to allow for them."]]};
// 11 Flint
D[11]={dur:18,pics:['town'],draw(g,t){bg('town');const k=ramp(t,2,3);K.tag('2014: the water source switches',300,60,{bg:K.BLUE,size:17,al:k*win(t,2,8,.4)});if(t>3&&t<8){for(let i=0;i<8;i++){const u=((t+i/8)%1);G.dot(lerp(180,420,u),lerp(450,620,u),5,'#7a7a8a',.7)}}
 const k2=ramp(t,7,8);if(k2<=0)return;K.panel(80,90,440,320,k2);K.txt('Young children with raised blood lead',300,116,{size:16,col:K.BLUE,al:k2,max:400});
 K.bars(150,150,300,180,[{v:2.4/6,val:'2.4%',label:'Before',col:K.TEAL},{v:4.9/6*G.clamp((t-10)/1.5),val:t>11?'4.9%':'',label:'After',col:K.TERRA}],k2,{gap:80});
 if(t>12.5)K.tag('Outside the city: no change',300,450,{bg:K.INK,size:18,pop:G.clamp((t-12.5)/.4)})},
 story:[[0,'Q',"In 2014 the city of Flint, Michigan, switched where its tap water came from. Did that change what was in children's blood?"],
 [0,'S',"Lead is a metal that harms growing brains. Old pipes can release lead into water."],
 [3,'D',"A team of doctors compared blood tests of children under 5, from before and after the water switch, inside and outside the city."],
 [10,'R',"In Flint, the share of young children with raised blood lead roughly doubled, from 2.4% to 4.9%. Outside the city there was no change."],
 [12.5,'R',"The biggest rises were in the neighbourhoods with the most lead in their water."],
 [14,'W',"Real measurements from real children. It gave early, clear evidence of harm and helped make the crisis impossible to ignore."]]};
// 12 Magnetite
D[12]={dur:18,pics:['magnetite'],draw(g,t){bg('magnetite');const k=ramp(t,2.5,3.5);K.tag('Brain tissue from Mexico City and Manchester',300,40,{bg:K.BLUE,size:15,al:ramp(t,1,2)});
 if(k<=0)return;K.lens(330,250,160,(x,y,r)=>{G.dot(x,y,r,'#fbeee8');const sh=ramp(t,6,8);const q=G.rnd(2);for(let i=0;i<26;i++){const px=x-120+q()*240,py=y-110+q()*220;if(i<20){G.ball(px,py,7+q()*5,'#4a4a52',sh+.2)}else{G.at(px,py,1,q()*3);G.rr(-7,-4,14,8,2,'#7a6a5a',null,sh);G.end()}}},k);
 if(t>8.5){K.tag('round, smooth: like fuel-burning balls',330,440,{bg:K.TERRA,size:16,pop:G.clamp((t-8.5)/.4)})}if(t>10.5)K.tag('few sharp crystals the body makes itself',330,480,{bg:'#fffaf0',col:K.INK,size:15,pop:G.clamp((t-10.5)/.4)})},
 story:[[0,'Q',"Dirty air goes into your lungs. Could its tiniest bits reach your brain?"],
 [0,'S',"Scientists examined brain tissue from people who had died, from Mexico City and Manchester, England."],
 [2.5,'D',"They hunted for magnetite, a magnetic iron mineral, and looked at each particle's shape with powerful microscopes."],
 [8.5,'R',"They found many tiny magnetite particles. Lots were round and smooth, like the little balls made when fuel burns, not the sharp crystals the body makes itself."],
 [12,'W',"So pollution particles may reach the brain. One idea: the tiniest ones travel up the smell nerve from the nose."],
 [13.5,'N',"This shows the particles are there. It does not show they cause harm; any link to Alzheimer's disease is only a hypothesis."]]};
// 13 Oysters
D[13]={dur:18,pics:['oysters'],draw(g,t){bg('oysters');if(t>2&&t<9)K.bits(410,540,150,40,Math.floor(t*3),{s:2.2,cols:['#ffffff','#e8f0ff'],sq:.6});K.tag('Polystyrene beads 2–6 micrometres',300,50,{bg:K.BLUE,size:16,al:win(t,2,9,.4)});
 const k=ramp(t,9,10);if(k<=0)return;K.panel(50,40,500,320,k);K.txt('After two months: exposed vs clean water',300,64,{size:16,col:K.BLUE,al:k});
 const rows=[['eggs',38],['sperm speed',23],['larvae (babies)',41]];rows.forEach((r,i)=>{const y=120+i*80,w=360,kk=G.clamp((t-10-i*.8)/1.2);K.txt(r[0],120,y,{size:16,w:600,align:'left',al:k});G.rr(120,y+16,w,20,10,K.TEAL,null,k*.35);G.rr(120,y+16,w*(1-r[1]/100*kk),20,10,K.TERRA,null,k);if(kk>.9)K.txt('−'+r[1]+'%',120+w+30,y+26,{size:20,col:K.TERRA})})},
 story:[[0,'Q',"Oysters filter seawater all day to feed. What happens if that water carries tiny plastic beads?"],
 [0,'S',"In a lab, some oysters lived for two months with beads of polystyrene 2 to 6 micrometres wide, smaller than a red blood cell. Others lived in clean water. Polystyrene = the plastic in foam cups."],
 [9,'D',"Then the scientists checked the oysters' eggs, their sperm and their babies (larvae)."],
 [11,'R',"Exposed oysters made 38% fewer eggs, their sperm swam 23% slower, and they produced 41% fewer larvae."],
 [14,'W',"Plastic can harm how sea animals reproduce."],
 [15,'N',"A lab study on oysters, possibly with more plastic than in the sea. A warning sign for sea life, not a finding about people."]]};
// 14 Sperm count meta-analysis
D[14]={dur:18,pics:['archive'],draw(g,t){bg('archive');const k=ramp(t,2,3);const n=Math.floor(G.clamp((t-2)/5)*185);K.tag(n+' studies · 42,935 men',300,50,{bg:K.BLUE,size:18,al:k});
 const k2=ramp(t,7,8);if(k2<=0)return;K.panel(60,90,480,300,k2);K.txt('Average sperm count, Western men',300,114,{size:16,col:K.BLUE,al:k2});G.line(100,350,510,350,K.INK,2,.5);K.txt('1973',110,370,{size:14,al:k2});K.txt('2011',500,370,{size:14,al:k2});
 const q=G.rnd(8),m=Math.floor(G.clamp((t-8)/3)*60);for(let i=0;i<m;i++){const x=q(),y=.85-.45*x+(q()-.5)*.35;G.dot(110+x*390,350-G.clamp(y)*220,4,K.TEAL,.7)}if(t>11)G.line(110,350-.85*220,500,350-.4*220,K.TERRA,5,ramp(t,11,12));if(t>12.5)K.tag('Down by about half',380,170,{bg:K.TERRA,size:18,pop:G.clamp((t-12.5)/.4)})},
 story:[[0,'Q',"Are men's sperm counts changing over the decades? Single studies disagreed, so researchers pooled them."],
 [0,'S',"This is a meta-analysis: it combines the results of many earlier studies to see the overall pattern. Here: 185 studies of 42,935 men, from 1973 to 2011."],
 [7,'D',"They lined the results up by year and fitted a trend line through them."],
 [11,'R',"Among Western men not chosen because of fertility problems, average sperm counts fell by about half or more (roughly 50 to 60%)."],
 [13,'W',"A drop that big is a reason to look for causes. Chemicals are one idea among several."],
 [14.5,'N',"Labs measured in different ways and causes weren't tested, so experts still argue over it. The dots are illustrative."]]};
// 15 Stool
D[15]={dur:17,pics:['stool'],draw(g,t){bg('stool');const lit=Math.floor(G.clamp((t-8)/2.5)*8);K.panel(70,40,460,120,ramp(t,1,2));K.txt('8 volunteers, several countries',300,66,{size:16,col:K.BLUE,al:ramp(t,1,2)});K.people(110,120,8,8,44,lit,'#b8a58a',K.TERRA,ramp(t,1,2));
 const k=ramp(t,4,5);if(k<=0)return;K.lens(300,380,130,(x,y,r)=>{G.dot(x,y,r,'#fbf7ee');K.bits(x,y,r*.8,22,5,{s:6,al:ramp(t,6,8)})},k);K.txt('the filter, magnified',300,530,{size:16,al:k});if(t>10.5)K.tag('8 out of 8',300,580,{bg:K.TERRA,size:24,pop:G.clamp((t-10.5)/.4)})},
 story:[[0,'Q',"Do we swallow plastic without knowing it? One simple way to check: look at what comes out."],
 [0,'S',"Eight healthy volunteers from several countries each gave a stool (poo) sample."],
 [4,'D',"In the lab, each sample was filtered, and the tiny particles left behind were tested to see which were plastic."],
 [8,'R',"Every one of the eight had microplastics in their stool. Microplastics = plastic pieces smaller than 5 millimetres."],
 [11.5,'W',"Plastic gets into us through what we eat and drink, often without us noticing."],
 [13,'N',"Only eight people. It shows plastic is there, not how much most people swallow, or whether it harms them."]]};
// 16 Plasticenta
D[16]={dur:18,pics:['placenta'],draw(g,t){bg('placenta');const k=ramp(t,2,3);K.panel(60,40,480,290,k);if(k<=0)return;
 G.c.globalAlpha=k;G.c.fillStyle='#f3c9c0';G.c.beginPath();G.c.ellipse(300,190,150,110,0,0,7);G.c.fill();G.c.fillStyle='#e8a090';G.c.beginPath();G.c.ellipse(300,110,120,30,0,0,7);G.c.fill();G.c.globalAlpha=1;
 G.dot(300,205,48,'#f6d8c8',k);G.dot(320,190,20,'#f6d8c8',k);K.txt('placenta',300,92,{size:16,al:k});K.txt('baby',300,262,{size:15,al:k});
 if(t>6)for(let i=0;i<6;i++){const u=((t*.4+i/6)%1);G.dot(300+Math.sin(i*2)*60,110+u*70,4,K.SAFF,.8)}
 if(t>9){const q=G.rnd(3);for(let i=0;i<12;i++){const px=200+q()*200,py=95+q()*30;K.burst(px,py,30,G.clamp((t-9-i*.15)/1));G.dot(px,py,4,['#2f6fd0','#e0464a','#2fa36b'][i%3],G.clamp((t-9-i*.15)))}}
 if(t>11.5)K.tag('12 plastic bits in 4 of 6 placentas',300,370,{bg:K.TERRA,size:18,pop:G.clamp((t-11.5)/.4)})},
 story:[[0,'Q',"Before birth, a baby gets food and oxygen through the placenta. Could tiny plastic reach even there?"],
 [0,'S',"The placenta is an organ that grows during pregnancy. It sits between mother and baby, passing food and oxygen across."],
 [5,'D',"Researchers in Italy studied 6 placentas from healthy pregnancies, after birth, using a special microscope that can tell what a tiny particle is made of."],
 [9,'R',"Checked online: they found 12 microplastic fragments in 4 of the 6 placentas, on both the mother's side and the baby's side."],
 [12.5,'W',"The first evidence that microplastics reach the placenta, the baby's lifeline."],
 [14,'N',"It reports presence only. No health effect is claimed, and 6 is a very small number."]]};
// 17 Blood
D[17]={dur:18,pics:['blood'],draw(g,t){bg('blood');const lit=Math.floor(G.clamp((t-9)/2.5)*17);const k0=ramp(t,1,2);K.panel(60,30,480,130,k0);K.txt('22 healthy volunteers',300,52,{size:16,col:K.BLUE,al:k0});K.people(98,95,22,11,37,lit,'#b8a58a',K.TERRA,k0);
 const k=ramp(t,4,5);if(k<=0)return;K.panel(100,190,400,220,k);K.txt('Plastic types found',300,214,{size:16,col:K.BLUE,al:k});
 K.bars(140,240,320,110,[{v:.5,val:'50%',label:'PET',col:K.TEAL},{v:.36,val:'36%',label:'PS',col:K.BLUE},{v:.23,val:'23%',label:'PE',col:K.SAFF},{v:.05,val:'5%',label:'PMMA',col:'#8a5bd0'}],G.clamp((t-5)/2),{gap:20,ls:13.5,vs:17});
 if(t>11.5)K.tag('17 of 22 had measurable plastic',300,450,{bg:K.TERRA,size:18,pop:G.clamp((t-11.5)/.4)})},
 story:[[0,'Q',"We know plastic gets eaten and breathed in. But can it travel in your blood, around your whole body?"],
 [0,'S',"In 2022, scientists in the Netherlands built a very sensitive test and used it on blood from 22 healthy volunteers."],
 [4,'D',"They looked for five common plastics. PET = drinks bottles. Polystyrene (PS) = foam cups. Polyethylene (PE) = plastic bags. PMMA = clear 'acrylic glass'."],
 [9,'R',"Checked online: 17 of the 22 people had a measurable amount of plastic in their blood. PET turned up most often, in half of them."],
 [12.5,'W',"It showed for the first time that plastic particles can get into the human bloodstream."],
 [14,'N',"It shows plastic is there, not whether it harms health. The bars show the share of donors with each plastic."]]};
// 18 Olfactory bulb
D[18]={dur:18,pics:['olfactory'],draw(g,t){bg('olfactory');const k=ramp(t,2,3);if(k>0){const p=[[205,340],[260,330],[330,315]];for(let i=0;i<5;i++){const u=((t*.35+i/5)%1);const x=lerp(p[0][0],p[2][0],u),y=lerp(p[0][1],p[2][1],u);G.dot(x,y,5,K.TERRA,k)}K.note('nose',120,300,200,340,k,{lift:-20});K.note('smell centre (olfactory bulb)',300,230,330,312,ramp(t,4,5),{size:16})}
 const lit=Math.floor(G.clamp((t-9)/2.5)*8);const k2=ramp(t,7,8);K.panel(70,600,460,150,k2);K.txt('15 people examined after death, São Paulo',300,624,{size:15,col:K.BLUE,al:k2});K.people(100,690,15,15,26,lit,'#b8a58a',K.TERRA,k2);if(t>11.5)K.tag('8 of 15',300,560,{bg:K.TERRA,size:24,pop:G.clamp((t-11.5)/.4)})},
 story:[[0,'Q',"The nose sits very close to the brain. Could microplastics we breathe in sneak up into it?"],
 [0,'S',"The olfactory bulb is the brain's smell centre, sitting just above the inside of your nose. Smell nerves link the two."],
 [5,'D',"Researchers examined the olfactory bulbs of 15 people who had died in São Paulo, Brazil, searching for tiny plastic particles."],
 [9,'R',"Checked online: they found microplastics in the smell centre of 8 of the 15 people, mostly small fragments and fibres."],
 [12.5,'W',"It suggests the nose may be one route by which plastic reaches the brain."],
 [14,'N',"It shows they can get there, not what they do. The painted head model is only roughly accurate; the dots mark the idea of the route."]]};
// 19 Atheromas
D[19]={dur:19,pics:['surgery'],draw(g,t){bg('surgery');const k=ramp(t,2,3);K.panel(60,30,480,250,k);if(k>0){G.c.globalAlpha=k;G.rr(100,130,400,56,28,'#e8a0a0');G.c.globalAlpha=1;G.dot(300,140,40,'#f2d28a',k);K.txt('plaque in a neck artery',300,90,{size:16,col:K.BLUE,al:k});if(t>5)K.bits(300,140,30,10,4,{s:4,al:ramp(t,5,7)});K.txt('blood flow →',300,215,{size:14,w:600,al:k})}
 const k2=ramp(t,9,10);if(k2<=0)return;K.panel(60,320,480,320,k2);K.txt('Heart attack, stroke or death in about 3 years',300,344,{size:15,col:K.BLUE,al:k2,max:440});
 K.bars(140,380,320,180,[{v:.075/.22,val:'7.5%',label:'No plastic found',col:K.TEAL},{v:.2/.22,val:'20%',label:'Plastic found',col:K.TERRA}],G.clamp((t-10)/2),{gap:90,ls:15});if(t>13.5)G.stamp('A LINK',430,300,13.5,t,K.TERRA,28)},
 story:[[0,'Q',"Plastic has been found in blood. Could it collect in the fatty build-up inside arteries, and does that matter for the heart?"],
 [0,'S',"Plaque is a fatty build-up inside an artery. Surgeons in Italy removed plaque from the neck arteries of patients, as a normal operation."],
 [5,'D',"Scientists tested each piece of plaque for plastic, then followed the 257 patients for about three years."],
 [9,'R',"Checked online: 150 patients had polyethylene in their plaque. Over the follow-up, 20% of them had a heart attack, stroke or died, versus 7.5% of those without plastic."],
 [13.5,'W',"The first big sign that plastic inside the body might be linked to illness, not just present."],
 [15,'N',"This shows a link, not proof of cause. Other experts asked whether some samples were contaminated in the operating room."]]};
// 20 Review 2025 (stand-in)
const ORG=[[300,118,'brain'],[300,250,'heart'],[300,330,'gut'],[300,445,'reproductive'],[245,230,'lungs']];
D[20]={dur:18,pics:['bodychart'],draw(g,t){bg('bodychart');K.tag('A review: no new experiment',300,30,{bg:K.INK,size:15});ORG.forEach((o,i)=>{const a=ramp(t,3+i*.8,4+i*.8);if(a>0){K.burst(o[0],o[1],60,((t+i*.3)%2)/2,K.TERRA);G.dot(o[0],o[1],8,K.TERRA,a)}});
 const k=ramp(t,9,10);if(k<=0)return;K.panel(60,560,480,190,k);K.txt('What we know',190,590,{size:16,col:K.TEAL,al:k});K.txt('It gets in, to many organs',190,640,{size:16,w:600,al:k,max:200});K.txt('What we don\'t',410,590,{size:16,col:K.TERRA,al:k});K.txt('Whether it harms us, and how much',410,640,{size:16,w:600,al:k,max:200});G.line(300,580,300,720,K.INK,2,.3*k)},
 story:[[0,'Q',"Plastic has turned up in blood, placentas, brains and arteries. So what does all this add up to?"],
 [0,'S',"In 2025 the journal Nature Medicine published a review: experts gathered the human, animal and lab studies so far."],
 [3,'D',"They tracked where tiny plastic particles have been found, including the placenta and the brain."],
 [7,'R',"They found early warning signs linked to the immune system, reproduction and the heart."],
 [9,'R',"But the human studies so far are small. So harm is not proven yet."],
 [12,'W',"This walk began with genes and rewards shaping us. It ends with an open question: how is the plastic world shaping our bodies? Bigger, careful studies are the next step."],
 [14,'N',"The scene is a labelled stand-in: the dots mark kinds of organs mentioned, not exact findings."]]};
window.DEMOS=D;})();
