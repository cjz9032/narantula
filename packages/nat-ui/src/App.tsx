import alinks from "@narantula/backend/public/output.csv";
import "./App.css";

const imagesRecord: Record<string, { default: string }> = import.meta.glob(
  "../../nat-backend/public/imgs/*.*",
  {
    eager: true,
  },
);
const images: string[] = Object.values(imagesRecord).map((t) => t.default);

function App() {
  return (
    <>
      <h3>Texts</h3>
      <ul>
        {(
          alinks as {
            text: string;
            url: string;
          }[]
        ).map((link) => (
          <li>
            <a target="_blank" href={link.url}>
              {link.text}
            </a>
          </li>
        ))}
      </ul>
      <hr />
      <h3>Images</h3>
      <div>
        {images.map((image) => (
          <img width={50} src={image} alt="" />
        ))}
      </div>
    </>
  );
}

export default App;
