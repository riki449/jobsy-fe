import { categoryData } from "@/src/constants/data";
import { useGetCategory, useGetTotalUser } from "@/src/hooks/useWelcome";
import { ICategory } from "@/src/types/welcome";
import { Skeleton } from "antd";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function FilterSection() {
  const { mutateAsync: getCategory, isPending } = useGetCategory();
  const [category, setCategory] = useState<ICategory[]>([]);
  const [expanded, setExpanded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categoryData[0].id
  );
  const { data: totalUser } = useGetTotalUser();

  const handleGetCategory = async (id: string) => {
    try {
      // Case 1: multiple ids (e.g. "415,407")
      if (id.includes(",")) {
        const ids = id.split(",");

        const responses = await Promise.all(
          ids.map((singleId) => getCategory({ id: singleId }))
        );

        const mergedCategories = responses.flatMap(
          (res) => res?.categories ?? []
        );

        setCategory(mergedCategories);
        return;
      }

      // Case 2: single id
      const res = await getCategory({ id });

      if (res?.categories) {
        setCategory(res.categories);
      }
    } catch (error) {
      console.error("getCategory error:", error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    handleGetCategory(categoryData[0].id);
  }, []);

  return (
    <div className="w-full bg-white mx-auto max-w-7xl py-16 text-center rounded-2xl">
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
        {categoryData.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              setSelectedCategory(item.id);
              handleGetCategory(item.id);
            }}
            className={`flex cursor-pointer hover:bg-[#DDF0FF] ${
              selectedCategory === item.id ? "bg-[#DDF0FF]" : ""
            } w-34 py-2 rounded-lg flex-col items-center gap-2`}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl">
              <Image src={item.image} alt="1" width={40} height={40} />
            </div>
            <span className="select-none font-medium">{item.name}</span>
          </div>
        ))}
      </div>

      {/* Tags */}
      <div className="mt-8 mx-10 text-center">
        <div
          className={`
            flex flex-wrap justify-center gap-3 overflow-hidden
            transition-[max-height] duration-300 ease-in-out
            ${expanded ? "max-h-250" : "max-h-11"}
          `}
        >
          {isPending
            ? Array.from({ length: 8 }).map((_, index) => (
                <Skeleton.Button
                  key={index}
                  shape="round"
                  size="large"
                  active
                  block={true}
                  className="h-8.5! w-36!"
                />
              ))
            : category.map((item, index) => (
                <span
                  key={index}
                  className="rounded-full cursor-pointer select-none font-bold border px-4 py-1.5 text-sm hover:bg-zinc-100 whitespace-nowrap"
                >
                  {item.title || "-"}
                </span>
              ))}
        </div>

        {/* Toggle button */}
        {category?.length > 0 && (
          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="mt-3 text-sm cursor-pointer gap-2 inline-flex items-center font-medium"
          >
            {expanded ? "skjul" : "se flere"}
            <Image
              src="/images/double-down.png"
              width={14}
              height={14}
              alt="toggle"
              className={`transition-transform duration-300 ${
                expanded ? "rotate-180" : ""
              }`}
            />
          </button>
        )}
      </div>

      {/* Trust */}
      <p className="mt-10 text-sm font-semibold text-zinc-500">
        Gør som{" "}
        <span className="font-semibold">
          {totalUser?.total_users
            ? totalUser.total_users.toLocaleString("da-DK")
            : "0"}
        </span>{" "}
        andre danskere · Book trygt{" "}
        <span className="text-green-600">med garanti</span> · Spar
        <span className="text-orange-500 font-semibold"> 60%</span> i forhold
        til almindelig pris
      </p>
    </div>
  );
}
