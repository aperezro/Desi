import React, { useEffect } from "react";

const InstagramEmbed = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://www.instagram.com/embed.js";
    script.onload = () => {
      window.instgrm?.Embeds?.process();
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="flex justify-center mt-10 px-4">
      <blockquote
        className="instagram-media"
        data-instgrm-permalink="https://www.instagram.com/reel/DHt4gDQxWQI/?utm_source=ig_web_copy_link&igshid=MzRlODBiNWFlZA=="
        data-instgrm-version="14"
        style={{
          background: "#FFF",
          border: "0",
          margin: "1px auto",
          maxWidth: "540px",
          width: "100%",
          minWidth: "320px",
        }}
      ></blockquote>
    </div>
  );
};

export default InstagramEmbed;
