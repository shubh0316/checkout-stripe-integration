"use client";

export default function MeetingPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-red-100">
      <div className="w-full max-w-7xl h-[700px] rounded-2xl  overflow-hidden">
        <iframe
          src="https://calendly.com/timelifeclub/30min" // 👈 replace with your profile link (shows all event types)
          width="100%"
          height="100%"
          frameBorder="0"
          className="rounded-2xl"
        />
      </div>
    </div>
  );
}
