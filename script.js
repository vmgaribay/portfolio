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
