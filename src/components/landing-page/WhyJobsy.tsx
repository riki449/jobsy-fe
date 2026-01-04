import Image from "next/image";
import React from "react";

type Feature = {
  title: string;
  description: React.ReactNode;
  icon: string;
  link?: string;
};

const features: Feature[] = [
  {
    title: "Flere tilbud",
    description: (
      <>
        Sammenlign priser, og lav en <b>super handel</b>
      </>
    ),
    icon: "/bids.svg",
  },
  {
    title: "Fri kommunikation",
    description: (
      <>
        Få en <b>gratis besigtigelse</b>, hvis du ønsker
      </>
    ),
    icon: "/handshake.svg",
  },
  {
    title: "Ægte bedømmelser",
    description: "Hyr den bedste, og bedøm selv",
    icon: "/star.svg",
  },
  {
    title: "Gratis at bruge",
    description: "100% gratis og uforpligtende",
    icon: "/free-of-charge.svg",
  },
  {
    title: "Garanti på opgaven",
    description: (
      <>
        De fleste tilbud har en garanti som dækker op til <b>40.000 kr</b>
      </>
    ),
    icon: "/guarantee.svg",
    link: "Læs mere",
  },
];

const WhyJobsy: React.FC = () => {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-12 text-center text-4xl font-extrabold text-gray-700">
          Hvorfor bruge Jobsy?
        </h2>

        <div className="grid gap-y-20 gap-x-20 sm:grid-cols-2">
          {features.map((item, index) => (
            <div key={index} className="flex items-center gap-4">
              <Image alt="img" src={item.icon} width={100} height={100} />

              <div>
                <h3 className="text-2xl font-semibold text-gray-700">
                  {item.title}
                </h3>
                <p className="mt-1 text-lg font-medium text-gray-500">
                  {item.description}
                </p>

                {item.link && (
                  <a
                    href="#"
                    className="mt-2 underline inline-block text-sm text-green-600 hover:underline"
                  >
                    {item.link}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyJobsy;
