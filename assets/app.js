
window.AFFILIATE_URL = "https://www.gohighlevel.com/?fp_ref=theglowstep";
const CONSENT_KEY = 'leadflow_consent';
const consentDenied = {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied'
};

function updateConsent(choice) {
  const granted = choice === 'analytics';
  const consent = granted ? {...consentDenied, analytics_storage: 'granted'} : consentDenied;
  try {
    localStorage.setItem(CONSENT_KEY, choice);
  } catch(err) {}
  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', consent);
  }
}

function showConsentBanner() {
  const banner = document.querySelector('[data-consent-banner]');
  if (banner) banner.hidden = false;
}

function hideConsentBanner() {
  const banner = document.querySelector('[data-consent-banner]');
  if (banner) banner.hidden = true;
}

document.addEventListener('DOMContentLoaded', function(){
  const banner = document.querySelector('[data-consent-banner]');
  const settings = document.querySelector('[data-cookie-settings]');
  let choice = null;
  try {
    choice = localStorage.getItem(CONSENT_KEY);
  } catch(err) {}

  if (choice === 'analytics' || choice === 'reject') {
    updateConsent(choice);
    hideConsentBanner();
  } else {
    showConsentBanner();
  }

  banner?.querySelector('[data-consent-accept]')?.addEventListener('click', function(){
    updateConsent('analytics');
    hideConsentBanner();
  });
  banner?.querySelector('[data-consent-reject]')?.addEventListener('click', function(){
    updateConsent('reject');
    hideConsentBanner();
  });
  settings?.addEventListener('click', function(e){
    e.preventDefault();
    showConsentBanner();
  });
});

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
