//for header effect
$(window).on('load', function () {
        $("#header-scroll").removeClass("shrink")
  });

$(window).scroll(function () {
     var sc = $(window).scrollTop()
    if (sc > 1) {
        $("#header-scroll").addClass("shrink")
    } else {
        $("#header-scroll").removeClass("shrink")
    }
});

//scrollspy
$(window).on('scroll', function () {
   var sections = $('section')
    , nav = $('nav')
    , nav_height = nav.outerHeight()
    , cur_pos = $(this).scrollTop();
  sections.each(function() {
    var top = $(this).offset().top - nav_height,
        bottom = top + $(this).outerHeight();
 
    if (cur_pos >= top && cur_pos <= bottom) {
      nav.find('a').removeClass('active');
      sections.removeClass('active');
 
      $(this).addClass('active');
      nav.find('a[href="#'+$(this).attr('id')+'"]').addClass('active');
    }
  });
});

// for gallery
    document.addEventListener('DOMContentLoaded', () => {
      const gallery = document.querySelector('.project_gallery');
      const panels = document.querySelectorAll('.project');

      function clearActive() {
        panels.forEach(c => c.classList.remove('is-active'));
        gallery && gallery.classList.remove('has-active');
      }

      panels.forEach(panel => {
        panel.addEventListener('click', (e) => {
          const alreadyActive = panel.classList.contains('is-active');
          clearActive();
          if (!alreadyActive) {
            panel.classList.add('is-active');
            gallery && gallery.classList.add('has-active');
          }
        });
      });

      // Click outside to clear
      document.addEventListener('click', (e) => {
        if (!gallery || gallery.contains(e.target)) return;
        clearActive();
      });
    });



//Menu for mobile
document.getElementById('hamburger').onclick = function() {
  document.querySelector('nav').classList.toggle('active');
};

// Chat interface
(function () {
  const API_URL = 'https://key-bringer-g6c7hna8csepfug5.ukwest-01.azurewebsites.net/api/key_bringer';

  const form = document.getElementById('chat-form');
  const input = document.getElementById('chat-input');
  const log = document.getElementById('chat-log');
  const sendBtn = document.getElementById('chat-send');

  const conversationId = localStorage.getItem('portfolio_convo') || crypto.randomUUID();
  localStorage.setItem('portfolio_convo', conversationId);

  function appendMessage(role, text) {
    const li = document.createElement('li');
    li.className = role;
    li.innerHTML = text;
    log.appendChild(li);
    log.scrollTop = log.scrollHeight;
  }

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const message = input.value.trim();
    if (!message) return;

    appendMessage('user', message);
    input.value = '';
    sendBtn.disabled = true;
    document.getElementById('lenny-gif').src = 'images/elephant-thinking.gif';


    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        body: JSON.stringify({ message, conversation_id: conversationId })
      });

      if (!res.ok) {
        const text = await res.text();
        appendMessage('assistant', `You broke Lenny! ${res.status} ${text}`);
      } else {
        const data = await res.json();
        let message = data.reply || data.error || '(Lenny did not respond)';
          if (data.citations && Array.isArray(data.citations) && data.citations.length > 0) {
            const refs = data.citations
              .filter(c => c.label && c.source && message.includes(`[${c.label}]`))
              .map(c => `<br><small>[${c.label}] ${c.source}</small>`)
              .join('');
    message += refs;
  }
        appendMessage('assistant', message);
      }
    } catch (err) {
      appendMessage('assistant', `Network error: ${err}. Lenny is on break.`);
    } finally {
      sendBtn.disabled = false;
      document.getElementById('lenny-gif').src = 'images/static-elephant.gif';

    }
  });
})();

// Education AOI info box
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('aoi-element');
  if (!container) return;
  const triggers = document.querySelectorAll('.tooltip-trigger');

  triggers.forEach(trigger => {
    const source = trigger.querySelector('.tooltip');
    if (!source) return;

    const show = (html) => {
      container.innerHTML = html;
      container.classList.add('visible');
      container.setAttribute('aria-hidden', 'false');
    };
    const hide = () => {
      container.classList.remove('visible');
      container.setAttribute('aria-hidden', 'true');
    };

    trigger.addEventListener('mouseenter', () => show(source.innerHTML));
    trigger.addEventListener('mouseleave', hide);
    trigger.addEventListener('focusin', () => show(source.innerHTML));
    trigger.addEventListener('focusout', hide);

  });
});