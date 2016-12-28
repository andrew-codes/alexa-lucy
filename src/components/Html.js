import React from 'react';

module.exports = (title, body) => (
    <html>
    <head>
        <title>{title}</title>
    </head>
    <body>
    <div id="root">{body}</div>
    <script src="public/client.js" />
    <script>

    </script>
    </body>
    </html>
);
