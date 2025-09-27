'use client';

export function LanguageSelector() {
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === 'de') {
      const url = new URL(window.location.href);
      url.searchParams.set('googtrans', '/en/de');
      window.location.href = url.toString();
    }
  };

  return (
    <div id="language-selector" style={{ display: "none" }} className="fixed top-4 right-4 z-50">
      <select 
        title="Select Language"
        onChange={handleLanguageChange}
        className="bg-white border border-gray-300 rounded px-3 py-1 text-sm"
      >
        <option value="en">English</option>
        <option value="de">Deutsch</option>
      </select>
    </div>
  );
}
