import Link from "next/link";
export default function Home() {
  return (
    <main className="main-home">
      <div className="div-homepage">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus,
          voluptas ipsam hic magni odit voluptatem culpa consequuntur pariatur
          libero molestiae, autem tempore quas tempora reprehenderit illum totam
          fuga soluta! Blanditiis, voluptatum neque molestiae obcaecati cumque
          distinctio recusandae impedit pariatur ducimus. Consequatur
          consequuntur, reiciendis impedit cum itaque iusto distinctio tempore
          libero ipsum in assumenda magni repellat ullam quibusdam repellendus
          quaerat eius odio quasi voluptatibus ut provident possimus ducimus
          adipisci praesentium. Beatae et modi quis veritatis asperiores
          nesciunt corporis eveniet, nam, dolor suscipit quas tempore officiis
          sunt. Officiis dolore maxime modi tempora quasi recusandae esse porro
          inventore, quas numquam, temporibus odio vero!
        </p>
      </div>

      <div className="btn-home">
        <button>
          <Link href={"/items"}>Go to ListitemPage</Link>
        </button>
      </div>
    </main>
  );
}
