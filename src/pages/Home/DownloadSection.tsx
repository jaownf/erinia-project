import "./DownloadSection.css";

export default function DownloadSection() {
  return (
    <section className="download-section">
      <a
        href="https://drive.google.com/file/d/1ioev7lTD70tuvEW2Dgl4aHbjq80qLb9h/view"
        target="_blank"
        rel="noopener noreferrer"
      >
         <button className="download-btn">
          <span className="download-text">BAIXAR O JOGO</span>
          <span className="download-free">GRÁTIS • WINDOWS</span>
        </button>
      </a>
    </section>
  );
}
