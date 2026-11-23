  (function(){
    if (!('IntersectionObserver' in window)) return;
    var groups = document.querySelectorAll(
      '.svc-grid, .featlist, .phase-stepper, .plan-cards, .resource-carousel, .gal, .split, .fin-perks, #pillars'
    );
    if (!groups.length) return;

    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting){
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0, rootMargin: '0px 0px -10% 0px' });

    groups.forEach(function(el){
      el.classList.add('reveal-parent');
      io.observe(el);
    });
  })();
