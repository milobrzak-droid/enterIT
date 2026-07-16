(function(){
  'use strict';
  function enhanceFaqs(){
    var labels = {
      cs:'Zobrazit odpovědi',
      en:'Show answers',
      de:'Antworten anzeigen',
      pl:'Pokaż odpowiedzi'
    };
    var language = (document.documentElement.lang || 'cs').split('-')[0];
    document.querySelectorAll('.rs-faq-grid, .rs-faq').forEach(function(grid){
      if(grid.closest('details')) return;
      var details = document.createElement('details');
      details.className = 'content-details';
      var summary = document.createElement('summary');
      var label = document.createElement('span');
      var icon = document.createElement('i');
      label.textContent = labels[language] || labels.en;
      icon.textContent = '+';
      icon.setAttribute('aria-hidden','true');
      summary.appendChild(label);
      summary.appendChild(icon);
      grid.parentNode.insertBefore(details,grid);
      details.appendChild(summary);
      details.appendChild(grid);
    });
  }

  function init(){
    enhanceFaqs();
    var toggle = document.getElementById('mtoggle');
    var menu = document.getElementById('mmenu');
    if(!toggle || !menu) return;
    var behind = [document.querySelector('main'), document.querySelector('footer')].filter(Boolean);
    var wasOpen = false;

    toggle.setAttribute('aria-controls','mmenu');
    function syncMenu(){
      var open = menu.classList.contains('open');
      toggle.setAttribute('aria-expanded',String(open));
      menu.setAttribute('aria-hidden',String(!open));
      if(open){
        menu.removeAttribute('inert');
        behind.forEach(function(element){ element.setAttribute('inert',''); });
        if(!wasOpen){
          var first = menu.querySelector('a');
          if(first) first.focus();
        }
      }else{
        menu.setAttribute('inert','');
        behind.forEach(function(element){ element.removeAttribute('inert'); });
      }
      wasOpen = open;
    }
    syncMenu();

    toggle.addEventListener('click',function(){
      if(!menu.classList.contains('open')){
        menu.removeAttribute('inert');
        menu.setAttribute('aria-hidden','false');
      }
    },true);

    new MutationObserver(syncMenu).observe(menu,{attributes:true,attributeFilter:['class']});
    document.addEventListener('keydown',function(event){
      if(event.key === 'Escape' && menu.classList.contains('open')){
        toggle.click();
        toggle.focus();
      }
    });
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded',init);
  else init();
})();
