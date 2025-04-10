"use client";

import { useState } from "react";

export default function Home() {
  const [data, setData] = useState({
    image: "",
    username: "",
    discord: "",
    twitch: "",
    steam: "",
    background: "#111827", // dark slate default
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setData({ ...data, image: reader.result as string });
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8 flex flex-col md:flex-row gap-8 items-start justify-center">
      <div className="space-y-4 w-full max-w-sm">
        <h2 className="text-2xl font-bold">🎮 Éditeur</h2>
        <label className="block">Image de skin :</label>
        <input type="file" onChange={handleImageUpload} className="block" />

        <label className="block">Pseudo :</label>
        <input name="username" placeholder="Pseudo" onChange={handleChange} className="w-full p-2 bg-gray-800 rounded" />

        <label className="block">Discord :</label>
        <input name="discord" placeholder="Discord" onChange={handleChange} className="w-full p-2 bg-gray-800 rounded" />

        <label className="block">Twitch :</label>
        <input name="twitch" placeholder="Twitch" onChange={handleChange} className="w-full p-2 bg-gray-800 rounded" />

        <label className="block">Steam :</label>
        <input name="steam" placeholder="Steam" onChange={handleChange} className="w-full p-2 bg-gray-800 rounded" />

        <label className="block">🎨 Couleur de fond :</label>
        <input type="color" name="background" value={data.background} onChange={handleChange} className="w-16 h-10 p-1 rounded" />
      </div>
      <div className="flex justify-center items-start">
        <div
          className="w-[300px] h-[500px] rounded-2xl overflow-hidden shadow-xl border border-gray-700 flex flex-col"
          style={{ backgroundColor: data.background }}
        >
          <div className="w-full h-2/5 relative">
            {data.image ? (
              <img src={data.image} alt="Skin" className="absolute inset-0 w-full h-full object-cover" />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-500">
                Skin ici
              </div>
            )}
          </div>
          <div className="flex-1 p-4 bg-black/40 backdrop-blur-sm text-white space-y-2">
            <h1 className="text-xl font-bold tracking-widest text-white uppercase">{data.username || "Nom du joueur"}</h1>
            <p>🎮 Discord: {data.discord || "N/A"}</p>
            <p>📺 Twitch: {data.twitch || "N/A"}</p>
            <p>🔥 Steam: {data.steam || "N/A"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
