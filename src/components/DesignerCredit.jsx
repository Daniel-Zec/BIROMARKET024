// Footer credit (from daniel-zec-footer-credit.md)
// size: "normal" | "small"   theme: "light" | "dark"
// For a site with both themes: use theme="light" and add the "Both themes" CSS rule above.
export default function DesignerCredit({ site = "CLIENTSITE", size = "normal", theme = "light" }) {
  const small = size === "small";
  const href = `https://danielzec.com/?utm_source=${encodeURIComponent(site)}&utm_medium=footer_credit`;
  const linkStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: small ? 5 : 8,
    whiteSpace: "nowrap",
    fontFamily: "Arial, Helvetica, sans-serif",
    fontSize: small ? 10 : 12,
    lineHeight: small ? "12px" : "16px",
    color: "inherit",
    textDecoration: "none",
    opacity: small ? 0.6 : 0.7,
  };

  return (
    <a className="dz-credit" href={href} target="_blank" rel="noopener" title="Website designed by Daniel Zec, Senior Product Designer" style={linkStyle}>
      <span>Designed by</span>
      <img
        src="https://danielzec.com/email-logo.png"
        width={small ? 17 : 24}
        height={small ? 12 : 17}
        alt="Daniel Zec"
        style={{ display: "block", border: 0, ...(theme === "dark" ? { filter: "invert(1)" } : {}) }}
      />
    </a>
  );
}
