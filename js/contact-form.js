  (function(){
    var plan = new URLSearchParams(location.search).get('plan');
    if(plan){
      var service = document.getElementById('fService');
      var notes = document.getElementById('fNotes');
      if(service){
        Array.prototype.forEach.call(service.options, function(opt){
          if(opt.text.indexOf('maintenance') !== -1) opt.selected = true;
        });
      }
      if(notes && !notes.value){
        notes.value = "I'm interested in the " + plan + ".";
      }
    }
  })();

  (function(){
    var form = document.getElementById('leadForm');
    var msg  = document.getElementById('formMsg');
    if(!form) return;

    form.addEventListener('submit', function(e){
      e.preventDefault();
      var missing = [];
      [['fName','First name'],['lName','Last name'],['fEmail','Email'],['fPhone','Phone'],['fBudget','Estimated budget']]
        .forEach(function(pair){
          var el = document.getElementById(pair[0]);
          if(el && !el.value.trim()) missing.push(pair[1]);
        });

      var email = document.getElementById('fEmail').value.trim();
      if(email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) missing.push('a valid email');

      msg.hidden = false;
      if(missing.length){
        msg.textContent = 'Still needed: ' + missing.join(', ') + '.';
        return;
      }

      /* Lead payload, shaped for the JobTread sync. Not yet posted anywhere:
         the endpoint and the JobTread field mapping are the next build step. */
      var lead = {
        firstName:     document.getElementById('fName').value.trim(),
        lastName:      document.getElementById('lName').value.trim(),
        email:         email,
        phone:         document.getElementById('fPhone').value.trim(),
        address:       document.getElementById('fCity').value.trim(),
        budget:        document.getElementById('fBudget').value,
        startTimeframe:document.getElementById('fStart').value,
        service:       document.getElementById('fService').value,
        features:      Array.prototype.slice.call(document.querySelectorAll('input[name=features]:checked')).map(function(c){ return c.value; }),
        hearAbout:     document.getElementById('fHeard').value,
        vision:        document.getElementById('fNotes').value.trim(),
        source:        'Website'
      };
      console.log('Lead captured, pending JobTread sync:', lead);

      msg.textContent = 'Thank you. In the finished site this creates your request and alerts the team right away. This preview does not send yet.';
      form.querySelector('button[type=submit]').disabled = true;
    });
  })();
