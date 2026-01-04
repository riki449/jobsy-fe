import Image from "next/image";

const images = [
  "/drill.svg",
  "/partially-shipped.svg",
  "/car-service.svg",
  "/water-wind-turbine.svg",
  "/accountant.svg",
  "/eyebrow.svg",
  "/threedot.svg",
];
export default function FilterSection() {
  return (
    <div className="w-full bg-white mx-auto py-16 text-center rounded-2xl">
      {/* Title */}
      <h1 className="text-3xl font-semibold leading-tight md:text-5xl">
        Få <span className="text-primaryGreen">3 tilbud</span> fra lokale
        fagfolk, og spar penge
      </h1>

      {/* Search */}
      <div className="mx-auto mt-8 flex max-w-2xl overflow-hidden rounded-full h-17 shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)]">
        <input
          placeholder="Hvad skal du bruge? Fx Advokat, Tømrer, Flyttefirma"
          className="flex-1 px-6 py-3 text-xl outline-none"
        />
        <button className="bg-primaryGreen cursor-pointer px-6 py-3 text-xl font-semibold text-white hover:bg-green-700">
          START
        </button>
      </div>

      {/* Categories */}
      <div className="mt-10 flex flex-wrap mx-10 overflow-x-auto justify-center gap-6 text-sm text-zinc-600">
        {[
          "Håndværker",
          "Flyttefirma",
          "Autoværksted",
          "Energi",
          "Revisor/Advokat",
          "Behandlinger",
          "Se mere",
        ].map((item, index) => (
          <div
            key={item}
            className="flex cursor-pointer hover:bg-[#DDF0FF] w-34 py-2 rounded-lg flex-col items-center gap-2"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl">
              <Image src={images[index]} alt="1" width={40} height={40} />
            </div>
            <span className="select-none font-medium">{item}</span>
          </div>
        ))}
      </div>

      {/* Tags */}
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {[
          "Tømrer",
          "Murer",
          "Maler",
          "VVS",
          "Gulvafslibning",
          "Anlægsgartner",
          "Badeværelse",
          "Elektriker",
        ].map((tag) => (
          <span
            key={tag}
            className="rounded-full cursor-pointer select-none font-bold border px-4 py-1.5 text-sm hover:bg-zinc-100"
          >
            {tag}
          </span>
        ))}
        <button className="text-sm cursor-pointer gap-2 flex flex-row items-center font-medium">
          se flere
          <div>
            <Image
              src={"/images/double-down.png"}
              width={14}
              height={14}
              alt="double-down"
            />
          </div>
        </button>
      </div>

      {/* Trust */}
      <p className="mt-10 text-sm font-semibold text-zinc-500">
        Gør som <span className="font-semibold">401.571</span> andre danskere ·
        Book trygt <span className="text-green-600">med garanti</span> · Spar
        <span className="text-orange-500 font-semibold"> 60%</span> i forhold
        til almindelig pris
      </p>
    </div>
  );
}
