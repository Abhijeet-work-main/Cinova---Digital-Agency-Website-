"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cal, { getCalApi } from "@calcom/embed-react";
import { siteConfig } from "../data/siteConfig";

function isValidMeetUrl(url: unknown): string | null {
  if (typeof url !== "string") return null;
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:") return null;
    if (parsed.username || parsed.password) return null;

    if (parsed.hostname === "meet.google.com") {
      if (/^\/[a-z]{3}-[a-z]{4}-[a-z]{3}$/.test(parsed.pathname)) {
        return `https://meet.google.com${parsed.pathname}`;
      }
      return null;
    }

    if (parsed.hostname === "app.cal.com") {
      if (parsed.pathname.startsWith("/video/")) {
        return parsed.href;
      }
      return null;
    }
  } catch {
    // not a valid URL
  }
  return null;
}

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

        const handleSuccess = (e: unknown) => {
          if (process.env.NODE_ENV !== "production") {
            console.log("[Cal.com Booking Success Payload]:", e);
          }

          const evt = (e && typeof e === "object" ? (e as Record<string, unknown>) : {}) as Record<
            string,
            unknown
          >;
          const detail = evt.detail as Record<string, unknown> | undefined;
          const data = evt.data as Record<string, unknown> | undefined;
          const rawData =
            (detail?.data as Record<string, unknown> | undefined) ||
            (data?.data as Record<string, unknown> | undefined) ||
            data ||
            detail ||
            evt;
          const booking = (rawData?.booking as Record<string, unknown> | undefined) || rawData;

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
            (rawData?.eventType as Record<string, unknown> | undefined)?.length;

          const title =
            rawData?.title ||
            booking?.title ||
            (rawData?.eventType as Record<string, unknown> | undefined)?.title;

          const meetingUrl =
            isValidMeetUrl(rawData?.meetingUrl) ||
            isValidMeetUrl(rawData?.location) ||
            isValidMeetUrl(booking?.meetingUrl) ||
            isValidMeetUrl(booking?.location);

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
          if (meetingUrl) {
            query.set("meetingUrl", meetingUrl);
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
            console.log("[Cal.com postMessage payload]:", data);
          }
          const raw = data?.data || data?.payload || data;
          const booking = raw?.booking || raw;

          const uid = raw?.uid || booking?.uid || raw?.bookingUid;
          const startTime = raw?.startTime || raw?.date || booking?.startTime || booking?.date;
          const endTime = raw?.endTime || booking?.endTime;
          const duration = raw?.duration || booking?.duration;
          const title = raw?.title || booking?.title;
          const meetingUrl =
            isValidMeetUrl(raw?.meetingUrl) ||
            isValidMeetUrl(raw?.location) ||
            isValidMeetUrl(booking?.meetingUrl) ||
            isValidMeetUrl(booking?.location);

          const query = new URLSearchParams();
          if (uid && typeof uid === "string") query.set("uid", uid);
          if (startTime && typeof startTime === "string") query.set("startTime", startTime);
          if (endTime && typeof endTime === "string") query.set("endTime", endTime);
          if (duration !== undefined && duration !== null && !isNaN(Number(duration))) {
            query.set("duration", String(duration));
          }
          if (title && typeof title === "string") query.set("title", title);
          if (meetingUrl) query.set("meetingUrl", meetingUrl);

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
    <div className="cal-embed-container" style={{ width: "100%" }}>
      {!embedError ? (
        <Cal
          calLink={siteConfig.calLink}
          style={{ width: "100%", minHeight: "680px" }}
          config={{ layout: "month_view", theme: "light" }}
        />
      ) : (
        <iframe
          src={`https://cal.com/${siteConfig.calLink}?embed=true&theme=light`}
          title="Book your free strategy call with Cinova"
          style={{ width: "100%", minHeight: "680px", border: "none" }}
          allow="camera; microphone; autoplay; fullscreen"
        />
      )}
    </div>
  );
}
