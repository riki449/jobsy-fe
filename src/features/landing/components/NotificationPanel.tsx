"use client";

import LoadingOverlay from "@/src/components/common/LoadingOverlay";
import { IActivityItem } from "@/src/features/landing/types";
import { timeAgo } from "@/src/utils/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NotificationPanel({
  data,
  isLoading = true,
}: {
  data: IActivityItem[];
  isLoading?: boolean;
}) {
  const router = useRouter();
  const [visible, setVisible] = useState(true);
  const [page, setPage] = useState(0);
  const [animate, setAnimate] = useState(true);

  // Cycle every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      // trigger slide out
      setAnimate(false);

      // after slide out, change page and slide in
      setTimeout(() => {
        setPage((prev) => (prev + 1) % Math.ceil(data.length / 3));
        setAnimate(true);
      }, 500); // match transition duration
    }, 5000);

    return () => clearInterval(interval);
  }, [data.length]);

  if (!visible) return null;

  // Slice data into chunks of 3
  const start = page * 3;
  const currentItems = data.slice(start, start + 3);

  return (
    <div className="fixed bottom-4 right-4 z-50 w-107.5 min-h-80 max-w-full rounded-xl bg-white shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-200">
        <p className="text-lg font-bold text-black">
          Det sker på{" "}
          <span className="text-lg font-bold text-green-600">Jobsy</span> netop
          nu
        </p>
        <button
          onClick={() => setVisible(false)}
          className="text-sm text-black cursor-pointer"
        >
          Luk vindue{" "}
          <span className="font-extrabold text-black text-lg">×</span>
        </button>
      </div>

      {/* Notifications */}
      <LoadingOverlay loading={isLoading}>
        <ul
          className={`divide-y divide-zinc-100 transform transition-all duration-500 ${
            animate ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"
          }`}
        >
          {currentItems.map((item) => (
            <li key={item.id} className="px-4 py-3 text-sm text-[#666666]">
              {item.event === "sent_bid" && (
                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-2">
                    <span className="text-green-600">{item.user_name}</span> gav
                    et tilbud på opgaven
                    <br />
                    <span
                      onClick={() => router.push(`/job${item.job_link}`)}
                      className="text-green-600 hover:underline cursor-pointer"
                    >
                      {item.job_title}
                    </span>
                  </div>
                  <div className="text-xs text-[#666666] flex flex-1 justify-start items-center">
                    {timeAgo(item.minutes_ago)}
                  </div>
                </div>
              )}

              {item.event === "review" && (
                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-2">
                    <span className="text-green-600">{item.user_name}</span> gav
                    en anmeldelse til{" "}
                    <span className="font-semibold">{item.company_name}</span>
                    <br />
                    <span
                      onClick={() => router.push(`/job${item.job_link}`)}
                      className="text-zinc-500 hover:underline cursor-pointer"
                    >
                      {item.job_title}
                    </span>
                  </div>
                  <div className="text-xs text-[#666666] flex flex-1 justify-start items-center">
                    {timeAgo(item.minutes_ago)}
                  </div>
                </div>
              )}

              {item.event === "message_client_to_comp" && (
                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-2">
                    <span className="text-green-600">{item.user_name}</span>{" "}
                    sendte en besked til{" "}
                    <span className="font-semibold">{item.company_name}</span>{" "}
                    på opgaven
                    <br />
                    <span
                      onClick={() => router.push(`/job${item.job_link}`)}
                      className="text-zinc-500 hover:underline cursor-pointer"
                    >
                      {item.job_title}
                    </span>
                  </div>
                  <div className="text-xs text-[#666666] flex flex-1 justify-start items-center">
                    {timeAgo(item.minutes_ago)}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </LoadingOverlay>
    </div>
  );
}
