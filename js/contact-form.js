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

      /* Lead payload, shaped for the JobTread sync. Posted to the cairn-fhp
         service, which runs the same account/location/contact/job creation
         already proven out for phone leads. See main.py, website_lead_webhook. */
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
        // Hidden from real visitors. A bot filling every field it finds fills
        // this one too, and a non-empty value here is how the backend tells
        // the two apart.
        hp:            document.getElementById('fCompany').value
      };

      var submitBtn = form.querySelector('button[type=submit]');
      submitBtn.disabled = true;
      msg.textContent = 'Sending your request...';

      fetch('https://cairn-fhp-87886235286.us-central1.run.app/webhooks/website-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead)
      })
        .then(function(res){
          if (!res.ok) throw new Error('Request failed with status ' + res.status);
          return res.json();
        })
        .then(function(){
          msg.textContent = 'Thank you! Your request has been sent and our team will be in touch shortly.';
          form.reset();
        })
        .catch(function(err){
          console.error('Lead submission failed:', err);
          msg.textContent = 'Something went wrong sending your request. Please call or text us at (903) 340-2454 and we will get you taken care of.';
          submitBtn.disabled = false;
        });
    });
  })();
