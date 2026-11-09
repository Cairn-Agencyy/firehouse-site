# Firehouse Pools: design.md

Read before touching UI. Filled 2026-11-09 from
`Cairn Agency/Clients/Firehouse Pools/build/design-brief.md`.

## Palette, traced to real materials

No value here was generated or guessed. Each is sampled from Firehouse's own wordmark or their own
built work.

| Token | Hex | Pulled from |
|---|---|---|
| `--ink` | `#14110F` | The logo lockup. The wordmark is white on near-black |
| `--stone` | `#F4EFE6` | Travertine coping and decking, Hardy Rd and POV projects |
| `--stone-warm` | `#EAE1D2` | Limestone in shade, same photos |
| `--pool` | `#1E5049` | The water in their own finished pools |
| `--navy` | `#1C2B4A` | The cushions on the Hardy Rd lakeside build |
| `--ember` | `#B23A12` | One accent, for the firefighter origin. Used sparingly |

🔴 **The logo is white-on-transparent only.** `img/logo.png` has no dark-text version, which is why
the old site was dark-dominant. The refresh solves it with dark charcoal header and footer bands
anchoring a light body. **Ask Micaela for a dark version of the wordmark** if the header ever needs
to go light.

⚠️ The blues on the old site (`#2B6CB0`, `#3182CE`) are Kadence theme defaults, not brand colors.
Do not carry them forward.

## Type

- Display: **Fraunces** (600/700). Warm, crafted, not the default AI serif.
- Body and UI: **Archivo** (400/500/600).
- Both from Google Fonts with real fallback stacks.

## Imagery

Every photo is a real Firehouse build. The first 8 gallery photos were pulled from fhpools.com's
own media library. The rest (15 more, added 2026-11-09) came from Kaylee's `~/Desktop/Cairn/FHPools/`
export, reviewed and selected individually against still frames, not picked by filename or file
size alone. Originals in `_originals/`, web versions in `img/` at 1280px wide, JPEG q5 (~190-490KB
each).

One file in that export, `BeachFamily_FirehousePools_Perspective_8.jpeg`, is a 3D architectural
render, not a photo. Excluded deliberately. Do not add it later without checking first, since it
would break this section's "every photo is a real build" claim.

**No placeholder or stock imagery.** A section with no real photo waits rather than shipping with a
stand-in.

⚠️ 23 images plus a 3MB hero video now on the page, well over the 1 MB guidance. **Convert images
to WebP before launch**, and consider trimming the gallery to the strongest dozen or so. Acceptable
for a review draft, not for production.

## Motion

One signature moment: a 26s drift on the hero pool photo. Nothing else animates. Honors
`prefers-reduced-motion`.

## Structure

Nine service lines, the closed list from `build/fhpools-website-reference.md`. Do not invent a tenth
and do not collapse any into a vague "outdoor living" catch-all.

## 🔴 The A2P surface, do not break it

The SMS disclosure in the contact section is a **registered claim** on Twilio campaign
`QE2c6890da8086d771620e9b13fadeba0b`, which has already been rejected twice over consent on this
exact domain. Three things carry forward verbatim at launch:

1. The line: "By calling or texting Firehouse Pools at (903) 340-2454 you agree to receive text
   messages about your inquiry." The spelling is **inquiry**, not enquiry.
2. `fhpools.com/sms-terms/` keeps its URL.
3. `fhpools.com/privacy-policy/` keeps its URL.

The old site's LeadConnector widget is what currently supplies consent capture. **Do not remove it
until this form's own capture is live and recorded against the campaign.**
