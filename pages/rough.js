import React from 'react'
import Script from 'next/script'

export default function Rough() {
    return (
        <div>

            <Script
                id="show-banner"
                dangerouslySetInnerHTML={{
                    __html: `atOptions = {
        'key' : '590bbfaa0c9d656e8a4aa68f89821ecd',
        'format' : 'iframe',
        'height' : 60,
        'width' : 468,
        'params' : {}
    };
    document.write('<scr' + 'ipt type="text/javascript" src="//www.highcpmcreativeformat.com/590bbfaa0c9d656e8a4aa68f89821ecd/invoke.js"></scr' + 'ipt>');
`,
                }}
            />
            {/*         
        <script type="text/javascript">
        atOptions = {
            'key' : '590bbfaa0c9d656e8a4aa68f89821ecd',
            'format' : 'iframe',
            'height' : 60,
            'width' : 468,
            'params' : {}
        };
        document.write('<scr' + 'ipt type="text/javascript" src="//www.highcpmcreativeformat.com/590bbfaa0c9d656e8a4aa68f89821ecd/invoke.js"></scr' + 'ipt>');
    </script>

     */}


        </div>
    )
}
