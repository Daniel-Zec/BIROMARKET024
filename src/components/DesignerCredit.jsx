// Footer credit (from daniel-zec-footer-credit.md)
// size: "normal" | "small"   theme: "light" | "dark" | "text"
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

  if (theme === "text") {
    return (
      <a href={href} target="_blank" rel="noopener" title="Website designed by Daniel Zec" style={{ ...linkStyle, display: "inline", gap: 0 }}>
        Design by <span style={{ textDecoration: "underline" }}>Daniel Zec</span>
      </a>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener" title="Website designed by Daniel Zec, Senior Product Designer" style={linkStyle}>
      <span>Designed by</span>
      <img
        src="https://danielzec.com/email-logo.png"
        width={small ? 17 : 24}
        height={small ? 12 : 17}
        alt="Daniel Zec"
        style={{ display: "block", border: 0, filter: theme === "dark" ? "invert(1)" : "none" }}
      />
      <strong>Daniel Zec</strong>
    </a>
  );
}
