"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cal, { getCalApi } from "@calcom/embed-react";
import { siteConfig } from "../data/siteConfig";

export default function CalBookingEmbed() {
  const router = useRouter();
  const [embedError, setEmbedError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function initCal() {
      try {
        const cal = await getCalApi();
        if (!isMounted) return;

        // Apply light theme, month_view layout and near-black brand color for maximum contrast
        cal("ui", {
          theme: "light",
          styles: { branding: { brandColor: "#0a0a0a" } },
          hideEventTypeDetails: false,
          layout: "month_view",
        });

        const handleSuccess = (e: any) => {
          if (process.env.NODE_ENV !== "production") {
            // eslint-disable-next-line no-console
            console.log("[Cal.com Booking Success Payload]:", e);
          }

          const rawData =
            e?.detail?.data ||
            e?.data?.data ||
            e?.data ||
            e?.detail ||
            e;
          const booking = rawData?.booking || rawData;

          // Look for uid, start time, end time, duration and title defensively
          const uid =
            rawData?.uid ||
            rawData?.bookingUid ||
            booking?.uid ||
            booking?.id ||
            rawData?.id;

          const startTime =
            rawData?.startTime ||
            rawData?.date ||
            booking?.startTime ||
            booking?.date ||
            rawData?.start;

          const endTime =
            rawData?.endTime ||
            booking?.endTime ||
            rawData?.end;

          const duration =
            rawData?.duration ||
            booking?.duration ||
            rawData?.eventType?.length;

          const title =
            rawData?.title ||
            booking?.title ||
            rawData?.eventType?.title;

          const query = new URLSearchParams();

          // ONLY non-sensitive params that exist
          if (uid && typeof uid === "string") {
            query.set("uid", uid);
          }
          if (startTime && typeof startTime === "string") {
            query.set("startTime", startTime);
          }
          if (endTime && typeof endTime === "string") {
            query.set("endTime", endTime);
          }
          if (duration !== undefined && duration !== null && !isNaN(Number(duration))) {
            query.set("duration", String(duration));
          }
          if (title && typeof title === "string") {
            query.set("title", title);
          }

          // Never put email, name or phone in the URL!
          const qs = query.toString();
          router.push(qs ? `/thank-you?${qs}` : "/thank-you");
        };

        // Subscribe to bookingSuccessfulV2, falling back to bookingSuccessful
        cal("on", {
          action: "bookingSuccessfulV2",
          callback: handleSuccess,
        });

        cal("on", {
          action: "bookingSuccessful",
          callback: handleSuccess,
        });
      } catch (err) {
        if (process.env.NODE_ENV !== "production") {
          // eslint-disable-next-line no-console
          console.warn("Could not initialize Cal API, falling back to iframe:", err);
        }
        if (isMounted) {
          setEmbedError(true);
        }
      }
    }

    initCal();

    // Dual-defense: also listen to window postMessage in case events propagate from iframe
    const handleWindowMessage = (event: MessageEvent) => {
      try {
        if (typeof event.origin === "string" && !event.origin.includes("cal.com")) {
          return;
        }
        const data = event.data;
        if (
          data?.action === "bookingSuccessfulV2" ||
          data?.action === "bookingSuccessful" ||
          data?.type === "bookingSuccessfulV2" ||
          data?.type === "bookingSuccessful" ||
          data?.event === "bookingSuccessfulV2" ||
          data?.event === "bookingSuccessful"
        ) {
          if (process.env.NODE_ENV !== "production") {
            // eslint-disable-next-line no-console
            console.log("[Cal.com postMessage payload]:", data);
          }
          const raw = data?.data || data?.payload || data;
          const booking = raw?.booking || raw;

          const uid = raw?.uid || booking?.uid || raw?.bookingUid;
          const startTime = raw?.startTime || raw?.date || booking?.startTime || booking?.date;
          const endTime = raw?.endTime || booking?.endTime;
          const duration = raw?.duration || booking?.duration;
          const title = raw?.title || booking?.title;

          const query = new URLSearchParams();
          if (uid && typeof uid === "string") query.set("uid", uid);
          if (startTime && typeof startTime === "string") query.set("startTime", startTime);
          if (endTime && typeof endTime === "string") query.set("endTime", endTime);
          if (duration !== undefined && duration !== null && !isNaN(Number(duration))) {
            query.set("duration", String(duration));
          }
          if (title && typeof title === "string") query.set("title", title);

          const qs = query.toString();
          router.push(qs ? `/thank-you?${qs}` : "/thank-you");
        }
      } catch {
        // Ignore parsing errors for non-Cal messages
      }
    };

    window.addEventListener("message", handleWindowMessage);

    return () => {
      isMounted = false;
      window.removeEventListener("message", handleWindowMessage);
    };
  }, [router]);

  return (
    <div className="cal-embed-container" style={{ width: "100%", minHeight: "680px" }}>
      {!embedError ? (
        <Cal
          calLink={siteConfig.calLink}
          style={{ width: "100%", height: "100%", minHeight: "680px", overflow: "hidden" }}
          config={{ layout: "month_view", theme: "light" }}
        />
      ) : (
        <iframe
          src={`https://cal.com/${siteConfig.calLink}?embed=true&theme=light`}
          title="Book your free strategy call with Cinova"
          style={{ width: "100%", height: "700px", border: "none", borderRadius: "16px" }}
          allow="camera; microphone; autoplay; fullscreen"
        />
      )}
    </div>
  );
}
