import "./WhatsappButton.css";
import whatsappIcon from "../assets/hero/images/whatsapp.png";

export default function WhatsappButton() {
  return (
    <a
      className="WhatsappButton"
      href="https://chat.whatsapp.com/KCjoT2iBuQgIKJvSGbrdSa"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img src={whatsappIcon} alt="WhatsApp" />
    </a>
  );
}
