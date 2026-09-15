import { useState } from "react";
import { HeartPulse } from "lucide-react";

/**
 * PrajaReach brand logo.
 * Uses the original logo at /prajareach-logo.jpeg.
 * Falls back to an icon if the image is unavailable, so the UI never breaks.
 */
function BrandLogo({ className = "brand-logo" }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span className="brand-logo-fallback" aria-label="PrajaReach">
        <HeartPulse size={26} />
      </span>
    );
  }

  return (
    <img
      src="/prajareach-logo-transparent.png"
      alt="PrajaReach"
      className={className}
      onError={() => setFailed(true)}
    />
  );
}

export default BrandLogo;