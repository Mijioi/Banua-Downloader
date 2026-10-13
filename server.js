const express = require('express');
const { exec } = require('child_process');
const fs = require('fs');
const app = express();

app.use(express.static(__dirname));
app.use('/downloads', express.static(__dirname+'/downloads'));
if(!fs.existsSync('downloads')) fs.mkdirSync('downloads');

app.get('/dl', (req,res)=>{
  let url = req.query.url;
  if(!url) return res.json({error:'no url'});
  let id = Date.now();
  let out = `downloads/${id}.mp4`;
  
  // FIX: bv+ba = video + audio, jadi ada suara. + force-ipv4 biar tidak Network unreachable
  let cmd = `yt-dlp --force-ipv4 --no-playlist -f "bv+ba/b" --merge-output-format mp4 -o "${out}" "${url}"`;
  
  console.log('Download: '+url);
  exec(cmd, (err, stdout, stderr)=>{
    if(err){
      console.log(stderr);
      return res.json({error: stderr.slice(-300)});
    }
    res.json({file: `/${out}`, direct: `/${out}`});
  });
});

app.listen(8080, ()=> console.log('BANUA DOWNLOAD FIX ADA SUARA di http://localhost:8080'));
