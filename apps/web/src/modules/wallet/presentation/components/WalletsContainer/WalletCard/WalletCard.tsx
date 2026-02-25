import "./WalletCard.css";

interface WalletCardProps {
  selected: boolean;
}

export const WalletCard = ({ selected }: WalletCardProps) => {
  return (
    <button
      style={{
        cursor: "pointer",
        width: "13rem",
        minWidth: "208px",
        height: "4rem",
        display: "flex",
        borderRadius: "6px",
        gap: "0.5rem",
        backgroundColor: selected ? "#2D3748" : "#2D3749",
        padding: "0.5rem",
        border: selected ? "2px solid #E2E8F0" : "none",
        boxShadow: selected ? "0 1px 3px rgba(0, 0, 0, 0.1)" : "none",
        transition: "all 0.3s ease",
      }}
    >
      <div
        style={{ background: "green" }}
        className="card-wallet__color-bar"
      ></div>
      <div className="card-wallet__content">
        <p className="card-wallet__name">BCP</p>
        <p className="card-wallet__balance">10,000 MXN</p>
      </div>
    </button>
  );
};
