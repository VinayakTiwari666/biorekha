import { QRCodeCanvas } from "qrcode.react";
import { auth } from "../firebase";

function ShareQRCode() {
  const user = auth.currentUser;

  if (!user) return null;

const shareLink = `${window.location.origin}/share/${user.uid}?name=${encodeURIComponent(user.displayName)}`;

  return (
  <div className="qr-page">

    {/* Page Title */}
    <div className="qr-header">
      <h1>Share Health Records</h1>
      <p>Scan the QR code to view the patient's health report</p>
    </div>

    {/* QR Section */}
    <div className="qr-card">
      <QRCodeCanvas value={shareLink} size={220} />

      <p className="qr-patient">
        Patient: <strong>{user.displayName}</strong>
      </p>
    </div>

    {/* Share Link */}
    <div className="qr-link-section">
      <p>Direct Link</p>

      <input
        type="text"
        value={shareLink}
        readOnly
      />

      <button
        onClick={() => navigator.clipboard.writeText(shareLink)}
      >
        Copy Link
      </button>
    </div>

  </div>
);
}

export default ShareQRCode;