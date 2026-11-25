(function(){
  var ENDPOINT = 'https://cairn-fhp-87886235286.us-central1.run.app/webhooks/website-chat';
  var GREETING = "Hey! I'm the Firehouse Pools assistant. Ask me anything, or tell me what you're looking to get done and I'll get your details to the team.";
  var FALLBACK = "Something went wrong on my end. Please call or text us at (903) 340-2454 and we'll get you taken care of.";

  function getSessionId(){
    try {
      var id = sessionStorage.getItem('fhpChatSession');
      if (!id) {
        id = 'web-' + Date.now() + '-' + Math.random().toString(36).slice(2, 10);
        sessionStorage.setItem('fhpChatSession', id);
      }
      return id;
    } catch (e) {
      // Private browsing or storage blocked. A per-request id still lets the
      // conversation work; it just will not survive a page reload.
      return 'web-' + Date.now() + '-' + Math.random().toString(36).slice(2, 10);
    }
  }

  function injectStyles(){
    var css = ''
      + '.fhp-chat-bubble{position:fixed;bottom:20px;right:20px;width:58px;height:58px;border-radius:50%;'
      + 'background:var(--pool,#1E5049);color:#fff;border:none;cursor:pointer;z-index:9998;'
      + 'box-shadow:0 6px 18px rgba(0,0,0,.25);display:flex;align-items:center;justify-content:center;}'
      + '.fhp-chat-bubble:hover{background:var(--pool-lift,#2D7065);}'
      + '.fhp-chat-bubble svg{width:26px;height:26px;}'
      + '.fhp-chat-panel{position:fixed;bottom:88px;right:20px;width:min(360px,calc(100vw - 32px));'
      + 'max-height:min(520px,calc(100vh - 140px));background:var(--paper,#FFFCF7);border-radius:14px;'
      + 'box-shadow:0 14px 40px rgba(0,0,0,.28);display:none;flex-direction:column;overflow:hidden;z-index:9999;'
      + 'font-family:inherit;}'
      + '.fhp-chat-panel.fhp-chat-open{display:flex;}'
      + '.fhp-chat-head{background:var(--ink,#14110F);color:#fff;padding:14px 16px;display:flex;'
      + 'align-items:center;justify-content:space-between;font-weight:600;}'
      + '.fhp-chat-head button{background:none;border:none;color:#fff;font-size:20px;cursor:pointer;'
      + 'line-height:1;padding:0 4px;}'
      + '.fhp-chat-log{flex:1;overflow-y:auto;padding:14px 16px;display:flex;flex-direction:column;gap:10px;}'
      + '.fhp-chat-msg{max-width:85%;padding:9px 12px;border-radius:12px;font-size:14px;line-height:1.4;'
      + 'white-space:pre-wrap;}'
      + '.fhp-chat-msg.fhp-from-bot{background:var(--stone,#F4EFE6);color:var(--text,#221E1A);'
      + 'align-self:flex-start;border-bottom-left-radius:3px;}'
      + '.fhp-chat-msg.fhp-from-user{background:var(--pool,#1E5049);color:#fff;align-self:flex-end;'
      + 'border-bottom-right-radius:3px;}'
      + '.fhp-chat-msg.fhp-pending{opacity:.6;}'
      + '.fhp-chat-form{display:flex;gap:8px;padding:12px;border-top:1px solid var(--stone-line,#D8CCB8);}'
      + '.fhp-chat-form input{flex:1;padding:10px 12px;border-radius:8px;border:1px solid var(--stone-line,#D8CCB8);'
      // The site's global input/select/textarea rule (for the dark contact
      // form section) sets color:#fff. Without an explicit override here,
      // this input inherits white text on its own light background and
      // looks blank while typing, even though the value is really there.
      + 'font-size:14px;font-family:inherit;color:var(--text,#221E1A);background:#fff;}'
      + '.fhp-chat-form input::placeholder{color:var(--text-mute,#6B6259);}'
      + '.fhp-chat-form button{background:var(--pool,#1E5049);color:#fff;border:none;border-radius:8px;'
      + 'padding:0 16px;font-weight:600;cursor:pointer;}'
      + '.fhp-chat-form button:disabled{opacity:.5;cursor:default;}'
      + '@media (max-width:480px){.fhp-chat-panel{right:16px;left:16px;width:auto;}}';
    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
  }

  function buildWidget(){
    var bubble = document.createElement('button');
    bubble.className = 'fhp-chat-bubble';
    bubble.type = 'button';
    bubble.setAttribute('aria-label', 'Open chat with Firehouse Pools');
    bubble.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>';

    var panel = document.createElement('div');
    panel.className = 'fhp-chat-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'Chat with Firehouse Pools');
    panel.innerHTML = ''
      + '<div class="fhp-chat-head"><span>Firehouse Pools</span>'
      + '<button type="button" class="fhp-chat-close" aria-label="Close chat">&times;</button></div>'
      + '<div class="fhp-chat-log" aria-live="polite"></div>'
      + '<form class="fhp-chat-form">'
      + '<input type="text" maxlength="2000" placeholder="Type a message..." aria-label="Message" autocomplete="off">'
      + '<button type="submit">Send</button>'
      + '</form>';

    document.body.appendChild(bubble);
    document.body.appendChild(panel);

    var log = panel.querySelector('.fhp-chat-log');
    var form = panel.querySelector('.fhp-chat-form');
    var input = panel.querySelector('input');
    var sendBtn = form.querySelector('button');
    var closeBtn = panel.querySelector('.fhp-chat-close');
    var sessionId = getSessionId();
    var opened = false;
    var done = false;

    function addMessage(text, from){
      var msg = document.createElement('div');
      msg.className = 'fhp-chat-msg fhp-from-' + from;
      msg.textContent = text;
      log.appendChild(msg);
      log.scrollTop = log.scrollHeight;
      return msg;
    }

    function openPanel(){
      panel.classList.add('fhp-chat-open');
      if (!opened) {
        opened = true;
        addMessage(GREETING, 'bot');
      }
      input.focus();
    }

    function closePanel(){
      panel.classList.remove('fhp-chat-open');
    }

    bubble.addEventListener('click', function(){
      if (panel.classList.contains('fhp-chat-open')) { closePanel(); } else { openPanel(); }
    });
    closeBtn.addEventListener('click', closePanel);

    form.addEventListener('submit', function(e){
      e.preventDefault();
      var text = input.value.trim();
      if (!text || done) return;

      addMessage(text, 'user');
      input.value = '';
      input.disabled = true;
      sendBtn.disabled = true;
      var pending = addMessage('...', 'bot');
      pending.classList.add('fhp-pending');

      fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: sessionId, message: text })
      })
        .then(function(res){
          if (!res.ok) throw new Error('Request failed with status ' + res.status);
          return res.json();
        })
        .then(function(data){
          pending.remove();
          addMessage(data.reply || "Got it, thanks!", 'bot');
          if (data.done) {
            done = true;
            input.placeholder = 'This chat has wrapped up';
          }
        })
        .catch(function(err){
          console.error('Chat message failed:', err);
          pending.remove();
          addMessage(FALLBACK, 'bot');
        })
        .finally(function(){
          input.disabled = done;
          sendBtn.disabled = done;
          if (!done) input.focus();
        });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function(){ injectStyles(); buildWidget(); });
  } else {
    injectStyles();
    buildWidget();
  }
})();
