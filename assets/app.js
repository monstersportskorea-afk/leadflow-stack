
window.AFFILIATE_URL = "https://www.gohighlevel.com/?fp_ref=theglowstep";
document.addEventListener('click', function(e){
  const a = e.target.closest('a[data-affiliate]');
  if(!a) return;
  const label = a.dataset.label || document.title;
  try {
    localStorage.setItem('last_affiliate_click', JSON.stringify({label, ts: Date.now(), href: a.href}));
  } catch(err) {}
  if (typeof window.gtag === 'function') {
    window.gtag('event','affiliate_click',{affiliate:'HighLevel',label:label,link_url:a.href});
  }
});
