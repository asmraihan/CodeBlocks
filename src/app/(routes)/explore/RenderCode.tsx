import { useEffect, useRef, useState } from 'react';
import * as esbuild from 'esbuild-wasm';

export default function RenderCode({ code }) {
    const iframeRef = useRef(null);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const startService = async () => {
            if (!isInitialized) {
                await esbuild.initialize({
                    wasmURL: './node_modules/esbuild-wasm/esbuild.wasm',
                });
                setIsInitialized(true);
            }

            const result = await esbuild.transform(code.jsx, { loader: 'jsx', jsx: 'transform' });

            const iframeDoc = iframeRef.current.contentWindow.document;

            iframeDoc.open();
            iframeDoc.write(`
        <html>
          <head>
            <script src="https://unpkg.com/react/umd/react.development.js"></script>
            <script src="https://unpkg.com/react-dom/umd/react-dom.development.js"></script>
          </head>
          <body>
            <div id="root"></div>
            <script>
              ${result.code}
              ReactDOM.render(React.createElement(test), document.getElementById('root'));
            </script>
          </body>
        </html>
      `);
            iframeDoc.close();
        };

        startService();
    }, [code, isInitialized]);

    return (
        <div className="bg-white h-[calc(100dvh-60px)]">
            <iframe ref={iframeRef} className="w-full h-full" />
        </div>
    );
}