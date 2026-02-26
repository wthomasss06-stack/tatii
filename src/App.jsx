import React, { useState, useEffect, useRef, useCallback } from 'react';

// ============================================================
// DONNÉES
// ============================================================

const WHATSAPP = 'https://wa.me/2250151151432';

const passionsData = [
  {
    num: '01',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="32" height="32">
        <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6z"/>
        <line x1="6" y1="17" x2="18" y2="17"/>
      </svg>
    ),
    name: 'La Cuisine',
    desc: 'Nourrir ceux qu\'on aime est un acte d\'amour profond. Je prépare chaque plat avec soin, en mariant les saveurs et les textures pour créer des expériences inoubliables.',
    tags: ['Cuisine ivoirienne', 'Pâtisserie', 'Snacks'],
  },
  {
    num: '02',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="32" height="32">
        <path d="M9 3l1 9"/><path d="M15 3l-1 9"/><path d="M5 7h14"/>
        <path d="M3 12c0 5 4 9 9 9s9-4 9-9"/>
      </svg>
    ),
    name: 'Le Tricot',
    desc: 'Chaque maille est une pensée tissée. Le tricot est ma façon de créer de la beauté avec patience — écharpes, bonnets, vêtements faits main pour les personnes chères.',
    tags: ['Écharpes', 'Bonnets', 'Vêtements'],
  },
  {
    num: '03',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="32" height="32">
        <path d="M12 22V12"/><line x1="12" y1="12" x2="12" y2="2"/><line x1="8" y1="6" x2="16" y2="6"/>
        <path d="M5 19a7 7 0 0 1 14 0"/>
      </svg>
    ),
    name: 'La Foi',
    desc: 'Ma foi est le socle de ma vie. Elle guide mes pas, illumine mes journées et m\'apporte une paix que rien d\'autre ne peut donner. C\'est ma source de force intérieure.',
    tags: ['Prière', 'Communauté', 'Gratitude'],
  },
];

const recipesData = [
  {
    cat: 'Plat principal', name: 'Attiéké Poisson Braisé', featured: true,
    desc: 'Le plat emblématique de Côte d\'Ivoire revisité avec ma touche personnelle. Semoule de manioc fraîche, poisson grillé aux épices et garniture de tomates et oignons caramélisés.',
    time: '45 min', persons: '4 pers.', level: 'Moyen', badge: '★ Signature',
    img: 'assets/images/cuisine/attieke.jpg', bg: 'r-bg-1',
  },
  {
    cat: 'Sauce', name: 'Sauce Graine',
    desc: 'Sauce traditionnelle à la palme, mijotée lentement avec poulet et épices.',
    time: '1h20', persons: '6 pers.', img: 'assets/images/cuisine/sauce-graine.jpg', bg: 'r-bg-2',
  },
  {
    cat: 'Entrée', name: 'Alloco Sauté',
    desc: 'Plantains mûrs frits, légèrement caramélisés, servis avec omelette épicée.',
    time: '20 min', persons: '2 pers.', img: 'assets/images/cuisine/alloco.jpg', bg: 'r-bg-3',
  },
  {
    cat: 'Pâtisserie', name: 'Gâteau au Chocolat',
    desc: 'Fondant chocolat moelleux, ganache veloutée et éclats de cacao ivoirien.',
    time: '50 min', persons: '8 pers.', img: 'assets/images/cuisine/gateau-chocolat.jpg', bg: 'r-bg-4',
  },
];

const tricotsData = [
  { name: 'Écharpe Lavande', detail: 'Laine merino · Point côte 2/2', diff: 2, bg: 't-bg-1', img: 'assets/images/tricot/echarpe-lavande.jpg' },
  { name: "Bonnet d'hiver",  detail: 'Alpaga · Point jersey',          diff: 1, bg: 't-bg-2', img: 'assets/images/tricot/bonnet-hiver.jpg' },
  { name: 'Mitaines Dorées', detail: 'Laine douce · Point ajouré',     diff: 3, bg: 't-bg-3', img: 'assets/images/tricot/mitaines-dorees.jpg' },
  { name: 'Gilet Bleuté',    detail: 'Coton · Point mousse',           diff: 4, bg: 't-bg-4', img: 'assets/images/tricot/gilet-bleute.jpg' },
];

const produitsData = [
  { id:1,  cat:'visage', badge:'best',     name:'Crème Éclat Naturel',        catLabel:'Soin visage',             stars:5, reviews:24,  prix:'4 500 FCFA',  prixOld:'5 500 FCFA', desc:'Hydratation intense enrichie en beurre de karité et huile d\'argan. Peau lumineuse dès la première application.', img:'assets/images/cosmetiques/creme-visage.jpg',         bg:'pi-visage', details:[['Format','50 ml'],['Usage','Matin & soir'],['Type peau','Tous types']] },
  { id:2,  cat:'visage', badge:'new',      name:'Sérum Éclat Unifiant',       catLabel:'Soin visage',             stars:4, reviews:18,  prix:'6 200 FCFA',               desc:'Formule concentrée à la vitamine C pour unifier le teint et réduire les taches. Texture légère, absorption rapide.', img:'assets/images/cosmetiques/serum-eclat.jpg',          bg:'pi-serum',  details:[['Format','30 ml'],['Usage','Matin'],['Actif','Vitamine C']] },
  { id:3,  cat:'visage', badge:null,       name:'Masque Nuit Réparateur',     catLabel:'Soin visage',             stars:5, reviews:31,  prix:'5 800 FCFA',               desc:'Soin intensif nocturne à l\'aloe vera et à l\'huile de rose musquée. Peau régénérée au réveil.', img:'assets/images/cosmetiques/masque-nuit.jpg',           bg:'pi-visage', details:[['Format','60 ml'],['Usage','Soir'],['Actif','Aloe vera']] },
  { id:4,  cat:'corps',  badge:'best',     name:'Huile Soyeuse Corps',        catLabel:'Soin corps',              stars:5, reviews:42,  prix:'3 800 FCFA',               desc:'Mélange précieux d\'huiles végétales — coco, jojoba et amande douce — pour une peau veloutée et nourrie.', img:'assets/images/cosmetiques/huile-corps.jpg',           bg:'pi-corps',  details:[['Format','100 ml'],['Texture','Huile sèche'],['Parfum','Coco']] },
  { id:5,  cat:'corps',  badge:'promo',    name:'Lotion Karité Fondante',     catLabel:'Soin corps',              stars:4, reviews:19,  prix:'3 200 FCFA',  prixOld:'4 000 FCFA', desc:'Texture crémeuse ultra-nourrissante au karité pur d\'Afrique de l\'Ouest. Hydratation longue durée.', img:'assets/images/cosmetiques/lotion-corps.jpg',           bg:'pi-corps',  details:[['Format','200 ml'],['Actif','Karité pur'],['Usage','Corps']] },
  { id:6,  cat:'corps',  badge:'new',      name:'Gommage Sucre & Coco',       catLabel:'Soin corps',              stars:5, reviews:11,  prix:'4 100 FCFA',               desc:'Exfoliant doux naturel à la noix de coco et au sucre de canne. Révèle l\'éclat naturel de la peau.', img:'assets/images/cosmetiques/gommage-corps.jpg',          bg:'pi-corps',  details:[['Format','150 ml'],['Fréquence','2x/semaine'],['Type','Exfoliant']] },
  { id:7,  cat:'parfum', badge:'best',     name:'Rose & Oud Mystique',        catLabel:'Parfum · Eau de parfum',  stars:5, reviews:38,  prix:'12 500 FCFA', prixOld:'15 000 FCFA', desc:'Notes de tête : rose de Damas · cœur : oud précieux · fond : musc blanc. Un sillage envoûtant.', img:'assets/images/cosmetiques/parfum-rose-oud.jpg',         bg:'pi-parfum', details:[['Volume','50 ml EDP'],['Famille','Oriental floral'],['Sillage','Intense']] },
  { id:8,  cat:'parfum', badge:'new',      name:'Vanille & Ambre Doré',       catLabel:'Parfum · Eau de parfum',  stars:5, reviews:21,  prix:'11 000 FCFA',              desc:'Notes de tête : fleur d\'oranger · cœur : vanille bourbon · fond : ambre chaud. Douceur et sensualité.', img:'assets/images/cosmetiques/parfum-vanille-ambre.jpg',   bg:'pi-parfum2',details:[['Volume','50 ml EDP'],['Famille','Gourmand'],['Sillage','Moyen']] },
  { id:9,  cat:'parfum', badge:'promo',    name:'Jasmin & Bois Précieux',     catLabel:'Parfum · Eau de toilette',stars:4, reviews:14,  prix:'8 500 FCFA',  prixOld:'10 000 FCFA', desc:'Notes de tête : jasmin frais · cœur : bois de santal · fond : cèdre et patchouli.', img:'assets/images/cosmetiques/parfum-jasmin-bois.jpg',       bg:'pi-parfum3',details:[['Volume','50 ml EDT'],['Famille','Boisé floral'],['Sillage','Léger']] },
  { id:10, cat:'chouchou',badge:'chouchou',name:'Chouchou Satin Rose',        catLabel:'Chouchou · Accessoire',   stars:5, reviews:52,  prix:'500 FCFA',                 desc:'Élastique en satin doux. Réduit les frisottis et les casses. Idéal pour cheveux crépus et bouclés.', img:'assets/images/cosmetiques/chouchou-satin-rose.jpg',     bg:'pi-chouchou1',details:[['Matière','Satin'],['Couleur','Rose poudré'],['Cheveux','Crépus & bouclés']] },
  { id:11, cat:'chouchou',badge:'best',    name:'Chouchou Velours Mauve',     catLabel:'Chouchou · Accessoire',   stars:5, reviews:67,  prix:'750 FCFA',                 desc:'Chouchou en velours épais ultra tendance. Tenue parfaite toute la journée, sans marque ni douleur.', img:'assets/images/cosmetiques/chouchou-velours-mauve.jpg',  bg:'pi-chouchou2',details:[['Matière','Velours'],['Couleur','Mauve'],['Tenue','Toute la journée']] },
  { id:12, cat:'chouchou',badge:'new',     name:'Chouchou Perles Dorées',     catLabel:'Chouchou · Accessoire',   stars:5, reviews:29,  prix:'1 000 FCFA',               desc:'Chouchou tissé orné de petites perles dorées pour un look élégant et raffiné. Parfait pour une soirée chic.', img:'assets/images/cosmetiques/chouchou-perles-dorees.jpg',bg:'pi-chouchou3',details:[['Matière','Tissu + perles'],['Style','Soirée'],['Couleur','Doré']] },
];

const foiValeurs = [
  { name: 'Prière',    icon: <svg viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="24" height="24"><path d="M18 2H6a2 2 0 0 0-2 2v16l4-2 4 2 4-2 4 2V4a2 2 0 0 0-2-2z"/><line x1="12" y1="7" x2="12" y2="13"/><line x1="9" y1="10" x2="15" y2="10"/></svg> },
  { name: 'Gratitude', icon: <svg viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="24" height="24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
  { name: 'Parole',    icon: <svg viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="24" height="24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg> },
  { name: 'Paix',      icon: <svg viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="24" height="24"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg> },
  { name: 'Amour',     icon: <svg viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="24" height="24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg> },
];

const WaIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

// ============================================================
// HOOKS
// ============================================================

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

function usePetals() {
  useEffect(() => {
    const canvas = document.getElementById('petals-canvas');
    if (!canvas || window.innerWidth <= 768) return;
    const ctx = canvas.getContext('2d');
    let W = canvas.width  = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    let animId;

    const onResize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    window.addEventListener('resize', onResize);

    // Pétales dorés + roses
    const petals = Array.from({ length: 22 }, (_, i) => ({
      x: Math.random() * W,
      y: Math.random() * H - H,
      r: Math.random() * 6 + 3,
      vx: (Math.random() - 0.5) * 0.5,
      vy: Math.random() * 0.7 + 0.2,
      rot: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 0.03,
      op: Math.random() * 0.3 + 0.08,
      gold: i % 3 === 0,
    }));

    const draw = () => {
      animId = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, W, H);
      petals.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.rot += p.vr;
        if (p.y > H + 20) { p.y = -20; p.x = Math.random() * W; }
        ctx.save();
        ctx.globalAlpha = p.op;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.beginPath();
        ctx.ellipse(0, 0, p.r, p.r * 0.5, 0, 0, Math.PI * 2);
        ctx.fillStyle = p.gold ? 'rgba(212,175,90,1)' : 'rgba(200,114,138,1)';
        ctx.fill();
        ctx.restore();
      });
    };
    draw();

    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', onResize); };
  }, []);
}

function useCursorGlow() {
  useEffect(() => {
    const el = document.getElementById('cursorGlow');
    if (!el || window.innerWidth <= 1024) return;
    let cx = 0, cy = 0, tx = 0, ty = 0;
    let animId;

    const move = e => { tx = e.clientX; ty = e.clientY; };
    window.addEventListener('mousemove', move);

    const anim = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      el.style.left = cx + 'px';
      el.style.top  = cy + 'px';
      animId = requestAnimationFrame(anim);
    };
    anim();

    return () => { window.removeEventListener('mousemove', move); cancelAnimationFrame(animId); };
  }, []);
}

function useScrollTop() {
  useEffect(() => {
    const btn = document.getElementById('scroll-top');
    if (!btn) return;
    const onScroll = () => btn.classList.toggle('visible', window.scrollY > 400);
    const onClick  = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    window.addEventListener('scroll', onScroll);
    btn.addEventListener('click', onClick);
    return () => { window.removeEventListener('scroll', onScroll); btn.removeEventListener('click', onClick); };
  }, []);
}

function useNavScroll() {
  useEffect(() => {
    const nav = document.getElementById('navbar');
    if (!nav) return;
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
}

// 3D Tilt on hover
function useTilt(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el || window.innerWidth <= 768) return;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      el.style.transform = `rotateY(${x * 14}deg) rotateX(${-y * 10}deg) translateZ(12px)`;
    };
    const onLeave = () => {
      el.style.transform = '';
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, []);
}

// ============================================================
// TILT CARD WRAPPER
// ============================================================
const TiltCard = ({ className, children, onClick, style }) => {
  const ref = useRef(null);
  useTilt(ref);
  return (
    <div ref={ref} className={className} onClick={onClick} style={{ transformStyle: 'preserve-3d', ...style }}>
      {children}
    </div>
  );
};

// ============================================================
// MODALE PRODUIT
// ============================================================
const Modal = ({ produit, onClose }) => {
  const [imgZoom, setImgZoom] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape') { imgZoom ? setImgZoom(false) : onClose(); }
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [onClose, imgZoom]);

  const stars = (n, t=5) => Array.from({length:t},(_,i) => (
    <span key={i} className="star" style={i>=n?{color:'var(--muted)'}:{}}>★</span>
  ));

  const badge = (b) => {
    if (!b) return null;
    const cfg = { best: ['Best-seller','badge-best'], new: ['Nouveau','badge-new'], promo: ['-20%','badge-promo'], chouchou: ['🎀 Chouchou','badge-chouchou'] };
    const [label, cls] = cfg[b] || [];
    return <span className={`produit-badge ${cls}`}>{label}</span>;
  };

  return (
    <>
    {/* Visionneuse plein écran */}
    {imgZoom && (
      <div className="img-zoom-overlay" onClick={() => setImgZoom(false)}>
        <button className="img-zoom-close" onClick={() => setImgZoom(false)} aria-label="Fermer">✕</button>
        <img src={produit.img} alt={produit.name} className="img-zoom-full" />
      </div>
    )}

    <div className="modal-overlay open" id="modalOverlay" onClick={e => { if (e.target.id==='modalOverlay') onClose(); }}>
      <div className="modal-box">
        <button className="modal-close" onClick={onClose} aria-label="Fermer">✕</button>
        <div className={`modal-img ${produit.bg}`}>
          <div className="modal-img-placeholder" id="modalPlaceholder" style={{display:'flex'}}>
            <svg viewBox="0 0 24 24" fill="none" stroke="var(--violet)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
            <span>Photo à ajouter</span>
          </div>
          <img src={produit.img} alt={produit.name}
            onLoad={e => { e.target.style.opacity=1; document.getElementById('modalPlaceholder').style.display='none'; setImgLoaded(true); }}
            onError={e => e.target.style.display='none'}
            style={{opacity:0, transition:'opacity 0.3s ease'}}
          />
          {imgLoaded && (
            <button className="modal-img-zoom-btn" onClick={() => setImgZoom(true)} aria-label="Agrandir l'image">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                <polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/>
                <line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/>
              </svg>
              Voir en grand
            </button>
          )}
        </div>
        <div className="modal-body">
          <span className="modal-cat">{produit.catLabel}</span>
          <h2 className="modal-name">{produit.name}</h2>
          <div className="modal-stars">{stars(produit.stars)} <span className="star-count">({produit.reviews} avis)</span></div>
          <div className="modal-divider"></div>
          <p className="modal-desc">{produit.desc}</p>
          {produit.details && (
            <div className="modal-details">
              {produit.details.map(([k,v],i) => (
                <div key={i} className="modal-detail-row"><span>{k}</span><span>{v}</span></div>
              ))}
            </div>
          )}
          <div className="modal-prix-row">
            <div className="modal-prix-wrap">
              <span className="modal-prix-main">{produit.prix}</span>
              {produit.prixOld && <span className="modal-prix-old">{produit.prixOld}</span>}
            </div>
            <a href={WHATSAPP} target="_blank" rel="noopener" className="modal-btn-commander" onClick={onClose}>
              <WaIcon /> Commander sur WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

// ============================================================
// NAV
// ============================================================
const Navbar = ({ toggleTheme, theme }) => {
  const [open, setOpen] = useState(false);

  const scrollTo = (id) => {
    setOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  const links = [
    ['about','À propos'], ['passions','Passions'], ['cosmetiques','Boutique'],
    ['cuisine','Cuisine'], ['tricot','Tricot'], ['foi','Foi'], ['contact','Contact'],
  ];

  return (
    <>
      <nav id="navbar">
        <a className="nav-logo" href="#home" onClick={e => { e.preventDefault(); scrollTo('home'); }}>Tatiana</a>
        <ul className="nav-links">
          {links.map(([id, label]) => (
            <li key={id}><a href={`#${id}`} onClick={e => { e.preventDefault(); scrollTo(id); }}>{label}</a></li>
          ))}
          <li>
            <a href="assets/cv/tatiana-cv.pdf" download style={{
              color:'var(--gold)', border:'1px solid rgba(212,175,90,0.4)',
              padding:'6px 16px', borderRadius:'100px', fontSize:'0.65rem',
              letterSpacing:'0.16em', fontWeight:'600', textTransform:'uppercase',
              transition:'all 0.3s', background:'rgba(212,175,90,0.06)'
            }}>CV</a>
          </li>
        </ul>
        <button className={`hamburger ${open ? 'open' : ''}`} id="hamburger" aria-label="Menu" onClick={() => setOpen(!open)}>
          <span/><span/><span/>
        </button>
        <button onClick={toggleTheme} aria-label="Changer de thème" style={{
          border: '1.5px solid var(--border-strong)',
          borderRadius: '100px', padding: '6px 14px', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: '6px',
          color: 'var(--accent)', fontSize: '0.65rem', fontWeight: '600',
          letterSpacing: '0.1em', textTransform: 'uppercase',
          fontFamily: 'var(--font-body)', transition: 'var(--transition)',
          background: 'var(--accent-dim)',
        }}>
          {theme === 'dark'
            ? <><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>Clair</>
            : <><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>Sombre</>
          }
        </button>
      </nav>

      <div className={`mobile-nav-overlay ${open ? 'open' : ''}`} onClick={() => setOpen(false)} />
      <div className={`mobile-nav-drawer ${open ? 'open' : ''}`}>
        <span className="drawer-logo">Tatiana</span>
        <ul className="drawer-links">
          {links.map(([id, label]) => (
            <li key={id}>
              <a href={`#${id}`} onClick={e => { e.preventDefault(); scrollTo(id); }}>
                <span className="dl-dot"></span>{label}
              </a>
            </li>
          ))}
          <li><a href="assets/cv/tatiana-cv.pdf" download style={{color:'var(--gold)',fontWeight:600}}>
            <span className="dl-dot" style={{background:'var(--gold)'}}></span>Télécharger CV
          </a></li>
        </ul>
        <div className="drawer-footer">© 2025 Tatiana · Abidjan, Côte d'Ivoire</div>
      </div>
    </>
  );
};

// ============================================================
// HERO
// ============================================================
const Hero = () => (
  <section className="hero" id="home">
    <div className="hero-left">
      <p className="hero-eyebrow">Portfolio Personnel</p>
      <h1 className="hero-name">Gnougoue Gnihan Tatiana</h1>
      <p className="hero-title">Cuisinière d'âme &amp; Artisane du fil</p>
      <p className="hero-desc">
        Femme de cœur et de mains habiles, je cultive l'art de nourrir, de créer et d'aimer — à travers chaque plat, chaque maille, chaque parfum et chaque prière.
      </p>
      <div className="hero-pillars">
        {[
          ['Gastronomie', <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6z"/><line x1="6" y1="17" x2="18" y2="17"/></svg>],
          ['Tricot & Créations', <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 3l1 9"/><path d="M15 3l-1 9"/><path d="M5 7h14"/><path d="M3 12c0 5 4 9 9 9s9-4 9-9"/></svg>],
          ['Cosmétiques & Parfums', <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 3h6v3a3 3 0 0 1-3 3 3 3 0 0 1-3-3V3z"/><path d="M12 9v2"/><rect x="5" y="11" width="14" height="10" rx="2"/></svg>],
          ['Femme de foi', <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22V12"/><path d="M12 12C12 7 7 4 4 7c-2 2-1 6 2 7"/><path d="M12 12c0-5 5-8 8-5 2 2 1 6-2 7"/></svg>],
        ].map(([label, icon]) => (
          <span key={label} className="pillar-chip">{icon}{label}</span>
        ))}
      </div>
    </div>

    <div className="hero-right">
      <div className="petal-layer" id="hero-petals"></div>
      <div className="float-card fc-cooking">
        <span className="fc-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="26" height="26">
            <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6z"/>
            <line x1="6" y1="17" x2="18" y2="17"/>
          </svg>
        </span>
        <div className="fc-text"><span className="fc-label">Spécialité</span><span className="fc-value">Cuisine maison</span></div>
      </div>
      <div className="hero-portrait" id="heroPortrait">
        <img src="assets/images/hero/portrait.jpg" alt="Tatiana"
          onError={e => { e.target.style.display='none'; document.getElementById('portraitFallback').style.display='block'; }} />
        <span className="portrait-initial" id="portraitFallback" style={{display:'none'}}>T</span>
      </div>
      <div className="float-card fc-knitting">
        <span className="fc-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="26" height="26">
            <path d="M9 3l1 9"/><path d="M15 3l-1 9"/><path d="M5 7h14"/><path d="M3 12c0 5 4 9 9 9s9-4 9-9"/>
          </svg>
        </span>
        <div className="fc-text"><span className="fc-label">Passion</span><span className="fc-value">Tricot artisanal</span></div>
      </div>
      <div className="float-card fc-faith">
        <span className="fc-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="26" height="26">
            <path d="M12 22V12"/><line x1="12" y1="12" x2="12" y2="2"/><line x1="8" y1="6" x2="16" y2="6"/>
          </svg>
        </span>
        <div className="fc-text"><span className="fc-label">Valeurs</span><span className="fc-value">Foi &amp; Amour</span></div>
      </div>
    </div>
  </section>
);

// ============================================================
// ABOUT
// ============================================================
const About = () => (
  <section id="about">
    <div className="about-visual reveal">
      <div className="about-frame">
        <img src="assets/images/about/tatiana-about.jpg" alt="Tatiana"
          onLoad={e => { e.target.style.opacity=1; const ini = document.getElementById('aboutInitial'); if(ini) ini.style.display='none'; }}
          onError={e => e.target.style.display='none'}
          style={{opacity:0, transition:'opacity 0.4s ease'}}
        />
        <span className="about-frame-initial" id="aboutInitial">T</span>
      </div>
      <div className="about-ornament">Art de<br/>vivre</div>
    </div>
    <div className="about-text">
      <p className="section-eyebrow reveal">À propos de moi</p>
      <h2 className="section-title reveal reveal-delay-1">Une femme <em>passionnée</em> et accomplie</h2>
      <div className="section-divider reveal reveal-delay-2"></div>
      <p className="reveal reveal-delay-2">
        Je suis <strong>Tatiana</strong>, une femme épanouie dont la vie s'articule autour de trois piliers essentiels : la <strong>cuisine</strong>, le <strong>tricot</strong> et ma <strong>foi</strong>. Chaque jour est une nouvelle occasion de créer, de partager et de m'élever.
      </p>
      <p style={{marginTop:16,color:'var(--ivory-dim)',fontSize:'0.95rem',lineHeight:1.8}} className="reveal reveal-delay-3">
        En cuisine, je mets tout mon cœur à préparer des plats savoureux qui réchauffent l'âme. Le tricot est ma méditation active — chaque maille tissée avec soin raconte une histoire. Et dans ma foi, je trouve la <strong>force, la paix et l'inspiration</strong>.
      </p>
      <div className="about-quote reveal reveal-delay-4">
        <blockquote>"La beauté du foyer, c'est qu'on y cultive ce qui compte vraiment — l'amour, la nourriture et la prière."</blockquote>
      </div>
      <div className="cv-widget reveal reveal-delay-4">
        <div className="cv-icon-wrap">
          <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
          </svg>
        </div>
        <div className="cv-content">
          <p className="cv-label">Mon parcours professionnel</p>
          <h3 className="cv-title">Curriculum Vitæ</h3>
          <p className="cv-sub">Formations, expériences &amp; compétences</p>
        </div>
        <a href="assets/cv/tatiana-cv.pdf" download="CV-Tatiana-Gnihan.pdf" className="cv-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          Télécharger
        </a>
      </div>
    </div>
  </section>
);

// ============================================================
// PASSIONS
// ============================================================
const Passions = () => (
  <section id="passions">
    <div className="reveal">
      <p className="section-eyebrow">Mes univers</p>
      <h2 className="section-title">Trois <em>passions</em>,<br/>une seule âme</h2>
      <div className="section-divider"></div>
    </div>
    <div className="passions-grid">
      {passionsData.map((p, i) => (
        <TiltCard key={p.num} className={`passion-card reveal reveal-delay-${i+1}`}>
          <div className="passion-icon-wrap">{p.icon}</div>
          <p className="passion-num">{p.num}</p>
          <h3 className="passion-name">{p.name}</h3>
          <p className="passion-desc">{p.desc}</p>
          <div className="passion-tags">{p.tags.map(t => <span key={t} className="ptag">{t}</span>)}</div>
        </TiltCard>
      ))}
    </div>
  </section>
);

// ============================================================
// CUISINE
// ============================================================
const Cuisine = () => (
  <section id="cuisine">
    <div className="reveal">
      <p className="section-eyebrow">Cuisine</p>
      <h2 className="section-title">Mes <em>créations</em> culinaires</h2>
      <div className="section-divider"></div>
    </div>
    <div className="recipes-layout">
      {recipesData.map((r, i) => (
        <TiltCard key={r.name} className={`recipe-card ${r.featured ? 'featured' : ''} reveal ${i>0?`reveal-delay-${i}`:''}`}>
          <div className={`recipe-img ${r.bg}`}>
            <img src={r.img} alt={r.name} onError={e => e.target.style.display='none'} />
            {r.badge && <span className="recipe-badge">{r.badge}</span>}
          </div>
          <div className="recipe-body">
            <p className="recipe-cat">{r.cat}</p>
            <h3 className="recipe-name">{r.name}</h3>
            <p className="recipe-desc">{r.desc}</p>
            <div className="recipe-meta">
              <span className="rmeta">
                <svg className="rm-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="14" height="14"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                {r.time}
              </span>
              <span className="rmeta">
                <svg className="rm-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="14" height="14"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                {r.persons}
              </span>
              {r.level && <span className="rmeta">{r.level}</span>}
            </div>
          </div>
        </TiltCard>
      ))}
    </div>
  </section>
);

// ============================================================
// TRICOT
// ============================================================
const Tricot = () => (
  <section id="tricot">
    <div className="reveal">
      <p className="section-eyebrow">Tricot</p>
      <h2 className="section-title">Créations <em>faites à la main</em></h2>
      <div className="section-divider"></div>
    </div>
    <div className="tricot-grid">
      {tricotsData.map((t, i) => (
        <TiltCard key={t.name} className={`tricot-item reveal reveal-delay-${i+1}`}>
          <div className={`tricot-thumb ${t.bg}`}>
            <img src={t.img} alt={t.name} onError={e => e.target.style.display='none'} />
          </div>
          <div className="tricot-info">
            <p className="tricot-name">{t.name}</p>
            <p className="tricot-detail">{t.detail}</p>
            <div className="tricot-difficulty">
              {Array.from({length:4}, (_,j) => (
                <span key={j} className={j < t.diff ? 'dot-filled' : 'dot-empty'}>●</span>
              ))}
            </div>
          </div>
        </TiltCard>
      ))}
    </div>
  </section>
);

// ============================================================
// BOUTIQUE
// ============================================================
const Boutique = ({ onOpenModal }) => {
  const [filter, setFilter] = useState('tous');

  const cats = [
    { key:'tous',     label:'Tous les produits' },
    { key:'visage',   label:'Soins visage' },
    { key:'corps',    label:'Soins corps' },
    { key:'parfum',   label:'Parfums' },
    { key:'chouchou', label:'🎀 Chouchou' },
  ];

  const badgeCfg   = { best:'badge-best', new:'badge-new', promo:'badge-promo', chouchou:'badge-chouchou' };
  const badgeLabel = { best:'Best-seller', new:'Nouveau', promo:'-20%', chouchou:'🎀 Chouchou' };

  const stars = (n, t=5) => Array.from({length:t}, (_,i) => (
    <span key={i} className="star" style={i>=n?{color:'var(--muted)'}:{}}>★</span>
  ));

  const filtered = filter === 'tous' ? produitsData : produitsData.filter(p => p.cat === filter);

  return (
    <section id="cosmetiques">
      <div className="reveal">
        <p className="section-eyebrow">Boutique</p>
        <h2 className="section-title">Soins, Parfums &amp; <em>Accessoires</em></h2>
        <div className="section-divider"></div>
      </div>

      <div className="boutique-filters reveal reveal-delay-1">
        {cats.map(c => (
          <button
            key={c.key}
            className={`filter-btn ${filter===c.key?'active':''}`}
            onClick={() => setFilter(c.key)}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="produits-grid">
        {filtered.map((p, i) => (
          <TiltCard key={p.id} className={`produit-card reveal reveal-delay-${(i%3)+1}`} onClick={() => onOpenModal(p)}>
            {p.badge && <span className={`produit-badge ${badgeCfg[p.badge]}`}>{badgeLabel[p.badge]}</span>}
            <div className={`produit-img-wrap ${p.bg}`}>
              <div className="produit-placeholder">
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--violet)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" width="36" height="36">
                  <rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
                </svg>
                <span>Photo à ajouter</span>
              </div>
              <img src={p.img} alt={p.name} onError={e => e.target.style.display='none'} />
              <div className="produit-overlay">
                <button className="overlay-btn">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                  Voir le produit
                </button>
              </div>
            </div>
            <div className="produit-body">
              <span className="produit-cat">{p.catLabel}</span>
              <h3 className="produit-name">{p.name}</h3>
              <p className="produit-desc">{p.desc}</p>
              <div className="produit-stars">{stars(p.stars)} <span className="star-count">({p.reviews} avis)</span></div>
              <div className="produit-footer">
                <div className="produit-prix">
                  <span className="prix-main">{p.prix}</span>
                  {p.prixOld && <span className="prix-old">{p.prixOld}</span>}
                </div>
                <button className="btn-commander" onClick={e => { e.stopPropagation(); onOpenModal(p); }}>
                  Commander
                </button>
              </div>
            </div>
          </TiltCard>
        ))}
      </div>

      <div className="boutique-banner">
        {[
          ['Produits 100% naturels', 'Ingrédients sélectionnés avec soin',
            <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="22" height="22"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>],
          ['Livraison Abidjan', 'Livraison à domicile disponible',
            <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="22" height="22"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>],
          ['Fait avec amour', 'Chaque produit, une attention particulière',
            <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="22" height="22"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>],
        ].map(([title, sub, icon], i) => (
          <div key={title} className={`bb-item reveal reveal-delay-${i+1}`}>
            <div className="bb-icon">{icon}</div>
            <div className="bb-text"><span className="bb-title">{title}</span><span className="bb-sub">{sub}</span></div>
          </div>
        ))}
      </div>
    </section>
  );
};

// ============================================================
// FOI
// ============================================================
const Foi = () => (
  <section id="foi">
    <p className="section-eyebrow reveal">Spiritualité</p>
    <h2 className="section-title reveal reveal-delay-1">Ma <em>foi</em>, mon ancre</h2>
    <div className="section-divider reveal reveal-delay-2"></div>
    <div className="foi-verse reveal reveal-delay-2">
      Je puis tout par celui qui me fortifie.
      <span className="foi-ref">Philippiens 4 : 13</span>
    </div>
    <div className="foi-values reveal reveal-delay-3">
      {foiValeurs.map(v => (
        <TiltCard key={v.name} className="foi-val">
          <div className="foi-val-icon">{v.icon}</div>
          <span className="foi-val-name">{v.name}</span>
        </TiltCard>
      ))}
    </div>
  </section>
);

// ============================================================
// CONTACT
// ============================================================
const Contact = () => {
  const [form, setForm] = useState({ prenom:'', nom:'', sujet:'Commande cosmétiques / parfums', message:'' });
  const [sent, setSent] = useState(false);

  const handle = e => setForm({...form, [e.target.name]: e.target.value});

  const submit = e => {
    e.preventDefault();
    const text = `Bonjour Tatiana ! 🌸%0A%0APrénom : ${form.prenom}%0ANom : ${form.nom}%0ASujet : ${form.sujet}%0A%0AMessage :%0A${form.message}`;
    window.open(`https://wa.me/2250151151432?text=${text}`, '_blank');
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact">
      <div className="contact-left">
        <p className="section-eyebrow reveal">Contact</p>
        <h2 className="section-title reveal reveal-delay-1">Échangeons <em>ensemble</em></h2>
        <div className="section-divider reveal reveal-delay-2"></div>
        <p className="contact-intro reveal reveal-delay-2">
          Pour toute commande de cosmétiques, parfums, chouchous, tricot ou cuisine — contactez-moi directement sur WhatsApp ou par téléphone. Je réponds vite ! 🌸
        </p>
        <div className="contact-items">
          {[
            { label:'WhatsApp — Commandes & infos', val:'0151 151 432', href:WHATSAPP, green:true,
              icon:<svg viewBox="0 0 24 24" fill="#25D366" width="20" height="20"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg> },
            { label:'Téléphone', val:'0151 151 432', href:'tel:+2250151151432',
              icon:<svg viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="20" height="20"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.42 2 2 0 0 1 3.6 1.24h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.83a16 16 0 0 0 6.29 6.29l.95-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg> },
            { label:'Localisation', val:"Côte d'Ivoire, Abidjan",
              icon:<svg viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="20" height="20"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> },
            { label:'Disponibilités', val:'Lun – Sam · 8h à 20h',
              icon:<svg viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="20" height="20"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
          ].map((c, i) => (
            <div key={c.label} className={`contact-item reveal reveal-delay-${i+2}`}
              style={c.green ? {borderColor:'rgba(37,211,102,0.3)',background:'rgba(37,211,102,0.04)'} : {}}>
              <div className="ci-icon">{c.icon}</div>
              <div className="ci-info">
                <span className="ci-label">{c.label}</span>
                {c.href
                  ? <a href={c.href} target={c.green?'_blank':undefined} rel={c.green?'noopener':undefined}><span className="ci-val" style={c.green?{color:'#1a9e4a'}:{}}>{c.val}</span></a>
                  : <span className="ci-val">{c.val}</span>
                }
              </div>
            </div>
          ))}
        </div>
      </div>

      <form className="contact-form reveal reveal-delay-2" onSubmit={submit}>
        <div className="form-row">
          <div className="form-group"><label>Prénom</label><input type="text" name="prenom" placeholder="Votre prénom" value={form.prenom} onChange={handle} required /></div>
          <div className="form-group"><label>Nom</label><input type="text" name="nom" placeholder="Votre nom" value={form.nom} onChange={handle} required /></div>
        </div>
        <div className="form-group">
          <label>Sujet</label>
          <select name="sujet" value={form.sujet} onChange={handle}>
            <option>Commande cosmétiques / parfums</option>
            <option>Commande chouchou</option>
            <option>Commande cuisine</option>
            <option>Commande tricot</option>
            <option>Simple échange</option>
            <option>Autre</option>
          </select>
        </div>
        <div className="form-group">
          <label>Message</label>
          <textarea name="message" placeholder="Votre message…" value={form.message} onChange={handle} required />
        </div>
        <button className="btn-send" type="submit">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          {sent ? 'Envoyé sur WhatsApp ✓' : 'Envoyer le message'}
        </button>
        <a href={WHATSAPP} target="_blank" rel="noopener" style={{
          display:'inline-flex', alignItems:'center', gap:'10px',
          padding:'14px 28px', background:'#25D366', color:'#fff',
          borderRadius:'100px', textDecoration:'none',
          fontFamily:'var(--font-body)', fontSize:'0.8rem',
          fontWeight:'600', letterSpacing:'0.1em', textTransform:'uppercase',
          transition:'all 0.3s ease', alignSelf:'flex-start',
          boxShadow:'0 8px 24px rgba(37,211,102,0.35)'
        }}>
          <WaIcon />Commander sur WhatsApp
        </a>
      </form>
    </section>
  );
};

// ============================================================
// FOOTER
// ============================================================
const Footer = () => (
  <footer>
    <span className="footer-logo">Tatiana</span>
    <p className="footer-copy">© 2025 Tatiana · Fait avec amour en Côte d'Ivoire</p>
    <div className="footer-icons">
      {[
        ['Facebook', <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>, '#'],
        ['Instagram', <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>, '#'],
        ['WhatsApp', <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>, WHATSAPP],
      ].map(([label, icon, href]) => (
        <a key={label} href={href} target={href!=='#'?'_blank':undefined} rel={href!=='#'?'noopener':undefined} className="footer-icon" aria-label={label}>{icon}</a>
      ))}
    </div>
  </footer>
);

// ============================================================
// APP
// ============================================================
export default function App() {
  const [modal, setModal] = useState(null);
  const [theme, setTheme] = useState(() => localStorage.getItem('tatiana-theme') || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme === 'light' ? 'light' : '');
    localStorage.setItem('tatiana-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  useReveal();
  usePetals();
  useCursorGlow();
  useScrollTop();
  useNavScroll();

  // Re-run reveal on filter change
  useEffect(() => {
    const timer = setTimeout(() => {
      document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.92) el.classList.add('visible');
      });
    }, 50);
    return () => clearTimeout(timer);
  });

  return (
    <>
      <div className="cursor-glow" id="cursorGlow"></div>
      <canvas id="petals-canvas"></canvas>
      <button id="scroll-top" aria-label="Retour en haut de page">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
      </button>
      <a href={WHATSAPP} target="_blank" rel="noopener" className="whatsapp-float" aria-label="Commander sur WhatsApp">
        <svg viewBox="0 0 24 24" fill="#fff" width="22" height="22"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
        <div className="wa-text"><span>Commander &amp; Infos</span><span>0151 151 432</span></div>
      </a>

      <Navbar toggleTheme={toggleTheme} theme={theme} />
      <Hero />
      <About />
      <Passions />
      <Cuisine />
      <Tricot />
      <Boutique onOpenModal={setModal} />
      <Foi />
      <Contact />
      <Footer />

      {modal && <Modal produit={modal} onClose={() => setModal(null)} />}
    </>
  );
}