'use strict';
const fs=require('fs'),path=require('path'),crypto=require('crypto');
const root=__dirname, dir=path.join(root,'cache-import');
const locations=[
 {ra:210.80227,dec:54.34895,size:0.3,frame:'frames_210.8023_54.3490.json'}
];
const index={schema_version:1,source:'ETIVAQ SPHEREx cache; prior IRSA queries',frames:[],cutouts:[]};
for(const loc of locations){
 const records=JSON.parse(fs.readFileSync(path.join(dir,loc.frame),'utf8'));
 index.frames.push({file:loc.frame,ra:loc.ra,dec:loc.dec,release:'mixed DR1/QR3',count:records.length});
 for(const f of records){
  const hash=crypto.createHash('sha1').update(`${f.uri}|${loc.ra.toFixed(5)}|${loc.dec.toFixed(5)}|${loc.size}`).digest('hex').slice(0,20);
  const file='cut_'+hash+'.fits',full=path.join(dir,file);
  if(!fs.existsSync(full))continue;
  const bytes=fs.readFileSync(full);
  if(bytes.toString('ascii',0,9)!=='SIMPLE  =')throw Error('Invalid FITS '+file);
  index.cutouts.push({file,uri:f.uri,ra:loc.ra,dec:loc.dec,size:loc.size,sha256:crypto.createHash('sha256').update(bytes).digest('hex'),bytes:bytes.length});
 }
}
fs.writeFileSync(path.join(root,'cache-index.json'),JSON.stringify(index,null,2)+'\n');
console.log('Verified index:',index.frames.length,'frame lists',index.cutouts.length,'cutouts');
