  (function(){
    var toggle = document.getElementById('navToggle');
    var nav = document.getElementById('mainNav');
    if(!toggle || !nav) return;

    toggle.addEventListener('click', function(){
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      if(!open){
        nav.querySelectorAll('.has-drop.is-open').forEach(function(d){ d.classList.remove('is-open'); });
      }
    });

    nav.querySelectorAll('.has-drop').forEach(function(item){
      var btn = item.querySelector('.drop-btn');
      if(!btn) return;
      btn.addEventListener('click', function(e){
        e.preventDefault();
        var willOpen = !item.classList.contains('is-open');
        nav.querySelectorAll('.has-drop.is-open').forEach(function(d){
          if(d !== item) d.classList.remove('is-open');
        });
        item.classList.toggle('is-open', willOpen);
        btn.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
      });
    });

    document.addEventListener('click', function(e){
      if(!nav.contains(e.target)){
        nav.querySelectorAll('.has-drop.is-open').forEach(function(d){ d.classList.remove('is-open'); });
      }
    });

    nav.addEventListener('click', function(e){
      if(e.target.tagName === 'A'){
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        nav.querySelectorAll('.has-drop.is-open').forEach(function(d){ d.classList.remove('is-open'); });
      }
    });
  })();
