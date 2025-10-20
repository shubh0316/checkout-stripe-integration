import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Timelife Club - Meeting",
  description: "Your journey to a better life starts here",
};

export default function MeetingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="meeting-layout">
      {children}
    </div>
  );
}
