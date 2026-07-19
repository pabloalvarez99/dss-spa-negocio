(function(){
  "use strict";
  /* ===== CONFIG (DSS: edita acá) ===== */
  var WSP = "56993649604";                 // WhatsApp donde llegan los leads
  var WEB3FORMS_KEY = "7d711f5c-da4c-4915-a4b2-41fa711fff67"; // access_key Web3Forms (configurada 2026-06-09)
  var MAIL = "contactodssspa@gmail.com";     // correo de respaldo / contacto
  var FORM_MIN_MS = 2800;                    // anti-bot: tiempo mínimo de llenado

  /* ===== Analytics stub (Sprint D wire real) ===== */
  function track(event, props){
    try{
      if(window.dataLayer && Array.isArray(window.dataLayer)){
        var payload = { event: event };
        if(props){ for(var k in props){ if(Object.prototype.hasOwnProperty.call(props,k)) payload[k] = props[k]; } }
        window.dataLayer.push(payload);
      }
      if(typeof window.gtag === "function"){ window.gtag("event", event, props || {}); }
    }catch(err){}
  }
  window.dssTrack = track;
  document.addEventListener("click", function(e){
    var t = e.target.closest("[data-track]");
    if(t) track(t.getAttribute("data-track"), { href: t.getAttribute("href") || "" });
  }, true);

  /* ===== WhatsApp links base ===== */
  var hi = encodeURIComponent("Hola DSS 👋 Vi su sitio y me interesa la página web gratis para mi negocio.");
  var waBase = "https://wa.me/" + WSP + "?text=" + hi;
  ["wa-header","wa-hero","wa-cta","wa-footer","wa-mobar"].forEach(function(id){
    var el = document.getElementById(id); if(el) el.href = waBase;
  });

  var retiroMsg = encodeURIComponent("Hola DSS 👋 Soy dueño/a de un negocio que aparece en el portafolio de demos y pido que lo retiren. Nombre del negocio: ");
  var retiroUrl = "https://wa.me/" + WSP + "?text=" + retiroMsg;
  ["wa-retiro","wa-retiro-foot"].forEach(function(id){
    var el = document.getElementById(id); if(el) el.href = retiroUrl;
  });

  var tienda = document.getElementById("wa-tienda");
  if(tienda) tienda.href = "https://wa.me/" + WSP + "?text=" + encodeURIComponent("Hola DSS 👋 Me interesa una tienda online para mi negocio.");

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ===== Menú móvil ===== */
  var mb = document.getElementById("menu-btn"), mnav = document.getElementById("mnav");
  if(mb && mnav){
    mb.addEventListener("click", function(){
      var open = mnav.classList.toggle("open");
      mb.setAttribute("aria-expanded", open ? "true" : "false");
    });
    mnav.addEventListener("click", function(e){
      if(e.target.closest("a")){ mnav.classList.remove("open"); mb.setAttribute("aria-expanded","false"); }
    });
  }

  /* ===== Header scroll state + back-to-top ===== */
  var hdr = document.getElementById("site-header");
  var totop = document.getElementById("totop");
  function onScroll(){
    var y = window.scrollY || 0;
    hdr.classList.toggle("scrolled", y > 8);
    totop.classList.toggle("show", y > 700);
  }
  window.addEventListener("scroll", onScroll, {passive:true});
  onScroll();
  totop.addEventListener("click", function(){
    window.scrollTo({top:0, behavior: reduce ? "auto" : "smooth"});
  });

  /* ===== Mock del hero: rota entre rubros ===== */
  var MOCKS = [
    {url:"🔒 tu-restaurant.cl", biz:"Tu Restaurant", tag:"★ 4.8 · Abierto ahora · Coquimbo",
     rows:[["Plato estrella","$7.990"],["Combo familiar","$14.990"],["Postre del día","$3.490"]], cta:"Pedir por WhatsApp"},
    {url:"🔒 tu-barberia.cl", biz:"Tu Barbería", tag:"★ 4.9 · Agenda abierta · La Serena",
     rows:[["Corte + barba","$12.000"],["Corte clásico","$8.000"],["Corte niños","$6.500"]], cta:"Reservar hora"},
    {url:"🔒 tu-tienda.cl", biz:"Tu Tienda", tag:"★ 4.7 · Despacho a domicilio",
     rows:[["Producto top","$9.990"],["Pack x3 oferta","$24.990"],["Novedad semanal","$5.490"]], cta:"Comprar ahora"},
    {url:"🔒 tu-veterinaria.cl", biz:"Tu Veterinaria", tag:"★ 4.8 · Urgencias 24/7",
     rows:[["Consulta general","$15.000"],["Vacuna anual","$12.000"],["Peluquería","$10.000"]], cta:"Agendar por WhatsApp"}
  ];
  var mockSwap = document.getElementById("mock-swap");
  if(mockSwap && !reduce){
    var mi = 0;
    setInterval(function(){
      mi = (mi+1) % MOCKS.length;
      var m = MOCKS[mi];
      mockSwap.classList.add("fade");
      setTimeout(function(){
        document.getElementById("mock-url").textContent = m.url;
        document.getElementById("mock-biz").textContent = m.biz;
        document.getElementById("mock-tag").textContent = m.tag;
        document.getElementById("mock-menu").innerHTML = m.rows.map(function(r){
          return '<div class="mock-row"><span>'+r[0]+'</span><b>'+r[1]+'</b></div>';
        }).join("");
        document.getElementById("mock-order").textContent = m.cta;
        mockSwap.classList.remove("fade");
      }, 360);
    }, 4200);
  }

  /* ===== Scrollspy nav ===== */
  var navLinks = document.querySelectorAll(".nav-links a");
  if("IntersectionObserver" in window && navLinks.length){
    var spy = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if(!en.isIntersecting) return;
        var id = "#" + en.target.id;
        navLinks.forEach(function(a){ a.classList.toggle("active", a.getAttribute("href")===id); });
      });
    }, {rootMargin:"-30% 0px -60% 0px"});
    ["trabajo","como","planes","servicios","faq","postular","privacidad"].forEach(function(id){
      var s = document.getElementById(id); if(s) spy.observe(s);
    });
  }

  /* ===== FAQ acordeón (una abierta a la vez) ===== */
  var faqs = document.querySelectorAll(".faq details");
  faqs.forEach(function(d){
    d.addEventListener("toggle", function(){
      if(d.open) faqs.forEach(function(o){ if(o!==d) o.open = false; });
    });
  });

  /* ===== Scroll reveal ===== */
  if("IntersectionObserver" in window && !reduce){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } });
    }, {threshold:.12});
    document.querySelectorAll(".reveal").forEach(function(el){ io.observe(el); });
  } else {
    document.querySelectorAll(".reveal").forEach(function(el){ el.classList.add("in"); });
  }

  /* ===== Form submit ===== */
  var form = document.getElementById("postular-form");
  var ok = document.getElementById("form-ok");
  var formReadyAt = Date.now();
  var tsEl = document.getElementById("form_ts");
  if(tsEl) tsEl.value = String(formReadyAt);

  function isChileMobile(v){
    var d = String(v || "").replace(/\D/g, "");
    if(d.indexOf("56") === 0) d = d.slice(2);
    while(d.charAt(0) === "0") d = d.slice(1);
    return /^9\d{8}$/.test(d);
  }

  function fuenteLabel(v){
    var map = { calle:"En la calle / visita", google:"Google", referido:"Referido / conocido", redes:"Instagram u otras redes", otro:"Otro" };
    return map[v] || v || "";
  }

  /* borrador persistente: si el dueño se interrumpe, no pierde lo escrito */
  var DRAFT_KEY = "dss-postulacion";
  var FIELDS = ["negocio","rubro","comuna","contacto","wsp","fuente","links","msg"];
  try{
    var draft = JSON.parse(localStorage.getItem(DRAFT_KEY) || "{}");
    FIELDS.forEach(function(n){ if(draft[n] && form.elements[n]) form.elements[n].value = draft[n]; });
  }catch(err){}
  form.addEventListener("input", function(){
    try{
      var d = {};
      FIELDS.forEach(function(n){ if(form.elements[n]) d[n] = form.elements[n].value; });
      localStorage.setItem(DRAFT_KEY, JSON.stringify(d));
    }catch(err){}
  });

  form.addEventListener("submit", function(e){
    e.preventDefault();

    /* honeypot: si viene lleno, fingir éxito sin enviar */
    var hp = form.elements["company_website"];
    if(hp && String(hp.value || "").trim()){
      track("form_spam_honeypot");
      form.querySelectorAll(".field, .form-submit").forEach(function(el){ el.style.display="none"; });
      ok.classList.add("show");
      return;
    }

    /* tiempo mínimo de llenado */
    var started = parseInt((tsEl && tsEl.value) || formReadyAt, 10) || formReadyAt;
    if(Date.now() - started < FORM_MIN_MS){
      track("form_spam_too_fast");
      alert("Espera un segundo e intenta de nuevo.");
      return;
    }

    if(!form.checkValidity()){ form.reportValidity(); return; }

    var g = function(n){ return (form.elements[n] && form.elements[n].value || "").trim(); };
    var negocio=g("negocio"), rubro=g("rubro"), comuna=g("comuna"),
        contacto=g("contacto"), wsp=g("wsp"), links=g("links"), msg=g("msg"),
        fuente=g("fuente");

    var wspField = form.elements["wsp"] && form.elements["wsp"].closest(".field");
    var wspErr = document.getElementById("wsp-err");
    if(!isChileMobile(wsp)){
      if(wspField) wspField.classList.add("invalid");
      if(wspErr) wspErr.classList.add("show");
      form.elements["wsp"].focus();
      track("form_invalid_phone");
      return;
    }
    if(wspField) wspField.classList.remove("invalid");
    if(wspErr) wspErr.classList.remove("show");

    var lines = [
      "Hola DSS 👋 Quiero postular mi negocio para una página web gratis.","",
      "🏪 *Negocio:* " + negocio,
      "🏷️ *Rubro:* " + rubro,
      "📍 *Comuna:* " + comuna,
      "🙋 *Mi nombre:* " + contacto,
      "📱 *WhatsApp:* " + wsp
    ];
    if(fuente) lines.push("📣 *Cómo nos conoció:* " + fuenteLabel(fuente));
    if(links) lines.push("🔗 *Web/redes:* " + links);
    if(msg)   lines.push("💬 *Mensaje:* " + msg);
    var text = encodeURIComponent(lines.join("\n"));
    var waUrl = "https://wa.me/" + WSP + "?text=" + text;

    track("form_submit", { rubro: rubro, comuna: comuna, fuente: fuente || "n/d" });

    /* abrir WhatsApp (dentro del gesto del click) */
    window.open(waUrl, "_blank");

    /* respaldo silencioso por correo vía Web3Forms (si hay key) */
    if(WEB3FORMS_KEY){
      fetch("https://api.web3forms.com/submit", {
        method:"POST",
        headers:{"Content-Type":"application/json", "Accept":"application/json"},
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: "Nueva postulación: " + negocio + " (" + comuna + ")",
          from_name: "Sitio DSS",
          Negocio:negocio, Rubro:rubro, Comuna:comuna, Contacto:contacto,
          WhatsApp:wsp, Como_nos_conociste: fuenteLabel(fuente) || fuente,
          Web_redes:links, Mensaje:msg
        })
      }).catch(function(){});
    }

    /* estado de éxito */
    try{ localStorage.removeItem(DRAFT_KEY); }catch(err){}
    var fb = document.getElementById("wa-fallback"); if(fb) fb.href = waUrl;
    form.querySelectorAll(".field, .form-submit, .hp").forEach(function(el){ el.style.display="none"; });
    ok.classList.add("show");
    ok.scrollIntoView({behavior: reduce ? "auto" : "smooth", block:"center"});
  });

  /* ===== Catálogo / portafolio ===== */
  function demoUrl(d){ return "https://" + (d.d || d.u + ".vercel.app"); }

  function initPortfolio(DEMOS){
    var grid = document.getElementById("pf-grid");
    var filtersEl = document.getElementById("pf-filters");
    var countEl = document.getElementById("pf-count");
    var qEl = document.getElementById("pf-q");
    var emptyEl = document.getElementById("pf-empty");
    if(!grid || !filtersEl){ return; }
    if(!DEMOS || !DEMOS.length){
      if(emptyEl){
        emptyEl.textContent = "No se pudo cargar el catálogo. Escríbenos por WhatsApp al +56 9 9364 9604.";
        emptyEl.classList.add("show");
      }
      return;
    }
    var cats = ["Todos"], catCount = {};
    DEMOS.forEach(function(d){
      if(cats.indexOf(d.c)<0) cats.push(d.c);
      catCount[d.c] = (catCount[d.c]||0)+1;
    });
    var esc = function(s){
      return String(s).replace(/[&<>"]/g, function(c){
        return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c];
      });
    };
    function cardHTML(d){
      var img = "<picture>"
        + '<source srcset="shots/'+d.u+'.webp?v=4" type="image/webp" />'
        + '<img src="shots/'+d.u+'.jpg?v=4" alt="Página web de '+esc(d.n)+'" loading="lazy" decoding="async" width="640" height="400" onerror="this.style.display=\'none\'" />'
        + "</picture>";
      var star = d.r ? '<span class="pf-tag star">⭐ '+d.r+"</span>" : "";
      var hay = (d.n+" "+d.c+" "+d.city).toLowerCase();
      return '<a class="pf-card" href="'+demoUrl(d)+'" target="_blank" rel="noopener" data-cat="'+esc(d.c)+'" data-q="'+esc(hay)+'">'
        + '<div class="pf-prev"><span class="pf-badge"><span class="pulse"></span>DEMO</span><div class="emoji-bg" aria-hidden="true">'+d.e+"</div>"+img+"</div>"
        + '<div class="pf-meta"><div><h3>'+esc(d.n)+'</h3><div class="sub">'+esc(d.c)+" · "+esc(d.city)+"</div>"
        + '<div class="pf-tags">'+star+'</div></div><span class="live">Ver demo ↗</span></div></a>';
    }
    grid.innerHTML = DEMOS.map(cardHTML).join("");
    filtersEl.innerHTML = cats.map(function(c,i){
      var n = i===0 ? DEMOS.length : catCount[c];
      return '<button type="button" class="chip'+(i===0?" active":"")+'" data-filter="'+esc(c)+'">'+esc(c)+"<i>"+n+"</i></button>";
    }).join("");

    /* ticker con los mismos negocios del catálogo */
    var tickEl = document.getElementById("ticker-track");
    if(tickEl){
      var tickItems = DEMOS.map(function(d){
        return '<a href="'+demoUrl(d)+'" target="_blank" rel="noopener" tabindex="-1">'+d.e+" "+esc(d.n)+"</a>";
      }).join("");
      tickEl.innerHTML = tickItems + tickItems;
    }

    var curFilter = "Todos", expanded = false, PAGE = 14;
    var moreWrap = document.querySelector(".pf-more");
    var moreBtn = document.getElementById("pf-more-btn");
    function apply(){
      var q = (qEl && qEl.value || "").trim().toLowerCase();
      var matched = 0, shown = 0;
      grid.querySelectorAll(".pf-card").forEach(function(card){
        var match = (curFilter==="Todos" || card.getAttribute("data-cat")===curFilter)
          && (!q || card.getAttribute("data-q").indexOf(q)>=0);
        if(match) matched++;
        var visible = match && (expanded || shown < PAGE);
        if(visible) shown++;
        card.classList.toggle("hide", !visible);
      });
      countEl.innerHTML = "<b>"+matched+"</b> de "+DEMOS.length+" demos";
      if(emptyEl) emptyEl.classList.toggle("show", matched===0);
      if(moreWrap) moreWrap.style.display = (matched > shown) ? "flex" : "none";
      if(moreBtn && matched > shown) moreBtn.textContent = "Mostrar las "+(matched-shown)+" demos restantes ↓";
    }
    if(moreBtn) moreBtn.addEventListener("click", function(){ expanded = true; apply(); });
    filtersEl.addEventListener("click", function(e){
      var b = e.target.closest(".chip"); if(!b) return;
      filtersEl.querySelectorAll(".chip").forEach(function(c){ c.classList.remove("active"); });
      b.classList.add("active");
      curFilter = b.getAttribute("data-filter");
      apply();
    });
    if(qEl) qEl.addEventListener("input", apply);
    apply();

    /* ===== Stats count-up (datos reales del catálogo) ===== */
    var totalSites = DEMOS.length + 1; /* + Tu Farmacia */
    var totalCats = cats.length - 1;
    function countUp(el, target){
      if(reduce || !("IntersectionObserver" in window)){ el.textContent = target+"+"; return; }
      var obs = new IntersectionObserver(function(es){
        es.forEach(function(en){
          if(!en.isIntersecting) return;
          obs.unobserve(el);
          var t0 = null, dur = 1300;
          function tick(ts){
            if(!t0) t0 = ts;
            var p = Math.min((ts-t0)/dur, 1);
            el.textContent = Math.round(target * (1-Math.pow(1-p,3))) + (p===1 ? "+" : "");
            if(p<1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
        });
      }, {threshold:.5});
      obs.observe(el);
    }
    var sEl = document.getElementById("stat-sites");
    var rEl = document.getElementById("stat-rubros");
    if(sEl) countUp(sEl, totalSites);
    if(rEl) countUp(rEl, totalCats);
  }

  /* carga demos.json; fallback vacío + mensaje UI si fetch falla */
  function loadDemos(){
    return fetch("demos.json", { credentials: "same-origin" })
      .then(function(r){ if(!r.ok) throw new Error("demos "+r.status); return r.json(); })
      .then(function(data){
        if(!Array.isArray(data) || !data.length) throw new Error("demos vacío");
        return data;
      })
      .catch(function(err){
        try{ console.warn("[DSS] demos.json no disponible", err); }catch(e){}
        return [];
      });
  }

  loadDemos().then(initPortfolio);

})();
