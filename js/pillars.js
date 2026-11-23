  (function(){
    var switcher = document.querySelector('.pillar-switcher');
    if (!switcher) return;

    var slides = switcher.querySelectorAll('.pillar-slide');
    var tabs = switcher.querySelectorAll('.pillar-tab');
    if (!slides.length || !tabs.length) return;

    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var interval = parseInt(switcher.dataset.interval, 10) || 3500;
    var current = 0;
    var timer = null;

    function show(index){
      slides.forEach(function(s, i){ s.classList.toggle('is-active', i === index); });
      tabs.forEach(function(t, i){ t.classList.toggle('is-active', i === index); });
      current = index;
    }

    function next(){
      show((current + 1) % slides.length);
    }

    function start(){
      if (reduceMotion) return;
      stop();
      timer = setInterval(next, interval);
    }

    function stop(){
      if (timer){ clearInterval(timer); timer = null; }
    }

    tabs.forEach(function(tab){
      tab.addEventListener('click', function(){
        var idx = parseInt(tab.dataset.pillar, 10);
        show(idx);
        tab.classList.add('is-pressed');
        setTimeout(function(){ tab.classList.remove('is-pressed'); }, 180);
        start();
      });
    });

    switcher.addEventListener('mouseenter', stop);
    switcher.addEventListener('mouseleave', start);

    start();
  })();
