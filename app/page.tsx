"use client";

import { useMemo, useState } from "react";

type Tone = "bold" | "playful" | "authoritative" | "urgent";

type FormState = {
  brandName: string;
  region: string;
  coreMessage: string;
  memeStyle: string;
  tone: Tone;
  cta: string;
};

const DEFAULTS: FormState = {
  brandName: "Valasys Media UAE",
  region: "UAE / GCC",
  coreMessage:
    "Stop fountain donations. Boosting posts without targeting burns budget. Let us run your ads the right way.",
  memeStyle: "digital marketing meme",
  tone: "bold",
  cta: "Swipe up for a free ad audit",
};

function buildPrompt(values: FormState): string {
  const parts: string[] = [];
  parts.push(
    `Create an action-oriented, high-conversion Instagram Story image in the style of a ${values.memeStyle}.`
  );
  parts.push(
    `Theme: "Boosting posts without targeting" vs smart ads. Headline idea: "Stop the fountain donations."`
  );
  parts.push(
    `Brand: ${values.brandName} (${values.region}). Showcase the brand subtly but clearly.`
  );
  parts.push(
    `Core message: ${values.coreMessage}`
  );
  parts.push(
    `Tone: ${values.tone}. Keep it punchy, meme-like, with high contrast and readable typography.`
  );
  parts.push(
    `Visual suggestions: side-by-side meme panels contrasting "Boost" button spam vs strategic ads dashboard; water fountain coin-throwing metaphor vs money-efficient ad machine.`
  );
  parts.push(
    `Design specs: 1080x1920px vertical, safe margins 120px top/bottom for IG UI, bold sans headline, brand color accent in teal/blue.`
  );
  parts.push(
    `Include a clear CTA sticker area: "${values.cta}"`
  );
  parts.push(
    `Compliance: avoid misleading claims; do not use competitor logos; avoid tiny text.`
  );
  return parts.join("\n\n");
}

export default function HomePage() {
  const [values, setValues] = useState<FormState>(DEFAULTS);
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => buildPrompt(values), [values]);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  async function onCopy() {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  function onReset() {
    setValues(DEFAULTS);
  }

  return (
    <div className="container">
      <div className="card" style={{ marginTop: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
          <h1 className="h1">Instagram Story Prompt Generator</h1>
          <span className="badge">Meme-style</span>
        </div>
        <p className="small" style={{ marginTop: 6 }}>
          Generate a ready-to-paste prompt for your image tool. Optimized for ad-meme vibes.
        </p>

        <div className="row row-2" style={{ marginTop: 16 }}>
          <div>
            <label className="label">Brand Name</label>
            <input className="input" value={values.brandName} onChange={(e) => update("brandName", e.target.value)} />
          </div>
          <div>
            <label className="label">Region</label>
            <input className="input" value={values.region} onChange={(e) => update("region", e.target.value)} />
          </div>
        </div>

        <div className="row" style={{ marginTop: 12 }}>
          <div>
            <label className="label">Core Message</label>
            <textarea className="textarea" value={values.coreMessage} onChange={(e) => update("coreMessage", e.target.value)} />
          </div>
        </div>

        <div className="row row-2" style={{ marginTop: 12 }}>
          <div>
            <label className="label">Meme Style</label>
            <input className="input" value={values.memeStyle} onChange={(e) => update("memeStyle", e.target.value)} />
          </div>
          <div>
            <label className="label">Tone</label>
            <select className="select" value={values.tone} onChange={(e) => update("tone", e.target.value as Tone)}>
              <option value="bold">Bold</option>
              <option value="playful">Playful</option>
              <option value="authoritative">Authoritative</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
        </div>

        <div className="row" style={{ marginTop: 12 }}>
          <div>
            <label className="label">CTA</label>
            <input className="input" value={values.cta} onChange={(e) => update("cta", e.target.value)} />
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
          <button className="btn" onClick={onCopy}>{copied ? "Copied" : "Copy Prompt"}</button>
          <button className="btn secondary" onClick={onReset}>Reset</button>
        </div>

        <div style={{ marginTop: 20 }}>
          <div className="label" style={{ marginBottom: 6 }}>Output Prompt</div>
          <div className="preview">
            <pre className="mono" style={{ whiteSpace: "pre-wrap", wordBreak: "break-word", margin: 0 }}>{output}</pre>
          </div>
          <div className="footer">Tip: Paste this into your image generator along with your chosen image.</div>
        </div>
      </div>
    </div>
  );
}
