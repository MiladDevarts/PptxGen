document.getElementById("generatePptx").addEventListener("click", function () {
  const fileInput = document.getElementById("jsonFile");
  const files = fileInput.files;

  if (!files.length) {
    alert("Please upload a JSON file.");
    return;
  }

  const file = files[0];
  const reader = new FileReader();

  reader.onload = function (event) {
    try {
      const jsonData = JSON.parse(event.target.result);

      // Initialize the presentation
      let pptx = new PptxGenJS();
      pptx.title = jsonData.title;

      // Define a theme (example styling)
      const titleStyle = {
        x: 1,
        y: 0.5,
        fontSize: 24,
        bold: true,
        color: "363636",
      };
      const contentStyle = { x: 1, y: 1.5, fontSize: 18, color: "6f6f6f" };

      // Iterate over the slides in the JSON data and add text
      jsonData.slides.forEach((slideData) => {
        let slide = pptx.addSlide();
        slide.addText(slideData.title, titleStyle);
        slide.addText(slideData.content, contentStyle);
      });

      // Save the presentation
      pptx.writeFile({ fileName: jsonData.title + ".pptx" });
    } catch (error) {
      alert("Error parsing JSON: " + error.message);
    }
  };

  reader.readAsText(file);
});
