/* Pure logic for the directory. No DOM. */
const CITIES={Buea:{c:[4.1534,9.2423]},Kumba:{c:[4.6363,9.4469]},Limbe:{c:[4.0186,9.2058]},Tiko:{c:[4.075,9.36]},Bamenda:{c:[5.9597,10.146]}};
const CATEGORIES=['Restaurants','Fast Food','Grills & Barbecue','Cafés','Bakeries','Local Dishes','Snacks & Breakfast','Beverages'];
function hav(a,b){const r=Math.PI/180,x=(b[0]-a[0])*r,y=(b[1]-a[1])*r,h=Math.sin(x/2)**2+Math.cos(a[0]*r)*Math.cos(b[0]*r)*Math.sin(y/2)**2;return 12742*Math.asin(Math.sqrt(h))}
/* City centres are used only to guess which supported city a phone is in. They are not restaurant coordinates. */
function detectCity(lat,lng,maxKm){maxKm=maxKm||15;let best=null;for(const n of Object.keys(CITIES)){const d=hav([lat,lng],CITIES[n].c);if(!best||d<best.d)best={n,d}}return best&&best.d<=maxKm?best.n:null}
function hasPin(r){return typeof r.lat==='number'&&typeof r.lng==='number'}
function searchUrl(r){return 'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent([r.name,r.neighborhood,r.city,'Cameroon'].filter(Boolean).join(' '))}
function directionsUrl(r){return hasPin(r)?'https://www.google.com/maps/dir/?api=1&destination='+r.lat+','+r.lng:searchUrl(r)}
function filterList(list,f){
  const q=(f.q||'').trim().toLowerCase();
  return list.filter(r=>{
    if(f.savedOnly){if(!(f.favs||[]).includes(r.id))return false}else if(r.city!==f.city)return false;
    if(f.category&&f.category!=='All'&&r.category!==f.category)return false;
    if(f.neighborhood&&r.neighborhood!==f.neighborhood)return false;
    if(f.foodType&&!(r.foodTypes||[]).includes(f.foodType))return false;
    if(f.price&&r.price!==f.price)return false;
    if(q&&![r.name,r.neighborhood,r.category,r.city].concat(r.foodTypes||[]).join(' ').toLowerCase().includes(q))return false;
    if(f.maxKm&&f.origin){if(!hasPin(r))return false;if(hav(f.origin,[r.lat,r.lng])>Number(f.maxKm))return false}
    return true});
}
if(typeof module!=='undefined')module.exports={CITIES,CATEGORIES,hav,detectCity,hasPin,searchUrl,directionsUrl,filterList};
