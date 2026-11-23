  (function(){
    var carousel = document.querySelector('.resource-carousel');
    if (!carousel) return;

    var track = carousel.querySelector('.resource-track');
    var prevBtn = carousel.querySelector('.resource-prev');
    var nextBtn = carousel.querySelector('.resource-next');
    if (!track) return;

    function scrollByCards(dir){
      var card = track.querySelector('.resource-card');
      var step = card ? card.getBoundingClientRect().width + 18 : 260;
      track.scrollBy({ left: dir * step * 2, behavior: 'smooth' });
    }

    if (prevBtn) prevBtn.addEventListener('click', function(){ scrollByCards(-1); });
    if (nextBtn) nextBtn.addEventListener('click', function(){ scrollByCards(1); });
  })();
