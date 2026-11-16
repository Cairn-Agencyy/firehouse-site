  (function(){
    if (!('IntersectionObserver' in window)) return;
    var groups = document.querySelectorAll(
      '.svc-grid, .featlist, .steps, .plan-cards, .resource-grid, .gal, .split, .fin-perks'
    );
    if (!groups.length) return;

    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting){
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    groups.forEach(function(el){
      el.classList.add('reveal-parent');
      io.observe(el);
    });
  })();
