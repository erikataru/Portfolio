(function(){
  function mulberry32(a){
    return function(){
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function tokenColors(){
    var s = getComputedStyle(document.documentElement);
    return {
      line: s.getPropertyValue('--line').trim(),
      lineStrong: s.getPropertyValue('--line-strong').trim(),
      moss: s.getPropertyValue('--moss').trim(),
      accent: s.getPropertyValue('--accent').trim(),
      brand: s.getPropertyValue('--brand').trim()
    };
  }

  function ringColor(colors, t){
    // t in [0,1] low -> high "elevation": moss -> line -> accent -> brand
    var stops = [colors.moss, colors.line, colors.accent, colors.brand];
    var seg = Math.min(Math.floor(t * (stops.length - 1)), stops.length - 2);
    return stops[seg];
  }

  function drawContours(canvas, opts){
    var seed = parseInt(canvas.dataset.seed || '1', 10);
    var rand = mulberry32(seed * 9973);
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var rect = canvas.getBoundingClientRect();
    var w = Math.max(rect.width, 1), h = Math.max(rect.height, 1);
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    var ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    var colors = tokenColors();
    var cx = w * (0.3 + rand() * 0.4);
    var cy = h * (0.35 + rand() * 0.4);
    var maxR = Math.max(w, h) * (opts.spread || 0.95);
    var rings = opts.rings || 9;
    var harmonics = [
      { f: 2 + Math.floor(rand() * 2), a: 0.10 + rand() * 0.08, p: rand() * Math.PI * 2 },
      { f: 4 + Math.floor(rand() * 3), a: 0.05 + rand() * 0.05, p: rand() * Math.PI * 2 },
      { f: 7 + Math.floor(rand() * 4), a: 0.02 + rand() * 0.02, p: rand() * Math.PI * 2 }
    ];

    for (var i = 0; i < rings; i++){
      var t = i / (rings - 1);
      var baseR = 0.12 * maxR + t * maxR;
      ctx.beginPath();
      var steps = 140;
      for (var s = 0; s <= steps; s++){
        var ang = (s / steps) * Math.PI * 2;
        var wobble = 0;
        for (var k = 0; k < harmonics.length; k++){
          wobble += harmonics[k].a * Math.sin(harmonics[k].f * ang + harmonics[k].p + seed);
        }
        var r = baseR * (1 + wobble);
        var x = cx + Math.cos(ang) * r;
        var y = cy + Math.sin(ang) * r * (opts.squash || 0.72);
        if (s === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = ringColor(colors, t);
      ctx.lineWidth = opts.weight || 1.1;
      ctx.globalAlpha = opts.alpha || 0.8;
      ctx.stroke();
    }
  }

  function drawHorizon(canvas, opts){
    var seed = parseInt(canvas.dataset.seed || '1', 10);
    var rand = mulberry32(seed * 7331);
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var rect = canvas.getBoundingClientRect();
    var w = Math.max(rect.width, 1), h = Math.max(rect.height, 1);
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    var ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    var colors = tokenColors();
    var lines = 4;
    for (var i = 0; i < lines; i++){
      var t = i / (lines - 1);
      var baseY = h * (0.35 + t * 0.55);
      var amp = 6 + t * 10;
      var freq = 1.2 + rand() * 0.8;
      var phase = rand() * Math.PI * 2;
      ctx.beginPath();
      for (var x = 0; x <= w; x += 4){
        var y = baseY + Math.sin((x / w) * Math.PI * 2 * freq + phase) * amp;
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = ringColor(colors, t);
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.6;
      ctx.stroke();
    }
  }

  function redrawAll(){
    document.querySelectorAll('canvas[data-contour="hero"]').forEach(function(c){
      drawContours(c, { rings: 11, spread: 1.05, squash: 0.6, weight: 1, alpha: 0.7 });
    });
    document.querySelectorAll('canvas[data-contour="card"]').forEach(function(c){
      drawContours(c, { rings: 8, spread: 0.9, squash: 0.78, weight: 1.3, alpha: 0.9 });
    });
    document.querySelectorAll('canvas[data-contour="horizon"]').forEach(function(c){
      drawHorizon(c, {});
    });
  }

  var raf;
  function scheduleRedraw(){
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(redrawAll);
  }

  window.addEventListener('resize', scheduleRedraw);
  if (window.matchMedia){
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', scheduleRedraw);
  }
  redrawAll();

  var nav = document.querySelector('.nav');
  var navToggle = nav.querySelector('.nav-toggle');
  navToggle.addEventListener('click', function(){
    var isOpen = nav.classList.toggle('nav-open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
  nav.querySelectorAll('.nav-links a').forEach(function(link){
    link.addEventListener('click', function(){
      nav.classList.remove('nav-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
})();
