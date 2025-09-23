import classname from "classnames";

import "./WalletCard.css";

interface WalletCardProps {
  selected: boolean;
}

export const WalletCard = ({ selected }: WalletCardProps) => {
  return (
    <button
      className={classname({
        "card-wallet": !selected,
        "card-wallet-selected": selected,
      })}
    >
      <div
        style={{ background: "green" }}
        className="card-wallet__color-bar"
      ></div>
      <div className="card-wallet__content">
        <p className="card-wallet__name">Cash</p>
        <p className="card-wallet__balance">10,000 MXN</p>
      </div>
    </button>
  );
};
