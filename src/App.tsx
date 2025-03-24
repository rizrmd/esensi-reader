import type { Rendition, Contents } from "epubjs";
import { useEffect, useRef, useState } from "react";
import { ReactReader } from "@/components/reader";
import "./index.css";

export const DEMO_URL = "/files/alice.epub";
export const DEMO_NAME = "Alice in wonderland";

type Theme = "default" | "custom";

function updateTheme(rendition: Rendition, theme: Theme) {
  const themes = rendition.themes;

  switch (theme) {
    case "default": {
      themes.override("font-family", "Arial");
      break;
    }
    case "custom": {
      themes.override("font-family", "OpenDyslexic");
      break;
    }
  }
}

export function App() {
  const [theme, setTheme] = useState<Theme>("custom");
  const rendition = useRef<Rendition | undefined>(undefined);
  const [location, setLocation] = useState<string | number>(0);
  useEffect(() => {
    if (rendition.current) {
      updateTheme(rendition.current, theme);
    }
  }, [theme]);
  return (
    <div className="app-container">
      <ReactReader
        url={DEMO_URL}
        location={location}
        swipeable
        locationChanged={(loc: string) => setLocation(loc)}
        getRendition={(_rendition: Rendition) => {
          rendition.current = _rendition;
          _rendition.hooks.content.register((contents: Contents) => {
            // const document = contents.window.document;
            // if (document) {
            //   const css = `
            //   @font-face {
            //     font-family: "OpenDyslexic";
            //     font-weight: 400;
            //     font-style: normal;
            //     src: url("/files/open-dyslexic.woff") format("woff");
            //   }
            //   `;
            //   const style = document.createElement("style");
            //   style.appendChild(document.createTextNode(css));
            //   document.head.appendChild(style);
            //   updateTheme(_rendition, theme);
            // }
          });
        }}
      />
    </div>
  );
}

export default App;
