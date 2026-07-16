(function(){
  'use strict';
  document.documentElement.classList.add('js');

  function ready(){
    document.querySelectorAll('[data-solution-toggle]').forEach(function(button){
      var grid = document.getElementById(button.getAttribute('aria-controls'));
      var label = button.querySelector('span');
      if(!grid || !label) return;
      button.addEventListener('click', function(){
        var expanded = button.getAttribute('aria-expanded') === 'true';
        grid.classList.toggle('show-all', !expanded);
        button.setAttribute('aria-expanded', String(!expanded));
        label.textContent = expanded ? button.dataset.more : button.dataset.less;
      });
    });

    document.querySelectorAll('.cfg-card').forEach(function(card){
      card.setAttribute('aria-pressed', String(card.classList.contains('on')));
      card.addEventListener('click', function(){
        card.setAttribute('aria-pressed', String(card.classList.contains('on')));
      });
    });

    var team = document.getElementById('tym-sekce');
    if(team){
      var tabs = Array.prototype.slice.call(team.querySelectorAll('.tm-tab'));
      var panels = Array.prototype.slice.call(team.querySelectorAll('.tm-panel'));
      tabs.forEach(function(tab,index){
        var panel = panels.find(function(item){ return item.dataset.team === tab.dataset.team; });
        var tabId = 'team-tab-' + tab.dataset.team;
        var panelId = 'team-panel-' + tab.dataset.team;
        tab.id = tabId;
        tab.setAttribute('role','tab');
        tab.setAttribute('aria-selected',String(tab.classList.contains('on')));
        tab.setAttribute('tabindex',tab.classList.contains('on') ? '0' : '-1');
        if(panel){
          tab.setAttribute('aria-controls',panelId);
          panel.id = panelId;
          panel.setAttribute('role','tabpanel');
          panel.setAttribute('aria-labelledby',tabId);
        }
        tab.addEventListener('click',function(){
          tabs.forEach(function(other){
            var active = other === tab;
            other.setAttribute('aria-selected',String(active));
            other.setAttribute('tabindex',active ? '0' : '-1');
          });
        });
        tab.addEventListener('keydown',function(event){
          if(event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
          event.preventDefault();
          var direction = event.key === 'ArrowRight' ? 1 : -1;
          var next = tabs[(index + direction + tabs.length) % tabs.length];
          next.click();
          next.focus();
        });
      });
    }
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded',ready);
  else ready();
})();
