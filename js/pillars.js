  (function(){
    var grid = document.querySelector('.pillar-grid');
    if (!grid) return;

    var cards = grid.querySelectorAll('.pillar-card');
    if (!cards.length) return;

    var photoSets = Array.prototype.map.call(cards, function(card){
      return card.querySelectorAll('.pillar-photos img');
    });
    var count = photoSets[0].length;
    if (!count) return;

    var dots = document.querySelectorAll('.pillar-dot');
    var prevBtn = document.querySelector('.pillar-prev');
    var nextBtn = document.querySelector('.pillar-next');

    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var interval = parseInt(grid.dataset.interval, 10) || 4000;
    var current = 0;
    var timer = null;

    function show(index){
      current = ((index % count) + count) % count;
      photoSets.forEach(function(photos){
        photos.forEach(function(img, i){ img.classList.toggle('is-active', i === current); });
      });
      dots.forEach(function(dot, i){ dot.classList.toggle('is-active', i === current); });
    }

    function next(){ show(current + 1); }
    function prev(){ show(current - 1); }

    function start(){
      if (reduceMotion || count < 2) return;
      stop();
      timer = setInterval(next, interval);
    }

    function stop(){
      if (timer){ clearInterval(timer); timer = null; }
    }

    if (prevBtn) prevBtn.addEventListener('click', function(){ prev(); start(); });
    if (nextBtn) nextBtn.addEventListener('click', function(){ next(); start(); });

    grid.addEventListener('mouseenter', stop);
    grid.addEventListener('mouseleave', start);

    start();
  })();
