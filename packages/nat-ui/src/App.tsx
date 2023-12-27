import alinks from "@narantula/backend/public/output.csv";
import "./App.css";

const imagesRecord = import.meta.glob("../../nat-backend/public/imgs/*.*", {
  eager: true,
});
const images: string[] = Object.values(imagesRecord).map(t=>t.default);


// 遍历所有图片
// for (const path in images) {
//   // 在这里可以对导入的图片进行操作
//   console.log(images[path]);
// }

function App() {
  return (
    <>
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
      <div>
        {images.map((image) => (
          <img width={50} src={image} alt="" />
        ))}
      </div>
    </>
  );
}

export default App;
