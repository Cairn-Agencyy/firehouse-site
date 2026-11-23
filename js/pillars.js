  (function(){
    var stage = document.querySelector('.pillar-stage');
    if (!stage) return;

    var cats = stage.querySelectorAll('.pillar-cat');
    if (!cats.length) return;

    var caption = stage.querySelector('.pillar-caption');
    var catName = caption && caption.querySelector('.pillar-cat-name');
    var tagline = caption && caption.querySelector('.pillar-tagline');
    var dots = stage.querySelectorAll('.pillar-dot');
    var prevBtn = stage.querySelector('.pillar-prev');
    var nextBtn = stage.querySelector('.pillar-next');

    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var interval = parseInt(stage.dataset.interval, 10) || 4500;
    var photoIndex = Array.prototype.map.call(cats, function(){ return 0; });
    var current = 0;
    var timer = null;

    function show(index){
      current = ((index % cats.length) + cats.length) % cats.length;
      var cat = cats[current];

      cats.forEach(function(c, i){ c.classList.toggle('is-active', i === current); });

      var imgs = cat.querySelectorAll('img');
      imgs.forEach(function(img, i){ img.classList.toggle('is-active', i === photoIndex[current]); });

      if (caption){
        caption.href = cat.dataset.href || '#';
        if (catName) catName.textContent = cat.dataset.name || '';
        if (tagline) tagline.textContent = cat.dataset.tagline || '';
      }

      dots.forEach(function(d, i){ d.classList.toggle('is-active', i === current); });

      photoIndex[current] = (photoIndex[current] + 1) % imgs.length;
    }

    function next(){ show(current + 1); }
    function prev(){ show(current - 1); }

    function start(){
      if (reduceMotion) return;
      stop();
      timer = setInterval(next, interval);
    }

    function stop(){
      if (timer){ clearInterval(timer); timer = null; }
    }

    if (prevBtn) prevBtn.addEventListener('click', function(){ prev(); start(); });
    if (nextBtn) nextBtn.addEventListener('click', function(){ next(); start(); });

    dots.forEach(function(dot){
      dot.addEventListener('click', function(){
        var idx = parseInt(dot.dataset.cat, 10);
        show(idx);
        start();
      });
    });

    stage.addEventListener('mouseenter', stop);
    stage.addEventListener('mouseleave', start);

    show(0);
    start();
  })();
