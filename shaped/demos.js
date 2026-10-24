/* Things being shaped: 20 experiment demos on painted bright scenes (shaped/scene). Facts only from each stop's Pixel Hound record, plus details checked against the original paper (marked "checked online" in the notes). */
(function(){const G=Demo.G,K=window.K,ramp=(t,a,b)=>G.ramp(t,a,b),lerp=G.lerp,win=(t,a,b,f)=>G.win(t,a,b,f);const D={};
const bg=n=>G.pic(n,0,0,600,800);
const flower=(x,y,r,col,al=1)=>{if(al<=0)return;const C=G.c;C.globalAlpha=al;for(let i=0;i<5;i++){const a=i/5*6.283-1.57;G.dot(x+Math.cos(a)*r*.55,y+Math.sin(a)*r*.55,r*.55,col)}G.dot(x,y,r*.35,'#f2c230');C.globalAlpha=1;G.ring(x,y,r*1.1,'#ffffff',2,.5*al)};
const PUR='#8a4fc8',WHT='#fbfbff';
// 1 Mendel
D['garden']={dur:19,pics:['garden'],draw(g,t){bg('garden');const k=ramp(t,2,3);K.panel(40,40,520,330,k);if(k<=0)return;
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
D['puzzlebox']={dur:19,pics:['puzzlebox'],draw(g,t){bg('puzzlebox');const pull=win(t%4,1.2,2.2,.3)*(t>3&&t<9?1:0);if(pull>0){K.burst(150,520,70,(t%4-1.2));K.tag('Pull the loop!',150,470,{bg:K.TERRA,size:18,al:pull})}
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
D['maze']={dur:18,pics:['maze'],draw(g,t){bg('maze');const k=ramp(t,2,3);K.panel(60,30,480,330,k);if(k<=0)return;const S=[300,330],Gl=[470,80];
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
D['stripes']={dur:19,pics:['stripes'],draw(g,t){bg('stripes');const k=ramp(t,1,2);K.tag('About 5 hours a day, for months',300,60,{bg:K.BLUE,size:19,al:k*win(t,1,8.5,.5)});
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
D['harbour']={dur:19,pics:['harbour'],draw(g,t){bg('harbour');const pl=ramp(t,3,8);if(pl>0){for(let i=0;i<14;i++){const u=((t*.12+i/14)%1);G.glow(lerp(170,420,u),lerp(320,560,u)+Math.sin(i)*30,40+u*40,'#7a5bd0',.22*pl*(1-u))}K.tag('TBT from boat paint',190,280,{bg:'#5a3fa0',size:17,al:pl})}
 const k=ramp(t,7.5,8.5);if(k>0){K.panel(40,430,250,220,k);K.txt('Far from boats',165,455,{size:16,col:K.BLUE,al:k});K.snail(165,560,1,0);K.panel(310,430,250,220,k);K.txt('Near the harbour',435,455,{size:16,col:K.TERRA,al:k});K.snail(435,560,1,ramp(t,10,12.5));
 if(t>12.5)K.note('male part on a female',435,690,470,590,ramp(t,12.5,13.2),{bg:K.TERRA,tc:'#fff',size:16,lift:-10})}
 if(t>14)K.tag('Fewer snails near the boats',300,770,{bg:K.INK,size:18,pop:G.clamp((t-14)/.4)})},
 story:[[0,'Q',"Can a chemical from boat paint change a sea snail's body? In the 1980s, dog-whelks were disappearing from parts of the coast of south-west England."],
 [0,'S',"Dog-whelks are small sea snails living on rocky shores. Many boats then used antifouling paint with a chemical called TBT (tributyltin). Antifouling = stops barnacles and weed growing on the hull."],
 [3,'D',"TBT slowly leaks out of the paint into the water, most of all around harbours full of boats."],
 [7.5,'D',"Researchers surveyed dog-whelks along the coast and compared shores near harbours with shores further away."],
 [10,'R',"Near the boats, the snails were declining. And female snails were growing male body parts. This is called imposex."],
 [14,'W',"The paper linked the decline to TBT from the paints. A trace of chemical in the water was reshaping animals' bodies, an early clue that some chemicals act like hormones."],
 [15.5,'N',"A field survey: it shows a strong pattern along the coast. Checked online: a 1988 lab study by the same group showed TBT itself could cause the change."]]};
// 8 Kidd lake
const POP=[1,1,.95,.15,.06,.05,.25];
D['lake']={dur:20,pics:['lake'],draw(g,t){bg('lake');if(t>3&&t<9){const d=((t-3)%1.2)/1.2;G.dot(430,600+d*60,6,'#c2410c',1-d);K.tag('EE2: 5–6 billionths of a gram per litre',300,520,{bg:K.TERRA,size:16,al:ramp(t,3,3.5)})}
 const yr=Math.min(6,Math.floor(G.clamp((t-8)/6)*7));const v=t<8?1:POP[yr];const q=G.rnd(9);for(let i=0;i<30;i++){const x=120+q()*360,y=260+q()*260,on=i/30<v;if(on)K.fish(x+Math.sin(t*.7+i)*12,y,.35,'#c9a46a',{ph:i,flip:i%2})}
 const k=ramp(t,8,9);if(k<=0)return;K.panel(60,40,480,170,k);K.txt('Young minnows in Lake 260',300,62,{size:17,col:K.BLUE,al:k});
 for(let i=0;i<=yr;i++){const x=100+i*64,h=POP[i]*90;G.rr(x-18,190-h,36,h,6,i>=1&&i<=3?'#5a3fa0':K.TEAL,null,k);K.txt(String(2000+i),x,200,{size:13.5,w:600,al:k})}
 if(t>14.5)K.tag('Collapse after the 2nd summer',300,240,{bg:K.TERRA,size:18,pop:G.clamp((t-14.5)/.4)})},
 story:[[0,'Q',"Surveys found wildlife changed near pollution. But could tiny amounts of a hormone-like chemical really wipe out fish? Karen Kidd's team tested it on a whole lake."],
 [0,'S',"At the Experimental Lakes Area in north-western Ontario, Canada, whole lakes are set aside for research. They chose Lake 260, home to small fish called fathead minnows."],
 [3,'D',"For three summers, 2001 to 2003, they added EE2, the man-made estrogen in birth-control pills, at just 5 to 6 billionths of a gram per litre: levels found in some waste water."],
 [9,'R',"Male minnows became feminised: they made an egg-yolk protein normally made only by females, and some grew eggs in their testes."],
 [12,'R',"After the second summer, almost no young fish survived, and the population nearly vanished. A similar lake left alone stayed normal."],
 [15,'W',"Because this was an experiment, it showed cause: tiny amounts of a pollutant can wreck a wild population."],
 [16.5,'N',"Checked online: a 2015 follow-up found the minnows recovered a few years after the additions stopped. The bars sketch the pattern of young fish, not exact counts."]]};
// 10 Phthalates IQ
D['clinic']={dur:18,pics:['clinic'],draw(g,t){bg('clinic');const k=ramp(t,2,3);K.tag('Pregnancy: phthalates measured in urine',300,60,{bg:K.BLUE,size:16,al:k*win(t,2,8,.4)});
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
D['town']={dur:18,pics:['town'],draw(g,t){bg('town');const k=ramp(t,2,3);K.tag('2014: the water source switches',300,60,{bg:K.BLUE,size:17,al:k*win(t,2,8,.4)});if(t>3&&t<8){for(let i=0;i<8;i++){const u=((t+i/8)%1);G.dot(lerp(180,420,u),lerp(450,620,u),5,'#7a7a8a',.7)}}
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
D['magnetite']={dur:18,pics:['magnetite'],draw(g,t){bg('magnetite');const k=ramp(t,2.5,3.5);K.tag('Brain tissue from Mexico City and Manchester',300,40,{bg:K.BLUE,size:15,al:ramp(t,1,2)});
 if(k<=0)return;K.lens(330,250,160,(x,y,r)=>{G.dot(x,y,r,'#fbeee8');const sh=ramp(t,6,8);const q=G.rnd(2);for(let i=0;i<26;i++){const px=x-120+q()*240,py=y-110+q()*220;if(i<20){G.ball(px,py,7+q()*5,'#4a4a52',sh+.2)}else{G.at(px,py,1,q()*3);G.rr(-7,-4,14,8,2,'#7a6a5a',null,sh);G.end()}}},k);
 if(t>8.5){K.tag('round, smooth: like fuel-burning balls',330,440,{bg:K.TERRA,size:16,pop:G.clamp((t-8.5)/.4)})}if(t>10.5)K.tag('few sharp crystals the body makes itself',330,480,{bg:'#fffaf0',col:K.INK,size:15,pop:G.clamp((t-10.5)/.4)})},
 story:[[0,'Q',"Dirty air goes into your lungs. Could its tiniest bits reach your brain?"],
 [0,'S',"Scientists examined brain tissue from people who had died, from Mexico City and Manchester, England."],
 [2.5,'D',"They hunted for magnetite, a magnetic iron mineral, and looked at each particle's shape with powerful microscopes."],
 [8.5,'R',"They found many tiny magnetite particles. Lots were round and smooth, like the little balls made when fuel burns, not the sharp crystals the body makes itself."],
 [12,'W',"So pollution particles may reach the brain. One idea: the tiniest ones travel up the smell nerve from the nose."],
 [13.5,'N',"This shows the particles are there. It does not show they cause harm; any link to Alzheimer's disease is only a hypothesis."]]};
// 16 Plasticenta
D['placenta']={dur:18,pics:['placenta'],draw(g,t){bg('placenta');const k=ramp(t,2,3);K.panel(60,40,480,290,k);if(k<=0)return;
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
D['blood']={dur:18,pics:['blood'],draw(g,t){bg('blood');const lit=Math.floor(G.clamp((t-9)/2.5)*17);const k0=ramp(t,1,2);K.panel(60,30,480,130,k0);K.txt('22 healthy volunteers',300,52,{size:16,col:K.BLUE,al:k0});K.people(98,95,22,11,37,lit,'#b8a58a',K.TERRA,k0);
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
D['olfactory']={dur:18,pics:['olfactory'],draw(g,t){bg('olfactory');const k=ramp(t,2,3);if(k>0){const p=[[205,340],[260,330],[330,315]];for(let i=0;i<5;i++){const u=((t*.35+i/5)%1);const x=lerp(p[0][0],p[2][0],u),y=lerp(p[0][1],p[2][1],u);G.dot(x,y,5,K.TERRA,k)}K.note('nose',120,300,200,340,k,{lift:-20});K.note('smell centre (olfactory bulb)',300,230,330,312,ramp(t,4,5),{size:16})}
 const lit=Math.floor(G.clamp((t-9)/2.5)*8);const k2=ramp(t,7,8);K.panel(70,600,460,150,k2);K.txt('15 people examined after death, São Paulo',300,624,{size:15,col:K.BLUE,al:k2});K.people(100,690,15,15,26,lit,'#b8a58a',K.TERRA,k2);if(t>11.5)K.tag('8 of 15',300,560,{bg:K.TERRA,size:24,pop:G.clamp((t-11.5)/.4)})},
 story:[[0,'Q',"The nose sits very close to the brain. Could microplastics we breathe in sneak up into it?"],
 [0,'S',"The olfactory bulb is the brain's smell centre, sitting just above the inside of your nose. Smell nerves link the two."],
 [5,'D',"Researchers examined the olfactory bulbs of 15 people who had died in São Paulo, Brazil, searching for tiny plastic particles."],
 [9,'R',"Checked online: they found microplastics in the smell centre of 8 of the 15 people, mostly small fragments and fibres."],
 [12.5,'W',"It suggests the nose may be one route by which plastic reaches the brain."],
 [14,'N',"It shows they can get there, not what they do. The painted head model is only roughly accurate; the dots mark the idea of the route."]]};
// 19 Atheromas
D['surgery']={dur:19,pics:['surgery'],draw(g,t){bg('surgery');const k=ramp(t,2,3);K.panel(60,30,480,250,k);if(k>0){G.c.globalAlpha=k;G.rr(100,130,400,56,28,'#e8a0a0');G.c.globalAlpha=1;G.dot(300,140,40,'#f2d28a',k);K.txt('plaque in a neck artery',300,90,{size:16,col:K.BLUE,al:k});if(t>5)K.bits(300,140,30,10,4,{s:4,al:ramp(t,5,7)});K.txt('blood flow →',300,215,{size:14,w:600,al:k})}
 const k2=ramp(t,9,10);if(k2<=0)return;K.panel(60,320,480,320,k2);K.txt('Heart attack, stroke or death in about 3 years',300,344,{size:15,col:K.BLUE,al:k2,max:440});
 K.bars(140,380,320,180,[{v:.075/.22,val:'7.5%',label:'No plastic found',col:K.TEAL},{v:.2/.22,val:'20%',label:'Plastic found',col:K.TERRA}],G.clamp((t-10)/2),{gap:90,ls:15});if(t>13.5)G.stamp('A LINK',190,440,13.5,t,K.TERRA,26)},
 story:[[0,'Q',"Plastic has been found in blood. Could it collect in the fatty build-up inside arteries, and does that matter for the heart?"],
 [0,'S',"Plaque is a fatty build-up inside an artery. Surgeons in Italy removed plaque from the neck arteries of patients, as a normal operation."],
 [5,'D',"Scientists tested each piece of plaque for plastic, then followed the 257 patients for about three years."],
 [9,'R',"Checked online: 150 patients had polyethylene in their plaque. Over the follow-up, 20% of them had a heart attack, stroke or died, versus 7.5% of those without plastic."],
 [13.5,'W',"The first big sign that plastic inside the body might be linked to illness, not just present."],
 [15,'N',"This shows a link, not proof of cause. Other experts asked whether some samples were contaminated in the operating room."]]};
// 20 Review 2025 (stand-in)
const ORG=[[300,118,'brain'],[300,250,'heart'],[300,330,'gut'],[300,445,'reproductive'],[245,230,'lungs']];
D['bodychart']={dur:18,pics:['bodychart'],draw(g,t){bg('bodychart');K.tag('A review: no new experiment',300,30,{bg:K.INK,size:15});ORG.forEach((o,i)=>{const a=ramp(t,3+i*.8,4+i*.8);if(a>0){K.burst(o[0],o[1],60,((t+i*.3)%2)/2,K.TERRA);G.dot(o[0],o[1],8,K.TERRA,a)}});
 const k=ramp(t,9,10);if(k<=0)return;K.panel(60,560,480,190,k);K.txt('What we know',190,590,{size:16,col:K.TEAL,al:k});K.txt('It gets in, to many organs',190,640,{size:16,w:600,al:k,max:200});K.txt('What we don\'t',410,590,{size:16,col:K.TERRA,al:k});K.txt('Whether it harms us, and how much',410,640,{size:16,w:600,al:k,max:200});G.line(300,580,300,720,K.INK,2,.3*k)},
 story:[[0,'Q',"Plastic has turned up in blood, placentas, brains and arteries. So what does all this add up to?"],
 [0,'S',"In 2025 the journal Nature Medicine published a review: experts gathered the human, animal and lab studies so far."],
 [3,'D',"They tracked where tiny plastic particles have been found, including the placenta and the brain."],
 [7,'R',"They found early warning signs linked to the immune system, reproduction and the heart."],
 [9,'R',"But the human studies so far are small. So harm is not proven yet."],
 [12,'W',"This walk began with genes and rewards shaping us. It ends with an open question: how is the plastic world shaping our bodies? Bigger, careful studies are the next step."],
 [14,'N',"The scene is a labelled stand-in: the dots mark kinds of organs mentioned, not exact findings."]]};
// mirror box
D['mirrorbox']={dur:18,pics:['mirrorbox'],draw(g,t){bg('mirrorbox');const k=ramp(t,1.5,2.5);K.panel(70,40,460,250,k);if(k<=0)return;K.txt('Seen from above',300,62,{size:15,col:K.BLUE,al:k});
 G.line(300,80,300,270,'#8fb3c9',8,k);K.txt('mirror',300,284,{size:13.5,w:600,al:k});
 const mv=t>5?Math.sin((t-5)*2.4)*18:0;const arm=(x,dir,col,al,lab)=>{G.rr(x-22,180,44,90,18,col,null,al);G.dot(x,170+mv*(dir),22,col,al);K.txt(lab,x,130,{size:14,w:600,al})};
 arm(400,1,'#e2b48a',k,'real hand');arm(200,1,G.mix('#e2b48a','#ffffff',.35),k*(t>5?1:.25),t>5?'what they see':'hidden hand');if(t<5)G.rr(150,150,100,130,10,null,'#8a7a66',k,3);
 if(t>9){K.tag('Phantom pain eased in some patients',300,330,{bg:K.TERRA,size:16,pop:G.clamp((t-9)/.4)})}},
 story:[[0,'Q',"After losing an arm, many people still feel it, sometimes as a painful clenched fist. Could simply seeing the arm move again help?"],
 [0,'S',"V. S. Ramachandran invented the mirror box in the 1990s. In 2009 he and Eric Altschuler reviewed what it had done so far. A mirror stands upright between the arms. The missing or paralysed arm is hidden behind it."],
 [5,'D',"The person moves their good hand and looks into the mirror. The reflection sits exactly where the other hand should be, so it looks as if both hands are moving."],
 [9,'R',"Some people felt their phantom arm unclench, and their pain eased. In a small stroke study of 9 patients, 3 recovered moderately, 3 mildly and 3 hardly at all."],
 [12,'R',"Checked online: the review also describes two later controlled trials, each of 40 stroke patients, where mirror therapy beat a covered-mirror comparison on some movement scores."],
 [14,'W',"What the eyes see can reshape the brain's map of the body, even after injury."],
 [15.5,'N',"A review by the method's own inventor, and results varied widely between patients. The top-down sketch is illustrative."]]};
// prenatal stress (review stand-in)
const PN=[[180,150],[300,110],[420,150],[230,240],[370,240],[300,190]];
D['prenatal']={dur:17,pics:['prenatal'],draw(g,t){bg('prenatal');K.tag('A review: illustrated stand-in',300,30,{bg:K.INK,size:15});const k=ramp(t,2,3);K.panel(80,60,440,250,k);if(k<=0)return;K.txt('A baby brain network (sketch)',300,82,{size:15,col:K.BLUE,al:k});
 const st=ramp(t,7,9);for(let i=0;i<6;i++)for(let j=i+1;j<6;j++){const key=(i===3&&j===5);G.line(PN[i][0],PN[i][1],PN[j][0],PN[j][1],key?K.TERRA:'#b8a58a',key?6-4*st:1.5,key?1:.4*k)}PN.forEach((p,i)=>K.node(p[0],p[1],14,i===3||i===5?1:0,i===3?K.TERRA:K.SAFF));
 K.txt('amygdala',230,272,{size:13.5,w:600,al:k});K.txt('thalamus',350,206,{size:13.5,w:600,al:k});if(t>9)K.tag('More stress in pregnancy: weaker link',300,345,{bg:K.TERRA,size:16,pop:G.clamp((t-9)/.4)})},
 story:[[0,'Q',"Can a mother's stress during pregnancy shape how her baby's brain is wired?"],
 [0,'S',"Dustin Scheinost and colleagues reviewed animal studies and brain scans of babies. The connectome = the brain's whole wiring diagram of connections."],
 [3,'D',"Animal studies: the young of mothers stressed in pregnancy often showed more anxiety and weaker spatial memory."],
 [7,'R',"Human scans: in babies born early, more stress or depression in pregnancy was linked to a weaker link between the amygdala (a fear and emotion area) and the thalamus (a relay hub)."],
 [11,'W',"The environment may start shaping the brain's wiring before birth."],
 [12.5,'N',"A review of early, small studies. Links, not proof, and many causes overlap. The network is a labelled sketch, not a scan."]]};
// mother's support (Luby study, via Meaney commentary)
D['mothercare']={dur:18,pics:['mothercare'],draw(g,t){bg('mothercare');const k=ramp(t,1.5,2.5);K.tag('Preschool: support seen in a mildly stressful task',300,40,{bg:K.BLUE,size:15,al:k*win(t,1.5,7,.4)});if(t>2&&t<7)K.burst(350,520,70,((t-2)%1.6)/1.6,K.SAFF);
 const k2=ramp(t,7,8);if(k2<=0)return;K.panel(80,60,440,300,k2);K.txt('Hippocampus growth over three scans',300,84,{size:15,col:K.BLUE,al:k2});
 K.bars(140,120,320,170,[{v:1.31/3,val:'1.31%',label:'less support',col:K.TEAL},{v:2.70/3,val:'2.70%',label:'more support',col:K.TERRA}],G.clamp((t-8)/1.5),{gap:90,ls:14,vs:19});if(t>11.5)K.tag('About twice as fast',300,395,{bg:K.TERRA,size:17,pop:G.clamp((t-11.5)/.4)})},
 story:[[0,'Q',"Does everyday support from a parent shape how a child's brain grows? Michael Meaney's 2016 commentary looked at a new study by Joan Luby and colleagues."],
 [0,'S',"127 children were watched with their mothers during a mildly stressful task at preschool age. Researchers rated how supportive each mother was: calm, warm and encouraging."],
 [7,'D',"The children then had three MRI brain scans through school age and early adolescence. The team measured the hippocampus, a memory and emotion area."],
 [9,'R',"Checked online: with more support at preschool age, the hippocampus grew about twice as fast (2.70% vs 1.31%, comparing mothers well above and well below average). Support at school age showed no such effect."],
 [13,'W',"Early childhood may be a sensitive window when warm support shapes brain growth. Rat studies, Meaney notes, point the same way."],
 [14.5,'N',"An observational study: a link, not proof. Families differ in many ways."]]};
// infant music
D['music']={dur:18,pics:['music'],draw(g,t){bg('music');const k=ramp(t,1,2);K.panel(310,40,250,150,k);if(k>0){K.txt('Waltz: 1-2-3',435,62,{size:16,col:K.BLUE,al:k});const b=Math.floor((t*2.4)%3);for(let i=0;i<3;i++)G.dot(375+i*60,120,i===b?20:12,i===0?K.TERRA:K.SAFF,k);K.txt('12 sessions × 15 min',435,170,{size:13.5,w:600,al:k})}
 const k2=ramp(t,8,9);if(k2<=0)return;K.panel(40,210,520,245,k2);K.txt('Brain response to a broken rhythm (MEG)',300,232,{size:15,col:K.BLUE,al:k2});
 K.bars(90,260,420,110,[{v:.35,label:'play',col:K.TEAL},{v:.75,label:'music',col:K.TERRA},{v:.35,label:'play',col:K.TEAL},{v:.7,label:'music',col:K.TERRA}],G.clamp((t-9)/1.5),{gap:24,ls:14});K.txt('in music',195,432,{size:14,col:K.BLUE,al:k2});K.txt('in speech',405,432,{size:14,col:K.BLUE,al:k2})},
 story:[[0,'Q',"Can a few weeks of music play change how a baby's brain hears rhythm, even in speech? Christina Zhao and Patricia Kuhl tested it."],
 [0,'S',"47 nine-month-old babies were randomly split into two groups. One had 12 music sessions of 15 minutes over four weeks: bouncing and tapping to waltz rhythms (1-2-3) with a parent. The other had similar play, without music."],
 [8,'D',"Afterwards, babies heard rhythm patterns with an occasional break in the pattern, in music and in speech. MEG (a scanner that picks up the brain's magnetic signals) recorded their responses."],
 [10,'R',"The music babies' brains reacted more strongly to broken rhythms, in music and in speech, in hearing areas and in front areas used for prediction."],
 [13,'W',"Early experience can sharpen the brain's sense of timing, a skill shared by music and language."],
 [14.5,'N',"A small randomised trial measuring brain responses, not later language skills. The bars are illustrative."]]};
// newborn kicks
D['newborn']={dur:17,pics:['newborn'],draw(g,t){bg('newborn');const k=ramp(t,1.5,2.5);K.panel(80,40,440,270,k);if(k<=0)return;K.txt('Brain seen from above',300,62,{size:15,col:K.BLUE,al:k});
 G.c.globalAlpha=k;G.c.fillStyle='#f3d6c8';G.c.beginPath();G.c.ellipse(300,180,110,95,0,0,7);G.c.fill();G.c.globalAlpha=1;G.line(300,90,300,270,'#c9a08a',3,k);K.txt('left',230,290,{size:13.5,w:600,al:k});K.txt('right',370,290,{size:13.5,w:600,al:k});
 const ph=(t-4)%3;const kick=t>4&&ph<1;if(kick){K.burst(470,560,60,ph,K.SAFF);K.tag('right foot kicks',470,610,{bg:K.SAFF,col:K.INK,size:14})}if(t>4&&ph>.2&&ph<1.4){const p=[];for(let i=0;i<=60;i++){const u=i/60;p.push([230+(u-.5)*80,170+Math.sin(u*50)*12*Math.sin(u*3.14)])}G.path(p,K.TERRA,3,1);G.glow(240,165,60,K.TERRA,.45)}
 if(t>10)K.tag('Strongest in babies born early',300,345,{bg:K.TERRA,size:16,pop:G.clamp((t-10)/.4)})},
 story:[[0,'Q',"Late in pregnancy, babies kick a lot. Could those kicks help the brain map its own body?"],
 [0,'S',"At a London hospital, researchers recorded EEG (brainwaves) from 19 sleeping newborns, about 2 days old on average. Some were born early: from 31 to 42 weeks counting from the start of pregnancy."],
 [4,'D',"During active (REM) sleep, babies twitch and kick on their own. The team lined up each movement with the brainwaves just after it."],
 [6,'R',"Right after a limb moved, fast brainwaves fired in the brain's touch area for that limb, on the opposite side. A right foot kick lit up the left side."],
 [10,'R',"These waves were largest in babies born early, who would normally still be in the womb, and faded within a few weeks of age."],
 [12,'W',"A baby's own movements may help build the brain's body map before birth."],
 [13.5,'N',"Taken from a news report of Whitehead, Meek & Fabrizi, Scientific Reports, 2018. Measured in newborns, not inside the womb. The brain sketch is illustrative."]]};
// a week in the dark
D['darkbox']={dur:18,pics:['darkbox'],draw(g,t){bg('darkbox');const k=ramp(t,1,2);K.tag('Adult mice: 7 days in the dark',300,40,{bg:K.INK,size:16,al:k*win(t,1,7,.4)});if(t>1&&t<7)G.rr(0,0,600,800,0,'#000000',null,.35*Math.sin(G.clamp((t-1)/6)*3.14));
 if(t>5&&t<9)K.tag('Then: 17 different tones',490,600,{bg:K.SAFF,col:K.INK,size:15,al:ramp(t,5,5.5)});
 const k2=ramp(t,9,10);if(k2<=0)return;K.panel(60,60,480,280,k2);K.txt('Share of hearing cells tuned to each pitch',300,84,{size:15,col:K.BLUE,al:k2,max:440});
 const f=G.clamp((t-10)/2);K.bars(110,120,380,150,[{v:.3+.12*f,label:'low',col:K.TEAL},{v:.45-.2*f,label:'middle',col:K.SAFF},{v:.3+.12*f,label:'high',col:K.TEAL}],1,{gap:40,ls:15});if(t>12.5)K.tag('More low and high, fewer middle',300,370,{bg:K.TERRA,size:16,pop:G.clamp((t-12.5)/.4)})},
 story:[[0,'Q',"Sense maps were thought to set in childhood. Can an adult brain still reshape one, just by taking away a different sense?"],
 [0,'S',"Patrick Kanold's team at the University of Maryland kept adult mice in darkness for one week."],
 [5,'D',"Then they played 17 different tones and recorded groups of cells in the auditory cortex, the brain's hearing area."],
 [10,'R',"More cells now responded best to low and high pitches, and fewer to middle pitches. Cells also fired together in new patterns."],
 [13.5,'W',"Taking away sight reshaped hearing in adult brains, long after the usual window for this kind of change."],
 [15,'N',"Taken from a university news report of Solarana et al., eNeuro, 2019. A mouse study. The bars show the direction of change, not exact numbers. Ideas about helping people with cochlear implants are still speculation."]]};
const ORD=window.FIELD.meta.imgs;const O={};ORD.forEach((sc,i)=>{O[i+1]=D[sc]});window.DEMOS=O;})();
