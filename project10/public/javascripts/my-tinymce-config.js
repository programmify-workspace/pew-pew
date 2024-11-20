tinymce.init({
  selector: 'textarea#my-expressjs-tinymce-app',
  plugins: 'lists link image table code help wordcount advcode searchreplace',
  skin: 'oxide-dark',
  content_css: '/stylesheets/dark-theme.css',
  height: 500,
  menubar: false,
  toolbar: 'undo redo | formatselect | fontselect fontsizeselect | forecolor backcolor | h1 h2 h3 h4 h5 h6 | bold italic | alignleft aligncenter alignright | bullist numlist | link image | code | blockquote | help',
  
  // Custom colors for the editor
  content_style: `
      :root {
          color-scheme: dark;
      }
      body {
          background-color: #1a1a1a;
          color: #ffffff;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          padding: 1rem;
      }
      a { color: #40E0D0; }
      table { border-color: #333; }
  `,
  
  // Custom styling for dialogs
  style_formats: [
      { title: 'Headers', items: [
          { title: 'Header 1', format: 'h1' },
          { title: 'Header 2', format: 'h2' },
          { title: 'Header 3', format: 'h3' }
      ]},
      { title: 'Inline', items: [
          { title: 'Bold', format: 'bold' },
          { title: 'Italic', format: 'italic' },
          { title: 'Underline', format: 'underline' }
      ]}
  ],
  
  // Custom colors for color picker
  color_map: [
      "40E0D0", "Turquoise",
      "E6E6FA", "Lavender",
      "FFA500", "Orange",
      "FFFFFF", "White",
      "CCCCCC", "Light Grey",
      "999999", "Grey",
      "666666", "Dark Grey",
      "333333", "Very Dark Grey"
  ]
});