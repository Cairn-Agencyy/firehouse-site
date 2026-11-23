  (function(){
    var cards = document.querySelectorAll('.svc');
    if (!cards.length) return;
    if (window.matchMedia && window.matchMedia('(hover: none)').matches) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    cards.forEach(function(card){
      card.addEventListener('mousemove', function(e){
        var rect = card.getBoundingClientRect();
        var x = (e.clientX - rect.left) / rect.width;
        var y = (e.clientY - rect.top) / rect.height;
        var rx = (0.5 - y) * 10;
        var ry = (x - 0.5) * 10;
        card.style.transform = 'perspective(900px) rotateX(' + rx.toFixed(2) + 'deg) rotateY(' + ry.toFixed(2) + 'deg) translateY(-10px) scale(1.025)';
      });
      card.addEventListener('mouseleave', function(){
        card.style.transform = '';
      });
    });
  })();
