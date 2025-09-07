import React from "react";
import InstagramEmbed from "../components/InstagramEmbed";

import video from "../assets/desivideo.mp4";
import desisquare from "../assets/desisquare.svg";

const Connect = () => {
  return (
    // clip horizontal overflow everywhere, keep vertical visible
    <div className="w-full overflow-x-hidden">
      {/* Blurs (hidden on mobile, visible on md+) */}
      <div className="absolute inset-0 z-2 pointer-events-none hidden md:block">
        <div className="absolute top-300 right-0 h-[500px] w-[500px] bg-[#fe8046] opacity-50 blur-[100px] rounded-full -translate-x-[270%] translate-y-[10%]" />
        <div className="absolute top-[100%] left-90 h-[400px] w-[600px] bg-[rgb(247,197,61)] opacity-60 blur-[100px] rounded-full translate-x-[90%]" />
      </div>

      <div className="max-h-[500px] relative overflow-hidden">
        {/* Overlay */}
        <div className="absolute w-full h-full max-h-[500px] bg-black/50 z-10" />

        {/* Headline */}
        <div
          className="absolute w-full h-full flex justify-center items-center z-20 md:translate-x-5 text-white px-4"
          style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontWeight: 800 }}
        >
          <h1 className="text-5xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-8xl text-center leading-tight">
            WANT US AT YOUR CAMPUS?
          </h1>
        </div>

        {/* Marquee strip (still clipped horizontally) */}
        <div className="overflow-x-hidden">
          <div className="scroll-container">
            <div className="scroll-content">
              <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/5acb1222bf45e445dade93edb566da757da61088?placeholderIfAbsent=true&apiKey=c11b4db426a34b60b1c49dce004317da" alt="Image 1" />
              <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/e4825ebdd0ac0466aadde6dbb3b44ef5527316f0?placeholderIfAbsent=true&apiKey=c11b4db426a34b60b1c49dce004317da" alt="Image 2" />
              <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/b5d406c5288e0edb9ee2a71d46629f3071706108?placeholderIfAbsent=true&apiKey=c11b4db426a34b60b1c49dce004317da" alt="Image 3" />
              <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/6a21e8029459a53cad5d5af3642b051e13afee24?placeholderIfAbsent=true&apiKey=c11b4db426a34b60b1c49dce004317da" alt="Image 4" />
              <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/e16a3c6538ed7e7e42e3b428e38a5859755e0e5f?placeholderIfAbsent=true&apiKey=c11b4db426a34b60b1c49dce004317da" alt="Image 5" />
              <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/45fb25de2b05ce9b055824037d0ef96feb00ecd7?placeholderIfAbsent=true&apiKey=c11b4db426a34b60b1c49dce004317da" alt="Image 6" />
              {/* Duplicate Set */}
              <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/5acb1222bf45e445dade93edb566da757da61088?placeholderIfAbsent=true&apiKey=c11b4db426a34b60b1c49dce004317da" alt="Image 1" />
              <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/e4825ebdd0ac0466aadde6dbb3b44ef5527316f0?placeholderIfAbsent=true&apiKey=c11b4db426a34b60b1c49dce004317da" alt="Image 2" />
              <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/b5d406c5288e0edb9ee2a71d46629f3071706108?placeholderIfAbsent=true&apiKey=c11b4db426a34b60b1c49dce004317da" alt="Image 3" />
              <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/6a21e8029459a53cad5d5af3642b051e13afee24?placeholderIfAbsent=true&apiKey=c11b4db426a34b60b1c49dce004317da" alt="Image 4" />
              <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/e16a3c6538ed7e7e42e3b428e38a5859755e0e5f?placeholderIfAbsent=true&apiKey=c11b4db426a34b60b1c49dce004317da" alt="Image 5" />
              <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/45fb25de2b05ce9b055824037d0ef96feb00ecd7?placeholderIfAbsent=true&apiKey=c11b4db426a34b60b1c49dce004317da" alt="Image 6" />
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col lg:flex-row justify-between px-6 md:px-8 lg:px-10 py-6 space-y-8 sm:space-y-12 lg:space-y-0 lg:space-x-16 bg-amber-50 overflow-x-hidden">
        {/* Video Section with Text */}
        <div className="flex flex-col items-center space-y-4 w-full max-w-[400px] lg:w-[400px] h-[400px] sm:h-[450px] lg:h-[500px] flex-shrink-0 md:translate-x-10 mx-auto lg:mx-0">
          <div
            className="w-full max-w-[380px] bg-white shadow-lg rounded-lg px-4 sm:px-6 py-3 sm:py-4 mx-auto text-center mb-4 sm:mb-6 z-[100]"
            style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
          >
            <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#f16323]">
              LATEST NEWS:
            </span>{" "}
            <br />
            <span className="text-gray-500 text-lg sm:text-xl lg:text-2xl font-semibold">
              Desi Pub Takeover 3/26/2025
            </span>
          </div>

          <div className="w-full h-full border border-stone-800 rounded-2xl sm:rounded-3xl overflow-hidden z-[100]">
          <video
  src={video}
  autoPlay
  loop
  muted
  playsInline
  // Safari/WebKit hint (React passes unknown attrs through):
  webkit-playsinline="true"
  controls={false}
  disablePictureInPicture
  controlsList="nodownload noplaybackrate noremoteplayback"
  preload="auto"
  className="w-full h-full object-cover pointer-events-none md:pointer-events-auto"
  onLoadedMetadata={(e) => {
    // ensure playback if autoplay was blocked
    const v = e.currentTarget;
    if (v.paused) { v.play().catch(() => {}); }
  }}
/>

          </div>
        </div>

        {/* Image + CTA */}
        <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px] overflow-hidden flex-shrink-0 z-[100] md:-translate-x-10">
          <img
            src={desisquare}
            alt="food"
            className="w-[500px] h-[500px] md:w-[1000px] md:h-[1200px] object-cover md:-translate-x-[35px] mx-auto"
          />
          <div className="absolute inset-0 flex justify-center items-center md:-translate-x-[35px]">
            <div className="bg-[#fef4e8] shadow-lg rounded-lg p-4 sm:p-6 lg:p-8 w-[280px] sm:w-[320px] lg:w-[350px] flex flex-col items-center space-y-3 sm:space-y-4">
              <span
                className="text-xs sm:text-sm text-gray-600 uppercase tracking-widest text-center"
                style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontWeight: 600 }}
              >
                Make your campus a Desi Campus
              </span>

              <h2
                className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#0e0e0e] text-center"
                style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontWeight: 800 }}
              >
                JOIN TEAM DESI
              </h2>

              <a
                href="mailto:desieatsus@outlook.com"
                className="bg-[#f16323] hover:bg-yellow-400 border border-black rounded-full px-6 py-2 sm:px-8 sm:py-3 font-bold transition-all inline-block text-center text-sm sm:text-base"
                style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Instagram Embed Section */}
      <div className="bg-amber-50 py-8 sm:py-12 flex flex-col lg:flex-row justify-center items-center space-y-6 lg:space-y-0 lg:space-x-8 px-4 sm:px-6 md:px-8 lg:px-10 overflow-x-hidden">
        <div className="bg-white shadow-xl rounded-lg p-6 sm:p-8 flex flex-col items-center justify-center space-y-3 sm:space-y-4 w-full max-w-[300px] h-[250px] sm:h-[300px] z-[100] md:translate-x-72">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
            alt="Instagram Logo"
            className="w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] object-contain"
          />
          <h2
            className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#f16323] text-center"
            style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
          >
            FOLLOW US <br /> ON INSTAGRAM
          </h2>
        </div>

        <div className="w-full md:ml-20 z-[100] flex justify-center overflow-x-hidden">
          <InstagramEmbed />
        </div>
      </div>
    </div>
  );
};

export default Connect;
