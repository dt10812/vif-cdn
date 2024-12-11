(function() {
    // Function to process VIF code inside <script type="text/vif">
    function processVifScripts() {
        // Find all <script> tags with type="text/vif"
        const vifScripts = document.querySelectorAll('script[type="text/vif"]');
        
        vifScripts.forEach(script => {
            // Get the VIF code from the script tag
            const vifCode = script.innerHTML.trim();
            
            // Process the VIF code
            parseVifCode(vifCode);
        });
    }

    // Function to parse VIF code
    function parseVifCode(vifCode) {
        const lines = vifCode.split('\n');
        let version = '';
        let language = '';
        let title = '';
        let heading = '';
        let headingSize = '';
        let fontType = '';
        let headingColor = '';

        lines.forEach(line => {
            // Parse vif-version
            if (line.startsWith('vif-version')) {
                version = line.split('=')[1].trim().replace(/"/g, '');
            }
            // Parse vif-language
            else if (line.startsWith('vif-language')) {
                language = line.split('=')[1].trim().replace(/"/g, '');
            }
            // Parse vif-title
            else if (line.startsWith('vif-title')) {
                title = line.split('=')[1].trim().replace(/"/g, '');
            }
            // Parse vif-heading
            else if (line.startsWith('vif-heading')) {
                heading = line.split('=')[1].trim().replace(/"/g, '');
            }
            // Parse vif-heading-size
            else if (line.startsWith('vif-heading-size')) {
                headingSize = line.split('=')[1].trim().replace(/"/g, '');
            }
            // Parse vif-font-type
            else if (line.startsWith('vif-font-type')) {
                fontType = line.split('=')[1].trim().replace(/"/g, '');
            }
            // Parse vif-heading-color
            else if (line.startsWith('vif-heading-color')) {
                headingColor = line.split('=')[1].trim().replace(/"/g, '');
            }
            // End the current heading block
            else if (line.startsWith('vif-end')) {
                // Render heading
                renderHeading(heading, headingSize, fontType, headingColor);
            }
        });

        // Set the page title if provided
        if (title) {
            document.title = title;
        }
    }

    // Function to render headings
    function renderHeading(heading, size, font, color) {
        if (heading) {
            const headingElement = document.createElement('h' + size);
            headingElement.textContent = heading;
            headingElement.style.fontFamily = font || 'Arial, sans-serif';
            headingElement.style.color = `rgb(${color})`; // e.g., "255, 0, 0" for red
            document.body.appendChild(headingElement);
        }
    }

    // Wait until the DOM is fully loaded before processing VIF code
    document.addEventListener('DOMContentLoaded', processVifScripts);
})();
