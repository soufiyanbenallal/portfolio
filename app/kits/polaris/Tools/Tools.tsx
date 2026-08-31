<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Overview & Stack Health — Journeva</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
  :root{
    --ink:#1b1f1c;
    --ink-soft:#4a5049;
    --ink-faint:#8a9089;
    --paper:#faf8f4;
    --paper-raised:#ffffff;
    --line:#e6e2d8;
    --line-soft:#efece4;
    --green:#1f4d3d;
    --green-soft:#e7efe9;
    --green-dot:#2f7a5c;
    --amber:#9a5b12;
    --amber-soft:#faf0dd;
    --amber-dot:#d68a2a;
    --violet:#5b4b8a;
    --violet-soft:#efecf7;
    --violet-dot:#8677b8;
    --shadow: 0 1px 2px rgba(27,31,28,0.04), 0 8px 24px -12px rgba(27,31,28,0.10);
  }

  *{box-sizing:border-box;}
  html,body{margin:0;padding:0;}
  body{
    background:var(--paper);
    background-image:
      radial-gradient(ellipse 800px 400px at 10% -10%, rgba(47,122,92,0.06), transparent 60%),
      radial-gradient(ellipse 600px 500px at 100% 0%, rgba(214,138,42,0.05), transparent 60%);
    color:var(--ink);
    font-family:'Manrope', sans-serif;
    -webkit-font-smoothing:antialiased;
    min-height:100vh;
  }

  .wrap{
    max-width:920px;
    margin:0 auto;
    padding:48px 28px 96px;
  }

  /* ---------- Header ---------- */
  .eyebrow{
    display:flex;
    align-items:center;
    gap:8px;
    font-size:12px;
    font-weight:700;
    letter-spacing:0.09em;
    text-transform:uppercase;
    color:var(--green-dot);
    margin-bottom:14px;
    opacity:0;
    animation: rise .6s ease forwards;
  }
  .eyebrow::before{
    content:"";
    width:6px;height:6px;border-radius:50%;
    background:var(--green-dot);
    box-shadow:0 0 0 3px var(--green-soft);
  }

  h1{
    font-family:'Fraunces', serif;
    font-weight:500;
    font-size:38px;
    line-height:1.08;
    letter-spacing:-0.01em;
    margin:0 0 12px;
    opacity:0;
    animation: rise .6s ease forwards .05s;
  }

  .sub{
    font-size:15.5px;
    line-height:1.55;
    color:var(--ink-soft);
    max-width:560px;
    margin:0 0 36px;
    opacity:0;
    animation: rise .6s ease forwards .1s;
  }

  /* ---------- Stat cards ---------- */
  .stats{
    display:grid;
    grid-template-columns:repeat(3,1fr);
    gap:14px;
    margin-bottom:44px;
    opacity:0;
    animation: rise .6s ease forwards .15s;
  }
  .stat{
    background:var(--paper-raised);
    border:1px solid var(--line);
    border-radius:14px;
    padding:20px 20px 18px;
    box-shadow:var(--shadow);
    position:relative;
    overflow:hidden;
  }
  .stat::after{
    content:"";
    position:absolute; top:0; left:0; right:0; height:3px;
  }
  .stat.active::after{ background:var(--green-dot); }
  .stat.pending::after{ background:var(--amber-dot); }
  .stat.avail::after{ background:var(--ink-faint); }

  .stat .num{
    font-family:'Fraunces', serif;
    font-size:32px;
    font-weight:500;
    line-height:1;
    margin-bottom:6px;
  }
  .stat.active .num{ color:var(--green); }
  .stat.pending .num{ color:var(--amber); }
  .stat.avail .num{ color:var(--ink); }

  .stat .label{
    font-size:13px;
    font-weight:700;
    color:var(--ink);
    margin-bottom:2px;
  }
  .stat .of{
    font-size:12.5px;
    color:var(--ink-faint);
  }

  /* segmented health bar */
  .healthbar{
    display:flex;
    height:8px;
    border-radius:5px;
    overflow:hidden;
    margin-bottom:44px;
    background:var(--line-soft);
    opacity:0;
    animation: rise .6s ease forwards .2s;
  }
  .healthbar span{ height:100%; }
  .hb-active{ background:var(--green-dot); }
  .hb-pending{ background:var(--amber-dot); }
  .hb-locked{ background:#d8d3c6; }

  /* ---------- Category sections ---------- */
  .category{
    margin-bottom:34px;
    opacity:0;
    animation: rise .55s ease forwards;
  }
  .cat-head{
    display:flex;
    align-items:center;
    gap:10px;
    margin-bottom:14px;
    padding-left:2px;
  }
  .cat-icon{
    width:30px;height:30px;
    border-radius:8px;
    background:var(--green-soft);
    display:flex;align-items:center;justify-content:center;
    flex-shrink:0;
  }
  .cat-icon svg{ width:16px;height:16px; stroke:var(--green); }
  .cat-title{
    font-size:14.5px;
    font-weight:800;
    letter-spacing:0.01em;
  }
  .cat-count{
    font-size:12px;
    color:var(--ink-faint);
    font-weight:600;
    margin-left:auto;
    padding-right:2px;
  }

  .card-group{
    background:var(--paper-raised);
    border:1px solid var(--line);
    border-radius:14px;
    box-shadow:var(--shadow);
    overflow:hidden;
  }

  .tool{
    display:flex;
    align-items:flex-start;
    gap:16px;
    padding:18px 20px;
    border-bottom:1px solid var(--line-soft);
    transition:background .15s ease;
  }
  .tool:last-child{ border-bottom:none; }
  .tool:hover{ background:#fcfbf9; }

  .tool-main{ flex:1; min-width:0; }
  .tool-name-row{
    display:flex;
    align-items:center;
    gap:8px;
    flex-wrap:wrap;
    margin-bottom:4px;
  }
  .tool-name{
    font-size:15px;
    font-weight:700;
    color:var(--ink);
  }
  .tag{
    font-size:10.5px;
    font-weight:700;
    letter-spacing:0.03em;
    text-transform:uppercase;
    padding:2.5px 7px;
    border-radius:20px;
    border:1px solid var(--line);
    color:var(--ink-faint);
    background:var(--paper);
  }
  .tool-desc{
    font-size:13.5px;
    line-height:1.5;
    color:var(--ink-soft);
    max-width:480px;
  }

  .tool-side{
    display:flex;
    flex-direction:column;
    align-items:flex-end;
    gap:9px;
    flex-shrink:0;
    padding-top:1px;
  }

  .badge{
    display:inline-flex;
    align-items:center;
    gap:5px;
    font-size:11.5px;
    font-weight:700;
    padding:4px 9px 4px 7px;
    border-radius:20px;
    white-space:nowrap;
  }
  .badge .dot{ width:6px;height:6px;border-radius:50%; }

  .badge.b-active{ background:var(--green-soft); color:var(--green); }
  .badge.b-active .dot{ background:var(--green-dot); }

  .badge.b-pending{ background:var(--amber-soft); color:var(--amber); }
  .badge.b-pending .dot{ background:var(--amber-dot); }

  .badge.b-locked{ background:var(--violet-soft); color:var(--violet); }

  /* toggle switch */
  .switch{
    width:36px; height:21px;
    border-radius:20px;
    background:var(--line);
    position:relative;
    cursor:pointer;
    border:none;
    transition:background .2s ease;
    flex-shrink:0;
  }
  .switch::after{
    content:"";
    position:absolute;
    top:2.5px; left:2.5px;
    width:16px;height:16px;
    border-radius:50%;
    background:#fff;
    box-shadow:0 1px 2px rgba(0,0,0,0.25);
    transition:transform .2s ease;
  }
  .switch.on{ background:var(--green-dot); }
  .switch.on::after{ transform:translateX(15px); }
  .switch.locked{ background:var(--line-soft); cursor:not-allowed; opacity:.6; }
  .switch.locked::after{ background:#fff; }

  .action-btn{
    font-size:12.5px;
    font-weight:700;
    padding:6px 12px;
    border-radius:8px;
    border:1px solid var(--line);
    background:var(--paper-raised);
    color:var(--ink);
    cursor:pointer;
    transition:all .15s ease;
    white-space:nowrap;
  }
  .action-btn:hover{ border-color:var(--ink-faint); background:var(--paper); }
  .action-btn.primary{
    background:var(--green);
    border-color:var(--green);
    color:#fff;
  }
  .action-btn.primary:hover{ background:#173729; }
  .action-btn.upgrade{
    background:var(--violet);
    border-color:var(--violet);
    color:#fff;
  }
  .action-btn.upgrade:hover{ background:#4a3d73; }
  .action-btn.link{
    border-color:transparent;
    background:none;
    color:var(--ink-faint);
    padding:6px 4px;
  }
  .action-btn.link:hover{ color:var(--green); background:none; }

  .lock-icon{ width:11px;height:11px; }

  @keyframes rise{
    from{ opacity:0; transform:translateY(8px); }
    to{ opacity:1; transform:translateY(0); }
  }

  @media (max-width:640px){
    .stats{ grid-template-columns:1fr; }
    h1{ font-size:29px; }
    .tool{ flex-direction:column; }
    .tool-side{ flex-direction:row; align-items:center; width:100%; justify-content:space-between; }
  }
</style>
</head>
<body>

<div class="wrap">

  <div class="eyebrow">Journeva · Revenue Stack</div>
  <h1>Overview &amp; Stack Health</h1>
  <p class="sub">Turn on the tools that boost Average Order Value and Conversion Rate across every touchpoint of your store.</p>

  <div class="stats">
    <div class="stat active">
      <div class="num">4</div>
      <div class="label">Active Stack</div>
      <div class="of">of 10 total tools</div>
    </div>
    <div class="stat pending">
      <div class="num">3</div>
      <div class="label">Needs Setup</div>
      <div class="of">pending configuration</div>
    </div>
    <div class="stat avail">
      <div class="num">3</div>
      <div class="label">Locked Tools</div>
      <div class="of">need a plan upgrade</div>
    </div>
  </div>

  <div class="healthbar">
    <span class="hb-active" style="width:40%"></span>
    <span class="hb-pending" style="width:30%"></span>
    <span class="hb-locked" style="width:30%"></span>
  </div>

  <!-- Product Discovery & Detail Page -->
  <div class="category" style="animation-delay:.25s">
    <div class="cat-head">
      <div class="cat-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
      </div>
      <div class="cat-title">Product Discovery &amp; Detail Page</div>
      <div class="cat-count">3 tools</div>
    </div>
    <div class="card-group">

      <div class="tool">
        <div class="tool-main">
          <div class="tool-name-row">
            <span class="tool-name">Frequently Bought Together (FBT)</span>
            <span class="tag">Core Default</span>
          </div>
          <div class="tool-desc">Amazon-style multi-item bundling directly on product detail pages to boost order sizes.</div>
        </div>
        <div class="tool-side">
          <span class="badge b-active"><span class="dot"></span>Active</span>
          <button class="switch on" onclick="toggleSwitch(this)"></button>
        </div>
      </div>

      <div class="tool">
        <div class="tool-main">
          <div class="tool-name-row">
            <span class="tool-name">Product Add-Ons &amp; Protection</span>
          </div>
          <div class="tool-desc">Optional add-ons (shipping protection, gift wrapping, priority processing) on product &amp; cart pages.</div>
        </div>
        <div class="tool-side">
          <span class="badge b-pending"><span class="dot"></span>Needs Setup</span>
          <button class="action-btn primary">Set Up</button>
        </div>
      </div>

      <div class="tool">
        <div class="tool-main">
          <div class="tool-name-row">
            <span class="tool-name">Smart AI Recommendations</span>
          </div>
          <div class="tool-desc">Automated co-occurrence recommendations surfaced dynamically across storefront touchpoints.</div>
        </div>
        <div class="tool-side">
          <span class="badge b-active"><span class="dot"></span>Active</span>
          <button class="switch on" onclick="toggleSwitch(this)"></button>
        </div>
      </div>

    </div>
  </div>

  <!-- In-Cart & Cart Drawer Experience -->
  <div class="category" style="animation-delay:.32s">
    <div class="cat-head">
      <div class="cat-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
      </div>
      <div class="cat-title">In-Cart &amp; Cart Drawer Experience</div>
      <div class="cat-count">4 tools</div>
    </div>
    <div class="card-group">

      <div class="tool">
        <div class="tool-main">
          <div class="tool-name-row">
            <span class="tool-name">Slide-Out Cart Drawer</span>
            <span class="tag">Core Default</span>
          </div>
          <div class="tool-desc">A high-converting slide-out cart with a rewards progress bar, urgency timer, and in-cart upsells.</div>
        </div>
        <div class="tool-side">
          <span class="badge b-pending"><span class="dot"></span>Needs Setup</span>
          <button class="action-btn primary">Set Up</button>
        </div>
      </div>

      <div class="tool">
        <div class="tool-main">
          <div class="tool-name-row">
            <span class="tool-name">In-Cart Upsells</span>
            <span class="tag">Core Default</span>
          </div>
          <div class="tool-desc">Targeted 1-click upsell product recommendations surfaced inside the slide-out cart.</div>
        </div>
        <div class="tool-side">
          <span class="badge b-active"><span class="dot"></span>Active</span>
          <button class="switch on" onclick="toggleSwitch(this)"></button>
        </div>
      </div>

      <div class="tool">
        <div class="tool-main">
          <div class="tool-name-row">
            <span class="tool-name">Native Discounts &amp; Volume Breaks</span>
          </div>
          <div class="tool-desc">Tiered quantity breaks and BOGO rules evaluated natively in Shopify Checkout via Functions.</div>
        </div>
        <div class="tool-side">
          <span class="badge b-locked"><svg class="lock-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>Plan Upgrade</span>
          <button class="action-btn upgrade">Upgrade</button>
        </div>
      </div>

      <div class="tool">
        <div class="tool-main">
          <div class="tool-name-row">
            <span class="tool-name">Free Gifts with Purchase</span>
          </div>
          <div class="tool-desc">Automatic free gift tier unlocks based on cart subtotal thresholds or qualifying items.</div>
        </div>
        <div class="tool-side">
          <span class="badge b-pending"><span class="dot"></span>Needs Setup</span>
          <button class="action-btn primary">Set Up</button>
        </div>
      </div>

    </div>
  </div>

  <!-- High-Intent Checkout Experience -->
  <div class="category" style="animation-delay:.39s">
    <div class="cat-head">
      <div class="cat-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2"/><path d="M1 10h22"/></svg>
      </div>
      <div class="cat-title">High-Intent Checkout Experience</div>
      <div class="cat-count">1 tool</div>
    </div>
    <div class="card-group">

      <div class="tool">
        <div class="tool-main">
          <div class="tool-name-row">
            <span class="tool-name">Checkout Offers &amp; Order Bumps</span>
          </div>
          <div class="tool-desc">High-intent impulse order bumps rendered directly inside Shopify Checkout.</div>
        </div>
        <div class="tool-side">
          <span class="badge b-locked"><svg class="lock-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>Plan Upgrade</span>
          <button class="action-btn upgrade">Upgrade</button>
        </div>
      </div>

    </div>
  </div>

  <!-- Post-Purchase & Customer Retention -->
  <div class="category" style="animation-delay:.46s">
    <div class="cat-head">
      <div class="cat-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
      </div>
      <div class="cat-title">Post-Purchase &amp; Customer Retention</div>
      <div class="cat-count">2 tools</div>
    </div>
    <div class="card-group">

      <div class="tool">
        <div class="tool-main">
          <div class="tool-name-row">
            <span class="tool-name">1-Click Post-Purchase Upsells</span>
          </div>
          <div class="tool-desc">High-converting 1-click upsell offers shown between checkout and the order thank-you page.</div>
        </div>
        <div class="tool-side">
          <span class="badge b-locked"><svg class="lock-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>Plan Upgrade</span>
          <button class="action-btn upgrade">Upgrade</button>
        </div>
      </div>

      <div class="tool">
        <div class="tool-main">
          <div class="tool-name-row">
            <span class="tool-name">Thank You &amp; Order Status Offers</span>
          </div>
          <div class="tool-desc">Post-checkout cross-sells, referral rewards, customer surveys, and 1-click reorders.</div>
        </div>
        <div class="tool-side">
          <span class="badge b-active"><span class="dot"></span>Active</span>
          <button class="switch on" onclick="toggleSwitch(this)"></button>
        </div>
      </div>

    </div>
  </div>

</div>


</body>
</html>