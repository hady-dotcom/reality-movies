/* Learning & holding: 20 experiment demos on painted bright scenes (hold/scene). Facts from each stop's Pixel Hound record, plus details checked against the original paper (marked "checked online"). */
(function(){const G=Demo.G,K=window.K,ramp=(t,a,b)=>G.ramp(t,a,b),lerp=G.lerp,win=(t,a,b,f)=>G.win(t,a,b,f);const D={};
const bg=n=>G.pic(n,0,0,600,800);
const wave=(x,y,w,amp,f,ph,col,lw=3,al=1,n=120)=>{const p=[];for(let i=0;i<=n;i++){const u=i/n;p.push([x+u*w,y+Math.sin(u*f*6.283+ph)*amp])}G.path(p,col,lw,al)};
const bell=(x,y,a)=>{G.dot(x,y,16,K.SAFF,a);G.ring(x,y,16,K.INK,2,.4*a)};
const mouseLight=(x,y,on)=>{G.glow(x,y-30,60,'#4aa8ff',on*.7);G.line(x,y-80,x,y-20,'#4aa8ff',4,on)};
// 1 Pavlov
D[1]={dur:18,pics:['pavlov'],draw(g,t){bg('pavlov');const trial=t<11?Math.floor((t-2)/2.2):-1,ph=((t-2)%2.2)/2.2;
 if(t>2&&t<11){K.tag('Trial '+(trial+1),300,40,{bg:K.BLUE,size:16});K.burst(130,220,60,ph<.4?ph/.4:0,K.SAFF);K.txt('signal',130,170,{size:16,al:ph<.5?1:.4});if(trial<3&&ph>.45){G.dot(470,250,20,'#c97a3a',1);K.txt('food',470,215,{size:16})}}
 if(t>11.5){K.burst(130,220,60,((t-11.5)%2)/2,K.SAFF);K.tag('Signal only, no food',300,40,{bg:K.TERRA,size:17})}
 const k=ramp(t,3,4);K.panel(60,560,480,190,k);if(k<=0)return;K.txt('Saliva after the signal, before any food',300,584,{size:15,col:K.BLUE,al:k,max:440});const lv=[.1,.35,.6,.85,.9];const m=G.clamp(Math.floor((t-3)/2.2)+1,0,5);K.bars(110,610,380,100,lv.slice(0,m).map((v,i)=>({v,label:i==4?'signal only':'trial '+(i+1),col:i==4?K.TERRA:K.TEAL})).concat(Array(5-m).fill({v:0})),1,{gap:16,ls:13.5})},
 story:[[0,'Q',"Your mouth waters when you smell dinner. But can it learn to water at a sound that only means dinner? Ivan Pavlov studied this in dogs."],
 [0,'S',"Pavlov measured the saliva and stomach juices dogs made. He won the 1904 Nobel Prize for this work on digestion and described it in his Nobel lecture."],
 [2,'D',"A signal came just before food arrived, again and again."],
 [7,'R',"Soon the dog made saliva at the signal alone, before any food appeared. The body had learned the link."],
 [11.5,'W',"This is called conditioning: a learned link between a signal and what follows. It showed learning can reach right into the body's automatic workings."],
 [13.5,'N',"The bars show the idea of rising saliva, not his recorded amounts."]]};
// 2 Berger
D[2]={dur:17,pics:['eeg1929'],draw(g,t){bg('eeg1929');const k=ramp(t,3,4);K.panel(50,520,500,230,k);if(k<=0)return;K.txt('Paper strip from the recorder',300,542,{size:15,col:K.BLUE,al:k});const sh=t*1.5;const closed=t>8&&t<12.5;
 wave(70,610,460,closed?22:8,closed?18:40,-sh*6,K.INK,2.5,k);if(t>8)K.tag(closed?'Eyes closed, resting: big slow-ish waves':'Eyes open: smaller, faster waves',300,700,{bg:closed?K.TEAL:K.TERRA,size:15,al:ramp(t,8,8.5)})},
 story:[[0,'Q',"Your brain is always busy. Could you see that activity from outside, without opening the skull? In 1929 Hans Berger tried."],
 [0,'S',"Berger placed electrodes on a person's head, connected to a very sensitive recorder that drew lines on paper."],
 [3,'R',"He recorded wavy electrical rhythms from a living human brain for the first time: the EEG (electroencephalogram)."],
 [8,'R',"Rested with eyes closed, bigger regular waves appeared (now called alpha waves). With eyes open they shrank into faster ones (beta)."],
 [12.5,'W',"The EEG let scientists track the living brain. Later stops use it to study memory during sleep."],
 [13.5,'N',"Thin evidence: our record of this paper is short. The traces drawn here show the kind of pattern, not his recording."]]};
// 3 Hebb (theory stand-in)
const NP=[[180,180],[300,130],[420,180],[200,310],[400,310],[300,250]];
D[3]={dur:17,pics:['pinboard'],draw(g,t){bg('pinboard');K.tag('A theory: illustrated, not an experiment',300,40,{bg:K.INK,size:15});const k=ramp(t,1,2);K.panel(80,80,440,300,k);if(k<=0)return;
 const reps=G.clamp((t-3)/6),fire=(t%1.4)<.4&&t>3&&t<9;const grp=[0,1,5];
 for(let i=0;i<6;i++)for(let j=i+1;j<6;j++){const ing=grp.includes(i)&&grp.includes(j);G.line(NP[i][0],NP[i][1],NP[j][0],NP[j][1],ing?K.TERRA:'#b8a58a',ing?1.5+reps*8:1.5,ing?.4+reps*.6:.35)}
 const recall=t>11&&(t%1.5)<.8;NP.forEach((p,i)=>{const on=grp.includes(i)&&(fire||(recall&&(i===0||t%1.5>.25)));K.node(p[0],p[1],20,on?1:0,K.SAFF)});
 if(t>11)K.tag('One cell starts it, the rest follow',300,410,{bg:K.TERRA,size:17,pop:G.clamp((t-11)/.4)})},
 story:[[0,'Q',"When you learn something, what actually changes inside your brain? In 1949 Donald Hebb offered an idea."],
 [0,'S',"The brain is made of nerve cells (neurons) linked at connections called synapses."],
 [3,'D',"Hebb proposed that when cells are active together, again and again, the connections between them grow stronger. Often summed up as: cells that fire together wire together."],
 [9,'R',"A strongly linked group, a 'cell assembly', could then hold a memory: switch on part of it and the rest follows."],
 [12,'W',"This idea guided memory research for decades, including the search for memory cells in Room 3."],
 [13.5,'N',"Thin evidence: Hebb's book offers a theory, not a test, and our record of it is short. The scene is a labelled stand-in."]]};
// 4 Lashley
D[4]={dur:18,pics:['maze'],draw(g,t){bg('maze');const k=ramp(t,2,3);K.panel(60,40,480,330,k);if(k<=0)return;K.txt('Errors after training, by amount of brain removed',300,64,{size:15,col:K.BLUE,al:k,max:440});
 G.line(110,320,500,320,K.INK,2,.5);K.txt('more brain removed →',300,345,{size:14,w:600,al:k});const q=G.rnd(3),n=Math.floor(G.clamp((t-4)/4)*24);for(let i=0;i<n;i++){const x=q(),y=.15+.6*x+(q()-.5)*.2;G.dot(120+x*370,320-G.clamp(y)*210,6,K.TEAL,.85)}
 if(t>9){G.line(125,320-.15*210,490,320-.75*210,K.TERRA,4,ramp(t,9,10));K.tag('Amount mattered, not the spot',300,140,{bg:K.TERRA,size:17,pop:G.clamp((t-10)/.4)})}},
 story:[[0,'Q',"If a memory is stored in the brain, can you find the exact spot? Karl Lashley spent decades looking, and summed it up in 1950."],
 [0,'S',"Rats learned mazes. Then Lashley removed different parts of the outer brain (the cortex) and tested the rats again."],
 [4,'R',"No single cut wiped out the memory. Rats did worse the more cortex was removed, whichever part it was."],
 [10,'W',"He concluded memory seemed spread out across the brain, not kept in one spot. The hunt for the 'engram' (a memory's physical trace) went on."],
 [12,'N',"The dots illustrate the shape of his finding, not his data. He removed outer brain only; Room 3 finds memory cells in a deeper area, the hippocampus."]]};
// 5 Miller
const SEQ='7 2 9 4 1 8 3 6 5'.split(' ');
D[5]={dur:17,pics:['study'],draw(g,t){bg('study');const k=ramp(t,1,2);K.panel(50,40,500,260,k);if(k<=0)return;K.txt('Read the digits, then say them back',300,64,{size:16,col:K.BLUE,al:k});
 const shown=Math.floor(G.clamp((t-2)/5)*9);SEQ.slice(0,shown).forEach((d,i)=>{const kept=t<8||i<7;K.big(d,90+i*52,150,40,kept?K.INK:'#c9b9a0',t>8&&!kept?.4:1)});
 if(t>8){G.rr(64,112,370,76,14,null,K.TEAL,1,4);K.tag('About 7 held',250,230,{bg:K.TEAL,size:18});K.txt('?',530,150,{size:34,col:K.TERRA})}if(t>11)K.tag('Group them: 729 418 365',300,340,{bg:K.SAFF,col:K.INK,size:18,pop:G.clamp((t-11)/.4)})},
 story:[[0,'Q',"Try holding a phone number in your head. How many items can you keep at once? George Miller gathered the evidence in 1956."],
 [0,'S',"In many experiments, people were shown or told items, like digits, words or tones, and asked to repeat or judge them."],
 [2,'D',"Across very different tasks, the limit kept landing in the same place."],
 [8,'R',"People could hold about seven items at once, give or take two."],
 [11,'W',"Miller also noted we can stretch it by grouping items into bigger chunks, as we do with phone numbers."],
 [12.5,'N',"Later research suggests the true limit may be nearer four chunks. The digits here are an example of a digit-span test."]]};
// 6 Baddeley & Hitch (theory)
D[6]={dur:17,pics:['workdesk'],draw(g,t){bg('workdesk');K.tag('A model: illustrated, not one experiment',300,36,{bg:K.INK,size:15});const k=ramp(t,2,3);K.panel(60,80,480,290,k);if(k<=0)return;
 G.rr(210,110,180,60,14,K.SAFF,null,k);K.txt('Boss: directs attention',300,140,{size:15,al:k,max:170});
 G.rr(80,250,180,80,14,K.TEAL,null,ramp(t,4,5));K.txt('Sound loop: repeats words',170,290,{size:15,col:'#fff',al:ramp(t,4,5),max:160});
 G.rr(340,250,180,80,14,K.BLUE,null,ramp(t,6,7));K.txt('Sketchpad: pictures, places',430,290,{size:15,col:'#fff',al:ramp(t,6,7),max:160});
 G.line(260,170,170,250,K.INK,3,.5*k);G.line(340,170,430,250,K.INK,3,.5*k);if(t>9)K.tag('23 × 4 = 80 + 12 = 92',300,410,{bg:K.TERRA,size:20,pop:G.clamp((t-9)/.4)})},
 story:[[0,'Q',"Doing sums in your head means holding numbers while working on them. Is that one memory box, or something more?"],
 [0,'S',"In 1974 Alan Baddeley and Graham Hitch described working memory: a small mental workspace for holding and juggling information."],
 [2,'D',"Their model had a 'central executive' directing attention, plus helpers. Later named the phonological loop (for words and sounds) and the visuospatial sketchpad (for pictures and places)."],
 [9,'R',"Their idea: working memory isn't just a short-term shelf. It is used for reasoning, understanding and learning."],
 [11,'W',"It changed how scientists study thinking, and is still widely used."],
 [12.5,'N',"The workbench diagram is a labelled stand-in sketching the model."]]};
// 7 Buzsaki (theory)
D[7]={dur:18,pics:['sleeprat'],draw(g,t){bg('sleeprat');K.tag('A theory: illustrated stand-in',300,36,{bg:K.INK,size:15});const k=ramp(t,1,2);K.panel(50,80,500,280,k);if(k<=0)return;
 const night=t>8;K.txt(night?'Step 2 · Rest and sleep: sharp-wave ripples':'Step 1 · Awake, exploring: theta rhythm',300,104,{size:16,col:night?K.TEAL:K.TERRA,al:k});
 const cells=[K.TERRA,K.BLUE,K.SAFF,K.TEAL];cells.forEach((c,i)=>{const y=150+i*44;G.line(80,y,520,y,'#c9b9a0',1,.6);const sp=night?3.5:.9,off=night?((t*.6)%1)*440:((t*.25)%1)*440;for(let r=0;r<3;r++){const x=80+((off+r*(440/3)*(night?1:1)+i*(night?8:34))%440);G.rr(x,y-12,4,24,2,c,null,k)}});
 if(night)K.tag('Same order, much faster: replay',300,340,{bg:K.TEAL,size:16,pop:G.clamp((t-9)/.4)})},
 story:[[0,'Q',"Why does sleep help memory? In 1989 György Buzsáki proposed an answer."],
 [0,'S',"The hippocampus, a memory area deep in the brain, shows different rhythms when an animal is exploring and when it is resting."],
 [2,'D',"Step 1: while awake and exploring, a rhythm called theta lets the brain gather a rough, weak record."],
 [8,'D',"Step 2: in rest and sleep, short bursts called sharp-wave ripples replay that activity, firming it up."],
 [11,'W',"A two-step factory: gather by day, glue by night. Later stops test this in people and mice."],
 [13,'N',"A theory paper. The lines of spikes are a stand-in sketch of the idea, not a recording."]]};
// 8 Maguire
D[8]={dur:17,pics:['london'],draw(g,t){bg('london');const k=ramp(t,2,3);K.panel(60,40,480,320,k);if(k<=0)return;K.txt('Back part of the hippocampus',300,64,{size:16,col:K.BLUE,al:k});
 const big=ramp(t,5,7);[[190,'Non-drivers',0],[410,'Taxi drivers',big]].forEach(([x,l,s])=>{G.c.globalAlpha=k;G.c.fillStyle='#e8b8a8';G.c.beginPath();G.c.ellipse(x,200,50+s*14,26+s*8,-.4,0,7);G.c.fill();G.c.globalAlpha=1;K.txt(l,x,280,{size:16,w:600,al:k})});
 if(t>8)K.tag('Larger, and more with years of driving',300,330,{bg:K.TERRA,size:16,pop:G.clamp((t-8)/.4)})},
 story:[[0,'Q',"Can learning something huge change the shape of an adult brain? London taxi drivers offered a test."],
 [0,'S',"To get a licence, London cabbies learn thousands of streets by heart. Eleanor Maguire's team scanned their brains with MRI and compared them with people who didn't drive taxis."],
 [5,'R',"The back part of the hippocampus, a memory area used in finding your way, was larger in the taxi drivers."],
 [8,'R',"And the longer a driver had worked, the larger it tended to be."],
 [10,'W',"Learning a city's streets seemed to reshape the brain."],
 [11.5,'N',"A comparison, not an experiment, though the years link hints learning played a part. The shapes are exaggerated to show the idea."]]};
// 9 Shahaf & Marom
D[9]={dur:18,pics:['dish'],draw(g,t){bg('dish');const k=ramp(t,2,3);K.panel(60,40,480,300,k);if(k<=0)return;K.txt('Cells on electrodes',300,62,{size:16,col:K.BLUE,al:k});
 for(let i=0;i<5;i++)for(let j=0;j<4;j++){const x=140+i*80,y=110+j*55;G.dot(x,y,6,'#8a7a66',k);}
 const tr=(t-3)%2,on=tr<1.2&&t>3;if(on)K.burst(140,110,40,tr/1.2,K.SAFF);const hit=tr>Math.max(.3,1.1-(t-3)*.06);if(on&&hit){K.burst(460,275,40,(tr-.3)/.6,K.TEAL);}K.txt('zap',140,85,{size:14,al:on?1:.3});K.txt('target response',460,310,{size:14,al:k});
 if(t>11)K.tag('Response came sooner each round',300,370,{bg:K.TERRA,size:16,pop:G.clamp((t-11)/.4)})},
 story:[[0,'Q',"Do you need a whole brain to learn? Goded Shahaf and Shimon Marom tested a tiny network of brain cells in a dish."],
 [0,'S',"Rat brain cells were grown on a dish dotted with electrodes. Electrodes can both zap the cells and listen to them."],
 [3,'D',"They zapped the network again and again, and chose a target: a particular response at one electrode. When the target response appeared, the zapping stopped."],
 [11,'R',"Over rounds, the network produced the target response faster. Stopping the stimulation worked like a reward."],
 [13,'W',"Even a small network of cells, outside a body, can adapt to feedback. Room 4's Pong cells build on this."],
 [14.5,'N',"Checked online for the zap-stops-when-correct design. The dots and bursts are a sketch, not the real layout."]]};
// 10 Ryan
D[10]={dur:19,pics:['fearbox'],draw(g,t){bg('fearbox');const steps=['1 · Learn: a box with a mild shock','2 · Drug blocks storing (amnesia)','3 · Back in box: no fear','4 · Light on memory cells: fear returns'];const s=Math.min(3,Math.floor(G.clamp((t-1)/12)*4));
 K.tag(steps[s],300,40,{bg:s===3?K.TERRA:K.BLUE,size:16});if(s===1)K.tag('drug',470,120,{bg:'#5a3fa0',size:16});if(s===3)mouseLight(300,520,.6+.4*Math.sin(t*6));
 const k=ramp(t,13,14);K.panel(80,600,440,170,k);if(k>0){K.txt('Freezing (fear)',300,620,{size:15,col:K.BLUE,al:k});K.bars(130,640,340,80,[{v:.15,label:'drug, no light',col:K.TEAL},{v:.6,label:'drug + light',col:K.TERRA}],G.clamp((t-14)/1.5),{gap:80,ls:14})}},
 story:[[0,'Q',"When we forget, is the memory gone, or just locked away? Tomás Ryan, Susumu Tonegawa and colleagues asked this in mice."],
 [0,'S',"Mice learned a fear memory: a box where they got a mild shock. The cells holding that memory were tagged so light could switch them on later. (Optogenetics = using light to control cells.)"],
 [4,'D',"Right after learning, some mice got a drug that blocks the proteins needed to store a memory firmly."],
 [7,'R',"Back in the box, those mice didn't freeze with fear. They seemed to have forgotten."],
 [10,'D',"Then the scientists shone light on the tagged memory cells."],
 [13,'R',"The mice froze again: the memory came back. It had been stored, just hard to reach."],
 [15.5,'W',"Storing a memory and finding it again are different things. Some 'forgetting' may be a retrieval problem."],
 [17,'N',"A mouse study. The bars are illustrative."]]};
// 11 Ramirez
D[11]={dur:18,pics:['happymouse'],draw(g,t){bg('happymouse');const steps=['1 · A good experience: tag those cells','2 · Weeks of stress: low-mood behaviour','3 · Light on the happy-memory cells'];const s=Math.min(2,Math.floor(G.clamp((t-1)/9)*3));K.tag(steps[s],300,40,{bg:s===2?K.TERRA:K.BLUE,size:16});
 if(s===2)mouseLight(300,520,.6+.4*Math.sin(t*6));const k=ramp(t,11,12);K.panel(80,600,440,170,k);if(k>0){K.txt('Effort to escape or seek treats',300,620,{size:15,col:K.BLUE,al:k});K.bars(130,640,340,80,[{v:.25,label:'stressed',col:K.TEAL},{v:.6,label:'stressed + light',col:K.TERRA}],G.clamp((t-12)/1.5),{gap:80,ls:14})}},
 story:[[0,'Q',"Could switching on a happy memory lift a low mood? Steve Ramirez, Susumu Tonegawa and colleagues tried it in mice."],
 [0,'S',"Male mice had a good experience, time with a female mouse. The brain cells holding that memory were tagged so light could switch them on."],
 [4,'D',"Then the mice went through stress until they showed depression-like behaviour: giving up sooner and losing interest in treats."],
 [7,'D',"The scientists shone light on the tagged happy-memory cells."],
 [11,'R',"The low-mood behaviour lifted. Reactivating the good memory helped, while just having a new good experience did less."],
 [14,'W',"Stored memories aren't only records. Switching them back on can change how an animal feels."],
 [15.5,'N',"A mouse study, using behaviour as a stand-in for mood. Not a treatment for people. The bars are illustrative."]]};
// 12 Friedrich
D[12]={dur:18,pics:['nursery'],draw(g,t){bg('nursery');const k=ramp(t,1,2);K.panel(60,40,480,180,k);if(k<=0)return;K.txt(t<6?'Learn: made-up words for made-up objects':t<10?'Nap (or stay awake)':'Test: a new object of the same kind',300,64,{size:15,col:K.BLUE,al:k,max:440});
 const shp=(x,y,v,a)=>{G.at(x,y,1,v*.4);G.rr(-24,-18,48,36,10+v*6,['#2f6fd0','#2fa36b','#8a5bd0'][Math.floor(v*3)%3],null,a);G.end()};
 if(t<6){[0,.4,.8].forEach((v,i)=>shp(180+i*120,140,v,k));K.tag('"bofi"',300,195,{bg:K.SAFF,col:K.INK,size:15})}else if(t<10){K.txt('z z z',300,140,{size:38,col:K.TEAL,al:.5+.5*Math.sin(t*3)})}else{shp(300,140,.6,k);if(t>11)K.tag('"bofi"? brain response says yes',300,195,{bg:K.TERRA,size:15,pop:G.clamp((t-11)/.4)})}},
 story:[[0,'Q',"Babies nap a lot. Does napping help them learn what words mean?"],
 [0,'S',"Babies heard made-up words paired with pictures of made-up objects. Each word went with several similar objects, a category."],
 [6,'D',"Some babies then napped, others stayed awake. Their brain activity was recorded with EEG (the brain waves from stop 2)."],
 [10,'R',"After a nap, babies' brain responses showed they linked a word to a new object of the same kind, not just ones they'd seen."],
 [13,'R',"Babies with more sleep spindles (short bursts of brain waves during sleep) showed this more."],
 [14.5,'W',"Sleep may help even babies turn examples into general meanings."],
 [15.5,'N',"Measured with brain responses, not words the babies said. The shapes are illustrative."]]};
// 13 Staresina
D[13]={dur:18,pics:['hospital'],draw(g,t){bg('hospital');const k=ramp(t,2,3);K.panel(40,40,520,330,k);if(k<=0)return;K.txt('Inside the sleeping hippocampus',300,62,{size:16,col:K.BLUE,al:k});
 const ph=t*1.2;const sl=a=>Math.sin(a);wave(70,130,460,30,1.5,-ph,K.BLUE,4,k);K.txt('slow wave',90,95,{size:14,w:600,align:'left',al:k});
 const k2=ramp(t,5,6),k3=ramp(t,8,9);const p2=[],p3=[];for(let i=0;i<=200;i++){const u=i/200,x=70+u*460,up=Math.max(0,Math.sin(u*1.5*6.283-ph));p2.push([x,230+Math.sin(u*80)*18*up]);const pk=Math.max(0,Math.sin(u*80));p3.push([x,320+Math.sin(u*400)*14*up*pk])}G.path(p2,K.TEAL,2.5,k2);G.path(p3,K.TERRA,2,k3);K.txt('spindles',90,195,{size:14,w:600,align:'left',al:k2});K.txt('ripples',90,290,{size:14,w:600,align:'left',al:k3});
 if(t>11)K.tag('Nested like gears',300,400,{bg:K.TERRA,size:18,pop:G.clamp((t-11)/.4)})},
 story:[[0,'Q',"In sleep, the brain hums with different rhythms. Do they work together to save memories? Bernhard Staresina and colleagues looked deep inside sleeping human brains."],
 [0,'S',"People with epilepsy sometimes have electrodes placed inside the brain to plan surgery. With their consent, researchers recorded from the hippocampus during sleep."],
 [2,'R',"Slow waves came first: big, slow swings."],
 [5,'R',"Spindles, short faster bursts, tended to ride on a particular part of each slow wave."],
 [8,'R',"And tiny fast ripples tended to sit inside the spindles. Three rhythms nested like gears."],
 [11,'W',"This timing may be how the brain hands memories over to long-term storage, backing up Buzsáki's idea (stop 7)."],
 [13,'N',"Recorded in people with epilepsy, which may differ from other brains. The traces are drawn to show the nesting, not real data."]]};
// 14 Kitamura
D[14]={dur:18,pics:['brainmodel'],draw(g,t){bg('brainmodel');const day=Math.floor(G.clamp((t-2)/10)*15);K.tag('Day '+(day||1),300,40,{bg:K.BLUE,size:18});
 const k=ramp(t,2,3);K.panel(60,560,480,200,k);if(k<=0)return;K.txt('Memory cells active at recall',300,584,{size:15,col:K.BLUE,al:k});const f=day/14;
 K.bars(110,610,380,100,[{v:1-f*.8,label:'hippocampus',col:K.TEAL},{v:.3+f*.65,label:'front of brain',col:K.TERRA},{v:.8,label:'amygdala',col:K.SAFF}],1,{gap:30,ls:14})},
 story:[[0,'Q',"Memories seem to start in the hippocampus, then later depend on the front of the brain. When does that front-of-brain memory form? Takashi Kitamura, Susumu Tonegawa and colleagues tracked it in mice."],
 [0,'S',"Mice learned a fear memory. The scientists tagged and tested memory cells in the hippocampus, the prefrontal cortex (the front of the brain), and the amygdala (a fear area)."],
 [3,'R',"Surprise: memory cells in the front of the brain formed right at learning, but were 'silent' at first: they didn't yet help recall."],
 [7,'R',"Over about two weeks, the front-of-brain cells matured, while the hippocampus cells went quiet."],
 [11,'R',"Amygdala cells kept the fear part going throughout."],
 [13,'W',"A memory moves house over time, and the new home is set up on day one."],
 [14.5,'N',"A mouse study. The painted model looks more like a human brain; read it as a guide to the areas. Bars are illustrative."]]};
// 15 Leminen
D[15]={dur:18,pics:['sleeplab'],draw(g,t){bg('sleeplab');const k=ramp(t,2,3);K.panel(50,40,500,200,k);if(k>0){K.txt('Slow brain waves in deep sleep',300,62,{size:15,col:K.BLUE,al:k});const ph=t*1.6;wave(80,150,440,40,2,-ph,K.BLUE,4,k);if(t>4)for(let i=0;i<2;i++){const x=80+((ph/6.283+.25+i)/2)*440%440;}const up=(Math.sin(-ph)+1)/2;if(t>4&&((ph/6.283)%1)<.12){K.burst(300,110,50,((ph/6.283)%1)/.12,K.SAFF);K.tag('click',300,215,{bg:K.SAFF,col:K.INK,size:15})}}
 const k2=ramp(t,9,10);K.panel(80,560,440,200,k2);if(k2>0){K.txt('Linked word pairs recalled next day',300,582,{size:15,col:K.BLUE,al:k2});K.bars(130,600,340,100,[{v:15.6/22,val:'15.6',label:'sham night',col:K.TEAL},{v:21.1/22,val:'21.1',label:'clicks night',col:K.TERRA}],G.clamp((t-10)/1.5),{gap:80,ls:14,vs:18})}},
 story:[[0,'Q',"Can you boost memory while someone sleeps, just with sound? Miika Leminen and colleagues tried in 2017."],
 [0,'S',"People learned word pairs, then slept in a lab wearing EEG. A computer watched for the slow waves of deep sleep."],
 [4,'D',"Each time a slow wave rose, the computer played a quiet click, timed to the wave. On another night, no sound (a sham night)."],
 [9,'R',"Checked online: after click nights, people recalled more of the word pairs that were linked in meaning, about 21 versus 16. It did not help other memory tasks."],
 [13,'W',"The sleeping brain's memory work can be nudged gently from outside, without waking anyone."],
 [14.5,'N',"A small lab study; the effect was specific to one kind of memory."]]};
// 16 Vetere
D[16]={dur:18,pics:['odour'],draw(g,t){bg('odour');const steps=['1 · Light switches on a smell spot','2 · ...paired with a reward or punishment signal','3 · Test: the real smell, first time ever'];const s=Math.min(2,Math.floor(G.clamp((t-1)/10)*3));K.tag(steps[s],300,40,{bg:s===2?K.TERRA:K.BLUE,size:15});
 if(s<2){mouseLight(240,420,.6+.4*Math.sin(t*7));if(s===1)mouseLight(360,420,.6+.4*Math.sin(t*7+1))}
 if(s===2){for(let i=0;i<8;i++){const u=((t*.3+i/8)%1);G.glow(lerp(520,350,u),420+Math.sin(i*3)*30,24,'#2fa36b',.4*(1-u))}K.tag('Mouse avoids it',300,600,{bg:K.TERRA,size:18,pop:G.clamp((t-12)/.4)})}},
 story:[[0,'Q',"Can a memory form without the experience? Gisella Vetere, Paul Frankland and colleagues tried planting one in mice."],
 [0,'S',"Every smell switches on particular spots in the nose's brain relay, the olfactory bulb. One spot, called M72, responds to a cherry-almond smell (acetophenone)."],
 [1,'D',"Using light, they switched on the M72 spot, as if the mouse smelled it, though it never had."],
 [5,'D',"At the same moment, they switched on a pathway into a reward area, or an unpleasant one."],
 [11,'R',"Later, smelling real acetophenone for the first time, mice avoided it, or were drawn to it, matching the planted pairing."],
 [14,'W',"A memory was built from activity alone, with no real experience."],
 [15.5,'N',"Checked online for the M72 and reward-pathway details. A mouse finding; how it relates to people is open."]]};
// 17 TMR meta-analysis
D[17]={dur:17,pics:['cuebed'],draw(g,t){bg('cuebed');const k=ramp(t,1,2);const n=Math.floor(G.clamp((t-1)/4)*91);K.tag(n+' experiments · 2,004 people',300,40,{bg:K.BLUE,size:17,al:k});
 if(t>3&&t<9&&(t%2)<.6)K.burst(450,300,60,(t%2)/.6,K.SAFF);const k2=ramp(t,8,9);K.panel(60,560,480,200,k2);if(k2>0){K.txt('Each experiment: memory boost from cues',300,582,{size:15,col:K.BLUE,al:k2});G.line(300,610,300,740,K.INK,2,.4);const q=G.rnd(7),m=Math.floor(G.clamp((t-9)/2)*40);for(let i=0;i<m;i++){const v=.12+(q()-.5)*.6;G.dot(300+v*300,615+q()*120,4,K.TEAL,.8)}K.txt('no effect',300,750,{size:13.5,al:k2});if(t>11.5){G.line(300+.12*300,610,300+.12*300,740,K.TERRA,5,1);K.tag('small, real boost',420,600,{bg:K.TERRA,size:15,pop:G.clamp((t-11.5)/.4)})}}},
 story:[[0,'Q',"Many small studies replayed learning cues to people while they slept. Did it really help? Xiaoqing Hu, Ken Paller and colleagues pooled them."],
 [0,'S',"Targeted memory reactivation (TMR): you learn something along with a sound or smell, then that cue is played again quietly during sleep."],
 [3,'D',"The team gathered 91 experiments with 2,004 people and combined their results: a meta-analysis."],
 [9,'R',"Overall, the cues gave a small but reliable memory boost, mainly when given in deep (non-REM) sleep."],
 [12.5,'W',"Pooling turns many shaky results into a firmer answer."],
 [13.5,'N',"Each dot stands for one experiment; their spread is illustrative."]]};
// 18 DishBrain
D[18]={dur:19,pics:['pong'],draw(g,t){bg('pong');const k=ramp(t,1,2);K.panel(80,40,440,300,k);if(k<=0)return;G.rr(110,70,380,240,10,'#1f1a14',null,k);
 const sk=G.clamp((t-4)/8);const bx=300+Math.sin(t*1.7)*160,by=190+Math.sin(t*2.3)*100;G.dot(bx,by,7,'#fbf4e6',k);const py=lerp(190,by,.2+.75*sk)+Math.sin(t*5)*(1-sk)*40;G.rr(468,py-28,10,56,4,K.SAFF,null,k);
 K.txt(t<4?'Before learning':'Rally length grows',300,325,{size:15,col:K.BLUE,al:k});const near=bx>440;if(near&&t>2){K.tag(Math.abs(py-by)<30?'hit: steady signal':'miss: random noise',300,375,{bg:Math.abs(py-by)<30?K.TEAL:K.TERRA,size:15})}},
 story:[[0,'Q',"Can brain cells in a dish learn to play a video game? Brett Kagan and colleagues tried, with the game Pong."],
 [0,'S',"About 800,000 human or mouse brain cells grew on a chip of electrodes. Zaps in one area told the cells where the ball was. Their activity in another area moved the paddle."],
 [4,'D',"When the paddle hit the ball, the cells got a predictable zap. When it missed, they got 4 seconds of random, unpredictable zaps."],
 [8,'R',"Within about five minutes, rallies got longer: the cells played better. Without the feedback, they didn't improve."],
 [13,'W',"A dish of cells, in a feedback loop, can show learning, building on stop 9."],
 [14.5,'N',"The paper calls this 'sentience'. Many scientists dispute that word. The game here is a sketch."]]};
// 19 KIBRA
D[19]={dur:18,pics:['synapse'],draw(g,t){bg('synapse');const k=ramp(t,1,2);K.panel(60,40,480,280,k);if(k<=0)return;K.txt(t<10?'A strengthened connection':'Block the link',300,62,{size:16,col:K.BLUE,al:k});
 const broken=t>10?ramp(t,10,12):0;for(let i=0;i<5;i++){const x=140+i*80,y=200;G.dot(x,y-18-broken*30*(i%2?1:-1),16,K.TEAL,k*(1-broken*.6));G.dot(x,y+18,16,K.SAFF,k);if(!broken)G.line(x,y-4,x,y+4,K.INK,4,k)}K.txt('KIBRA',90,182,{size:14,col:K.TEAL,al:k});K.txt('PKMζ',90,218,{size:14,col:'#a07a10',al:k});
 if(t>4&&t<10)K.tag('Still holding a month later',300,290,{bg:K.TEAL,size:16,pop:G.clamp((t-4)/.4)});if(t>12)K.tag('Old memory erased; normal signals fine',300,290,{bg:K.TERRA,size:16,pop:G.clamp((t-12)/.4)})},
 story:[[0,'Q',"The proteins at your brain connections are replaced over days. So how can a memory last for years?"],
 [0,'S',"Panayiotis Tsokas, Todd Sacktor and colleagues studied two proteins: KIBRA and PKMζ. PKMζ helps keep a strengthened connection strong."],
 [3,'R',"KIBRA works like an anchor at strengthened connections, holding PKMζ there. As old copies wear out, new ones get caught by the anchor."],
 [10,'D',"In rodents, they used a drug to block the two proteins linking up."],
 [12,'R',"Strengthened connections faded, and spatial memories a month old were erased. Normal brain signalling was unaffected."],
 [14,'W',"A memory can outlast its parts if the anchor keeps catching new pieces."],
 [15.5,'N',"A rodent study. Checked online for the month-old memory detail. The drawing is a sketch, not real structure."]]};
// 20 Human ripples 2025
D[20]={dur:18,pics:['rest'],draw(g,t){bg('rest');const k=ramp(t,1,2);K.tag('42 patients with brain electrodes',300,40,{bg:K.BLUE,size:16,al:k});
 const rest=(t%5)>3;const k2=ramp(t,3,4);K.panel(60,540,480,220,k2);if(k2<=0)return;K.txt(rest?'Rest break: ripples':'Learning new relations',300,562,{size:15,col:rest?K.TERRA:K.BLUE,al:k2});
 if(rest){const p=[];for(let i=0;i<=150;i++){const u=i/150,b=Math.exp(-Math.pow((u-.5)*8,2));p.push([90+u*420,620+Math.sin(u*160)*b*24])}G.path(p,K.TERRA,2.5,k2)}
 const gr=G.clamp((t-9)/4);for(let i=0;i<3;i++)for(let j=0;j<3;j++)G.dot(220+i*80,660+j*40-(rest?0:0),7,K.TEAL,gr*k2);if(t>13)K.tag('More ripples, clearer map',300,500,{bg:K.TERRA,size:16,pop:G.clamp((t-13)/.4)})},
 story:[[0,'Q',"Buzsáki proposed rest helps glue memories (stop 7). Can we see it happen in people, as they learn something new?"],
 [0,'S',"In 2025, researchers recorded from the hippocampus of 42 people with epilepsy who had electrodes in place for treatment."],
 [3,'D',"The people learned new relations between items, with rest breaks between rounds."],
 [5,'R',"During the rests, brief bursts called ripples appeared in the memory area."],
 [9,'R',"More ripples predicted that the brain later showed a grid-like map when people worked out new relations, fitting new items into an organised mental map."],
 [13,'W',"From Pavlov's signal to this: learning is held by changing connections, glued in rest and sleep, and organised into maps."],
 [14.5,'N',"A recent study in patients with epilepsy, not yet widely repeated. The grid of dots is a sketch of the idea."]]};
window.DEMOS=D;})();
