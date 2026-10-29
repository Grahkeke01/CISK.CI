const V='sgds-v6',CDN='https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/dist/umd/supabase.js',
LOCAL=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','icon-maskable-512.png','apple-touch-icon.png','favicon.png','icon-ci.png'];
self.addEventListener('install',e=>{e.waitUntil((async()=>{const c=await caches.open(V);await c.addAll(LOCAL);
 try{await c.put(CDN,await fetch(CDN,{mode:'no-cors'}))}catch(_){}self.skipWaiting()})())});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);
 if(r.method!=='GET'||u.hostname.endsWith('supabase.co'))return;
 e.respondWith(caches.match(r,{ignoreSearch:true}).then(m=>{const n=fetch(r).then(x=>{if(x&&(x.ok||x.type==='opaque'))caches.open(V).then(c=>c.put(r,x.clone()));return x}).catch(()=>m||caches.match('index.html'));return m||n}))});
