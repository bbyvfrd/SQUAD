/* ============================================================
   SQUAD BRAND KIT v3 — Industrial · Tactical · Athletic
   Logo + lockup PNG sourced from raw/assets (copied to ./assets)
   Standalone mark uses the transparent 2048px two-blade PNG
   Palette: Soft Linen / Pale Slate / Fiery Terracotta / Jet / Navy
   Type:   Inter Tight (every sans role) + JetBrains Mono (data)
           Locked 2026-05-08 per DESIGN.md. No italic. Color spike only.
   Spacing: 8-grid token system (SPACE)
   ============================================================ */

/* ─── Color tokens ─────────────────────────────────────────── */
const TERRA       = '#EE4721';
const TERRA_DEEP  = '#C5371A';
const TERRA_LIGHT = '#F26B49';
const TERRA_SOFT  = '#FBDDD2';
const JET         = '#13222C';
const NAVY        = '#1D3444';
const SLATE       = '#BEC4CE';
const SLATE_DEEP  = '#8E96A1';
const LINEN       = '#EBE7DB';
const BONE        = '#F5F2E9';
const SMOKE       = '#3A4550';
const ASH         = '#6B7480';
const HAIRLINE    = '#D8D4CA';

/* ─── Ramps (LOCKED 2026-05-08) ────────────────────────────────
   Three families: TERRA (accent), STEEL (dark structural),
   LINEN (warm neutral). Brand anchors above are aliases for
   specific stops. See DESIGN.md "Color Ramps" for full role
   mapping. The brand's "white" is LINEN_RAMP[100] (Pressed Bone).
   The brand's "black" is STEEL_RAMP[700] (Jet Ink).
   ─────────────────────────────────────────────────────────────── */
const TERRA_RAMP = {
  50:  '#FDEDE6',
  100: '#FBDDD2',  // = TERRA_SOFT
  200: '#F8B79F',
  300: '#F26B49',  // = TERRA_LIGHT
  400: '#F05633',
  500: '#EE4721',  // = TERRA — BRAND ANCHOR
  600: '#C5371A',  // = TERRA_DEEP
  700: '#9D2C14',
  800: '#75210E',
  900: '#4D1608'
};
const STEEL_RAMP = {
  50:  '#F0F2F4',
  100: '#D6DBE0',
  200: '#BEC4CE',  // = SLATE
  300: '#8E96A1',  // = SLATE_DEEP
  400: '#6B7480',  // = ASH
  500: '#3A4550',  // = SMOKE
  600: '#1D3444',  // = NAVY
  700: '#13222C',  // = JET — BRAND ANCHOR
  800: '#0C1820',
  900: '#060D14'
};
const LINEN_RAMP = {
  50:  '#FAF8F1',
  100: '#F5F2E9',  // = BONE — THE BRAND'S "WHITE"
  200: '#EBE7DB',  // = LINEN — BRAND ANCHOR / page bg
  300: '#D8D4CA',  // = HAIRLINE
  400: '#B5B0A2',
  500: '#8C8775',
  600: '#635E4D',
  700: '#423F30',
  800: '#28261B',
  900: '#15130A'
};

/* ─── Type tokens (LOCKED 2026-05-08) ───────────────────────────
   Two-font system per DESIGN.md. Inter Tight carries every sans
   role (display, headline, title, lede, body). JetBrains Mono
   carries every label and kicker. No third family. No italic.
   ─────────────────────────────────────────────────────────────── */
const DISPLAY   = "'Inter Tight', system-ui, sans-serif";
const TEXT_HEAD = "'Inter Tight', system-ui, sans-serif";
const BODY      = "'Inter Tight', system-ui, sans-serif";
const MONO      = "'JetBrains Mono', ui-monospace, monospace";

/* ─── 8-grid spacing & radii ───────────────────────────────── */
const SPACE = { 0:0, 1:8, 2:16, 3:24, 4:32, 5:40, 6:48, 7:56, 8:64, 9:72, 10:80, 12:96, 14:112, 16:128 };
const RADII = { xs:4, sm:6, md:10, lg:14, xl:18, xxl:24, pill:999 };

/* ─── Modular type scale ───────────────────────────────────────
   1.414 ratio · base 17. Display tier locks the rhythm of headlines;
   body tier holds the floor for narrative copy. Mono operates on
   its own two-tier system (Label vs Kicker) for tracking discipline.
   Fonts locked 2026-05-08: Inter Tight (sans, every role) and
   JetBrains Mono (label + kicker). No italic. Color spike only.
   ─────────────────────────────────────────────────────────────── */
const TYPE = {
  /* display tier — Inter Tight 900, color spike, uppercase */
  d1: 192,   /* cover hero, drenched campaign moments */
  d2: 136,   /* sub-hero, OOH-class callouts */
  d3: 96,    /* hero card display, large stats */
  d4: 68,    /* in-card hero, stat numbers */
  d5: 48,    /* section title default */
  d6: 34,    /* small section / card title */
  /* body tier — sans, mixed-case, narrative-readable */
  lede: 24,
  body: 17,
  cap:  14,
  /* mono tier — uppercase, tracked. Two voices only. */
  monoLabel:  11,   /* in-card data + metadata, paired with TRACK.label */
  monoKicker: 12    /* eyebrows, kickers, OOH labels, paired with TRACK.kicker */
};

/* Mono tracking: collapse messy 0.12/0.13/0.14/0.18/0.20 to two values.
   label  — data labels and captions inside cards.
   kicker — signage, eyebrows, badges. */
const TRACK = {
  label:  '0.16em',
  kicker: '0.22em'
};

/* ─── PNG tint filters ─────────────────────────────────────── */
/* The supplied logomark + lockup PNGs are terracotta on transparent.
   These filters let one PNG appear in the brand's other colors.
   `terra` is the natural color and uses no filter (perfect fidelity).
   The non-terra tints are CSS filter approximations — they preserve the
   silhouette but the exact color may shift slightly from the spec hex. */
const TINT_FILTERS = {
  terra: 'none',
  black: 'brightness(0)',
  jet:   'brightness(0) saturate(100%) invert(11%) sepia(13%) saturate(1180%) hue-rotate(167deg) brightness(96%) contrast(94%)',
  linen: 'brightness(0) invert(1) sepia(10%) saturate(380%) hue-rotate(2deg) brightness(96%)',
  slate: 'brightness(0) invert(86%) sepia(7%) saturate(180%) hue-rotate(180deg) brightness(96%)',
};

/* Map a brand color hex to a tint name, so legacy `color={...}` props
   still work as drop-in. Anything unknown falls back to `terra`. */
const colorToTint = (color) => {
  if (color === LINEN || color === BONE) return 'linen';
  if (color === JET) return 'jet';
  if (color === SLATE) return 'slate';
  if (color === TERRA) return 'terra';
  return 'terra';
};

/* ─────────────────────────────────────────────
   LOGOMARK — uses the supplied PNG (squad_logomark.png)
   Recolorable via tint filter (terra | jet | linen | slate)
   API: <SquadMark color={LINEN|TERRA|JET|SLATE} size={…} />
        <SquadMark tint="linen" size={…} />  // explicit
   ───────────────────────────────────────────── */
const SquadMark = ({ color = TERRA, tint, size = 100, style }) => {
  const activeTint = tint || colorToTint(color);
  return (
    <img
      src="assets/squad_logomark.png"
      alt="SQUAD mark"
      style={{
        width: size,
        height: 'auto',
        display: 'block',
        filter: TINT_FILTERS[activeTint] || 'none',
        objectFit: 'contain',
        ...style,
      }} />
  );
};

/* ─────────────────────────────────────────────
   LOCKUP — uses the actual brand PNG with tint filters
   variant: 'horizontal' (mark + word) | 'stacked' (mark over word)
   tint:    'terra' | 'jet' | 'linen' | 'slate'
   ───────────────────────────────────────────── */
const LOCKUP_SRC = {
  horizontal: 'assets/squad_logo_transparent_2.png',
  stacked:    'assets/squad_logo_transparent_1.png',
};

const Lockup = ({ variant = 'horizontal', tint = 'terra', height = 80, style }) => (
  <img
    src={LOCKUP_SRC[variant]}
    alt="SQUAD"
    style={{
      height,
      width: 'auto',
      display: 'block',
      filter: TINT_FILTERS[tint] || 'none',
      ...style,
    }} />
);

/* ─────────────────────────────────────────────
   Reusable type tokens
   ───────────────────────────────────────────── */
const Eyebrow = ({ children, color = TERRA, mb = SPACE[2] }) => (
  <div style={{
    fontFamily: MONO, fontSize: TYPE.monoKicker, fontWeight: 600,
    letterSpacing: TRACK.kicker, textTransform: 'uppercase',
    color, marginBottom: mb
  }}>{children}</div>
);

const SectionTitle = ({ children, color = JET, size = TYPE.d5 }) => (
  <div style={{
    fontFamily: DISPLAY, fontSize: size, fontWeight: 900,
    color, marginBottom: SPACE[2], letterSpacing: '-0.018em',
    lineHeight: 0.88, textTransform: 'uppercase'
  }}>{children}</div>
);

const SectionLede = ({ children, color = SMOKE, mw = 560, mb = SPACE[5] }) => (
  <div style={{
    fontFamily: BODY, fontSize: TYPE.body, fontWeight: 400,
    color, lineHeight: 1.6, maxWidth: mw, marginBottom: mb
  }}>{children}</div>
);

const Divider = ({ color = HAIRLINE, my = SPACE[4] }) => (
  <div style={{ height: 1, background: color, marginTop: my, marginBottom: my }} />
);

const TacticalRow = ({ items, color = ASH, gap = SPACE[3] }) => (
  <div style={{
    display: 'flex', gap, fontFamily: MONO, fontSize: TYPE.monoLabel,
    fontWeight: 500, color, letterSpacing: TRACK.label, textTransform: 'uppercase'
  }}>
    {items.map((t, i) => <span key={i}>{t}</span>)}
  </div>
);

/* Section header block — Eyebrow / Title / Lede with consistent rhythm */
const SectionHeader = ({ eyebrow, title, lede, ledeMb = SPACE[6], eyebrowColor = TERRA, titleColor = JET, ledeColor = SMOKE }) => (
  <div>
    {eyebrow && <Eyebrow color={eyebrowColor} mb={SPACE[2]}>{eyebrow}</Eyebrow>}
    {title && <SectionTitle color={titleColor}>{title}</SectionTitle>}
    {lede && <SectionLede color={ledeColor} mb={ledeMb}>{lede}</SectionLede>}
  </div>
);

/* ═══════════════════════════════════════════════
   COVER
   ═══════════════════════════════════════════════ */
const Cover = () => (
  <div style={{
    height: '100%', background: JET, position: 'relative', overflow: 'hidden',
    padding: SPACE[8], display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
  }}>
    {/* Background mark, very low opacity */}
    <div style={{ position: 'absolute', right: -140, top: '12%', opacity: 0.05 }}>
      <SquadMark color={LINEN} size={840} />
    </div>
    {/* Diagonal accent rule */}
    <div style={{
      position: 'absolute', left: SPACE[8], bottom: SPACE[8], width: 4, height: 220,
      background: TERRA
    }} />

    {/* Top bar */}
    <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <div>
        <Eyebrow color={TERRA} mb={SPACE[3]}>Brand Identity · v3.0 · 2026</Eyebrow>
        <Lockup variant="horizontal" tint="terra" height={80} />
      </div>
      <div style={{ fontFamily: MONO, fontSize: TYPE.monoKicker, fontWeight: 600, color: SLATE, letterSpacing: TRACK.kicker, textAlign: 'right', lineHeight: 1.9 }}>
        <div>SQUAD INC.</div>
        <div>MULTI-SPORT</div>
        <div>PLATFORM</div>
      </div>
    </div>

    {/* Hero text — Color Spike Rule: only the accent word carries terracotta. No italic. */}
    <div style={{ position: 'relative', paddingLeft: SPACE[5] }}>
      <div style={{
        fontFamily: DISPLAY, fontSize: TYPE.d1, fontWeight: 900, color: LINEN,
        letterSpacing: '-0.04em', lineHeight: 0.82, textTransform: 'uppercase',
        marginBottom: SPACE[4]
      }}>
        FIND<br />YOUR<br /><span style={{ color: TERRA }}>GAME.</span>
      </div>
      <div style={{ fontFamily: BODY, fontSize: TYPE.body, color: SLATE, maxWidth: '65ch', lineHeight: 1.6, fontWeight: 400 }}>
        The single place for recreational sports. Players find games. Organizers run them. Venues get discovered. Reliability built in.
      </div>
    </div>

    {/* Bottom strip */}
    <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: `1px solid ${NAVY}`, paddingTop: SPACE[3] }}>
      <TacticalRow color={SLATE} items={['01 LOGO', '02 COLOR', '03 TYPE', '04 UI', '05 VOICE', '06 APPLY']} />
      <div style={{ fontFamily: MONO, fontSize: TYPE.monoKicker, fontWeight: 600, color: TERRA, letterSpacing: TRACK.kicker }}>BRAND KIT →</div>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════
   1 · LOGO LOCKUPS
   ═══════════════════════════════════════════════ */
const LogoLockups = () => (
  <div style={{ padding: SPACE[9], background: BONE, height: '100%' }}>
    <SectionHeader
      eyebrow="01 / Primary Lockup"
      title="The SQUAD Lockup"
      lede="The double-blade mark speaks to motion and team formation. The italic chamfered letterforms speak to weight and reliability. They lock together at fixed proportions — never separate, scale, or rearrange them by hand." />

    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: SPACE[2], marginBottom: SPACE[4] }}>
      {[
        { bg: LINEN, tint: 'terra', label: 'PRIMARY · TERRA ON LINEN', labelColor: ASH, border: true },
        { bg: JET,   tint: 'terra', label: 'REVERSE · TERRA ON JET',   labelColor: SLATE },
        { bg: TERRA, tint: 'linen', label: 'FLOOD · LINEN ON TERRA',   labelColor: 'rgba(235,231,219,0.78)' },
        { bg: SLATE, tint: 'jet',   label: 'MONO · JET ON SLATE',      labelColor: SMOKE },
      ].map((c, i) => (
        <div key={i} style={{
          background: c.bg, borderRadius: RADII.lg, padding: SPACE[4], minHeight: 184,
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          border: c.border ? `1px solid ${HAIRLINE}` : 'none'
        }}>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
            <Lockup variant="horizontal" tint={c.tint} height={64} />
          </div>
          <div style={{ fontFamily: MONO, fontSize: 10, color: c.labelColor, letterSpacing: TRACK.kicker, marginTop: SPACE[2] }}>{c.label}</div>
        </div>
      ))}
    </div>

    {/* Stacked variant + spec */}
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: SPACE[2] }}>
      <div style={{ background: LINEN, borderRadius: RADII.lg, padding: SPACE[5], border: `1px solid ${HAIRLINE}`, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 196 }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Lockup variant="stacked" tint="terra" height={140} />
        </div>
        <div style={{ fontFamily: MONO, fontSize: 10, color: ASH, letterSpacing: TRACK.kicker, marginTop: SPACE[2] }}>STACKED · SQUARE FORMATS</div>
      </div>
      <div style={{ background: LINEN, borderRadius: RADII.lg, padding: SPACE[5], display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', gap: SPACE[3], border: `1px solid ${HAIRLINE}` }}>
        <Lockup variant="horizontal" tint="terra" height={56} />
        <div style={{ fontFamily: MONO, fontSize: 11, color: ASH, letterSpacing: '0.16em', lineHeight: 2.0, textAlign: 'left' }}>
          <div>HORIZONTAL  ·  4.6 : 1</div>
          <div>STACKED  ·  1.4 : 1</div>
          <div>MIN. HORIZONTAL HEIGHT  ·  28 PX</div>
          <div>MIN. STACKED HEIGHT  ·  44 PX</div>
        </div>
      </div>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════
   2 · ICON / APP MARKS
   ═══════════════════════════════════════════════ */
const AppIcon = ({ bg = JET, tint = 'terra', size = 112, mark = 78, radius = 30, label, labelColor = ASH, border = false, shadow = true }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: SPACE[1] }}>
    <div style={{
      width: size, height: size, borderRadius: radius, background: bg,
      border: border ? `1px solid ${HAIRLINE}` : 'none',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: shadow ? '0 16px 30px rgba(19,34,44,0.16)' : 'none',
      overflow: 'hidden'
    }}>
      <SquadMark tint={tint} size={mark} />
    </div>
    {label && <div style={{ fontFamily: MONO, fontSize: 10, color: labelColor, letterSpacing: TRACK.label, textAlign: 'center', textTransform: 'uppercase' }}>{label}</div>}
  </div>
);

const IconMark = () => (
  <div style={{ padding: SPACE[9], background: BONE, minHeight: '100%', position: 'relative', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', right: -250, top: 86, opacity: 0.045 }}>
      <SquadMark color={JET} size={860} />
    </div>
    <div style={{ position: 'relative' }}>
      <SectionHeader
        eyebrow="02 / Icon Mark"
        title="App Icon System"
        lede="The mark should feel like a product icon, not a loose logo dropped into a box. Use palette-backed app plates when the platform needs a container, keep the blades oversized, and preserve the forward lean." />

      <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: SPACE[4], marginBottom: SPACE[5], alignItems: 'stretch' }}>
        {/* Phone context */}
        <div style={{
          background: JET, borderRadius: 42, padding: SPACE[3], minHeight: 424,
          boxShadow: '0 28px 54px rgba(19,34,44,0.24)', position: 'relative', overflow: 'hidden'
        }}>
          <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 130, background: NAVY }} />
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', color: SLATE, fontFamily: MONO, fontSize: 10, letterSpacing: TRACK.label, marginBottom: SPACE[4] }}>
            <span>09:41</span><span>SQUAD</span>
          </div>
          <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(3, 72px)', justifyContent: 'center', gap: '22px 20px', paddingTop: SPACE[2] }}>
            <AppIcon bg={TERRA} tint="linen" size={72} mark={58} radius={20} label="SQUAD" labelColor={LINEN} />
            {[NAVY, SLATE, LINEN, TERRA, SMOKE].map((c, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: SPACE[1] }}>
                <div style={{ width: 72, height: 72, borderRadius: 20, background: c, opacity: i === 2 ? 1 : 0.75, border: i === 2 ? `1px solid ${SLATE_DEEP}` : 'none' }} />
                <div style={{ width: 48, height: 5, borderRadius: 5, background: 'rgba(190,196,206,0.35)' }} />
              </div>
            ))}
          </div>
          <div style={{ position: 'absolute', left: SPACE[3], right: SPACE[3], bottom: SPACE[3], background: 'rgba(235,231,219,0.10)', borderRadius: 26, padding: SPACE[2], display: 'flex', justifyContent: 'center', gap: SPACE[2] }}>
            {[TERRA, NAVY, SLATE, LINEN].map((c, i) => (
              <div key={i} style={{ width: 42, height: 42, borderRadius: 13, background: c }} />
            ))}
          </div>
        </div>

        {/* Primary icon and rules — stacked vertical for narrow column */}
        <div style={{
          background: LINEN, border: `1px solid ${HAIRLINE}`, borderRadius: RADII.xl,
          padding: SPACE[5], minHeight: 424,
          display: 'flex', flexDirection: 'column', gap: SPACE[4]
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBlock: SPACE[2] }}>
            <AppIcon bg={JET} tint="terra" size={140} mark={112} radius={36} shadow />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Eyebrow mb={SPACE[1]}>Primary App Icon</Eyebrow>
            <div style={{ fontFamily: DISPLAY, fontSize: 28, fontWeight: 900, color: JET, lineHeight: 0.92, letterSpacing: '-0.025em', textTransform: 'uppercase', marginBottom: SPACE[2] }}>Built for the home screen.</div>
            <div style={{ fontFamily: BODY, fontSize: 14, color: SMOKE, lineHeight: 1.55, marginBottom: SPACE[3] }}>
              Default product icon: Jet plate, Terracotta mark, large optical fill. Use Linen only when the icon plate itself is Terracotta.
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: SPACE[2] }}>
              {['KEEP THE MARK LARGE', 'CENTER OPTICALLY', 'USE BRAND PLATES', 'AVOID THIN OUTLINES'].map((rule) => (
                <div key={rule} style={{ fontFamily: MONO, fontSize: 10, color: ASH, letterSpacing: TRACK.label, lineHeight: 1.5, borderTop: `1px solid ${HAIRLINE}`, paddingTop: SPACE[1] }}>{rule}</div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Eyebrow mb={SPACE[2]}>Platform examples</Eyebrow>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: SPACE[2], marginBottom: SPACE[5] }}>
        {[
          { label: 'IOS', bg: JET, tint: 'terra', radius: 34, mark: 112 },
          { label: 'ANDROID', bg: TERRA, tint: 'linen', radius: 72, mark: 110 },
          { label: 'WATCH', bg: NAVY, tint: 'terra', radius: 999, mark: 100 },
          { label: 'SOCIAL', bg: LINEN, tint: 'terra', radius: 999, mark: 104, border: true },
          { label: 'FAVICON', bg: SLATE, tint: 'jet', radius: 28, mark: 86 },
          { label: 'DARK UI', bg: NAVY, tint: 'terra', radius: 42, mark: 102 },
        ].map((i) => (
          <div key={i.label} style={{ background: LINEN, border: `1px solid ${HAIRLINE}`, borderRadius: RADII.lg, padding: SPACE[2], display: 'flex', justifyContent: 'center' }}>
            <AppIcon {...i} size={132} shadow={false} />
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: SPACE[3] }}>
        <div style={{ background: TERRA, borderRadius: RADII.xl, padding: SPACE[4], minHeight: 150, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', right: -34, top: -22, opacity: 0.18 }}><SquadMark tint="linen" size={250} /></div>
          <div style={{ position: 'relative', fontFamily: MONO, fontSize: 10, color: 'rgba(235,231,219,0.78)', letterSpacing: TRACK.label, marginBottom: SPACE[1] }}>APP STORE NAME</div>
          <div style={{ position: 'relative', fontFamily: DISPLAY, fontSize: 34, fontWeight: 900, color: LINEN, lineHeight: 0.9, letterSpacing: '-0.025em', textTransform: 'uppercase' }}>SQUAD<br />Find Your Game</div>
        </div>
        <div style={{ background: JET, borderRadius: RADII.xl, padding: SPACE[4], minHeight: 150, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: SPACE[3] }}>
          <AppIcon bg={TERRA} tint="linen" size={112} mark={92} radius={28} shadow={false} />
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: DISPLAY, fontSize: 34, fontWeight: 900, color: LINEN, lineHeight: 0.94, textTransform: 'uppercase', marginBottom: SPACE[1] }}>Notification icon</div>
            <div style={{ fontFamily: BODY, fontSize: 14, color: SLATE, lineHeight: 1.5 }}>Small-space uses still keep the blade silhouette dominant and recognizable.</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════
   3 · CLEAR SPACE & DON'TS
   ═══════════════════════════════════════════════ */
const LogoRules = () => {
  const donts = [
    { label: "Don't stretch",      style: { transform: 'scaleX(1.5)' } },
    { label: "Don't rotate",       style: { transform: 'rotate(12deg)' } },
    { label: "Don't add shadow",   style: { filter: 'drop-shadow(4px 6px 0 rgba(0,0,0,0.4))' } },
    { label: "Don't recolor",      tint: 'jet' /* misuse: forced color */ },
    { label: "Don't crop",         crop: true },
    { label: "Don't crowd",        crowd: true },
  ];
  return (
    <div style={{ padding: SPACE[9], background: BONE, height: '100%' }}>
      <SectionHeader
        eyebrow="03 / Logo Usage"
        title="Clear Space & Don'ts"
        lede="Maintain clear space equal to half the height of the mark on every side. Never compromise the lockup for the sake of a layout." />

      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: SPACE[3],
        border: `2px dashed ${TERRA}`, borderRadius: RADII.lg, padding: `${SPACE[5]}px ${SPACE[7]}px`, marginBottom: SPACE[5]
      }}>
        <Lockup variant="horizontal" tint="terra" height={72} />
      </div>

      <Eyebrow mb={SPACE[2]}>Six things never to do</Eyebrow>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: SPACE[2] }}>
        {donts.map((d, i) => (
          <div key={i} style={{
            background: LINEN, borderRadius: RADII.lg, padding: SPACE[3], border: `1px solid ${HAIRLINE}`,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', gap: SPACE[2],
            minHeight: 176
          }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.55, ...d.style }}>
              {d.crop ? (
                <div style={{ width: 120, overflow: 'hidden', display: 'flex' }}>
                  <Lockup variant="horizontal" tint="terra" height={32} style={{ flexShrink: 0 }} />
                </div>
              ) : d.crowd ? (
                <div style={{ display: 'flex', alignItems: 'center', padding: 4, background: '#ddd', border: '1px solid #999' }}>
                  <Lockup variant="horizontal" tint="terra" height={28} />
                </div>
              ) : (
                <Lockup variant="horizontal" tint={d.tint || 'terra'} height={32} />
              )}
            </div>
            <div style={{
              fontFamily: DISPLAY, fontSize: 13, fontWeight: 800,
              color: TERRA_DEEP, background: TERRA_SOFT,
              borderRadius: RADII.xs, padding: '6px 12px',
              textTransform: 'uppercase', letterSpacing: '0.04em'
            }}>✕ {d.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════
   4 · COLOR PALETTE
   ═══════════════════════════════════════════════ */
const ColorPalette = () => (
  <div style={{ padding: SPACE[9], background: BONE, height: '100%' }}>
    <SectionHeader
      eyebrow="04 / Color System"
      title="Five Pillars"
      lede="Terracotta carries the brand. Jet anchors the type. Navy adds depth. Slate divides surfaces. Linen is the canvas. Use only these five — saturated accent territory belongs to sport tags." />

    {/* Hero terracotta block */}
    <div style={{
      background: TERRA, borderRadius: RADII.xl, padding: SPACE[6], marginBottom: SPACE[4],
      display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
      color: LINEN, minHeight: 240, position: 'relative', overflow: 'hidden'
    }}>
      <div style={{ position: 'absolute', right: -50, top: -60, opacity: 0.18 }}>
        <SquadMark color={LINEN} size={340} />
      </div>
      <div style={{ position: 'relative' }}>
        <div style={{ fontFamily: MONO, fontSize: 12, fontWeight: 600, letterSpacing: TRACK.kicker }}>SIGNATURE COLOR</div>
        <div style={{ fontFamily: DISPLAY, fontSize: 104, fontWeight: 900, marginTop: SPACE[1], lineHeight: 0.86, letterSpacing: '-0.018em', textTransform: 'uppercase' }}>FIERY<br />TERRACOTTA</div>
      </div>
      <div style={{ textAlign: 'right', fontFamily: MONO, fontSize: 12, lineHeight: 2, position: 'relative' }}>
        <div>HEX  ·  #EE4721</div>
        <div>RGB  ·  238, 71, 33</div>
        <div>CMYK ·  0, 70, 86, 7</div>
        <div>PMS  ·  ORANGE 021 C</div>
      </div>
    </div>

    {/* Five-pillar swatches */}
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: SPACE[3], marginBottom: SPACE[6] }}>
      {[
        { c: LINEN, n: 'Soft Linen',       h: '#EBE7DB', label: 'Background · Canvas',  light: true,  swatchTextColor: JET },
        { c: SLATE, n: 'Pale Slate',       h: '#BEC4CE', label: 'Surface · Dividers',                  swatchTextColor: JET },
        { c: TERRA, n: 'Fiery Terracotta', h: '#EE4721', label: 'Action · Brand',                      swatchTextColor: LINEN },
        { c: JET,   n: 'Jet Black',        h: '#13222C', label: 'Text · Dark UI',                      swatchTextColor: LINEN },
        { c: NAVY,  n: 'Deep Navy',        h: '#1D3444', label: 'Depth · Accent',                      swatchTextColor: LINEN },
      ].map((s) => (
        <div key={s.h} style={{ display: 'flex', flexDirection: 'column', gap: SPACE[1] }}>
          <div style={{
            height: 200, borderRadius: RADII.md, background: s.c,
            border: s.light ? `1px solid ${HAIRLINE}` : 'none',
            display: 'flex', alignItems: 'flex-end', padding: SPACE[2]
          }}>
            <div style={{ fontFamily: MONO, fontSize: TYPE.monoLabel, color: s.swatchTextColor, fontWeight: 500, letterSpacing: TRACK.label }}>{s.h}</div>
          </div>
          <div style={{ fontFamily: DISPLAY, fontSize: 18, fontWeight: 800, color: JET, textTransform: 'uppercase', letterSpacing: '0.02em', marginTop: SPACE[1] }}>{s.n}</div>
          <div style={{ fontFamily: BODY, fontSize: 13, color: ASH }}>{s.label}</div>
        </div>
      ))}
    </div>

    {/* Tints / shades */}
    <Eyebrow mb={SPACE[2]}>Terracotta tints &amp; shades</Eyebrow>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: SPACE[2], marginBottom: SPACE[6] }}>
      {[
        { c: '#FBDDD2', n: '100' },
        { c: '#F7B59C', n: '200' },
        { c: '#F38966', n: '300' },
        { c: '#F26B49', n: '400' },
        { c: '#EE4721', n: '500' },
        { c: '#C5371A', n: '700' },
        { c: '#922814', n: '900' },
      ].map((s) => (
        <div key={s.c} style={{ display: 'flex', flexDirection: 'column', gap: SPACE[1] }}>
          <div style={{ height: 96, borderRadius: RADII.md, background: s.c }} />
          <div style={{ fontFamily: DISPLAY, fontSize: 16, fontWeight: 800, color: JET, marginTop: SPACE[1] }}>{s.n}</div>
          <div style={{ fontFamily: MONO, fontSize: TYPE.monoLabel, color: ASH, fontWeight: 500, letterSpacing: TRACK.label }}>{s.c}</div>
        </div>
      ))}
    </div>

    {/* Pairings */}
    <Eyebrow mb={SPACE[2]}>Recommended pairings</Eyebrow>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: SPACE[2] }}>
      {[
        { bg: JET,   fg: TERRA, label: 'JET · TERRA' },
        { bg: TERRA, fg: LINEN, label: 'TERRA · LINEN' },
        { bg: LINEN, fg: JET,   label: 'LINEN · JET', border: true },
        { bg: NAVY,  fg: SLATE, label: 'NAVY · SLATE' },
        { bg: SLATE, fg: JET,   label: 'SLATE · JET' },
      ].map((p, i) => (
        <div key={i} style={{
          height: 110, borderRadius: RADII.lg, background: p.bg,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: DISPLAY, fontWeight: 900, fontSize: 18,
          color: p.fg, letterSpacing: '0.04em', textTransform: 'uppercase',
          border: p.border ? `1px solid ${HAIRLINE}` : 'none'
        }}>{p.label}</div>
      ))}
    </div>
  </div>
);

/* ═══════════════════════════════════════════════
   4b · COLOR RAMPS — three families, ten stops each
   ═══════════════════════════════════════════════ */
const isLightHex = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return lum > 0.55;
};

const ColorRamp = ({ name, ramp, anchor, roleMap }) => (
  <div style={{ marginBottom: SPACE[6] }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: SPACE[3] }}>
      <div>
        <Eyebrow mb={SPACE[1]}>{name} · Ramp</Eyebrow>
        <div style={{ fontFamily: DISPLAY, fontSize: 32, fontWeight: 900, color: JET, textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 1 }}>
          {name}
        </div>
      </div>
      <div style={{ fontFamily: MONO, fontSize: 11, fontWeight: 500, color: ASH, letterSpacing: TRACK.label, textTransform: 'uppercase', textAlign: 'right' }}>
        Anchor: <span style={{ color: TERRA_DEEP, fontWeight: 600 }}>{anchor}</span>
      </div>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: 4, borderRadius: RADII.sm, overflow: 'hidden' }}>
      {Object.entries(ramp).map(([stop, hex]) => {
        const isAnchor = `${name.toLowerCase()}-${stop}` === anchor.toLowerCase();
        const isLight = isLightHex(hex);
        const labelColor = isLight ? JET : LINEN;
        const subColor   = isLight ? SMOKE : 'rgba(235,231,219,0.7)';
        return (
          <div key={stop} style={{
            background: hex, padding: SPACE[2], minHeight: 132,
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            position: 'relative',
            outline: isAnchor ? `2px solid ${TERRA}` : 'none', outlineOffset: -2
          }}>
            <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 600, color: labelColor, letterSpacing: TRACK.label }}>
              {stop}
            </div>
            <div>
              <div style={{ fontFamily: MONO, fontSize: TYPE.monoLabel, fontWeight: 600, color: labelColor, letterSpacing: TRACK.label }}>
                {hex.toUpperCase()}
              </div>
              {roleMap[stop] && (
                <div style={{ fontFamily: BODY, fontSize: 11, fontWeight: 500, color: subColor, lineHeight: 1.3, marginTop: 4 }}>
                  {roleMap[stop]}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

const ColorRamps = () => (
  <div style={{ padding: SPACE[9], background: BONE, height: '100%' }}>
    <SectionHeader
      eyebrow="04 / Color Ramps"
      title="Three families. Ten stops."
      lede="Each color family ramps from 50 (lightest) to 900 (deepest). Brand anchors are highlighted: Terra-500 (Fired Terracotta), Steel-700 (Jet Ink), Linen-200 (Warm Linen). The brand's white is Linen-100; the brand's black is Steel-700." />

    <ColorRamp
      name="Terra"
      ramp={TERRA_RAMP}
      anchor="terra-500"
      roleMap={{
        100: 'Wash bg',
        300: 'Accent on dark',
        500: 'BRAND. The spike',
        600: 'Pressed / hover'
      }} />

    <ColorRamp
      name="Steel"
      ramp={STEEL_RAMP}
      anchor="steel-700"
      roleMap={{
        200: 'Subdued on dark',
        400: 'Caption text',
        500: 'Body text',
        600: 'Field navy',
        700: 'BRAND. Jet ink',
        800: 'Pressed jet'
      }} />

    <ColorRamp
      name="Linen"
      ramp={LINEN_RAMP}
      anchor="linen-200"
      roleMap={{
        100: 'The brand’s "white"',
        200: 'BRAND. Page bg',
        300: 'Hairline'
      }} />

    {/* Role Mapping table */}
    <div style={{ background: LINEN, border: `1px solid ${HAIRLINE}`, borderRadius: RADII.lg, padding: SPACE[5], marginTop: SPACE[5] }}>
      <Eyebrow mb={SPACE[2]}>Canonical Role Mapping</Eyebrow>
      <div style={{ display: 'grid', gridTemplateColumns: 'auto auto 1fr', gap: `${SPACE[2]}px ${SPACE[4]}px`, fontFamily: BODY, fontSize: 13, color: SMOKE, alignItems: 'center' }}>
        {[
          ['The brand’s "white"',     'linen-100',  '#F5F2E9'],
          ['The brand’s "black"',     'steel-700',  '#13222C'],
          ['Page background',              'linen-200',  '#EBE7DB'],
          ['Body text on light',           'steel-500',  '#3A4550'],
          ['Caption / mono labels',        'steel-400',  '#6B7480'],
          ['Subdued text on dark',         'steel-200',  '#BEC4CE'],
          ['Hairline / 1px divider',       'linen-300',  '#D8D4CA'],
          ['Color spike (the accent)',     'terra-500',  '#EE4721'],
          ['Pressed / hover accent',       'terra-600',  '#C5371A'],
          ['Accent on dark surfaces',      'terra-300',  '#F26B49'],
          ['Wash bg tint (rare)',          'terra-100',  '#FBDDD2'],
          ['Primary dark surface',         'steel-700',  '#13222C'],
          ['Secondary dark surface',       'steel-600',  '#1D3444'],
          ['Pressed jet (active state)',   'steel-800',  '#0C1820']
        ].map(([role, slug, hex], i) => (
          <React.Fragment key={i}>
            <div style={{ fontWeight: 600, color: JET }}>{role}</div>
            <div style={{ fontFamily: MONO, fontSize: TYPE.monoLabel, fontWeight: 600, color: TERRA_DEEP, letterSpacing: TRACK.label }}>{slug}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: SPACE[2] }}>
              <span style={{ width: 18, height: 18, borderRadius: 3, background: hex, border: `1px solid ${HAIRLINE}` }} />
              <span style={{ fontFamily: MONO, fontSize: TYPE.monoLabel, fontWeight: 500, color: ASH, letterSpacing: TRACK.label }}>{hex}</span>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════
   5 · TYPOGRAPHY — pairings + specimen
   ═══════════════════════════════════════════════ */
const FontCard = ({ family, label, role, sample, weights, upper, ls }) => (
  <div style={{ borderTop: `1px solid ${HAIRLINE}`, paddingTop: SPACE[5], marginTop: SPACE[5] }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: SPACE[3], gap: SPACE[5] }}>
      <div>
        <Eyebrow mb={SPACE[1]}>{label}</Eyebrow>
        <div style={{ fontFamily: DISPLAY, fontSize: 32, fontWeight: 800, color: JET, textTransform: 'uppercase', letterSpacing: '-0.005em', lineHeight: 1 }}>
          {family.replace(/'/g, '').split(',')[0]}
        </div>
      </div>
      <div style={{ fontFamily: BODY, fontSize: TYPE.body, color: SMOKE, maxWidth: 360, textAlign: 'right', lineHeight: 1.6 }}>{role}</div>
    </div>
    <div style={{
      fontFamily: family,
      fontSize: 96,
      fontWeight: weights[weights.length - 1],
      color: JET,
      lineHeight: 0.92,
      letterSpacing: ls || '-0.04em',
      marginBottom: SPACE[3],
      textTransform: upper ? 'uppercase' : 'none'
    }}>{sample}</div>
    <div style={{ display: 'flex', gap: SPACE[3], flexWrap: 'wrap', marginBottom: SPACE[2], paddingBottom: SPACE[2], borderBottom: `1px solid ${HAIRLINE}` }}>
      {weights.map((w) => (
        <span key={w} style={{ fontFamily: family, fontWeight: w, fontSize: TYPE.body, color: SMOKE, textTransform: upper ? 'uppercase' : 'none' }}>
          {w === 100 ? 'Thin' : w === 300 ? 'Light' : w === 400 ? 'Regular' : w === 500 ? 'Medium' : w === 600 ? 'SemiBold' : w === 700 ? 'Bold' : w === 800 ? 'ExtraBold' : 'Black'} · {w}
        </span>
      ))}
    </div>
    <div style={{ fontFamily: family, fontSize: TYPE.cap, fontWeight: 400, color: SMOKE, lineHeight: 1.7 }}>
      ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789 ə ç ğ İ ı ö ş ü &nbsp; АБВГДЕЁЖЗИЙ
    </div>
  </div>
);

const Typography = () => (
  <div style={{ padding: SPACE[9], background: BONE, height: '100%' }}>
    <SectionHeader
      eyebrow="05 / Type System"
      title="Two fonts. One voice."
      lede="Inter Tight carries every sans role: display, headline, title, lede, body. JetBrains Mono carries label and kicker. Two families, no third. Verified pan-language at every weight (Latin Extended-A, Cyrillic, Greek, Vietnamese)." />

    {/* Type philosophy */}
    <div style={{ background: TERRA, color: LINEN, padding: SPACE[5], borderRadius: RADII.lg, marginBottom: SPACE[2], position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', right: -32, bottom: -40, opacity: 0.20 }}>
        <SquadMark color={LINEN} size={240} />
      </div>
      <Eyebrow color={'rgba(235,231,219,0.85)'} mb={SPACE[1]}>Type Philosophy</Eyebrow>
      <div style={{ fontFamily: DISPLAY, fontSize: 38, fontWeight: 900, lineHeight: 1.02, textTransform: 'uppercase', letterSpacing: '-0.035em', position: 'relative' }}>
        Tight on tight. Heavy at <span style={{ color: JET }}>900</span>.<br />The spike is color, never slant.
      </div>
    </div>

    {/* Wordmark specimen — uses the actual lockup PNG */}
    <div style={{ borderTop: `1px solid ${HAIRLINE}`, paddingTop: SPACE[5], marginTop: SPACE[5] }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: SPACE[3], gap: SPACE[5] }}>
        <div>
          <Eyebrow mb={SPACE[1]}>Wordmark / Custom</Eyebrow>
          <div style={{ fontFamily: DISPLAY, fontSize: 32, fontWeight: 800, color: JET, textTransform: 'uppercase', letterSpacing: '-0.005em', lineHeight: 1 }}>SQUAD Lockup</div>
        </div>
        <div style={{ fontFamily: BODY, fontSize: 13, color: SMOKE, maxWidth: 360, textAlign: 'right', lineHeight: 1.6 }}>
          Custom italic chamfered glyphs locked to the double-blade mark. Always use the lockup asset — never typeset "SQUAD" in a font as a substitute.
        </div>
      </div>
      <div style={{ background: LINEN, padding: SPACE[6], borderRadius: RADII.lg, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${HAIRLINE}` }}>
        <Lockup variant="horizontal" tint="terra" height={120} />
      </div>
      <div style={{ display: 'flex', gap: SPACE[3], marginTop: SPACE[2], fontFamily: MONO, fontSize: 11, color: ASH, letterSpacing: '0.16em', textTransform: 'uppercase' }}>
        <span>5 GLYPHS</span><span>ITALIC 12°</span><span>HORIZONTAL 4.6:1</span><span>CHAMFER ON RIGHT TIPS</span>
      </div>
    </div>

    <FontCard
      family="'Inter Tight', system-ui, sans-serif"
      label="Display / Headline"
      role="The brand's loudest voice. Used for hero headlines, section titles, posters. Always uppercase. Always Black (900). The accent word carries terracotta as the color spike."
      sample="GAME ON."
      weights={[400, 500, 700, 800, 900]}
      upper />

    <FontCard
      family="'Inter Tight', system-ui, sans-serif"
      label="Body / UI"
      role="Same family, lighter weights. 17px standard body, 24px lede, 34px title. No separate body font. Inter Tight is body-readable at 400."
      sample="Built for players, organizers, and venues."
      weights={[400, 500, 700]}
      ls="-0.01em" />

    <FontCard
      family="'JetBrains Mono', ui-monospace, monospace"
      label="Label / Kicker"
      role="Timestamps, IDs, scores, technical labels, eyebrows, badges. Two voices: Label (11px / 500 / 0.16em) for in-card data, Kicker (12px / 600 / 0.22em) for signage."
      sample="14:30 · 8/12 · ₼15"
      weights={[500, 600, 700]} />
  </div>
);

/* ═══════════════════════════════════════════════
   6 · TYPE SCALE
   ═══════════════════════════════════════════════ */
const TypeScale = () => (
  <div style={{ padding: SPACE[9], background: BONE, height: '100%' }}>
    <SectionHeader
      eyebrow="06 / Type Scale"
      title="Hierarchy"
      lede="Nine roles from billboard to caption. Display is reserved for moments that need to dominate. Body and UI carry the everyday weight." />

    <div>
      {[
        { size: TYPE.d2, weight: 900, family: DISPLAY, label: 'Display', text: 'GAME ON.',                                            upper: true, ls: '-0.04em'  },
        { size: TYPE.d3, weight: 900, family: DISPLAY, label: 'H1',      text: 'FIND PICKUP GAMES NEAR YOU',                          upper: true, ls: '-0.035em' },
        { size: TYPE.d4, weight: 900, family: DISPLAY, label: 'H2',      text: 'FEATURED VENUES THIS WEEK',                           upper: true, ls: '-0.03em'  },
        { size: TYPE.d5, weight: 800, family: DISPLAY, label: 'H3',      text: 'BASKETBALL · CENTRAL COURTS',                         upper: true, ls: '-0.025em' },
        { size: TYPE.d6, weight: 800, family: DISPLAY, label: 'Title',   text: 'Game Details & Roster'                                              },
        { size: TYPE.lede, weight: 500, family: BODY,  label: 'Lede',    text: 'Join games organized by your community or create your own.'        },
        { size: TYPE.body, weight: 400, family: BODY,  label: 'Body',    text: 'SQUAD connects players with local games. Find a match, book a venue, track your activity.' },
        { size: TYPE.cap,  weight: 500, family: BODY,  label: 'UI',      text: 'View all games  ·  Filter by sport  ·  Sort by distance' },
        { size: TYPE.monoKicker, weight: 600, family: MONO, label: 'Kicker', text: 'BRAND IDENTITY · v3.0 · 2026',                upper: true, ls: '0.22em' },
        { size: TYPE.monoLabel,  weight: 500, family: MONO, label: 'Label',  text: 'SAT MAR 15 · 14:00 · 8/12 SPOTS · ₼20',       upper: true, ls: '0.16em' },
      ].map((t, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: SPACE[4], borderBottom: `1px solid ${HAIRLINE}`, paddingBottom: SPACE[3], paddingTop: SPACE[3] }}>
          <div style={{ minWidth: 124, fontFamily: MONO, fontSize: TYPE.monoLabel, fontWeight: 500, color: ASH, letterSpacing: TRACK.label, textTransform: 'uppercase' }}>
            <div>{t.label}</div>
            <div style={{ marginTop: 4, color: SLATE_DEEP }}>{t.size} / {t.weight}</div>
          </div>
          <div style={{
            fontFamily: t.family,
            fontSize: t.size, fontWeight: t.weight,
            color: JET, lineHeight: t.family === DISPLAY ? 0.92 : 1.5,
            letterSpacing: t.ls || 'normal',
            textTransform: t.upper ? 'uppercase' : 'none',
            flex: 1, minWidth: 0, wordBreak: 'break-word'
          }}>{t.text}</div>
        </div>
      ))}
    </div>
  </div>
);

/* ═══════════════════════════════════════════════
   7 · UI COMPONENTS — BUTTONS & TAGS

   Button system locked 2026-05-08. Three sizes, six variants,
   one tracking value (0.06em), one weight (800), one font family
   (Inter Tight). All inline button styles in this kit consume
   <Button> below; no inline button styles permitted.
   ═══════════════════════════════════════════════ */
const BUTTON_TRACK = '0.06em';
const BUTTON_WEIGHT = 800;
const BUTTON_SIZES = {
  lg: { fontSize: 17, padding: '18px 32px', radius: 6 },
  md: { fontSize: 15, padding: '14px 26px', radius: 6 },
  sm: { fontSize: 13, padding: '10px 20px', radius: 4 }
};
const BUTTON_VARIANTS = {
  primary:        { background: TERRA,         color: LINEN, border: 'none' },
  secondary:      { background: JET,           color: LINEN, border: 'none' },
  outline:        { background: 'transparent', color: JET,   border: `2px solid ${JET}` },
  'outline-linen':{ background: 'transparent', color: LINEN, border: `2px solid ${SLATE}` },
  ghost:          { background: 'transparent', color: TERRA, border: 'none' },
  disabled:       { background: HAIRLINE,      color: ASH,   border: 'none', cursor: 'not-allowed' }
};

const Button = ({ size = 'md', variant = 'primary', children, style, ...rest }) => {
  const s = BUTTON_SIZES[size];
  const v = BUTTON_VARIANTS[variant];
  return (
    <button {...rest} style={{
      background: v.background, color: v.color, border: v.border,
      fontFamily: DISPLAY, fontWeight: BUTTON_WEIGHT, fontSize: s.fontSize,
      padding: s.padding, borderRadius: s.radius,
      letterSpacing: BUTTON_TRACK, textTransform: 'uppercase',
      cursor: v.cursor || 'pointer',
      transition: 'background 180ms cubic-bezier(0.25,1,0.5,1), transform 180ms cubic-bezier(0.25,1,0.5,1)',
      ...style
    }}>{children}</button>
  );
};

const ButtonStyles = () => (
  <div style={{ padding: SPACE[9], background: BONE, height: '100%' }}>
    <SectionHeader
      eyebrow="07 / Components"
      title="Buttons & Tags"
      lede="Italic display labels for primary actions, upright weight for secondary. Sport tags use the heaviest display weight at the smallest scale to keep the tactical feel." />

    <Eyebrow color={ASH} mb={SPACE[2]}>Primary · Three sizes</Eyebrow>
    <div style={{ display: 'flex', gap: SPACE[2], flexWrap: 'wrap', alignItems: 'center', marginBottom: SPACE[5] }}>
      <Button size="lg" variant="primary">Join Game</Button>
      <Button size="md" variant="primary">Join Game</Button>
      <Button size="sm" variant="primary">Join Game</Button>
    </div>

    <Eyebrow color={ASH} mb={SPACE[2]}>Secondary · Outline · Ghost · Disabled</Eyebrow>
    <div style={{ display: 'flex', gap: SPACE[2], flexWrap: 'wrap', alignItems: 'center', marginBottom: SPACE[5] }}>
      <Button variant="secondary">Create Game</Button>
      <Button variant="outline">Browse Venues</Button>
      <Button variant="ghost">View All →</Button>
      <Button variant="disabled">Full</Button>
    </div>

    <Eyebrow color={ASH} mb={SPACE[2]}>On dark · Outline-linen variant</Eyebrow>
    <div style={{ display: 'flex', gap: SPACE[2], flexWrap: 'wrap', alignItems: 'center', marginBottom: SPACE[5], background: JET, padding: SPACE[3], borderRadius: RADII.md }}>
      <Button variant="primary">Join Game</Button>
      <Button variant="outline-linen">List a Venue</Button>
    </div>

    <Eyebrow color={ASH} mb={SPACE[2]}>Sport tags · Solid</Eyebrow>
    <div style={{ display: 'flex', gap: SPACE[1], flexWrap: 'wrap', marginBottom: SPACE[3] }}>
      {['BASKETBALL', 'SOCCER', 'VOLLEYBALL', 'TENNIS', 'PICKLEBALL', 'PADEL'].map((label) => (
        <div key={label} style={{
          background: JET, color: LINEN,
          fontFamily: DISPLAY, fontWeight: 800, fontSize: 12,
          padding: '8px 14px', borderRadius: RADII.xs,
          letterSpacing: '0.08em', textTransform: 'uppercase'
        }}>{label}</div>
      ))}
    </div>

    <Eyebrow color={ASH} mb={SPACE[2]}>Sport tags · Outline</Eyebrow>
    <div style={{ display: 'flex', gap: SPACE[1], flexWrap: 'wrap' }}>
      {['BASKETBALL', 'SOCCER', 'VOLLEYBALL', 'TENNIS', 'PICKLEBALL', 'PADEL'].map((label) => (
        <div key={label} style={{
          background: 'transparent', color: JET,
          border: `1.5px solid ${JET}`,
          fontFamily: DISPLAY, fontWeight: 800, fontSize: 12,
          padding: '7px 13px', borderRadius: RADII.xs,
          letterSpacing: '0.08em', textTransform: 'uppercase'
        }}>{label}</div>
      ))}
    </div>
  </div>
);

/* ═══════════════════════════════════════════════
   8 · CARD PATTERNS
   ═══════════════════════════════════════════════ */
const CardPatterns = () => (
  <div style={{ padding: SPACE[9], background: LINEN, height: '100%' }}>
    <SectionHeader
      eyebrow="Components / Cards"
      title="Event · Venue · Stat"
      lede="Three card archetypes. Event cards lead with the action color. Venue cards lean dark for contrast. Stat cards isolate one number at huge scale." />

    <div style={{ display: 'grid', gridTemplateColumns: '360px 360px 260px', gap: SPACE[4], alignItems: 'start' }}>

      {/* Event card */}
      <div style={{ width: 360, minHeight: 430, background: BONE, borderRadius: RADII.xl, overflow: 'hidden', border: `1px solid ${HAIRLINE}` }}>
        <div style={{ height: 172, background: TERRA, position: 'relative', display: 'flex', alignItems: 'flex-end', padding: SPACE[3] }}>
          <div style={{ position: 'absolute', top: 14, right: 14, background: 'rgba(19,34,44,0.85)', color: LINEN, fontFamily: MONO, fontSize: 10, fontWeight: 600, padding: '4px 10px', borderRadius: RADII.xs, letterSpacing: '0.16em' }}>OPEN</div>
          <SquadMark color={LINEN} size={60} />
        </div>
        <div style={{ padding: SPACE[3] }}>
          <div style={{ fontFamily: MONO, fontSize: 11, fontWeight: 600, color: TERRA, marginBottom: SPACE[1], letterSpacing: '0.16em' }}>SAT MAR 15 · 14:00</div>
          <div style={{ fontFamily: DISPLAY, fontSize: 30, fontWeight: 900, color: JET, marginBottom: 4, letterSpacing: '-0.012em', textTransform: 'uppercase', lineHeight: 0.95 }}>5v5 Basketball</div>
          <div style={{ fontFamily: BODY, fontSize: 14, color: SMOKE, marginBottom: SPACE[3] }}>Central Park Courts · NYC</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex' }}>
              {[TERRA, NAVY, JET, SMOKE].map((c, i) => (
                <div key={i} style={{ width: 30, height: 30, borderRadius: RADII.pill, background: c, border: `2px solid ${BONE}`, marginLeft: i > 0 ? -8 : 0, fontSize: 11, color: LINEN, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: DISPLAY }}>{['J', 'M', 'K', 'A'][i]}</div>
              ))}
              <div style={{ width: 30, height: 30, borderRadius: RADII.pill, background: SLATE, border: `2px solid ${BONE}`, marginLeft: -8, fontSize: 11, color: JET, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: MONO }}>+6</div>
            </div>
            <Button size="sm" variant="primary">Join</Button>
          </div>
        </div>
      </div>

      {/* Venue card */}
      <div style={{ width: 360, minHeight: 430, background: JET, borderRadius: RADII.xl, overflow: 'hidden' }}>
        <div style={{ height: 172, background: NAVY, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <div style={{ width: 64, height: 64, borderRadius: RADII.lg, background: TERRA, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <SquadMark color={LINEN} size={42} />
          </div>
          <div style={{ position: 'absolute', top: 14, right: 14, background: TERRA, color: LINEN, fontFamily: MONO, fontSize: 10, fontWeight: 600, padding: '4px 10px', borderRadius: RADII.xs, letterSpacing: '0.16em' }}>VERIFIED</div>
        </div>
        <div style={{ padding: SPACE[3] }}>
          <div style={{ fontFamily: DISPLAY, fontSize: 26, fontWeight: 900, color: LINEN, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '-0.012em', lineHeight: 1 }}>Sunset Sports Complex</div>
          <div style={{ fontFamily: BODY, fontSize: 14, color: SLATE, marginBottom: SPACE[2] }}>Brooklyn, NY · Indoor & Outdoor</div>
          <div style={{ display: 'flex', gap: SPACE[1], marginBottom: SPACE[2], flexWrap: 'wrap' }}>
            {['BASKETBALL', 'SOCCER', 'VOLLEYBALL'].map((s) => (
              <div key={s} style={{ background: NAVY, color: SLATE, fontFamily: DISPLAY, fontSize: 11, fontWeight: 800, padding: '4px 9px', borderRadius: RADII.xs, letterSpacing: '0.08em' }}>{s}</div>
            ))}
          </div>
          <div style={{ background: 'transparent', color: TERRA, fontFamily: DISPLAY, fontWeight: 800, fontSize: 13, padding: `${SPACE[2]}px 0 0 0`, borderTop: `1px solid ${NAVY}`, textAlign: 'center', letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: SPACE[2] }}>View available slots →</div>
        </div>
      </div>

      {/* Stat card */}
      <div style={{ width: 260, background: BONE, borderRadius: RADII.xl, padding: SPACE[3], border: `1px solid ${HAIRLINE}`, display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 600, color: ASH, letterSpacing: TRACK.label, textTransform: 'uppercase' }}>Games Played</div>
        <div style={{ fontFamily: DISPLAY, fontSize: 96, fontWeight: 900, color: TERRA, lineHeight: 0.85, letterSpacing: '-0.04em' }}>247</div>
        <div style={{ fontFamily: BODY, fontSize: 13, color: SMOKE, marginTop: 4 }}>+34 this month</div>
        <div style={{ marginTop: SPACE[2], height: 6, background: SLATE, borderRadius: RADII.sm, overflow: 'hidden' }}>
          <div style={{ width: '72%', height: '100%', background: TERRA, borderRadius: RADII.sm }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: SPACE[1], fontFamily: MONO, fontSize: 10, color: ASH, letterSpacing: TRACK.label }}>
          <span>72% OF GOAL</span><span>342</span>
        </div>
      </div>

    </div>
  </div>
);

/* ═══════════════════════════════════════════════
   9 · BRAND VOICE
   ═══════════════════════════════════════════════ */
const BrandVoice = () => (
  <div style={{ padding: SPACE[9], background: BONE, height: '100%' }}>
    <SectionHeader
      eyebrow="08 / Voice"
      title="How SQUAD speaks"
      lede="Talk like a teammate, not a brand. Direct, energetic, inclusive, reliable. Short sentences. Active voice. Confidence without arrogance." />

    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: SPACE[2], marginBottom: SPACE[6] }}>
      {[
        { title: 'DIRECT',    desc: 'Short sentences. Active voice. No fluff. "Join a game" — not "Discover available gaming opportunities."' },
        { title: 'ENERGETIC', desc: 'The voice of a teammate hyping you up. Confident, never aggressive. We talk like we play.' },
        { title: 'INCLUSIVE', desc: 'Every skill level welcome. We never gatekeep — sport is for everyone who shows up.' },
        { title: 'RELIABLE',  desc: 'Honest about availability, clear on pricing, straightforward on cancellations.' }
      ].map((v, i) => (
        <div key={v.title} style={{ padding: SPACE[4], background: LINEN, borderRadius: RADII.lg, border: `1px solid ${HAIRLINE}` }}>
          <div style={{ fontFamily: MONO, fontSize: TYPE.monoLabel, fontWeight: 500, color: TERRA, letterSpacing: TRACK.label, textTransform: 'uppercase', marginBottom: SPACE[2] }}>{`0${i + 1} / VOICE`}</div>
          <div style={{ fontFamily: DISPLAY, fontSize: 36, fontWeight: 900, color: JET, marginBottom: SPACE[1], letterSpacing: '-0.025em', textTransform: 'uppercase' }}>{v.title}</div>
          <div style={{ fontFamily: BODY, fontSize: 14, color: SMOKE, lineHeight: 1.55 }}>{v.desc}</div>
        </div>
      ))}
    </div>

    <Eyebrow mb={SPACE[2]}>Sample copy</Eyebrow>
    <div>
      {[
        { ctx: 'Tagline',       copy: 'FIND YOUR GAME.' },
        { ctx: 'Hero',          copy: 'EVERY SPORT. ONE SQUAD.' },
        { ctx: 'CTA',           copy: 'JOIN A GAME NEAR YOU' },
        { ctx: 'Empty',         copy: 'NO GAMES YET — BE THE ONE TO START IT.' },
        { ctx: 'Success',       copy: "YOU'RE IN. SEE YOU ON THE COURT." },
        { ctx: 'Venue prompt',  copy: 'GOT A SPACE? PUT IT ON THE MAP.' },
        { ctx: 'Reminder',      copy: 'GAME IN 1 HOUR. STRETCH UP.' }
      ].map((s, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: SPACE[3], paddingBottom: SPACE[2], paddingTop: SPACE[2], borderBottom: `1px solid ${HAIRLINE}` }}>
          <div style={{ minWidth: 132, fontFamily: MONO, fontSize: 11, fontWeight: 600, color: ASH, letterSpacing: '0.16em', textTransform: 'uppercase' }}>{s.ctx}</div>
          <div style={{ fontFamily: DISPLAY, fontSize: 30, fontWeight: 900, color: JET, letterSpacing: '-0.012em', textTransform: 'uppercase' }}>{s.copy}</div>
        </div>
      ))}
    </div>
  </div>
);

/* ═══════════════════════════════════════════════
   10 · APPLICATIONS
   ═══════════════════════════════════════════════ */
const Applications = () => (
  <div style={{ padding: SPACE[9], background: JET, height: '100%' }}>
    <SectionHeader
      eyebrow="09 / Applications"
      title="Brand In Action"
      lede="Product, social, story, merch, and out-of-home examples. Each use keeps the mark oversized, the copy short, and the palette limited to Terracotta, Jet, Navy, Slate, Linen, and Bone."
      eyebrowColor={TERRA}
      titleColor={LINEN}
      ledeColor={SLATE} />

    <div style={{ display: 'grid', gridTemplateColumns: '760px 560px', gap: SPACE[4] }}>

      {/* Hero banner */}
      <div style={{
        height: 420, borderRadius: RADII.xxl,
        background: NAVY, padding: SPACE[6],
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        position: 'relative', overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', right: 24, top: 30, opacity: 0.10, pointerEvents: 'none' }}>
          <SquadMark color={TERRA} size={410} />
        </div>
        <div style={{ position: 'relative' }}>
          <Lockup variant="horizontal" tint="terra" height={42} />
        </div>
        <div style={{ position: 'relative' }}>
          <div style={{ fontFamily: DISPLAY, fontSize: 88, fontWeight: 900, letterSpacing: '-0.03em', marginBottom: SPACE[3], lineHeight: 0.92, textTransform: 'uppercase' }}>
            <div style={{ color: LINEN }}>Find your</div>
            <div style={{ color: TERRA, marginTop: SPACE[1] }}>next game.</div>
          </div>
          <div style={{ fontFamily: BODY, fontSize: 16, color: SLATE, maxWidth: 500, lineHeight: 1.5 }}>Join pickup games, book venues, and keep every spot accounted for.</div>
        </div>
        <div style={{ display: 'flex', gap: SPACE[2], position: 'relative' }}>
          <Button variant="primary">Join a Game</Button>
          <Button variant="outline-linen">List a Venue</Button>
        </div>
      </div>

      {/* App store card */}
      <div style={{
        height: 420, borderRadius: RADII.xxl, background: LINEN,
        padding: SPACE[5], display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        position: 'relative', overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', right: 22, top: 22, opacity: 0.07, pointerEvents: 'none' }}>
          <SquadMark color={JET} size={320} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: SPACE[3], position: 'relative' }}>
          <AppIcon bg={JET} tint="terra" size={132} mark={108} radius={32} shadow={false} />
          <div>
            <Lockup variant="horizontal" tint="jet" height={34} />
            <div style={{ fontFamily: BODY, fontSize: 15, color: SMOKE, lineHeight: 1.5, marginTop: SPACE[1] }}>Find games near you.</div>
          </div>
        </div>
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ fontFamily: MONO, fontSize: 10, color: ASH, letterSpacing: TRACK.label, marginBottom: SPACE[2] }}>APP STORE PREVIEW</div>
          <div style={{ fontFamily: DISPLAY, fontSize: 58, fontWeight: 900, color: TERRA, lineHeight: 0.9, textTransform: 'uppercase', marginBottom: SPACE[2] }}>Every sport.</div>
          <Lockup variant="horizontal" tint="terra" height={42} />
        </div>
      </div>

      {/* Social poster */}
      <div style={{
        height: 420, borderRadius: RADII.xxl, background: TERRA,
        padding: SPACE[5], display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        position: 'relative', overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', right: 22, bottom: 18, opacity: 0.17, pointerEvents: 'none' }}>
          <SquadMark color={LINEN} size={320} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative' }}>
          <div style={{ fontFamily: MONO, fontSize: 11, fontWeight: 600, color: 'rgba(235,231,219,0.95)', letterSpacing: TRACK.kicker }}>THIS WEEKEND</div>
          <SquadMark color={LINEN} size={58} />
        </div>
        <div style={{ position: 'relative' }}>
          <div style={{ fontFamily: DISPLAY, fontSize: 152, fontWeight: 900, color: LINEN, lineHeight: 0.8, letterSpacing: '-0.035em' }}>5V5</div>
          <div style={{ fontFamily: DISPLAY, fontSize: 36, fontWeight: 900, color: LINEN, marginTop: SPACE[1], letterSpacing: '-0.025em', textTransform: 'uppercase' }}>Basketball</div>
          <div style={{ fontFamily: MONO, fontSize: 11, color: 'rgba(235,231,219,0.9)', marginTop: SPACE[1], letterSpacing: TRACK.label }}>CENTRAL COURT · SAT 14:00</div>
        </div>
      </div>

      {/* Story */}
      <div style={{
        height: 420, borderRadius: RADII.xxl, background: NAVY,
        padding: SPACE[5], display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        position: 'relative', overflow: 'hidden',
        border: `2px solid ${TERRA}`
      }}>
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <AppIcon bg={TERRA} tint="linen" size={70} mark={58} radius={18} shadow={false} />
          <div style={{ fontFamily: MONO, fontSize: 10, color: TERRA, letterSpacing: TRACK.label, textAlign: 'right', lineHeight: 1.6 }}>PUSH<br />REMINDER</div>
        </div>
        <div style={{ position: 'absolute', right: -60, top: 60, opacity: 0.08, pointerEvents: 'none', zIndex: 0 }}>
          <SquadMark color={TERRA} size={280} />
        </div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontFamily: MONO, fontSize: 11, fontWeight: 600, color: TERRA, marginBottom: SPACE[2], letterSpacing: TRACK.kicker }}>GAME REMINDER</div>
          <div style={{ fontFamily: DISPLAY, fontSize: 56, fontWeight: 900, color: LINEN, letterSpacing: '-0.025em', lineHeight: 0.88, textTransform: 'uppercase' }}>Game in<br />1 hour.</div>
          <div style={{ fontFamily: BODY, fontSize: 15, color: SLATE, marginTop: SPACE[2], lineHeight: 1.5 }}>Bring dark kit. Court 2.</div>
        </div>
      </div>

      {/* Merch */}
      <div style={{
        height: 420, borderRadius: RADII.xxl, background: LINEN,
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: SPACE[2],
        padding: SPACE[4]
      }}>
        <div style={{
          width: 260, height: 296, background: JET, borderRadius: RADII.lg,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: SPACE[2]
        }}>
          <Lockup variant="stacked" tint="terra" height={118} style={{ width: 218, height: 'auto' }} />
          <div style={{ fontFamily: MONO, fontSize: 10, color: SLATE, letterSpacing: '0.22em', marginTop: 4 }}>MEMBER · 2026</div>
        </div>
        <div style={{ fontFamily: MONO, fontSize: 11, color: ASH, letterSpacing: TRACK.kicker }}>MERCH APPLICATION</div>
      </div>

      {/* Venue badge */}
      <div style={{
        height: 420, borderRadius: RADII.xxl, background: SLATE,
        padding: SPACE[5], display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        position: 'relative', overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', right: 24, top: 34, opacity: 0.13, pointerEvents: 'none' }}>
          <SquadMark color={JET} size={300} />
        </div>
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Lockup variant="horizontal" tint="jet" height={34} />
          <div style={{ fontFamily: MONO, fontSize: 10, color: JET, letterSpacing: TRACK.label }}>VENUE BADGE</div>
        </div>
        <div style={{ position: 'relative' }}>
          <div style={{ fontFamily: DISPLAY, fontSize: 72, fontWeight: 900, color: JET, lineHeight: 0.88, letterSpacing: '-0.03em', textTransform: 'uppercase', marginBottom: SPACE[2] }}>Court 2<br />is live.</div>
          <div style={{ display: 'flex', gap: SPACE[1], flexWrap: 'wrap' }}>
            {['BASKETBALL', '8 SPOTS', '7:30 PM'].map((tag) => (
              <div key={tag} style={{ background: JET, color: LINEN, fontFamily: DISPLAY, fontSize: 12, fontWeight: 900, padding: '7px 12px', borderRadius: RADII.xs, letterSpacing: '0.08em' }}>{tag}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Billboard */}
      <div style={{
        gridColumn: '1 / span 2',
        height: 280, borderRadius: RADII.xxl, background: TERRA,
        padding: SPACE[6], display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'relative', overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', right: 230, top: 28, opacity: 0.13, pointerEvents: 'none' }}>
          <SquadMark color={LINEN} size={360} />
        </div>
        <div style={{ position: 'relative' }}>
          <div style={{ fontFamily: MONO, fontSize: 12, fontWeight: 600, letterSpacing: '0.22em', color: 'rgba(235,231,219,0.85)', marginBottom: SPACE[2] }}>OUT OF HOME</div>
          <div style={{ fontFamily: DISPLAY, fontSize: 104, fontWeight: 900, color: LINEN, lineHeight: 0.85, letterSpacing: '-0.025em', textTransform: 'uppercase' }}>Show up.<br />Play today.</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: SPACE[2], position: 'relative' }}>
          <Lockup variant="stacked" tint="linen" height={126} />
        </div>
      </div>

    </div>
  </div>
);

/* ═══════════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════════ */
const App = () => (
  <DesignCanvas
    title="SQUAD — Brand Kit v3"
    subtitle="Visual identity for the multi-sport platform · Italic double-blade mark · Custom chamfered wordmark"
    bgColor="#EBE7DB">

    <DCSection id="cover" title="Cover">
      <DCArtboard id="hero" label="Brand Cover" width={1100} height={900}>
        <Cover />
      </DCArtboard>
    </DCSection>

    <DCSection id="logo" title="Logo System">
      <DCArtboard id="lockups" label="Logo Lockups" width={920} height={1200}>
        <LogoLockups />
      </DCArtboard>
      <DCArtboard id="icon" label="Icon & App Marks" width={920} height={1660}>
        <IconMark />
      </DCArtboard>
      <DCArtboard id="rules" label="Clear Space & Don'ts" width={920} height={1000}>
        <LogoRules />
      </DCArtboard>
    </DCSection>

    <DCSection id="color" title="Color">
      <DCArtboard id="ramps" label="Color Ramps & Roles" width={1400} height={1900}>
        <ColorRamps />
      </DCArtboard>
      <DCArtboard id="colors" label="Color System" width={1200} height={1440}>
        <ColorPalette />
      </DCArtboard>
    </DCSection>

    <DCSection id="type" title="Typography">
      <DCArtboard id="fonts" label="Type Pairings" width={980} height={2640}>
        <Typography />
      </DCArtboard>
      <DCArtboard id="scale" label="Type Scale" width={1180} height={1280}>
        <TypeScale />
      </DCArtboard>
    </DCSection>

    <DCSection id="components" title="Components">
      <DCArtboard id="buttons" label="Buttons & Tags" width={920} height={980}>
        <ButtonStyles />
      </DCArtboard>
      <DCArtboard id="cards" label="Card Patterns" width={1200} height={920}>
        <CardPatterns />
      </DCArtboard>
    </DCSection>

    <DCSection id="voice" title="Voice & Copy">
      <DCArtboard id="voice-guide" label="Voice Guidelines" width={980} height={1340}>
        <BrandVoice />
      </DCArtboard>
    </DCSection>

    <DCSection id="applications" title="Applications">
      <DCArtboard id="apps" label="Brand In Action" width={1500} height={2000}>
        <Applications />
      </DCArtboard>
    </DCSection>
  </DesignCanvas>
);

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
