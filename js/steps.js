  (function(){
    var steppers = document.querySelectorAll('.phase-stepper');
    if (!steppers.length) return;

    steppers.forEach(function(stepper){
      var tabs = stepper.querySelectorAll('.phase-tab');
      var panels = stepper.querySelectorAll('.phase-panel');
      var fill = stepper.querySelector('.phase-progress-fill');
      if (!tabs.length || !panels.length) return;

      var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      var interval = parseInt(stepper.dataset.interval, 10) || 4200;
      var current = 0;
      var timer = null;

      function show(index){
        current = ((index % panels.length) + panels.length) % panels.length;
        tabs.forEach(function(t, i){ t.classList.toggle('is-active', i === current); });
        panels.forEach(function(p, i){ p.classList.toggle('is-active', i === current); });
        if (fill) fill.style.width = (((current + 1) / panels.length) * 100) + '%';
      }

      function next(){ show(current + 1); }

      function start(){
        if (reduceMotion) return;
        stop();
        timer = setInterval(next, interval);
      }

      function stop(){
        if (timer){ clearInterval(timer); timer = null; }
      }

      tabs.forEach(function(tab, i){
        tab.addEventListener('click', function(){
          show(i);
          start();
        });
      });

      stepper.addEventListener('mouseenter', stop);
      stepper.addEventListener('mouseleave', start);

      show(0);
      start();
    });
  })();
