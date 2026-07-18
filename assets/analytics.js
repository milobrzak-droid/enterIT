/* EnterIT — GA4 loader + cookie consent (Google Consent Mode v2)
   Swap GA_ID below with the real Measurement ID once the enterit.cz
   data stream exists in GA4. Everything else needs no further edits. */
(function(){
  'use strict';

  var GA_ID = 'G-QYW51GZHKX';

  var STORAGE_KEY = 'eit_consent'; // 'granted' | 'denied'
  var LANG = (document.documentElement.lang || 'cs').slice(0, 2);

  var STR = {
    cs: {
      text: 'Používáme cookies pro měření návštěvnosti (Google Analytics). Data nám pomáhají web zlepšovat. Více v ',
      link: 'zásadách ochrany osobních údajů',
      accept: 'Přijmout',
      reject: 'Odmítnout',
      settings: 'Nastavení cookies'
    },
    en: {
      text: 'We use cookies to measure site traffic (Google Analytics). This helps us improve the site. More in our ',
      link: 'privacy policy',
      accept: 'Accept',
      reject: 'Reject',
      settings: 'Cookie settings'
    },
    de: {
      text: 'Wir verwenden Cookies zur Messung der Besucherzahlen (Google Analytics). Das hilft uns, die Website zu verbessern. Mehr in unserer ',
      link: 'Datenschutzerklärung',
      accept: 'Akzeptieren',
      reject: 'Ablehnen',
      settings: 'Cookie-Einstellungen'
    },
    pl: {
      text: 'Używamy plików cookie do pomiaru ruchu na stronie (Google Analytics). Pomaga nam to ulepszać witrynę. Więcej w ',
      link: 'polityce prywatności',
      accept: 'Akceptuję',
      reject: 'Odrzucam',
      settings: 'Ustawienia cookies'
    }
  };
  var t = STR[LANG] || STR.cs;

  var GDPR_HREF = {
    cs: '/gdpr.html', en: '/en/gdpr.html', de: '/de/gdpr.html', pl: '/pl/gdpr.html'
  }[LANG] || '/gdpr.html';

  /* ---- Consent Mode v2 default: denied until user decides ---- */
  window.dataLayer = window.dataLayer || [];
  function gtag(){ window.dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;
  gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    wait_for_update: 500
  });

  function loadGA(){
    if(window.__eitGaLoaded || !GA_ID || GA_ID.indexOf('XXXX') !== -1) return;
    window.__eitGaLoaded = true;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    gtag('js', new Date());
    gtag('config', GA_ID, { anonymize_ip: true });
  }

  function setConsent(value){
    try { localStorage.setItem(STORAGE_KEY, value); } catch(e){}
    if(value === 'granted'){
      gtag('consent', 'update', { analytics_storage: 'granted' });
      loadGA();
    } else {
      gtag('consent', 'update', { analytics_storage: 'denied' });
    }
  }

  function injectStyles(){
    if(document.getElementById('eit-consent-style')) return;
    var css = '#eit-consent{position:fixed;left:16px;right:16px;bottom:16px;z-index:9999;'
      + 'max-width:640px;margin:0 auto;background:#17202E;color:#EAF0FA;border:1px solid rgba(255,255,255,.12);'
      + 'border-radius:14px;padding:18px 20px;font:14px/1.5 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;'
      + 'box-shadow:0 12px 40px rgba(0,0,0,.35);display:flex;flex-wrap:wrap;gap:14px;align-items:center;justify-content:space-between}'
      + '#eit-consent p{margin:0;flex:1 1 260px;color:#C7D2E3}'
      + '#eit-consent a{color:#41E39E;text-decoration:underline}'
      + '#eit-consent .eit-btns{display:flex;gap:8px;flex:0 0 auto}'
      + '#eit-consent button{cursor:pointer;border-radius:9px;padding:9px 16px;font:600 13px/1 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;border:1px solid transparent}'
      + '#eit-consent .eit-accept{background:#41E39E;color:#0B1018}'
      + '#eit-consent .eit-reject{background:transparent;color:#EAF0FA;border-color:rgba(255,255,255,.25)}'
      + '@media(max-width:520px){#eit-consent{left:10px;right:10px;bottom:10px;padding:16px}}';
    var style = document.createElement('style');
    style.id = 'eit-consent-style';
    style.textContent = css;
    document.head.appendChild(style);
  }

  function showBanner(){
    if(document.getElementById('eit-consent')) return;
    injectStyles();
    var el = document.createElement('div');
    el.id = 'eit-consent';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-label', t.settings);
    el.innerHTML = '<p>' + t.text + '<a href="' + GDPR_HREF + '">' + t.link + '</a>.</p>'
      + '<div class="eit-btns">'
      + '<button type="button" class="eit-reject">' + t.reject + '</button>'
      + '<button type="button" class="eit-accept">' + t.accept + '</button>'
      + '</div>';
    document.body.appendChild(el);
    el.querySelector('.eit-accept').addEventListener('click', function(){
      setConsent('granted');
      el.remove();
    });
    el.querySelector('.eit-reject').addEventListener('click', function(){
      setConsent('denied');
      el.remove();
    });
  }

  /* Public API: lets the GDPR page offer a "change cookie settings" control */
  window.eitOpenConsent = function(){
    var existing = document.getElementById('eit-consent');
    if(existing) existing.remove();
    showBanner();
  };

  function init(){
    var stored;
    try { stored = localStorage.getItem(STORAGE_KEY); } catch(e){ stored = null; }
    if(stored === 'granted'){
      gtag('consent', 'update', { analytics_storage: 'granted' });
      loadGA();
    } else if(stored === 'denied'){
      // stays denied, no banner
    } else {
      showBanner();
    }
  }

  /* ---- conversion tracking (fires only once consent is granted) ---- */
  function trackEvent(name, params){
    var stored;
    try { stored = localStorage.getItem(STORAGE_KEY); } catch(e){ stored = null; }
    if(stored !== 'granted') return;
    gtag('event', name, params || {});
  }

  function bindConversionTracking(){
    document.addEventListener('submit', function(e){
      var form = e.target;
      if(form && form.classList && form.classList.contains('capture')){
        trackEvent('generate_lead', { form_id: form.id || 'unknown', page_lang: LANG });
      }
    }, true);

    document.addEventListener('click', function(e){
      var a = e.target.closest && e.target.closest('a[href]');
      if(!a) return;
      var href = a.getAttribute('href') || '';
      if(href.indexOf('outlook.office.com/bookwithme') !== -1){
        trackEvent('book_meeting_click', { page_lang: LANG });
      } else if(href.indexOf('mailto:') === 0){
        trackEvent('contact_click', { method: 'email', page_lang: LANG });
      } else if(href.indexOf('tel:') === 0){
        trackEvent('contact_click', { method: 'phone', page_lang: LANG });
      }
    }, true);
  }
  bindConversionTracking();

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
